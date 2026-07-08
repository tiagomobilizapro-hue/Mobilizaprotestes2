// ============================================================
// MOBILIZAPRO HOSTINGER MYSQL AUTH - versão produção
// Substitui autenticação localStorage por PHP + MySQL.
// ============================================================
(function () {
  'use strict';

  const API = 'api/auth.php';
  const ROLE_LABELS = window.MOBI_ROLE_LABELS || {
    OBRA: 'Obra',
    OPERACIONAL_RECRUTAMENTO: 'Operacional - Recrutamento',
    MOBILIZACAO: 'Mobilização',
    ALOJAMENTO: 'Alojamento',
    GERENCIAL: 'Gerencial'
  };
  const ROLE_PERMISSIONS = window.MOBI_ROLE_PERMISSIONS || {
    OBRA: [],
    OPERACIONAL_RECRUTAMENTO: ['dashboard', 'solicitacao', 'vagas', 'pipeline', 'recrutamento'],
    MOBILIZACAO: ['mobilizacao', 'cracha', 'treinamentos'],
    ALOJAMENTO: ['alojamento'],
    GERENCIAL: ['*']
  };

  let currentUser = null;
  let usersCache = [];

  function cpf(value) { return String(value || '').replace(/\D/g, '').slice(0, 11); }
  function fmtCpf(value) {
    const v = cpf(value);
    return v.length === 11 ? v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : v;
  }
  function esc(value) {
    return String(value ?? '').replace(/[&<>'"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[s]));
  }
  async function request(action, data, method) {
    const isPost = !!(method || data);

    // Hostinger/PHP usa sessão de servidor para validar CSRF.
    // Na primeira tentativa de login a página está estática e pode ainda não ter token.
    // Buscamos um token antes de qualquer POST, sem alterar layout nem remover a proteção.
    if (isPost && !window.MOBI_CSRF_TOKEN && action !== 'status') {
      try { await request('status', null, 'GET'); } catch (e) {}
    }

    const opts = { credentials: 'same-origin', headers: {} };
    if (window.MOBI_CSRF_TOKEN) opts.headers['X-Mobiliza-CSRF'] = window.MOBI_CSRF_TOKEN;
    if (isPost) {
      opts.method = method || 'POST';
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(data || {});
    }
    const res = await fetch(`${API}?action=${encodeURIComponent(action)}`, opts);
    let json = null;
    try { json = await res.json(); } catch (e) {}
    if (json && json.csrf) window.MOBI_CSRF_TOKEN = String(json.csrf);
    if (!json) throw new Error('Resposta inválida do servidor.');
    if (!res.ok || json.ok === false) {
      if (json.needs_setup) throw new Error('Banco não configurado. Edite config/config.php e acesse /database/upgrade.php.');
      throw new Error(json.message || 'Falha na operação.');
    }
    return json;
  }

  async function refreshMe() {
    try {
      const r = await request('me');
      currentUser = r.user || null;
      try {
        // Sessão oficial fica no cookie PHP/MySQL. Não persistir CPF em localStorage.
        window.MOBI_RUNTIME_ACCESS_CPF = currentUser ? currentUser.cpf : '';
      } catch (e) {}
    } catch (e) {
      currentUser = null;
      if (String(e.message || '').includes('Banco não configurado')) renderSetupNeeded(e.message);
    }
    return currentUser;
  }

  function getCurrentAccessUser() { return currentUser; }
  function isGerencial() { return !!(currentUser && currentUser.role === 'GERENCIAL'); }
  function normalizePermission(page) {
    return String(page || window.currentPage || '').toLowerCase().trim();
  }
  function canEditPage(page) {
    const u = currentUser;
    if (!u) return false;
    const perms = ROLE_PERMISSIONS[u.role] || [];
    const key = normalizePermission(page);
    // Base RBAC 1.0 preparada para o 2.0: permissões centralizadas por perfil.
    // Operacional - Recrutamento pode atuar em Vagas para usar a ação Recrutar,
    // mas as ações administrativas continuam bloqueadas por funções específicas.
    return perms.includes('*') || perms.includes(key);
  }
  function hasPermission(permission) {
    const u = currentUser;
    if (!u) return false;
    const perms = ROLE_PERMISSIONS[u.role] || [];
    const key = normalizePermission(permission);
    if (perms.includes('*') || perms.includes(key)) return true;
    if (key === 'vagas.recrutar' || key === 'recrutamento.recrutar') {
      return u.role === 'OPERACIONAL_RECRUTAMENTO' || u.role === 'GERENCIAL';
    }
    return false;
  }
  function accessDenied() { alert('Acesso somente para edição autorizada. Perfil atual: ' + (ROLE_LABELS[currentUser?.role] || 'Sem login') + '.'); return false; }
  function updateAccessBadge() {
    try {
      const label = currentUser ? `${currentUser.name}` : 'Sem login';
      const fullLabel = currentUser ? `${currentUser.name} · ${ROLE_LABELS[currentUser.role] || currentUser.role}` : 'Sem login';
      const badge = document.getElementById('access-user-badge') || document.querySelector('[data-access-badge]');
      if (badge) badge.textContent = fullLabel;
      const chip = document.getElementById('access-session-chip');
      if (chip) chip.innerHTML = `<span class="material-symbols-outlined text-sm">${currentUser ? 'verified_user' : 'lock'}</span>${esc(label)}`;
    } catch (e) {}
    if (typeof mproApplyLoginVisibility === 'function') setTimeout(mproApplyLoginVisibility, 0);
  }

  function renderSetupNeeded(message) {
    const container = document.getElementById('page-acesso');
    if (!container) return;
    container.innerHTML = `<div class="max-w-xl mx-auto animate-up"><div class="card rounded-3xl p-7 border-l-4 border-l-primary"><h3 class="font-display font-black text-2xl mb-2">Instalação pendente</h3><p class="text-sm text-muted mb-5">${esc(message)}</p><a class="btn btn-primary w-full" href="database/upgrade.php">Abrir instalação do banco MySQL</a></div></div>`;
  }

  function renderLogin() {
    const container = document.getElementById('page-acesso');
    if (!container) return;
    container.innerHTML = `<div class="max-w-xl mx-auto animate-up">
      <div class="card rounded-3xl p-7 border-l-4 border-l-primary">
        <div class="flex items-center gap-3 mb-6"><span class="material-symbols-outlined text-primary text-4xl">verified_user</span><div><h3 class="font-display font-black text-2xl">MobilizaPro Online</h3><p class="text-xs text-muted">Login conectado ao MySQL da Hostinger.</p></div></div>
        <div class="space-y-4">
          <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">CPF</label><input id="login-cpf" class="modal-input font-mono" inputmode="numeric" maxlength="14" placeholder="000.000.000-00" oninput="maskCpfInput && maskCpfInput(this)" autocomplete="username"></div>
          <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Senha</label><input id="login-password" type="password" class="modal-input" placeholder="SENHA DE ACESSO" onkeydown="if(event.key==='Enter') loginAccessUser()" autocomplete="current-password"></div>
          <button onclick="loginAccessUser()" class="btn btn-primary w-full"><span class="material-symbols-outlined text-sm">login</span> Entrar</button>
        </div>
      </div>
    </div>`;
    setTimeout(() => document.getElementById('login-cpf')?.focus(), 50);
  }

  async function loadUsers() {
    const r = await request('users');
    usersCache = r.users || [];
    return usersCache;
  }

  async function renderAcesso() {
    const container = document.getElementById('page-acesso');
    if (!container) return;
    if (!currentUser) { renderLogin(); return; }
    let users = usersCache;
    if (isGerencial()) {
      try { users = await loadUsers(); } catch (e) { alert(e.message); users = []; }
    }
    const roleCards = Object.keys(ROLE_LABELS).map(role => `<div class="card p-4 rounded-2xl access-profile-card ${currentUser.role === role ? 'bg-primary/10' : ''}"><p class="text-[10px] font-black uppercase text-primary tracking-widest">${esc(ROLE_LABELS[role])}</p><div class="mt-3 flex flex-wrap gap-2"><span class="permission-pill">${role === 'GERENCIAL' ? 'Administração total' : 'Permissão por módulo'}</span></div></div>`).join('');
    const rows = users.map(u => `<tr>
      <td class="px-4 py-3 font-bold">${esc(u.name)}</td><td class="px-4 py-3 font-mono">${fmtCpf(u.cpf)}</td><td class="px-4 py-3">${esc(u.email)}</td><td class="px-4 py-3"><span class="badge bg-primary/10 text-primary">${esc(ROLE_LABELS[u.role] || u.role)}</span>${u.active ? '' : ' <span class="badge bg-error/10 text-error">Inativo</span>'}</td>
      <td class="px-4 py-3 text-right"><div class="flex justify-end gap-2"><button onclick="fillAccessUserForm('${u.cpf}')" class="btn btn-ghost text-xs border border-outline-variant">Usar no formulário</button><button onclick="removeAccessUser('${u.cpf}')" class="btn btn-danger-ghost text-xs border border-error/20" ${u.cpf === '00000000000' ? 'disabled' : ''}>Remover</button></div></td>
    </tr>`).join('');
    container.innerHTML = `<div class="space-y-6 animate-up">
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4"><div><h3 class="font-display font-black text-2xl text-on-surface">Usuários Online · MySQL</h3><p class="text-xs text-muted">Os usuários cadastrados aqui acessam de qualquer computador ou celular.</p></div><button onclick="logoutAccessUser()" class="btn btn-ghost border border-outline-variant text-xs"><span class="material-symbols-outlined text-sm">logout</span> Sair</button></div>
      <div class="grid grid-cols-1 xl:grid-cols-5 gap-4">${roleCards}</div>
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="card p-5 rounded-2xl xl:col-span-1"><h4 class="font-display font-bold text-lg mb-1">Usuário logado</h4><p class="text-xs text-muted mb-4">Sessão protegida no servidor.</p><div class="space-y-2 text-sm"><p><b>Nome:</b> ${esc(currentUser.name)}</p><p><b>CPF:</b> ${fmtCpf(currentUser.cpf)}</p><p><b>Email:</b> ${esc(currentUser.email)}</p><p><b>Perfil:</b> ${esc(ROLE_LABELS[currentUser.role] || currentUser.role)}</p></div></div>
        <div class="card p-5 rounded-2xl xl:col-span-2 ${!isGerencial() ? 'opacity-60' : ''}"><h4 class="font-display font-bold text-lg mb-1">Cadastrar / Atualizar Usuário</h4><p class="text-xs text-muted mb-4">Gravação direta no banco MySQL da Hostinger.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-3"><div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Nome</label><input id="new-user-name" class="modal-input" ${!isGerencial()?'disabled':''}></div><div><label class="text-[10px] font-bold uppercase text-muted block mb-1">CPF</label><input id="new-user-cpf" class="modal-input font-mono" maxlength="14" oninput="maskCpfInput && maskCpfInput(this)" ${!isGerencial()?'disabled':''}></div><div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Email</label><input id="new-user-email" class="modal-input" ${!isGerencial()?'disabled':''}></div><div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Perfil</label><select id="new-user-role" class="modal-input" ${!isGerencial()?'disabled':''}>${Object.keys(ROLE_LABELS).map(r=>`<option value="${r}">${esc(ROLE_LABELS[r])}</option>`).join('')}</select></div><div class="md:col-span-2"><label class="text-[10px] font-bold uppercase text-muted block mb-1">Senha</label><input id="new-user-password" type="password" class="modal-input" placeholder="Obrigatória para novo usuário; opcional para atualizar" ${!isGerencial()?'disabled':''}></div></div><button onclick="createAccessUser()" class="btn btn-primary w-full mt-4" ${!isGerencial()?'disabled':''}>Salvar usuário online</button></div>
      </div>
      <div class="card rounded-2xl overflow-hidden"><div class="p-5 border-b border-outline-variant"><h4 class="font-display font-bold text-lg">Usuários cadastrados no servidor</h4></div><div class="overflow-auto"><table class="w-full text-xs"><thead><tr class="bg-surface-container-low text-muted uppercase"><th class="px-4 py-3 text-left">Nome</th><th class="px-4 py-3 text-left">CPF</th><th class="px-4 py-3 text-left">Email</th><th class="px-4 py-3 text-left">Perfil</th><th class="px-4 py-3 text-right">Ações</th></tr></thead><tbody>${rows}</tbody></table></div></div>
    </div>`;
  }

  async function loginAccessUser() {
    const c = cpf(document.getElementById('login-cpf')?.value || '');
    const p = String(document.getElementById('login-password')?.value || '');
    try {
      const r = await request('login', { cpf: c, password: p });
      currentUser = r.user;
      updateAccessBadge();
      if (typeof selectPage === 'function') {
        selectPage('dashboard');
        if (typeof window.renderDashboard === 'function') setTimeout(() => window.renderDashboard(), 0);
      } else if (typeof renderCurrentPage === 'function') {
        renderCurrentPage();
      } else {
        renderAcesso();
      }
    } catch (e) { alert(e.message); }
  }
  async function logoutAccessUser() {
    try { await request('logout', {}, 'POST'); } catch (e) {}
    currentUser = null; usersCache = [];
    updateAccessBadge();
    if (typeof renderCurrentPage === 'function') renderCurrentPage(); else renderAcesso();
  }
  async function createAccessUser() {
    if (!isGerencial()) return accessDenied();
    const data = {
      name: document.getElementById('new-user-name')?.value || '',
      cpf: cpf(document.getElementById('new-user-cpf')?.value || ''),
      email: document.getElementById('new-user-email')?.value || '',
      role: document.getElementById('new-user-role')?.value || 'OBRA',
      password: document.getElementById('new-user-password')?.value || ''
    };
    try {
      await request('save_user', data);
      alert('Usuário salvo no servidor.');
      usersCache = [];
      await renderAcesso();
    } catch (e) { alert(e.message); }
  }
  async function removeAccessUser(rawCpf) {
    if (!isGerencial()) return accessDenied();
    const c = cpf(rawCpf);
    if (c === '00000000000') return alert('O administrador padrão não pode ser removido.');
    if (!confirm('Remover este usuário do banco online?')) return;
    try { await request('delete_user', { cpf: c }); usersCache = []; await renderAcesso(); } catch (e) { alert(e.message); }
  }
  function fillAccessUserForm(rawCpf) {
    if (!isGerencial()) return accessDenied();
    const u = usersCache.find(x => cpf(x.cpf) === cpf(rawCpf));
    if (!u) return alert('Usuário não encontrado.');
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
    set('new-user-name', u.name); set('new-user-cpf', fmtCpf(u.cpf)); set('new-user-email', u.email); set('new-user-role', u.role); set('new-user-password', '');
  }
  async function importLocalAccessUsers() {
    if (!isGerencial()) return accessDenied();
    let localUsers = [];
    try { localUsers = JSON.parse(localStorage.getItem('mobilizaprp-access-users-v1') || '[]'); } catch(e) {}
    if (!Array.isArray(localUsers) || !localUsers.length) return alert('Nenhum usuário local antigo encontrado neste navegador.');
    if (!confirm(`Migrar ${localUsers.length} usuário(s) locais para o MySQL?`)) return;
    try {
      const r = await request('import_local_users', { users: localUsers });
      alert(`${r.imported || 0} usuário(s) importado(s).`);
      usersCache = []; await renderAcesso();
    } catch (e) { alert(e.message); }
  }

  const oldSelectPage = window.selectPage;
  if (typeof oldSelectPage === 'function') {
    window.selectPage = function(page) {
      if (!currentUser && String(page || '') !== 'acesso') page = 'acesso';
      const result = oldSelectPage.apply(this, arguments);
      if (String(page || '') === 'acesso') setTimeout(renderAcesso, 0);
      return result;
    };
  }

  Object.assign(window, {
    getCurrentAccessUser, isGerencial, canEditPage, hasPermission, accessDenied, updateAccessBadge,
    renderAcesso, loginAccessUser, logoutAccessUser, createAccessUser, removeAccessUser,
    fillAccessUserForm, importLocalAccessUsers
  });

  async function boot() {
    await refreshMe();
    updateAccessBadge();
    if (!currentUser && typeof selectPage === 'function') selectPage('acesso');
    if (String(window.currentPage || '') === 'acesso' || !currentUser) renderAcesso();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 150));
  else setTimeout(boot, 150);
})();
