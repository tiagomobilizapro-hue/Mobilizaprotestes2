// ============================================================
// MobilizaPRO 1.24 - Banca Técnica Aplicada
// Reforço de governança: página de validação por 15 especialidades
// e edição persistida da matriz de permissões.
// ============================================================
(function () {
  'use strict';

  var API = 'api/professional.php';
  var state = { board: null, permissions: null, user: null };

  function esc(value) {
    if (typeof escapeHtml === 'function') return escapeHtml(value == null ? '' : value);
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (s) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s];
    });
  }
  function arr(v) { return Array.isArray(v) ? v : []; }
  function clean(v) { return String(v == null ? '' : v).trim(); }
  function csrf() { return window.MOBI_CSRF_TOKEN || (document.querySelector('meta[name="mobilizapro-csrf"]') || {}).content || ''; }

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
    var response = await fetch(API + '?action=' + encodeURIComponent(action) + '&_=' + Date.now(), options);
    var json = null;
    try { json = await response.json(); } catch (e) {}
    if (json && json.csrf) window.MOBI_CSRF_TOKEN = String(json.csrf);
    if (!json || !response.ok || json.ok === false) throw new Error((json && json.message) || 'Falha na comunicação com o servidor.');
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
    a.innerHTML = '<span class="material-symbols-outlined text-xl">' + esc(icon) + '</span> ' + esc(label) + '<span class="mobi-pro-nav-badge">v124</span>';
    a.addEventListener('click', function (event) { event.preventDefault(); if (typeof selectPage === 'function') selectPage(page); });
    nav.appendChild(a);
  }

  function hero(title, subtitle, icon) {
    return '<div class="mobi-pro-shell mobi-pro-hero rounded-2xl p-6"><div class="relative z-[1] flex items-start justify-between gap-4"><div>' +
      '<span class="mobi-pro-chip"><span class="material-symbols-outlined text-sm">' + esc(icon) + '</span> v124 · Banca Técnica</span>' +
      '<h3 class="font-display font-black text-2xl text-on-surface mt-3">' + esc(title) + '</h3>' +
      '<p class="text-xs text-muted mt-1 max-w-4xl">' + esc(subtitle) + '</p>' +
      '</div><span class="material-symbols-outlined text-primary text-4xl hidden sm:block">' + esc(icon) + '</span></div></div>';
  }

  function statBox(label, value) {
    return '<div class="mobi-pro-stat"><div class="mobi-pro-stat-value">' + esc(value) + '</div><div class="text-[10px] text-muted font-black uppercase tracking-widest mt-2">' + esc(label) + '</div></div>';
  }

  function badge(status) {
    var ok = String(status || '').toUpperCase() === 'APROVADO';
    return '<span class="badge ' + (ok ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20') + '">' + esc(status || 'ATENÇÃO') + '</span>';
  }

  function renderBancaTecnica() {
    var node = ensurePage('banca_tecnica');
    if (!node) return;
    node.innerHTML = '<div class="space-y-6 animate-up">' + hero('Banca Técnica v124', 'Revisão estruturada por 15 especialidades, com evidências técnicas e pendências de homologação. Não representa banca humana externa.', 'verified') + '<div class="mobi-pro-shell rounded-2xl p-8 text-center text-muted">Carregando evidências do servidor...</div></div>';
    api('technical_board').then(function (json) {
      state.board = json.board || {};
      drawBancaTecnica(node);
    }).catch(function (error) {
      node.innerHTML = '<div class="space-y-6 animate-up">' + hero('Banca Técnica v124', 'Não foi possível carregar a validação técnica.', 'warning') + '<div class="mobi-pro-shell rounded-2xl p-8 text-center text-red-300">' + esc(error.message) + '</div></div>';
    });
  }

  function drawBancaTecnica(node) {
    var board = state.board || {};
    var rows = arr(board.items);
    node.innerHTML = '<div class="space-y-6 animate-up">' +
      hero('Banca Técnica v124', 'Matriz objetiva de arquitetura, banco, segurança, UX, BI, RH, mobilização, SGC, TOTVS, QA, multiusuário, performance, compliance, SaaS e implantação.', 'verified') +
      '<div class="grid grid-cols-1 md:grid-cols-4 gap-4">' + statBox('Especialidades', board.total || rows.length) + statBox('Aprovadas', board.approved || 0) + statBox('Score técnico', (board.score || 0) + '%') + statBox('Decisão', board.decision || '-') + '</div>' +
      '<div class="mobi-pro-shell rounded-2xl p-5 text-xs text-amber-200 border border-amber-500/20">' + esc(board.disclaimer || 'Revisão técnica estruturada. Exige homologação em ambiente real.') + '</div>' +
      '<div class="mobi-pro-shell rounded-2xl overflow-hidden"><div class="p-5 flex items-center justify-between"><h4 class="text-sm font-black">Parecer por especialidade</h4><button class="btn btn-ghost text-xs border border-outline-variant" data-export-board>CSV</button></div><div class="table-scroll"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Especialidade</th><th>Status</th><th class="text-left">Evidência</th><th class="text-left">Próximo passo</th></tr></thead><tbody>' +
      (rows.length ? rows.map(function (r) { return '<tr><td class="font-black text-on-surface">' + esc(r.area || '-') + '</td><td>' + badge(r.status) + '</td><td class="text-xs text-muted max-w-[460px]">' + esc(r.evidence || '-') + '</td><td class="text-xs text-muted max-w-[360px]">' + esc(r.next || '-') + '</td></tr>'; }).join('') : '<tr><td colspan="4" class="text-center text-muted py-10">Sem parecer técnico disponível.</td></tr>') +
      '</tbody></table></div></div></div>';
    var btn = node.querySelector('[data-export-board]');
    if (btn) btn.addEventListener('click', exportBoardCsv);
  }

  function exportBoardCsv() {
    var rows = [['area','status','evidencia','proximo_passo']].concat(arr(state.board && state.board.items).map(function (r) { return [r.area || '', r.status || '', r.evidence || '', r.next || '']; }));
    var csv = rows.map(function (row) { return row.map(function (cell) { return '"' + String(cell).replace(/"/g, '""') + '"'; }).join(';'); }).join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'mobilizapro-v124-banca-tecnica.csv'; a.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }

  function codeToFlags(code) {
    code = String(code || '');
    return { R: code.indexOf('R') >= 0, C: code.indexOf('C') >= 0, U: code.indexOf('U') >= 0, D: code.indexOf('D') >= 0 };
  }

  function renderPermissoesV124() {
    var node = ensurePage('permissoes');
    if (!node) return;
    node.innerHTML = '<div class="space-y-6 animate-up">' + hero('Usuários e Permissões', 'Matriz persistida no banco e aplicada nas APIs críticas de contratos e documentos.', 'admin_panel_settings') + '<div class="mobi-pro-shell rounded-2xl p-8 text-center text-muted">Carregando matriz de permissões...</div></div>';
    api('permissions').then(function (json) {
      state.permissions = json.permissions || {};
      state.user = json.user || {};
      drawPermissoesV124(node);
    }).catch(function (error) {
      node.innerHTML = '<div class="space-y-6 animate-up">' + hero('Usuários e Permissões', 'Não foi possível carregar permissões.', 'warning') + '<div class="mobi-pro-shell rounded-2xl p-8 text-center text-red-300">' + esc(error.message) + '</div></div>';
    });
  }

  function drawPermissoesV124(node) {
    var perms = state.permissions || {};
    var modules = ['dashboard','vagas','candidatos','mobilizacao','documentos','contratos','auditoria','usuarios','relatorios','banca_tecnica'];
    var profiles = Object.keys(perms);
    node.innerHTML = '<div class="space-y-6 animate-up">' +
      hero('Usuários e Permissões', 'Edição operacional da matriz: R visualizar, C criar, U atualizar e D inativar. Mudanças gravam no MySQL e entram em vigor nas APIs da v124.', 'admin_panel_settings') +
      '<div class="grid grid-cols-1 md:grid-cols-3 gap-4">' + statBox('Perfil atual', state.user && state.user.role || '-') + statBox('Usuário', state.user && state.user.name || '-') + statBox('Módulos controlados', modules.length) + '</div>' +
      '<div class="mobi-pro-shell rounded-2xl overflow-hidden"><div class="table-scroll"><table class="w-full mobi-pro-table text-sm"><thead><tr><th class="text-left">Perfil</th>' + modules.map(function (m) { return '<th>' + esc(m) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      profiles.map(function (profile) {
        var row = perms[profile] || {};
        return '<tr><td><div class="font-black text-on-surface">' + esc(profile) + '</div><div class="text-[10px] text-muted">' + esc(row.label || '') + '</div></td>' + modules.map(function (m) {
          var flags = codeToFlags(row[m]);
          return '<td class="align-top"><div class="flex flex-col gap-1 text-[10px] min-w-[76px]" data-perm-cell data-profile="' + esc(profile) + '" data-module="' + esc(m) + '">' +
            ['R','C','U','D'].map(function (flag) { return '<label class="flex items-center gap-1"><input type="checkbox" data-flag="' + flag + '" ' + (flags[flag] ? 'checked' : '') + '> ' + flag + '</label>'; }).join('') +
            '<button class="btn btn-ghost border border-outline-variant text-[10px] py-1 mt-1" data-save-perm>Salvar</button></div></td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div></div>' +
      '<div id="mobi-v124-permission-msg" class="mobi-pro-shell rounded-2xl p-4 text-xs text-muted">Somente perfil com permissão de usuários/editar consegue salvar alterações.</div></div>';
    node.querySelectorAll('[data-save-perm]').forEach(function (button) {
      button.addEventListener('click', function () { savePermission(button.closest('[data-perm-cell]')); });
    });
  }

  function savePermission(cell) {
    if (!cell) return;
    var data = {
      perfil: cell.getAttribute('data-profile') || '',
      modulo: cell.getAttribute('data-module') || '',
      pode_visualizar: false,
      pode_criar: false,
      pode_editar: false,
      pode_excluir: false
    };
    cell.querySelectorAll('input[type="checkbox"]').forEach(function (input) {
      var flag = input.getAttribute('data-flag');
      if (flag === 'R') data.pode_visualizar = input.checked;
      if (flag === 'C') data.pode_criar = input.checked;
      if (flag === 'U') data.pode_editar = input.checked;
      if (flag === 'D') data.pode_excluir = input.checked;
    });
    var msg = document.getElementById('mobi-v124-permission-msg');
    if (msg) msg.textContent = 'Salvando permissão de ' + data.perfil + ' / ' + data.modulo + '...';
    api('save_permission', data, 'POST').then(function (json) {
      state.permissions = json.permissions || state.permissions;
      if (msg) msg.textContent = 'Permissão atualizada no MySQL e registrada em auditoria.';
    }).catch(function (error) {
      if (msg) msg.textContent = error.message;
    });
  }

  function install() {
    ensurePage('banca_tecnica');
    addNavItem('banca_tecnica', 'Banca Técnica', 'verified');
    var foot = document.querySelector('aside .p-4.border-t');
    if (foot) {
      var old = foot.querySelector('[data-mobi-pro-version]');
      if (old) old.textContent = '1.24 Banca Técnica Aplicada';
    }
    if (typeof renderCurrentPage === 'function' && !window.__mobiProRenderCurrent124) {
      var original = renderCurrentPage;
      window.__mobiProRenderCurrent124 = original;
      window.renderCurrentPage = function () {
        original.apply(this, arguments);
        try {
          if (typeof currentPage !== 'undefined' && currentPage === 'banca_tecnica') renderBancaTecnica();
          else if (typeof currentPage !== 'undefined' && currentPage === 'permissoes') renderPermissoesV124();
        } catch (e) { console.warn('MobilizaPRO v124:', e); }
      };
      try { renderCurrentPage = window.renderCurrentPage; } catch (e) {}
    }
  }

  var timer = setInterval(function () {
    install();
    if (typeof renderCurrentPage === 'function') clearInterval(timer);
  }, 250);
  setTimeout(function () { clearInterval(timer); install(); }, 8000);

  window.MobilizaProBancaTecnica = {
    version: '1.24 Banca Técnica Aplicada',
    renderBancaTecnica: renderBancaTecnica,
    renderPermissoesV124: renderPermissoesV124,
    api: api,
    state: state
  };
})();
