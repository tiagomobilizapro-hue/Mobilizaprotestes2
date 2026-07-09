// ============================================================
// MobilizaPRO 1.23 - Professional Core Operacional
// Entrega incremental: CRUD operacional para Contratos/Documentos,
// matriz de permissões e relatórios executivos sem romper a v121/v122.
// ============================================================
(function () {
  'use strict';

  var API = 'api/professional.php';
  var state = { contracts: [], documents: [], candidates: [], permissions: null, dashboard: null };

  function esc(value) {
    if (typeof escapeHtml === 'function') return escapeHtml(value == null ? '' : value);
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (s) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
    });
  }
  function clean(v) { return String(v == null ? '' : v).trim(); }
  function upper(v) { return clean(v).toUpperCase(); }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function csrf() { return window.MOBI_CSRF_TOKEN || (document.querySelector('meta[name="mobilizapro-csrf"]') || {}).content || ''; }
  function candidateKey(c) { return clean(c.client_uid) + '|' + clean(c.legacy_id); }
  function dateBR(v) { if (!v) return '-'; var m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? (m[3] + '/' + m[2] + '/' + m[1]) : v; }
  function jsonClone(v) { try { return JSON.parse(JSON.stringify(v)); } catch (e) { return v; } }

  async function api(action, payload, method) {
    var isPost = (method || (payload ? 'POST' : 'GET')).toUpperCase() !== 'GET';
    if (isPost && !csrf()) await api('dashboard');
    var options = { credentials: 'same-origin', headers: { 'Accept': 'application/json' } };
    if (isPost) {
      options.method = method || 'POST';
      options.headers['Content-Type'] = 'application/json';
      options.headers['X-Mobiliza-CSRF'] = csrf();
      options.body = JSON.stringify(payload || {});
    }
    var res = await fetch(API + '?action=' + encodeURIComponent(action) + '&_=' + Date.now(), options);
    var json = null;
    try { json = await res.json(); } catch (e) {}
    if (json && json.csrf) window.MOBI_CSRF_TOKEN = String(json.csrf);
    if (!json || !res.ok || json.ok === false) throw new Error((json && json.message) || 'Falha na comunicação com o servidor.');
    return json;
  }

  function ensurePage(page) {
    var node = document.getElementById('page-' + page);
    if (node) return node;
    var pages = document.getElementById('content-pages');
    if (!pages) return null;
    node = document.createElement('div');
    node.id = 'page-' + page;
    node.className = 'page hidden';
    pages.appendChild(node);
    return node;
  }

  function addNavItem(page, label, icon) {
    if (document.querySelector('.nav-item[data-page="' + page + '"]')) return;
    var nav = document.querySelector('nav');
    if (!nav) return;
    var a = document.createElement('a');
    a.className = 'nav-item flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium';
    a.href = '#';
    a.dataset.page = page;
    a.innerHTML = '<span class="material-symbols-outlined text-xl">' + esc(icon) + '</span> ' + esc(label) + '<span class="mobi-pro-nav-badge">PRO</span>';
    a.addEventListener('click', function (event) { event.preventDefault(); if (typeof selectPage === 'function') selectPage(page); });
    nav.appendChild(a);
  }

  function hero(title, subtitle, icon) {
    return '<div class="mobi-pro-shell mobi-pro-hero rounded-2xl p-6">' +
      '<div class="relative z-[1] flex items-start justify-between gap-4"><div>' +
      '<span class="mobi-pro-chip"><span class="material-symbols-outlined text-sm">' + esc(icon) + '</span> Professional Core Operacional</span>' +
      '<h3 class="font-display font-black text-2xl text-on-surface mt-3">' + esc(title) + '</h3>' +
      '<p class="text-xs text-muted mt-1 max-w-4xl">' + esc(subtitle) + '</p>' +
      '</div><span class="material-symbols-outlined text-primary text-4xl hidden sm:block">' + esc(icon) + '</span></div></div>';
  }

  function statBox(label, value) {
    return '<div class="mobi-pro-stat"><div class="mobi-pro-stat-value">' + esc(value) + '</div><div class="text-[10px] text-muted font-black uppercase tracking-widest mt-2">' + esc(label) + '</div></div>';
  }

  function badgeStatus(status) {
    status = upper(status || 'PENDENTE');
    var ok = /ATIVO|APROVADO|CONCLU[IÍ]DO|EMITIDO/.test(status);
    var bad = /REPROVADO|VENCIDO|INATIVO|SUSPENSO/.test(status);
    var cls = ok ? 'bg-green-500/10 text-green-400 border-green-500/20' : (bad ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20');
    return '<span class="badge ' + cls + '">' + esc(status) + '</span>';
  }

  function loading(node, title) {
    if (!node) return;
    node.innerHTML = '<div class="space-y-6 animate-up">' + hero(title, 'Carregando dados oficiais do MySQL...', 'sync') + '<div class="mobi-pro-shell rounded-2xl p-8 text-center text-muted">Sincronizando com o servidor.</div></div>';
  }

  function errorBox(node, title, err) {
    if (!node) return;
    node.innerHTML = '<div class="space-y-6 animate-up">' + hero(title, 'Não foi possível carregar este módulo.', 'warning') + '<div class="mobi-pro-shell rounded-2xl p-8 text-center text-red-300">' + esc(err && err.message || err || 'Falha desconhecida.') + '</div></div>';
  }

  async function loadContracts() {
    var json = await api('contracts');
    state.contracts = arr(json.contracts);
    return state.contracts;
  }

  function renderContratos() {
    var node = ensurePage('contratos');
    loading(node, 'Contratos / Obras');
    loadContracts().then(function () { drawContratos(node); }).catch(function (e) { errorBox(node, 'Contratos / Obras', e); });
  }

  function drawContratos(node) {
    var contracts = arr(state.contracts);
    var ativos = contracts.filter(function (c) { return upper(c.status) === 'ATIVO' || upper(c.status) === 'EM MOBILIZACAO'; }).length;
    node.innerHTML = '<div class="space-y-6 animate-up">' +
      hero('Contratos / Obras', 'Cadastro mestre para obra, cliente, centro de custo, gestor e status. Esta é a camada de governança inspirada em ERP, sem copiar tela proprietária.', 'business_center') +
      '<div class="grid grid-cols-1 md:grid-cols-4 gap-4">' + statBox('Contratos cadastrados', contracts.length) + statBox('Ativos', ativos) + statBox('Suspensos', contracts.filter(function(c){return upper(c.status)==='SUSPENSO';}).length) + statBox('Encerrados', contracts.filter(function(c){return upper(c.status)==='ENCERRADO';}).length) + '</div>' +
      '<div class="grid grid-cols-1 xl:grid-cols-3 gap-6">' +
        '<form id="mobi-v123-contract-form" class="mobi-pro-shell rounded-2xl p-6 space-y-4">' +
          '<div><h4 class="text-sm font-black">Cadastro de contrato</h4><p class="text-xs text-muted mt-1">Somente perfil Gerencial pode gravar/inativar.</p></div>' +
          '<input type="hidden" name="id">' +
          field('Código / Nº Obra', 'codigo', 'text', 'Ex.: 10760') +
          field('Nome do contrato', 'nome', 'text', 'Ex.: Mobilização Vale - Unidade X') +
          field('Cliente', 'cliente', 'text', 'Ex.: VALE') +
          field('Centro de custo', 'centro_custo', 'text', 'Ex.: CC-001') +
          field('Gestor responsável', 'gestor_nome', 'text', 'Nome do gestor') +
          '<label><span class="mobi-pro-label">Status</span><select name="status" class="mobi-pro-input"><option>ATIVO</option><option>EM MOBILIZACAO</option><option>SUSPENSO</option><option>ENCERRADO</option><option>INATIVO</option></select></label>' +
          '<div class="flex gap-2"><button class="btn btn-primary flex-1" type="submit"><span class="material-symbols-outlined text-sm">save</span> Salvar</button><button class="btn btn-ghost border border-outline-variant" type="button" data-reset>Limpar</button></div>' +
          '<div id="mobi-v123-contract-msg" class="text-xs text-muted"></div>' +
        '</form>' +
        '<div class="mobi-pro-shell rounded-2xl overflow-hidden xl:col-span-2"><div class="table-scroll"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Código</th><th class="text-left">Contrato</th><th>Cliente</th><th>Centro custo</th><th>Status</th><th class="text-right">Ações</th></tr></thead><tbody>' +
          (contracts.length ? contracts.map(function (c) { return '<tr><td class="font-mono font-black text-primary">' + esc(c.codigo || '-') + '</td><td><div class="font-bold text-on-surface">' + esc(c.nome || '-') + '</div><div class="text-[10px] text-muted">Gestor: ' + esc(c.gestor_nome || '-') + '</div></td><td class="text-xs">' + esc(c.cliente || '-') + '</td><td class="font-mono text-xs">' + esc(c.centro_custo || '-') + '</td><td>' + badgeStatus(c.status) + '</td><td class="text-right whitespace-nowrap"><button class="btn btn-ghost text-xs border border-outline-variant" data-edit-contract="' + esc(c.id) + '">Editar</button> <button class="btn btn-ghost text-xs border border-red-500/30 text-red-300" data-del-contract="' + esc(c.id) + '">Inativar</button></td></tr>'; }).join('') : '<tr><td colspan="6" class="text-center text-muted py-10">Nenhum contrato cadastrado.</td></tr>') +
        '</tbody></table></div></div>' +
      '</div></div>';
    bindContratos(node);
  }

  function field(label, name, type, placeholder) {
    return '<label><span class="mobi-pro-label">' + esc(label) + '</span><input class="mobi-pro-input" type="' + esc(type || 'text') + '" name="' + esc(name) + '" placeholder="' + esc(placeholder || '') + '"></label>';
  }

  function bindContratos(node) {
    var form = node.querySelector('#mobi-v123-contract-form');
    var msg = node.querySelector('#mobi-v123-contract-msg');
    function setMsg(text) { if (msg) msg.textContent = text || ''; }
    if (form) {
      form.addEventListener('submit', async function (ev) {
        ev.preventDefault();
        var data = Object.fromEntries(new FormData(form).entries());
        setMsg('Salvando no MySQL...');
        try { var json = await api('save_contract', data, 'POST'); state.contracts = arr(json.contracts); drawContratos(node); }
        catch (e) { setMsg(e.message); }
      });
      var reset = form.querySelector('[data-reset]');
      if (reset) reset.addEventListener('click', function () { form.reset(); form.elements.id.value = ''; setMsg(''); });
    }
    node.querySelectorAll('[data-edit-contract]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = state.contracts.find(function (c) { return String(c.id) === String(btn.getAttribute('data-edit-contract')); });
        if (!item || !form) return;
        ['id','codigo','nome','cliente','centro_custo','gestor_nome','status'].forEach(function (k) { if (form.elements[k]) form.elements[k].value = item[k] || ''; });
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    node.querySelectorAll('[data-del-contract]').forEach(function (btn) {
      btn.addEventListener('click', async function () {
        if (!confirm('Inativar este contrato? Nenhum dado será apagado fisicamente.')) return;
        try { var json = await api('delete_contract', { id: btn.getAttribute('data-del-contract') }, 'POST'); state.contracts = arr(json.contracts); drawContratos(node); }
        catch (e) { alert(e.message); }
      });
    });
  }

  async function loadDocuments() {
    var json = await api('documents');
    state.documents = arr(json.documents);
    state.candidates = arr(json.candidates);
    return json;
  }

  function renderDocumentos() {
    var node = ensurePage('documentos');
    loading(node, 'Documentos e Mobilização');
    loadDocuments().then(function () { drawDocumentos(node); }).catch(function (e) { errorBox(node, 'Documentos e Mobilização', e); });
  }

  function drawDocumentos(node) {
    var docs = arr(state.documents);
    var candidates = arr(state.candidates);
    var pend = docs.filter(function (d) { return /PENDENTE|REPROVADO|VENCIDO/.test(upper(d.status)); }).length;
    node.innerHTML = '<div class="space-y-6 animate-up">' +
      hero('Documentos e Mobilização', 'Controle real de documento por candidato: status, validade, envio, aprovação, reprovação, motivo e arquivo de referência.', 'fact_check') +
      '<div class="grid grid-cols-1 md:grid-cols-4 gap-4">' + statBox('Registros', docs.length) + statBox('Pendências críticas', pend) + statBox('Candidatos ativos', candidates.length) + statBox('Conformidade', docs.length ? Math.round(((docs.length - pend) / docs.length) * 100) + '%' : '0%') + '</div>' +
      '<div class="grid grid-cols-1 xl:grid-cols-3 gap-6">' +
        '<form id="mobi-v123-doc-form" class="mobi-pro-shell rounded-2xl p-6 space-y-4">' +
          '<div><h4 class="text-sm font-black">Registro documental</h4><p class="text-xs text-muted mt-1">Grava no MySQL e registra auditoria operacional.</p></div>' +
          '<input type="hidden" name="id">' +
          '<label><span class="mobi-pro-label">Candidato</span><select name="candidate_ref" class="mobi-pro-input"><option value="">Selecione</option>' + candidates.map(function (c) { return '<option value="' + esc(candidateKey(c)) + '">' + esc(c.nome || '-') + ' · ' + esc(c.cpf || '-') + ' · ' + esc(c.funcao || '-') + '</option>'; }).join('') + '</select></label>' +
          '<label><span class="mobi-pro-label">Tipo</span><select name="tipo" class="mobi-pro-input"><option>ASO</option><option>ADMISSÃO</option><option>TREINAMENTO</option><option>CRACHÁ</option><option>DOCUMENTO PESSOAL</option><option>INTEGRAÇÃO VALE</option><option>OUTRO</option></select></label>' +
          '<label><span class="mobi-pro-label">Status</span><select name="status" class="mobi-pro-input"><option>PENDENTE</option><option>ENVIADO</option><option>APROVADO</option><option>REPROVADO</option><option>VENCIDO</option><option>DISPENSADO</option></select></label>' +
          field('Validade', 'validade_em', 'date', '') + field('Enviado em', 'enviado_em', 'date', '') + field('Arquivo / protocolo', 'arquivo_nome', 'text', 'Nome do arquivo, link interno ou protocolo') +
          '<label><span class="mobi-pro-label">Motivo de reprovação / observação</span><textarea name="motivo_reprovacao" class="mobi-pro-input min-h-[82px]" placeholder="Descreva apenas quando necessário"></textarea></label>' +
          '<div class="flex gap-2"><button class="btn btn-primary flex-1" type="submit"><span class="material-symbols-outlined text-sm">save</span> Salvar</button><button class="btn btn-ghost border border-outline-variant" type="button" data-reset>Limpar</button></div>' +
          '<div id="mobi-v123-doc-msg" class="text-xs text-muted"></div>' +
        '</form>' +
        '<div class="mobi-pro-shell rounded-2xl overflow-hidden xl:col-span-2"><div class="table-scroll"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Candidato</th><th>Tipo</th><th>Status</th><th>Validade</th><th>Arquivo</th><th class="text-right">Ações</th></tr></thead><tbody>' +
          (docs.length ? docs.map(function (d) { return '<tr><td><div class="font-bold text-on-surface">' + esc(d.candidato_nome || d.candidato_uid || '-') + '</div><div class="text-[10px] text-muted">CPF ' + esc(d.candidato_cpf || '-') + ' · RM ' + esc(d.rm || '-') + ' · Obra ' + esc(d.digital_obra || '-') + '</div></td><td class="font-bold">' + esc(d.tipo || '-') + '</td><td>' + badgeStatus(d.status) + '</td><td class="font-mono text-xs">' + esc(dateBR(d.validade_em)) + '</td><td class="text-xs max-w-[180px] truncate" title="' + esc(d.arquivo_nome || '') + '">' + esc(d.arquivo_nome || '-') + '</td><td class="text-right whitespace-nowrap"><button class="btn btn-ghost text-xs border border-outline-variant" data-edit-doc="' + esc(d.id) + '">Editar</button> <button class="btn btn-ghost text-xs border border-red-500/30 text-red-300" data-del-doc="' + esc(d.id) + '">Inativar</button></td></tr>'; }).join('') : '<tr><td colspan="6" class="text-center text-muted py-10">Nenhum documento registrado. Use o formulário para iniciar o controle real.</td></tr>') +
        '</tbody></table></div></div>' +
      '</div></div>';
    bindDocumentos(node);
  }

  function bindDocumentos(node) {
    var form = node.querySelector('#mobi-v123-doc-form');
    var msg = node.querySelector('#mobi-v123-doc-msg');
    function setMsg(text) { if (msg) msg.textContent = text || ''; }
    if (form) {
      form.addEventListener('submit', async function (ev) {
        ev.preventDefault();
        var raw = Object.fromEntries(new FormData(form).entries());
        var parts = clean(raw.candidate_ref).split('|');
        raw.candidato_uid = parts[0] || '';
        raw.candidato_legacy_id = parts[1] || '';
        delete raw.candidate_ref;
        setMsg('Salvando no MySQL...');
        try { var json = await api('save_document', raw, 'POST'); state.documents = arr(json.documents); drawDocumentos(node); }
        catch (e) { setMsg(e.message); }
      });
      var reset = form.querySelector('[data-reset]');
      if (reset) reset.addEventListener('click', function () { form.reset(); form.elements.id.value = ''; setMsg(''); });
    }
    node.querySelectorAll('[data-edit-doc]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = state.documents.find(function (d) { return String(d.id) === String(btn.getAttribute('data-edit-doc')); });
        if (!item || !form) return;
        form.elements.id.value = item.id || '';
        form.elements.candidate_ref.value = clean(item.candidato_uid) + '|' + clean(item.candidato_legacy_id);
        ['tipo','status','validade_em','enviado_em','arquivo_nome','motivo_reprovacao'].forEach(function (k) { if (form.elements[k]) form.elements[k].value = item[k] || ''; });
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    node.querySelectorAll('[data-del-doc]').forEach(function (btn) {
      btn.addEventListener('click', async function () {
        if (!confirm('Inativar este documento? Nenhum dado será apagado fisicamente.')) return;
        try { var json = await api('delete_document', { id: btn.getAttribute('data-del-doc') }, 'POST'); state.documents = arr(json.documents); drawDocumentos(node); }
        catch (e) { alert(e.message); }
      });
    });
  }

  function renderPermissoes() {
    var node = ensurePage('permissoes');
    loading(node, 'Usuários e Permissões');
    api('permissions').then(function (json) { state.permissions = json.permissions || {}; drawPermissoes(node, json.user || {}); }).catch(function (e) { errorBox(node, 'Usuários e Permissões', e); });
  }

  function drawPermissoes(node, user) {
    var perms = state.permissions || {};
    var modules = ['dashboard','vagas','candidatos','mobilizacao','documentos','contratos','auditoria','usuarios'];
    node.innerHTML = '<div class="space-y-6 animate-up">' +
      hero('Usuários e Permissões', 'Matriz operacional dos perfis atuais do sistema. O cadastro de usuários permanece no menu Acesso; esta tela dá governança e clareza de papéis.', 'manage_accounts') +
      '<div class="grid grid-cols-1 md:grid-cols-3 gap-4">' + statBox('Perfil atual', user.role || '-') + statBox('Usuário', user.name || '-') + statBox('CPF sessão', user.cpf || '-') + '</div>' +
      '<div class="mobi-pro-shell rounded-2xl overflow-hidden"><div class="table-scroll"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Perfil</th>' + modules.map(function (m) { return '<th>' + esc(m) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        Object.keys(perms).map(function (profile) {
          var row = perms[profile] || {};
          return '<tr><td><div class="font-black text-on-surface">' + esc(profile) + '</div><div class="text-[10px] text-muted">' + esc(row.label || '') + '</div></td>' + modules.map(function (m) { return '<td class="text-center font-mono text-xs">' + permBadge(row[m] || '-') + '</td>'; }).join('') + '</tr>';
        }).join('') +
      '</tbody></table></div></div>' +
      '<div class="mobi-pro-shell rounded-2xl p-5 text-xs text-muted">Legenda: <b>R</b> visualizar, <b>C</b> criar, <b>U</b> editar/atualizar, <b>D</b> excluir/inativar. Exclusões operacionais continuam como inativação lógica.</div>' +
      '</div>';
  }

  function permBadge(value) {
    if (!value || value === '-') return '<span class="badge bg-surface-container-highest text-muted border-outline-variant">-</span>';
    return '<span class="badge bg-primary/10 text-primary border-primary/20">' + esc(value) + '</span>';
  }

  function renderRelatorios() {
    var node = ensurePage('relatorios');
    loading(node, 'Relatórios Executivos');
    api('dashboard').then(function (json) { state.dashboard = json; drawRelatorios(node); }).catch(function (e) { errorBox(node, 'Relatórios Executivos', e); });
  }

  function drawRelatorios(node) {
    var data = state.dashboard || {};
    var s = data.summary || {};
    var recruiters = arr(data.recruiters);
    var contracts = arr(data.contracts);
    node.innerHTML = '<div class="space-y-6 animate-up">' +
      hero('Relatórios Executivos', 'Resumo gerencial baseado no MySQL: usuários, candidatos, solicitações, documentos, contratos e produtividade.', 'query_stats') +
      '<div class="grid grid-cols-1 md:grid-cols-4 gap-4">' + statBox('Usuários ativos', s.usuarios_ativos || 0) + statBox('Candidatos ativos', s.candidatos_ativos || 0) + statBox('Solicitações ativas', s.solicitacoes_ativas || 0) + statBox('Docs pendentes', s.documentos_pendentes || 0) + '</div>' +
      '<div class="grid grid-cols-1 xl:grid-cols-2 gap-6">' +
        '<div class="mobi-pro-shell rounded-2xl overflow-hidden"><div class="p-5 flex items-center justify-between"><h4 class="text-sm font-black">Produtividade por recrutador</h4><button class="btn btn-ghost text-xs border border-outline-variant" data-export="recruiters">CSV</button></div><div class="table-scroll"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Recrutador</th><th>Total</th><th>ASO</th><th>Admitidos</th><th>Liberados</th></tr></thead><tbody>' +
          (recruiters.length ? recruiters.map(function (r) { return '<tr><td class="font-bold">' + esc(r.recrutador || '-') + '</td><td class="text-center font-mono">' + esc(r.total || 0) + '</td><td class="text-center font-mono">' + esc(r.aso || 0) + '</td><td class="text-center font-mono">' + esc(r.admitidos || 0) + '</td><td class="text-center font-mono">' + esc(r.liberados || 0) + '</td></tr>'; }).join('') : '<tr><td colspan="5" class="text-center text-muted py-8">Sem dados.</td></tr>') +
        '</tbody></table></div></div>' +
        '<div class="mobi-pro-shell rounded-2xl overflow-hidden"><div class="p-5 flex items-center justify-between"><h4 class="text-sm font-black">Candidatos por obra</h4><button class="btn btn-ghost text-xs border border-outline-variant" data-export="contracts">CSV</button></div><div class="table-scroll"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Obra</th><th>Candidatos</th></tr></thead><tbody>' +
          (contracts.length ? contracts.map(function (c) { return '<tr><td class="font-mono font-bold text-primary">' + esc(c.digital_obra || '-') + '</td><td class="text-center font-mono">' + esc(c.candidatos || 0) + '</td></tr>'; }).join('') : '<tr><td colspan="2" class="text-center text-muted py-8">Sem dados.</td></tr>') +
        '</tbody></table></div></div>' +
      '</div></div>';
    node.querySelectorAll('[data-export]').forEach(function (btn) {
      btn.addEventListener('click', function () { exportCsv(btn.getAttribute('data-export')); });
    });
  }

  function exportCsv(type) {
    var rows = [];
    if (type === 'recruiters') {
      rows = [['recrutador','total','aso','admitidos','liberados']].concat(arr(state.dashboard && state.dashboard.recruiters).map(function (r) { return [r.recrutador || '', r.total || 0, r.aso || 0, r.admitidos || 0, r.liberados || 0]; }));
    } else {
      rows = [['obra','candidatos']].concat(arr(state.dashboard && state.dashboard.contracts).map(function (c) { return [c.digital_obra || '', c.candidatos || 0]; }));
    }
    var csv = rows.map(function (row) { return row.map(function (cell) { return '"' + String(cell).replace(/"/g, '""') + '"'; }).join(';'); }).join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'mobilizapro-' + type + '.csv'; a.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }

  function installPages() {
    ensurePage('contratos'); ensurePage('documentos'); ensurePage('auditoria'); ensurePage('permissoes'); ensurePage('relatorios');
    addNavItem('contratos', 'Contratos', 'business_center');
    addNavItem('documentos', 'Documentos', 'fact_check');
    addNavItem('relatorios', 'Relatórios', 'query_stats');
    addNavItem('permissoes', 'Permissões', 'manage_accounts');

    if (typeof renderCurrentPage === 'function' && !window.__mobiProRenderCurrent123) {
      var original = renderCurrentPage;
      window.__mobiProRenderCurrent123 = original;
      window.renderCurrentPage = function () {
        original.apply(this, arguments);
        try {
          if (currentPage === 'contratos') renderContratos();
          else if (currentPage === 'documentos') renderDocumentos();
          else if (currentPage === 'permissoes') renderPermissoes();
          else if (currentPage === 'relatorios') renderRelatorios();
        } catch (e) { console.warn('MobilizaPRO v123:', e); }
      };
      try { renderCurrentPage = window.renderCurrentPage; } catch (e) {}
    }
  }

  function installIdentity() {
    var foot = document.querySelector('aside .p-4.border-t');
    if (foot) {
      var old = foot.querySelector('[data-mobi-pro-version]');
      if (old) old.textContent = '1.23 Professional Core Operacional';
    }
  }

  var timer = setInterval(function () {
    installPages(); installIdentity();
    if (typeof renderCurrentPage === 'function') clearInterval(timer);
  }, 250);
  setTimeout(function () { clearInterval(timer); installPages(); installIdentity(); }, 8000);

  window.MobilizaProProfessionalCoreOperacional = {
    version: '1.23 Professional Core Operacional',
    state: state,
    renderContratos: renderContratos,
    renderDocumentos: renderDocumentos,
    renderPermissoes: renderPermissoes,
    renderRelatorios: renderRelatorios,
    api: api,
    clone: jsonClone
  };
})();
