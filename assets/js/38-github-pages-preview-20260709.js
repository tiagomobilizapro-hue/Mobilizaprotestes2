// ============================================================
// MobilizaPRO 1.25 - GitHub Pages Preview
// Habilita login e módulos de demonstração quando o sistema é aberto
// em hospedagem estática do GitHub Pages. Produção continua sendo PHP/MySQL.
// ============================================================
(function () {
  'use strict';

  function isGitHubPreview() {
    try {
      var host = String(location.hostname || '').toLowerCase();
      return !!(window.MOBI_GITHUB_PREVIEW || host.endsWith('.github.io') || host === 'github.io' || location.protocol === 'file:');
    } catch (e) { return false; }
  }
  if (!isGitHubPreview()) return;
  window.MOBI_GITHUB_PREVIEW = true;

  var STATE_KEY = 'mobilizaprp-state-v3';
  var CONTRACTS_KEY = 'mobilizapro-preview-contracts-v125';
  var DOCS_KEY = 'mobilizapro-preview-documents-v125';
  var PERMS_KEY = 'mobilizapro-preview-permissions-v125';
  var AUDIT_KEY = 'mobilizapro-preview-audit-v125';

  function parse(key, fallback) { try { var v = JSON.parse(localStorage.getItem(key) || ''); return v == null ? fallback : v; } catch (e) { return fallback; } }
  function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {} }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function now() { return new Date().toISOString().slice(0, 19).replace('T', ' '); }
  function currentUser() { try { return window.getCurrentAccessUser ? window.getCurrentAccessUser() : null; } catch (e) { return null; } }
  function state() { return parse(STATE_KEY, { trainingMatrix: [], candidates: [], solicitations: [] }); }
  function nextId(list) { return String((arr(list).reduce(function (m, x) { return Math.max(m, parseInt(x && x.id || 0, 10) || 0); }, 0) + 1)); }

  function defaultPerms() {
    var modules = ['dashboard','vagas','candidatos','mobilizacao','documentos','contratos','auditoria','usuarios','relatorios','banca_tecnica'];
    var profiles = {
      GERENCIAL: 'Gerencial', OPERACIONAL_RECRUTAMENTO: 'Operacional - Recrutamento', MOBILIZACAO: 'Mobilização', ALOJAMENTO: 'Alojamento', OBRA: 'Obra', MEDICINA: 'Medicina'
    };
    var out = {};
    Object.keys(profiles).forEach(function (p) {
      out[p] = { label: profiles[p] };
      modules.forEach(function (m) { out[p][m] = p === 'GERENCIAL' ? 'RCUD' : 'R'; });
    });
    out.OPERACIONAL_RECRUTAMENTO.vagas = 'RCU';
    out.OPERACIONAL_RECRUTAMENTO.candidatos = 'RCU';
    out.MOBILIZACAO.mobilizacao = 'RCU';
    out.MOBILIZACAO.documentos = 'RCU';
    return out;
  }

  function audit(table, action, key, detail) {
    var list = arr(parse(AUDIT_KEY, []));
    var u = currentUser() || {};
    list.unshift({ criado_em: now(), tabela: table, acao: action, registro_chave: key || '-', usuario_nome: u.name || 'GitHub Preview', usuario_cpf: u.cpf || '-', detalhe: detail || 'Operação local de demonstração.' });
    save(AUDIT_KEY, list.slice(0, 120));
  }

  function contracts() {
    var list = arr(parse(CONTRACTS_KEY, []));
    if (!list.length) {
      list = [{ id: '1', codigo: 'DEMO-001', nome: 'Contrato de Demonstração GitHub', cliente: 'VALE / CLIENTE DEMO', centro_custo: 'CC-DEMO', gestor_nome: 'GESTOR DEMO', status: 'ATIVO' }];
      save(CONTRACTS_KEY, list);
    }
    return list;
  }
  function documents() { return arr(parse(DOCS_KEY, [])); }
  function permissions() { var p = parse(PERMS_KEY, null); if (!p) { p = defaultPerms(); save(PERMS_KEY, p); } return p; }

  async function request(action, payload, method) {
    var u = currentUser();
    var st = state();
    if (action === 'dashboard') return { ok: true, preview: true, dashboard: { candidates: arr(st.candidates).length, solicitations: arr(st.solicitations).length }, csrf: 'github-preview' };
    if (action === 'contracts') return { ok: true, preview: true, contracts: contracts(), csrf: 'github-preview' };
    if (action === 'save_contract') {
      var list = contracts();
      var id = String(payload && payload.id || '');
      var item = Object.assign({}, payload || {});
      if (!id) { item.id = nextId(list); list.push(item); audit('contratos', 'criar', item.codigo || item.id, 'Contrato criado no GitHub Preview.'); }
      else { var i = list.findIndex(function (x) { return String(x.id) === id; }); if (i >= 0) list[i] = Object.assign({}, list[i], item); else list.push(item); audit('contratos', 'editar', item.codigo || item.id, 'Contrato atualizado no GitHub Preview.'); }
      save(CONTRACTS_KEY, list); return { ok: true, preview: true, contracts: list, csrf: 'github-preview' };
    }
    if (action === 'delete_contract') {
      var list2 = contracts().map(function (x) { if (String(x.id) === String(payload && payload.id)) x.status = 'INATIVO'; return x; });
      save(CONTRACTS_KEY, list2); audit('contratos', 'inativar', payload && payload.id, 'Contrato inativado no GitHub Preview.'); return { ok: true, preview: true, contracts: list2, csrf: 'github-preview' };
    }
    if (action === 'documents') return { ok: true, preview: true, documents: documents(), candidates: arr(st.candidates), csrf: 'github-preview' };
    if (action === 'save_document') {
      var docs = documents(); var did = String(payload && payload.id || ''); var d = Object.assign({}, payload || {});
      if (!did) { d.id = nextId(docs); docs.push(d); audit('documentos', 'criar', d.id, 'Documento criado no GitHub Preview.'); }
      else { var di = docs.findIndex(function (x) { return String(x.id) === did; }); if (di >= 0) docs[di] = Object.assign({}, docs[di], d); else docs.push(d); audit('documentos', 'editar', d.id, 'Documento atualizado no GitHub Preview.'); }
      save(DOCS_KEY, docs); return { ok: true, preview: true, documents: docs, csrf: 'github-preview' };
    }
    if (action === 'delete_document') { var docs2 = documents().map(function (x) { if (String(x.id) === String(payload && payload.id)) x.status = 'INATIVO'; return x; }); save(DOCS_KEY, docs2); audit('documentos', 'inativar', payload && payload.id, 'Documento inativado no GitHub Preview.'); return { ok: true, preview: true, documents: docs2, csrf: 'github-preview' }; }
    if (action === 'permissions') return { ok: true, preview: true, permissions: permissions(), user: { name: u && u.name || 'GitHub Preview', role: u && u.role || 'GERENCIAL' }, csrf: 'github-preview' };
    if (action === 'save_permission') {
      var perms = permissions(); var profile = String(payload && payload.perfil || ''); var modulo = String(payload && payload.modulo || '');
      if (!perms[profile]) perms[profile] = { label: profile };
      var code = '';
      if (payload && payload.pode_visualizar) code += 'R';
      if (payload && payload.pode_criar) code += 'C';
      if (payload && payload.pode_editar) code += 'U';
      if (payload && payload.pode_excluir) code += 'D';
      perms[profile][modulo] = code;
      save(PERMS_KEY, perms); audit('permissoes', 'editar', profile + '/' + modulo, 'Permissão alterada no GitHub Preview.');
      return { ok: true, preview: true, permissions: perms, csrf: 'github-preview' };
    }
    if (action === 'audit') return { ok: true, preview: true, audit: arr(parse(AUDIT_KEY, [])), csrf: 'github-preview' };
    if (action === 'technical_board') {
      var areas = ['Arquitetura de software','Banco de dados','Segurança','UX/UI','Dashboard/BI','RH/Recrutamento','Mobilização','SGC Vale','TOTVS/ERP','QA/Testes','Multiusuário/Sessão','Performance','Auditoria/Compliance','Produto SaaS','Hostinger/GitHub'];
      var items = areas.map(function (a) { return { area: a, status: a === 'Hostinger/GitHub' ? 'ATENÇÃO' : 'APROVADO', evidence: a === 'Hostinger/GitHub' ? 'GitHub Pages opera como prévia estática; produção requer PHP/MySQL na Hostinger.' : 'Critério contemplado na matriz técnica da v124/v125.', next: 'Homologar em ambiente real antes de produção.' }; });
      return { ok: true, preview: true, board: { total: items.length, approved: 14, score: 93, decision: 'HOMOLOGAÇÃO CONTROLADA', disclaimer: 'Modo GitHub Preview: demonstração local, sem PHP/MySQL.', items: items }, csrf: 'github-preview' };
    }
    return { ok: false, preview: true, message: 'Ação indisponível no GitHub Preview.' };
  }

  window.MobilizaProGithubPreviewApi = { request: request, contracts: contracts, documents: documents, permissions: permissions };

  window.addEventListener('load', function () {
    var el = document.createElement('div');
    el.style.cssText = 'position:fixed;left:14px;bottom:12px;z-index:99999;padding:7px 11px;border-radius:999px;border:1px solid rgba(59,130,246,.45);background:rgba(15,23,42,.80);backdrop-filter:blur(8px);color:#dbeafe;font:800 11px/1.2 system-ui,Segoe UI,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);';
    el.textContent = 'GitHub Pages Preview · sem MySQL';
    el.title = 'Produção: subir na Hostinger com PHP/MySQL e executar /database/upgrade.php.';
    document.body.appendChild(el);
  });
})();
