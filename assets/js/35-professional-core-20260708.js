// ============================================================
// MobilizaPRO 1.22 - Professional Core
// Referências funcionais: ERP/SGC/ATS/BI, sem cópia de sistema proprietário.
// Entrega: filtros globais no dashboard, módulos Contratos/Documentos/Auditoria,
// exposição segura de estado para patches e cockpit de governança.
// ============================================================
(function () {
  'use strict';

  var VERSION = '1.22 Professional Core';
  var FILTER_KEY = 'mobilizapro-professional-filters-v122';
  var installed = false;

  function esc(value) {
    if (typeof escapeHtml === 'function') return escapeHtml(value == null ? '' : value);
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (s) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
    });
  }

  function clean(value) { return String(value == null ? '' : value).trim(); }
  function upper(value) { return clean(value).toUpperCase(); }
  function digits(value) { return String(value == null ? '' : value).replace(/\D+/g, ''); }
  function arr(value) { return Array.isArray(value) ? value : []; }
  function uniq(list) { return Array.from(new Set(list.filter(Boolean))).sort(function (a, b) { return a.localeCompare(b, 'pt-BR'); }); }
  function today() { return new Date().toISOString().slice(0, 10); }

  function candidates() { try { return arr(CANDIDATES); } catch (e) { return arr(window.CANDIDATES); } }
  function solicitations() { try { return arr(SOLICITATIONS); } catch (e) { return arr(window.SOLICITATIONS); } }

  function exposeGlobalState() {
    try {
      if (!Object.getOwnPropertyDescriptor(window, 'CANDIDATES')) {
        Object.defineProperty(window, 'CANDIDATES', {
          configurable: true,
          get: function () { try { return CANDIDATES; } catch (e) { return []; } },
          set: function (value) { try { CANDIDATES = arr(value); } catch (e) {} }
        });
      }
      if (!Object.getOwnPropertyDescriptor(window, 'SOLICITATIONS')) {
        Object.defineProperty(window, 'SOLICITATIONS', {
          configurable: true,
          get: function () { try { return SOLICITATIONS; } catch (e) { return []; } },
          set: function (value) { try { SOLICITATIONS = arr(value); } catch (e) {} }
        });
      }
    } catch (e) {}
  }

  function readFilters() {
    try {
      var data = JSON.parse(localStorage.getItem(FILTER_KEY) || '{}');
      return Object.assign({ obra: '', func: '', recruiter: '', status: '', from: '', to: '' }, data || {});
    } catch (e) {
      return { obra: '', func: '', recruiter: '', status: '', from: '', to: '' };
    }
  }

  function writeFilters(filters) {
    try { localStorage.setItem(FILTER_KEY, JSON.stringify(filters || {})); } catch (e) {}
  }

  function dateInRange(value, filters) {
    value = clean(value);
    if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return !(filters.from || filters.to);
    if (filters.from && value < filters.from) return false;
    if (filters.to && value > filters.to) return false;
    return true;
  }

  function candidateDateMatch(candidate, filters) {
    if (!filters.from && !filters.to) return true;
    return [candidate.recruited, candidate.aso_planned, candidate.aso, candidate.admission_planned, candidate.admitted, candidate.training_start_real, candidate.training_end_real, candidate.badge_real_date]
      .some(function (d) { return dateInRange(d, filters); });
  }

  function solicitationDateMatch(item, filters) {
    if (!filters.from && !filters.to) return true;
    return dateInRange(item.date || item.data_solicitacao, filters);
  }

  function candidateStatus(candidate) {
    if (candidate.declined_date) return 'declinado';
    if (candidate.badge_real_date || candidate.badge_ok) return 'liberado';
    if (candidate.admitted) return 'mobilizado';
    if (candidate.aso && !candidate.admitted) return 'admissao_pendente';
    if (!candidate.aso) return 'aso_pendente';
    return 'recrutamento';
  }

  function matchesCandidate(candidate, filters) {
    var obra = upper(candidate.digital_obra || candidate.digitalObra || candidate.obra_digital);
    var func = upper(candidate.func);
    var recruiter = upper(candidate.recruiter_name || candidate.recruited_by_name || candidate.recrutador_nome || 'NAO REGISTRADO');
    if (filters.obra && obra !== upper(filters.obra)) return false;
    if (filters.func && func !== upper(filters.func)) return false;
    if (filters.recruiter && recruiter !== upper(filters.recruiter)) return false;
    if (filters.status && candidateStatus(candidate) !== filters.status) return false;
    if (!candidateDateMatch(candidate, filters)) return false;
    return true;
  }

  function matchesSolicitation(item, filters) {
    var obra = upper(item.digital_obra || item.digitalObra || item.obra_digital);
    var func = upper(item.func);
    if (filters.obra && obra !== upper(filters.obra)) return false;
    if (filters.func && func !== upper(filters.func)) return false;
    if (!solicitationDateMatch(item, filters)) return false;
    return true;
  }

  function activeFiltersCount(filters) {
    return Object.keys(filters || {}).filter(function (key) { return !!clean(filters[key]); }).length;
  }

  function filteredCandidates() {
    var filters = readFilters();
    return candidates().filter(function (candidate) { return matchesCandidate(candidate || {}, filters); });
  }

  function filteredSolicitations() {
    var filters = readFilters();
    return solicitations().filter(function (item) { return matchesSolicitation(item || {}, filters); });
  }

  function option(value, label, current) {
    return '<option value="' + esc(value) + '"' + (String(value) === String(current || '') ? ' selected' : '') + '>' + esc(label || value) + '</option>';
  }

  function renderDashboardFilters(container) {
    if (!container) return;
    var root = container.querySelector('.space-y-6');
    if (!root) return;
    var previous = document.getElementById('mobi-pro-dashboard-filters');
    if (previous) previous.remove();

    var filters = readFilters();
    var allCandidates = candidates();
    var allSolicitations = solicitations();
    var obras = uniq(allCandidates.map(function (c) { return upper(c.digital_obra || c.digitalObra || c.obra_digital); })
      .concat(allSolicitations.map(function (s) { return upper(s.digital_obra || s.digitalObra || s.obra_digital); })));
    var funcs = uniq(allCandidates.map(function (c) { return upper(c.func); })
      .concat(allSolicitations.map(function (s) { return upper(s.func); })));
    var recruiters = uniq(allCandidates.map(function (c) { return upper(c.recruiter_name || c.recruited_by_name || c.recrutador_nome || 'NAO REGISTRADO'); }));
    var count = activeFiltersCount(filters);

    var panel = document.createElement('div');
    panel.id = 'mobi-pro-dashboard-filters';
    panel.className = 'mobi-pro-shell mobi-pro-hero rounded-2xl p-5';
    panel.innerHTML = '' +
      '<div class="relative z-[1] flex flex-col xl:flex-row xl:items-end justify-between gap-4 mb-4">' +
        '<div>' +
          '<span class="mobi-pro-chip"><span class="material-symbols-outlined text-sm">tune</span> Filtros globais</span>' +
          '<h4 class="text-sm font-black mt-3">Painel executivo filtrável</h4>' +
          '<p class="text-xs text-muted mt-1">Os indicadores, funil, gargalos, vagas e rankings abaixo passam a responder aos filtros selecionados.</p>' +
        '</div>' +
        '<div class="flex flex-wrap gap-2">' +
          '<span class="badge bg-primary/10 text-primary border-primary/20">' + count + ' filtro(s) ativo(s)</span>' +
          '<button type="button" class="btn btn-ghost text-xs border border-outline-variant" data-mobi-pro-reset><span class="material-symbols-outlined text-sm">filter_alt_off</span> Limpar</button>' +
        '</div>' +
      '</div>' +
      '<div class="relative z-[1] mobi-pro-filter-grid">' +
        '<label><span class="mobi-pro-label">Nº Obra / contrato</span><select class="mobi-pro-input" data-mobi-pro-filter="obra">' + option('', 'Todas as obras', filters.obra) + obras.map(function (x) { return option(x, x, filters.obra); }).join('') + '</select></label>' +
        '<label><span class="mobi-pro-label">Função</span><select class="mobi-pro-input" data-mobi-pro-filter="func">' + option('', 'Todas as funções', filters.func) + funcs.map(function (x) { return option(x, x, filters.func); }).join('') + '</select></label>' +
        '<label><span class="mobi-pro-label">Recrutador</span><select class="mobi-pro-input" data-mobi-pro-filter="recruiter">' + option('', 'Todos os recrutadores', filters.recruiter) + recruiters.map(function (x) { return option(x, x, filters.recruiter); }).join('') + '</select></label>' +
        '<label><span class="mobi-pro-label">Status</span><select class="mobi-pro-input" data-mobi-pro-filter="status">' +
          option('', 'Todos', filters.status) +
          option('aso_pendente', 'ASO pendente', filters.status) +
          option('admissao_pendente', 'Admissão pendente', filters.status) +
          option('mobilizado', 'Mobilizado', filters.status) +
          option('liberado', 'Liberado', filters.status) +
          option('declinado', 'Declinado', filters.status) +
        '</select></label>' +
        '<label><span class="mobi-pro-label">De</span><input type="date" class="mobi-pro-input" data-mobi-pro-filter="from" value="' + esc(filters.from) + '"></label>' +
        '<label><span class="mobi-pro-label">Até</span><input type="date" class="mobi-pro-input" data-mobi-pro-filter="to" value="' + esc(filters.to) + '"></label>' +
      '</div>';

    root.insertBefore(panel, root.children[1] || null);
    panel.querySelectorAll('[data-mobi-pro-filter]').forEach(function (field) {
      field.addEventListener('change', function () {
        var next = readFilters();
        next[field.getAttribute('data-mobi-pro-filter')] = field.value;
        writeFilters(next);
        try { renderDashboard(); } catch (e) {}
      });
    });
    var reset = panel.querySelector('[data-mobi-pro-reset]');
    if (reset) reset.addEventListener('click', function () {
      writeFilters({ obra: '', func: '', recruiter: '', status: '', from: '', to: '' });
      try { renderDashboard(); } catch (e) {}
    });
  }

  function summarizeGovernance(list) {
    var duplicateCpf = Object.create(null);
    list.forEach(function (c) { var cpf = digits(c.cpf).slice(0, 11); if (cpf) duplicateCpf[cpf] = (duplicateCpf[cpf] || 0) + 1; });
    return {
      semRecrutador: list.filter(function (c) { return !clean(c.recruiter_name || c.recruited_by_name || c.recrutador_nome); }).length,
      semRm: list.filter(function (c) { return !clean(c.rm); }).length,
      semObra: list.filter(function (c) { return !clean(c.digital_obra || c.digitalObra || c.obra_digital); }).length,
      cpfDuplicado: Object.keys(duplicateCpf).filter(function (cpf) { return duplicateCpf[cpf] > 1; }).length
    };
  }

  function recruiterRanking(list) {
    var map = Object.create(null);
    list.forEach(function (c) {
      var name = upper(c.recruiter_name || c.recruited_by_name || c.recrutador_nome || 'NAO REGISTRADO');
      if (!map[name]) map[name] = { name: name, total: 0, aso: 0, admitidos: 0, liberados: 0 };
      map[name].total += 1;
      if (c.aso) map[name].aso += 1;
      if (c.admitted) map[name].admitidos += 1;
      if (c.badge_real_date || c.badge_ok) map[name].liberados += 1;
    });
    return Object.keys(map).map(function (key) { return map[key]; }).sort(function (a, b) { return b.total - a.total || a.name.localeCompare(b.name, 'pt-BR'); }).slice(0, 8);
  }

  function injectProfessionalPanels(container) {
    if (!container || document.getElementById('mobi-pro-governance-panel')) return;
    var root = container.querySelector('.space-y-6');
    if (!root) return;
    var list = filteredCandidates().filter(function (c) { return !c.declined_date; });
    var gov = summarizeGovernance(list);
    var rank = recruiterRanking(list);
    var panel = document.createElement('div');
    panel.id = 'mobi-pro-governance-panel';
    panel.className = 'grid grid-cols-1 xl:grid-cols-3 gap-6';
    panel.innerHTML = '' +
      '<div class="mobi-pro-shell rounded-2xl p-6 xl:col-span-2">' +
        '<div class="flex items-center justify-between gap-3 mb-5">' +
          '<div><h4 class="text-sm font-black">Produtividade por recrutador</h4><p class="text-xs text-muted">Origem registrada no candidato e preservada no MySQL.</p></div>' +
          '<span class="mobi-pro-chip"><span class="material-symbols-outlined text-sm">person_check</span> ATS</span>' +
        '</div>' +
        '<div class="overflow-auto"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Recrutador</th><th class="text-center">Total</th><th class="text-center">ASO</th><th class="text-center">Admitidos</th><th class="text-center">Liberados</th><th class="text-right">Conversão</th></tr></thead><tbody>' +
          (rank.length ? rank.map(function (r) {
            var conv = r.total ? Math.round((r.liberados / r.total) * 100) : 0;
            return '<tr><td class="font-bold text-on-surface">' + esc(r.name) + '</td><td class="text-center font-mono">' + r.total + '</td><td class="text-center font-mono">' + r.aso + '</td><td class="text-center font-mono">' + r.admitidos + '</td><td class="text-center font-mono">' + r.liberados + '</td><td class="text-right font-mono text-primary font-black">' + conv + '%</td></tr>';
          }).join('') : '<tr><td colspan="6" class="text-center text-muted py-8">Nenhum candidato no filtro atual.</td></tr>') +
        '</tbody></table></div>' +
      '</div>' +
      '<div class="mobi-pro-shell rounded-2xl p-6">' +
        '<div class="flex items-center justify-between gap-3 mb-5"><div><h4 class="text-sm font-black">Governança</h4><p class="text-xs text-muted">Pontos de qualidade de base.</p></div><span class="material-symbols-outlined text-primary">admin_panel_settings</span></div>' +
        '<div class="grid grid-cols-2 gap-3">' +
          statBox('Sem recrutador', gov.semRecrutador) +
          statBox('Sem RM', gov.semRm) +
          statBox('Sem obra', gov.semObra) +
          statBox('CPF duplicado', gov.cpfDuplicado) +
        '</div>' +
        '<button type="button" onclick="selectPage(\'auditoria\')" class="btn btn-ghost text-xs border border-outline-variant mt-4 w-full"><span class="material-symbols-outlined text-sm">history</span> Ver auditoria</button>' +
      '</div>';
    root.insertBefore(panel, root.children[3] || null);
  }

  function statBox(label, value) {
    return '<div class="mobi-pro-stat"><div class="mobi-pro-stat-value">' + value + '</div><div class="text-[10px] text-muted font-black uppercase tracking-widest mt-2">' + esc(label) + '</div></div>';
  }

  function installDashboardWrapper() {
    try {
      if (typeof getDashboardMetrics === 'function' && !window.__mobiProMetrics122) {
        var originalMetrics = getDashboardMetrics;
        window.__mobiProMetrics122 = originalMetrics;
        window.getDashboardMetrics = function () {
          var filters = readFilters();
          if (!activeFiltersCount(filters)) return originalMetrics.apply(this, arguments);
          var originalCandidates = CANDIDATES;
          var originalSolicitations = SOLICITATIONS;
          try {
            CANDIDATES = originalCandidates.filter(function (c) { return matchesCandidate(c || {}, filters); });
            SOLICITATIONS = originalSolicitations.filter(function (s) { return matchesSolicitation(s || {}, filters); });
            return originalMetrics.apply(this, arguments);
          } finally {
            CANDIDATES = originalCandidates;
            SOLICITATIONS = originalSolicitations;
          }
        };
        try { getDashboardMetrics = window.getDashboardMetrics; } catch (e) {}
      }
      if (typeof renderDashboard === 'function' && !window.__mobiProRenderDashboard122) {
        var originalRender = renderDashboard;
        window.__mobiProRenderDashboard122 = originalRender;
        window.renderDashboard = function () {
          originalRender.apply(this, arguments);
          var container = document.getElementById('page-dashboard');
          renderDashboardFilters(container);
          injectProfessionalPanels(container);
        };
        try { renderDashboard = window.renderDashboard; } catch (e) {}
      }
    } catch (e) {}
  }

  function ensurePage(page) {
    var id = 'page-' + page;
    var node = document.getElementById(id);
    if (node) return node;
    var pages = document.getElementById('content-pages');
    if (!pages) return null;
    node = document.createElement('div');
    node.id = id;
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
    a.innerHTML = '<span class="material-symbols-outlined text-xl">' + icon + '</span> ' + esc(label) + '<span class="mobi-pro-nav-badge">PRO</span>';
    a.addEventListener('click', function (event) { event.preventDefault(); selectPage(page); });
    nav.appendChild(a);
  }

  function installIdentity() {
    var top = document.querySelector('header .flex.items-center.gap-6');
    if (top && !document.getElementById('mobi-pro-identity')) {
      var div = document.createElement('div');
      div.id = 'mobi-pro-identity';
      div.innerHTML = '<span class="mobi-pro-chip"><span class="material-symbols-outlined text-sm">workspace_premium</span> Professional Core</span>';
      top.insertBefore(div, top.firstChild);
    }
    var foot = document.querySelector('aside .p-4.border-t');
    if (foot && !foot.querySelector('[data-mobi-pro-version]')) {
      var p = document.createElement('p');
      p.setAttribute('data-mobi-pro-version', '1');
      p.className = 'mt-2 text-[10px] text-primary font-black uppercase tracking-widest';
      p.textContent = VERSION;
      foot.appendChild(p);
    }
  }

  function vacancyRows() {
    try { return getVacancySummary().rows || []; } catch (e) { return []; }
  }

  function renderContratos() {
    var node = ensurePage('contratos');
    if (!node) return;
    var rows = vacancyRows();
    var map = Object.create(null);
    rows.forEach(function (row) {
      var key = upper(row.digital_obra || 'SEM OBRA');
      if (!map[key]) map[key] = { obra: key, rms: Object.create(null), requested: 0, recruited: 0, open: 0, funcs: Object.create(null) };
      map[key].rms[row.rm || '-'] = true;
      map[key].funcs[row.func || '-'] = true;
      map[key].requested += Number(row.requested || 0);
      map[key].recruited += Number(row.recruited || 0);
      map[key].open += Number(row.open || 0);
    });
    var contracts = Object.keys(map).map(function (key) { return map[key]; }).sort(function (a, b) { return b.open - a.open || a.obra.localeCompare(b.obra, 'pt-BR'); });
    var totalOpen = contracts.reduce(function (s, c) { return s + c.open; }, 0);
    node.innerHTML = '<div class="space-y-6 animate-up">' +
      hero('Contratos / Obras', 'Visão consolidada por Nº Obra, RM e função. Preparado para governança contratual e integração futura.', 'business_center') +
      '<div class="grid grid-cols-1 md:grid-cols-4 gap-4">' + statBox('Contratos/obras', contracts.length) + statBox('Vagas solicitadas', contracts.reduce(function(s,c){return s+c.requested;},0)) + statBox('Recrutados', contracts.reduce(function(s,c){return s+c.recruited;},0)) + statBox('Saldo aberto', totalOpen) + '</div>' +
      '<div class="mobi-pro-shell rounded-2xl overflow-hidden"><div class="table-scroll"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Nº Obra</th><th class="text-center">RMs</th><th class="text-center">Funções</th><th class="text-center">Solicitado</th><th class="text-center">Baixado</th><th class="text-center">Saldo</th><th class="text-right">Status</th></tr></thead><tbody>' +
        (contracts.length ? contracts.map(function (c) {
          var status = c.open > 0 ? '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Em aberto</span>' : '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Atendido</span>';
          return '<tr><td class="font-mono font-black text-primary">' + esc(c.obra || '-') + '</td><td class="text-center font-mono">' + Object.keys(c.rms).length + '</td><td class="text-center font-mono">' + Object.keys(c.funcs).length + '</td><td class="text-center font-mono">' + c.requested + '</td><td class="text-center font-mono">' + c.recruited + '</td><td class="text-center font-mono font-black ' + (c.open ? 'text-amber-400' : 'text-green-400') + '">' + c.open + '</td><td class="text-right">' + status + '</td></tr>';
        }).join('') : '<tr><td colspan="7" class="text-center text-muted py-10">Nenhuma solicitação ativa encontrada.</td></tr>') +
      '</tbody></table></div></div></div>';
  }

  function docStatus(candidate, type) {
    if (type === 'ASO') return candidate.aso ? 'APROVADO' : (candidate.aso_planned ? 'AGENDADO' : 'PENDENTE');
    if (type === 'ADMISSÃO') return candidate.admitted ? 'CONCLUÍDO' : (candidate.aso ? 'PENDENTE' : 'AGUARDANDO ASO');
    if (type === 'TREINAMENTO') {
      try { return hasCompletedRequiredTrainings(candidate) ? 'CONCLUÍDO' : 'PENDENTE'; } catch (e) { return candidate.training_end_real ? 'CONCLUÍDO' : 'PENDENTE'; }
    }
    if (type === 'CRACHÁ') return (candidate.badge_real_date || candidate.badge_ok) ? 'EMITIDO' : 'PENDENTE';
    return 'PENDENTE';
  }

  function renderDocumentos() {
    var node = ensurePage('documentos');
    if (!node) return;
    var docs = [];
    candidates().filter(function (c) { return !c.declined_date; }).forEach(function (c) {
      ['ASO', 'ADMISSÃO', 'TREINAMENTO', 'CRACHÁ'].forEach(function (type) { docs.push({ c: c, type: type, status: docStatus(c, type) }); });
    });
    var pend = docs.filter(function (d) { return !/APROVADO|CONCLUÍDO|EMITIDO/.test(d.status); }).length;
    node.innerHTML = '<div class="space-y-6 animate-up">' +
      hero('Documentos e Mobilização', 'Controle operacional de pendências por pessoa. A estrutura de banco já está preparada para anexos, validade e reprovação.', 'fact_check') +
      '<div class="grid grid-cols-1 md:grid-cols-4 gap-4">' + statBox('Itens controlados', docs.length) + statBox('Pendências', pend) + statBox('Pessoas ativas', candidates().filter(function(c){return !c.declined_date;}).length) + statBox('Conformidade', docs.length ? Math.round(((docs.length - pend) / docs.length) * 100) + '%' : '0%') + '</div>' +
      '<div class="mobi-pro-shell rounded-2xl overflow-hidden"><div class="table-scroll"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Pessoa</th><th>CPF</th><th>Função</th><th>Documento/etapa</th><th>Status</th><th>RM</th><th class="text-right">Obra</th></tr></thead><tbody>' +
        (docs.length ? docs.slice(0, 250).map(function (d) {
          var ok = /APROVADO|CONCLUÍDO|EMITIDO/.test(d.status);
          return '<tr><td class="font-bold text-on-surface">' + esc(d.c.name) + '</td><td class="font-mono text-xs">' + esc(d.c.cpf || '-') + '</td><td class="text-xs text-muted">' + esc(d.c.func || '-') + '</td><td class="font-bold">' + esc(d.type) + '</td><td><span class="badge ' + (ok ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20') + '">' + esc(d.status) + '</span></td><td class="font-mono">' + esc(d.c.rm || '-') + '</td><td class="text-right font-mono text-primary">' + esc(d.c.digital_obra || '-') + '</td></tr>';
        }).join('') : '<tr><td colspan="7" class="text-center text-muted py-10">Nenhum candidato ativo encontrado.</td></tr>') +
      '</tbody></table></div></div></div>';
  }

  function renderAuditoria() {
    var node = ensurePage('auditoria');
    if (!node) return;
    node.innerHTML = '<div class="space-y-6 animate-up">' + hero('Auditoria Operacional', 'Rastreabilidade de salvamentos, exclusões lógicas e alterações críticas.', 'history') + '<div id="mobi-pro-audit-table" class="mobi-pro-shell rounded-2xl p-8 text-center text-muted">Carregando auditoria...</div></div>';
    fetch('api/professional.php?action=audit&limit=80', { credentials: 'same-origin', headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        var rows = arr(json && json.audit);
        var target = document.getElementById('mobi-pro-audit-table');
        if (!target) return;
        target.className = 'mobi-pro-shell rounded-2xl overflow-hidden';
        target.innerHTML = '<div class="table-scroll"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Data</th><th>Tabela</th><th>Ação</th><th>Registro</th><th>Usuário</th><th class="text-right">Detalhe</th></tr></thead><tbody>' +
          (rows.length ? rows.map(function (r) {
            return '<tr><td class="font-mono text-xs">' + esc(r.criado_em || '-') + '</td><td class="font-bold">' + esc(r.tabela || '-') + '</td><td><span class="badge bg-primary/10 text-primary border-primary/20">' + esc(r.acao || '-') + '</span></td><td class="font-mono text-xs">' + esc(r.registro_chave || '-') + '</td><td class="text-xs">' + esc(r.usuario_nome || r.usuario_cpf || '-') + '</td><td class="text-right text-[10px] text-muted max-w-[320px] truncate" title="' + esc(r.detalhe || '') + '">' + esc(r.detalhe || '-') + '</td></tr>';
          }).join('') : '<tr><td colspan="6" class="text-center text-muted py-10">Nenhum registro de auditoria disponível para este perfil.</td></tr>') +
          '</tbody></table></div>';
      })
      .catch(function () {
        var target = document.getElementById('mobi-pro-audit-table');
        if (target) target.innerHTML = 'Não foi possível carregar a auditoria agora.';
      });
  }

  function hero(title, subtitle, icon) {
    return '<div class="mobi-pro-shell mobi-pro-hero rounded-2xl p-6"><div class="relative z-[1] flex items-start justify-between gap-4"><div><span class="mobi-pro-chip"><span class="material-symbols-outlined text-sm">' + icon + '</span> Professional Core</span><h3 class="font-display font-black text-2xl text-on-surface mt-3">' + esc(title) + '</h3><p class="text-xs text-muted mt-1 max-w-3xl">' + esc(subtitle) + '</p></div><span class="material-symbols-outlined text-primary text-4xl hidden sm:block">' + icon + '</span></div></div>';
  }

  function installPages() {
    ensurePage('contratos');
    ensurePage('documentos');
    ensurePage('auditoria');
    addNavItem('contratos', 'Contratos', 'business_center');
    addNavItem('documentos', 'Documentos', 'fact_check');
    addNavItem('auditoria', 'Auditoria', 'history');
    if (typeof renderCurrentPage === 'function' && !window.__mobiProRenderCurrent122) {
      var original = renderCurrentPage;
      window.__mobiProRenderCurrent122 = original;
      window.renderCurrentPage = function () {
        original.apply(this, arguments);
        try {
          if (currentPage === 'contratos') renderContratos();
          else if (currentPage === 'documentos') renderDocumentos();
          else if (currentPage === 'auditoria') renderAuditoria();
        } catch (e) {}
      };
      try { renderCurrentPage = window.renderCurrentPage; } catch (e) {}
    }
  }

  function install() {
    exposeGlobalState();
    installIdentity();
    installDashboardWrapper();
    installPages();
    installed = true;
    if (document.getElementById('page-dashboard') && typeof renderDashboard === 'function') {
      try { if (typeof currentPage !== 'undefined' && currentPage === 'dashboard') renderDashboard(); } catch (e) {}
    }
  }

  var timer = setInterval(function () {
    install();
    if (installed && typeof renderDashboard === 'function' && typeof renderCurrentPage === 'function') clearInterval(timer);
  }, 250);
  setTimeout(function () { clearInterval(timer); install(); }, 8000);

  window.MobilizaProProfessionalCore = {
    version: VERSION,
    filters: { read: readFilters, write: writeFilters, clear: function () { writeFilters({ obra: '', func: '', recruiter: '', status: '', from: '', to: '' }); } },
    filteredCandidates: filteredCandidates,
    filteredSolicitations: filteredSolicitations,
    renderContratos: renderContratos,
    renderDocumentos: renderDocumentos,
    renderAuditoria: renderAuditoria
  };
})();
