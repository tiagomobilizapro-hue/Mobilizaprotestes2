
// ============================================================
// ACCESS CONTROL + MAINTENANCE PATCH
// ============================================================
const MOBI_ACCESS_USERS_KEY = 'mobilizaprp-access-users-v1';
const MOBI_ACCESS_SESSION_KEY = 'mobilizaprp-current-user-cpf-v1';
const MOBI_MAINTENANCE_SESSION_KEY = 'mobilizaprp-maintenance-unlocked-v1';
const MOBI_MAINTENANCE_PASSWORD = 'M400-ADMIN';
const MOBI_DEFAULT_ADMIN = { name: 'ADMINISTRADOR', cpf: '00000000000', email: 'admin@mobiway.local', role: 'GERENCIAL', password: '123456', active: true };

const MOBI_ROLE_LABELS = {
    OBRA: 'Obra',
    OPERACIONAL_RECRUTAMENTO: 'Operacional - Recrutamento',
    MOBILIZACAO: 'Mobilização',
    ALOJAMENTO: 'Alojamento',
    GERENCIAL: 'Gerencial'
};

const MOBI_ROLE_PERMISSIONS = {
    OBRA: [],
    OPERACIONAL_RECRUTAMENTO: ['recrutamento'],
    MOBILIZACAO: ['mobilizacao', 'cracha', 'treinamentos'],
    ALOJAMENTO: ['alojamento'],
    GERENCIAL: ['*']
};

function accessCpf(value) { return String(value || '').replace(/\D/g, '').slice(0, 11); }
function accessUpper(value, max = 160) { return String(value || '').trim().replace(/\s+/g, ' ').toUpperCase().slice(0, max); }
function accessEmail(value) { return String(value || '').trim().toLowerCase().slice(0, 160); }
function accessRole(value) { return MOBI_ROLE_LABELS[String(value || '').toUpperCase()] ? String(value || '').toUpperCase() : 'OBRA'; }
function formatAccessCpf(value) { return typeof formatCpf === 'function' ? formatCpf(value) : accessCpf(value); }

function getAccessUsers() {
    // Hotfix multiusuário: usuários oficiais vêm do MySQL via 18-hostinger-mysql-auth.js.
    // Este fallback local não persiste mais dados sensíveis no navegador.
    if (Array.isArray(window.MOBI_ACCESS_LOCAL_USERS_RUNTIME) && window.MOBI_ACCESS_LOCAL_USERS_RUNTIME.length) {
        return window.MOBI_ACCESS_LOCAL_USERS_RUNTIME.map(sanitizeAccessUser);
    }
    return [sanitizeAccessUser(MOBI_DEFAULT_ADMIN)];
}

function sanitizeAccessUser(user) {
    return {
        name: accessUpper(user?.name || 'USUÁRIO', 120),
        cpf: accessCpf(user?.cpf),
        email: accessEmail(user?.email),
        role: accessRole(user?.role),
        password: String(user?.password || '').slice(0, 80),
        active: user?.active !== false
    };
}

function setAccessUsers(users) {
    // Hotfix multiusuário: sem persistência local de usuários.
    window.MOBI_ACCESS_LOCAL_USERS_RUNTIME = (users || []).map(sanitizeAccessUser).filter(u => u.cpf && u.password);
}

function getCurrentAccessUser() {
    const cpf = accessCpf(window.MOBI_RUNTIME_ACCESS_CPF || '');
    if (!cpf) return null;
    return getAccessUsers().find(u => u.cpf === cpf && u.active) || null;
}

function canEditPage(page = currentPage) {
    const user = getCurrentAccessUser();
    if (!user) return false;
    const perms = MOBI_ROLE_PERMISSIONS[user.role] || [];
    if (perms.includes('*')) return true;
    return perms.includes(String(page || '').toLowerCase());
}

function isGerencial() {
    const user = getCurrentAccessUser();
    return Boolean(user && user.role === 'GERENCIAL');
}

function accessDenied(page = currentPage) {
    const label = MOBI_ROLE_LABELS[getCurrentAccessUser()?.role] || 'Sem login';
    alert(`Acesso somente para edição autorizada. Perfil atual: ${label}.`);
    return false;
}

function loginAccessUser() {
    const cpf = accessCpf(document.getElementById('login-cpf')?.value || '');
    const password = String(document.getElementById('login-password')?.value || '');
    const user = getAccessUsers().find(u => u.cpf === cpf && u.password === password && u.active);
    if (!user) return alert('CPF ou senha inválidos.');
    window.MOBI_RUNTIME_ACCESS_CPF = cpf;
    renderCurrentPage();
    updateAccessBadge();
}

function logoutAccessUser() {
    window.MOBI_RUNTIME_ACCESS_CPF = '';
    renderCurrentPage();
    updateAccessBadge();
}

function createAccessUser() {
    if (!isGerencial()) return accessDenied('acesso');
    const name = accessUpper(document.getElementById('new-user-name')?.value || '', 120);
    const cpf = accessCpf(document.getElementById('new-user-cpf')?.value || '');
    const email = accessEmail(document.getElementById('new-user-email')?.value || '');
    const role = accessRole(document.getElementById('new-user-role')?.value || 'OBRA');
    const password = String(document.getElementById('new-user-password')?.value || '').trim();
    if (!name || name.length < 3) return alert('Informe o nome do usuário.');
    if (cpf.length !== 11) return alert('Informe um CPF válido para acesso.');
    if (!email || !email.includes('@')) return alert('Informe um e-mail válido.');
    if (password.length < 4) return alert('A senha deve ter pelo menos 4 caracteres.');
    const users = getAccessUsers();
    const idx = users.findIndex(u => u.cpf === cpf);
    const record = sanitizeAccessUser({ name, cpf, email, role, password, active: true });
    if (idx >= 0) users[idx] = record; else users.push(record);
    setAccessUsers(users);
    renderAcesso();
}

function removeAccessUser(cpf) {
    if (!isGerencial()) return accessDenied('acesso');
    const clean = accessCpf(cpf);
    if (clean === MOBI_DEFAULT_ADMIN.cpf) return alert('O usuário administrador padrão não pode ser removido.');
    if (!confirm('Remover este usuário de acesso?')) return;
    setAccessUsers(getAccessUsers().filter(u => u.cpf !== clean));
    renderAcesso();
}

function renderAcesso() {
    const container = document.getElementById('page-acesso');
    if (!container) return;
    const user = getCurrentAccessUser();
    const users = getAccessUsers();
    const permissions = (role) => {
        if (role === 'GERENCIAL') return ['Edição irrestrita', 'Todos os módulos', 'Manutenção operacional'];
        if (role === 'OBRA') return ['Visualização sem edição'];
        if (role === 'OPERACIONAL_RECRUTAMENTO') return ['Edita Recrutamento', 'Visualiza demais módulos'];
        if (role === 'MOBILIZACAO') return ['Edita Mobilização', 'Edita Crachá', 'Edita Matriz de Treinamentos', 'Visualiza demais'];
        if (role === 'ALOJAMENTO') return ['Edita Alojamento', 'Visualiza demais módulos'];
        return [];
    };

    if (!user) {
        container.innerHTML = `
            <div class="max-w-xl mx-auto animate-up">
                <div class="card rounded-3xl p-7 border-l-4 border-l-primary">
                    <div class="flex items-center gap-3 mb-6"><span class="material-symbols-outlined text-primary text-4xl">manage_accounts</span><div><h3 class="font-display font-black text-2xl">Acesso ao Sistema</h3><p class="text-xs text-muted">Entre com CPF e senha para liberar edição conforme perfil.</p></div></div>
                    <div class="space-y-4">
                        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">CPF</label><input id="login-cpf" class="modal-input font-mono" inputmode="numeric" maxlength="14" placeholder="000.000.000-00" oninput="maskCpfInput(this)"></div>
                        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Senha</label><input id="login-password" type="password" class="modal-input" placeholder="SENHA DE ACESSO" onkeydown="if(event.key==='Enter') loginAccessUser()"></div>
                        <button onclick="loginAccessUser()" class="btn btn-primary w-full"><span class="material-symbols-outlined text-sm">login</span> Entrar</button>
                    </div>
                </div>
            </div>`;
        return;
    }

    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div><h3 class="font-display font-black text-2xl text-on-surface">Usuários e Níveis de Acesso</h3><p class="text-xs text-muted">Controle local de perfis para edição e visualização do sistema.</p></div>
                <button onclick="logoutAccessUser()" class="btn btn-ghost border border-outline-variant text-xs"><span class="material-symbols-outlined text-sm">logout</span> Sair</button>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-5 gap-4">
                ${Object.keys(MOBI_ROLE_LABELS).map(role => `<div class="card p-4 rounded-2xl access-profile-card ${user.role === role ? 'bg-primary/10' : ''}"><p class="text-[10px] font-black uppercase text-primary tracking-widest">${MOBI_ROLE_LABELS[role]}</p><div class="mt-3 flex flex-wrap gap-2">${permissions(role).map(p => `<span class="permission-pill">${p}</span>`).join('')}</div></div>`).join('')}
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div class="card p-5 rounded-2xl xl:col-span-1">
                    <h4 class="font-display font-bold text-lg mb-1">Usuário logado</h4>
                    <p class="text-xs text-muted mb-4">Permissões aplicadas em tempo real.</p>
                    <div class="space-y-2 text-sm"><p><b>Nome:</b> ${escapeHtml(user.name)}</p><p><b>CPF:</b> ${escapeHtml(formatAccessCpf(user.cpf))}</p><p><b>Email:</b> ${escapeHtml(user.email)}</p><p><b>Perfil:</b> ${escapeHtml(MOBI_ROLE_LABELS[user.role])}</p></div>
                </div>
                <div class="card p-5 rounded-2xl xl:col-span-2 ${!isGerencial() ? 'opacity-60' : ''}">
                    <h4 class="font-display font-bold text-lg mb-1">Cadastrar / Atualizar Usuário</h4>
                    <p class="text-xs text-muted mb-4">Disponível para perfil Gerencial.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Nome</label><input id="new-user-name" class="modal-input uppercase" oninput="maskUppercaseInput(this, 120)" ${!isGerencial() ? 'disabled' : ''}></div>
                        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">CPF</label><input id="new-user-cpf" class="modal-input font-mono" inputmode="numeric" maxlength="14" oninput="maskCpfInput(this)" ${!isGerencial() ? 'disabled' : ''}></div>
                        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Email</label><input id="new-user-email" type="email" class="modal-input" ${!isGerencial() ? 'disabled' : ''}></div>
                        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Perfil</label><select id="new-user-role" class="modal-input" ${!isGerencial() ? 'disabled' : ''}>${Object.keys(MOBI_ROLE_LABELS).map(r => `<option value="${r}">${MOBI_ROLE_LABELS[r]}</option>`).join('')}</select></div>
                        <div class="md:col-span-2"><label class="text-[10px] font-bold uppercase text-muted block mb-1">Senha</label><input id="new-user-password" type="password" class="modal-input" ${!isGerencial() ? 'disabled' : ''}></div>
                    </div>
                    <button onclick="createAccessUser()" class="btn btn-primary mt-4" ${!isGerencial() ? 'disabled' : ''}><span class="material-symbols-outlined text-sm">person_add</span> Salvar Usuário</button>
                </div>
            </div>
            <div class="card rounded-2xl overflow-hidden table-scroll">
                <table class="w-full min-w-[860px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-5 py-4">Nome</th><th class="px-5 py-4">CPF</th><th class="px-5 py-4">Email</th><th class="px-5 py-4">Perfil</th><th class="px-5 py-4 text-right">Ação</th></tr></thead><tbody class="divide-y divide-outline-variant">${users.map(u => `<tr><td class="px-5 py-4 font-bold">${escapeHtml(u.name)}</td><td class="px-5 py-4 font-mono">${escapeHtml(formatAccessCpf(u.cpf))}</td><td class="px-5 py-4">${escapeHtml(u.email)}</td><td class="px-5 py-4"><span class="badge bg-primary/10 text-primary border-primary/20">${escapeHtml(MOBI_ROLE_LABELS[u.role])}</span></td><td class="px-5 py-4 text-right"><button onclick="removeAccessUser('${u.cpf}')" class="btn btn-danger-ghost text-xs border border-error/20" ${!isGerencial() || u.cpf === MOBI_DEFAULT_ADMIN.cpf ? 'disabled' : ''}>Remover</button></td></tr>`).join('')}</tbody></table>
            </div>
        </div>`;
}

function unlockMaintenance() {
    const pass = String(document.getElementById('maintenance-password')?.value || '').trim();
    if (pass !== MOBI_MAINTENANCE_PASSWORD) return alert('Senha de manutenção inválida.');
    sessionStorage.setItem(MOBI_MAINTENANCE_SESSION_KEY, '1');
    renderManutencao();
}

function exportBackupData() {
    if (sessionStorage.getItem(MOBI_MAINTENANCE_SESSION_KEY) !== '1') return alert('Desbloqueie a manutenção primeiro.');
    const payload = {
        app: 'MobilizaPRO',
        exportedAt: new Date().toISOString(),
        storageKey: typeof STORAGE_KEY !== 'undefined' ? STORAGE_KEY : 'mobilizaprp-state-v3',
        databaseVersion: typeof DATABASE_CLEAN_VERSION !== 'undefined' ? DATABASE_CLEAN_VERSION : '',
        data: {
            trainingMatrix: TRAINING_MATRIX,
            candidates: CANDIDATES,
            solicitations: SOLICITATIONS,
            accessUsers: getAccessUsers()
        }
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `backup-mobilizaprp-${todayInputDate ? todayInputDate() : new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
}

function importBackupData(fileInput) {
    if (sessionStorage.getItem(MOBI_MAINTENANCE_SESSION_KEY) !== '1') return alert('Desbloqueie a manutenção primeiro.');
    const file = fileInput?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const parsed = JSON.parse(reader.result);
            const data = parsed.data || parsed;
            if (!confirm('Importar backup e substituir os dados atuais do navegador?')) return;
            if (Array.isArray(data.trainingMatrix)) TRAINING_MATRIX = data.trainingMatrix.map(sanitizeFunctionMatrix).filter(f => f.function);
            if (Array.isArray(data.candidates)) CANDIDATES = data.candidates.map(sanitizeCandidate);
            if (Array.isArray(data.solicitations)) SOLICITATIONS = data.solicitations.map(sanitizeSolicitation).filter(s => s.rm);
            if (Array.isArray(data.accessUsers)) setAccessUsers(data.accessUsers);
            sortTrainingMatrixByFunction();
            syncBadgeQueue?.();
            saveData();
            alert('Backup importado com sucesso.');
            renderCurrentPage();
        } catch (error) {
            console.error(error);
            alert('Arquivo inválido. Envie um backup JSON exportado pelo sistema.');
        } finally {
            fileInput.value = '';
        }
    };
    reader.readAsText(file);
}

function renderManutencao() {
    const container = document.getElementById('page-manutencao');
    if (!container) return;
    const unlocked = sessionStorage.getItem(MOBI_MAINTENANCE_SESSION_KEY) === '1';
    if (!unlocked) {
        container.innerHTML = `
            <div class="max-w-xl mx-auto animate-up">
                <div class="card rounded-3xl p-7 border-l-4 border-l-amber-500">
                    <div class="flex items-center gap-3 mb-6"><span class="material-symbols-outlined text-amber-400 text-4xl">admin_panel_settings</span><div><h3 class="font-display font-black text-2xl">Manutenção</h3><p class="text-xs text-muted">Área protegida para importação e exportação de backup de dados.</p></div></div>
                    <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Senha de manutenção</label><input id="maintenance-password" type="password" class="modal-input" placeholder="SENHA" onkeydown="if(event.key==='Enter') unlockMaintenance()"></div>
                    <button onclick="unlockMaintenance()" class="btn btn-primary mt-4 w-full"><span class="material-symbols-outlined text-sm">lock_open</span> Acessar Manutenção</button>
                </div>
            </div>`;
        return;
    }
    const stateSize = (() => { try { return ((localStorage.getItem(STORAGE_KEY) || '').length / 1024).toFixed(1); } catch(e) { return '0.0'; } })();
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4"><div><h3 class="font-display font-black text-2xl text-on-surface">Manutenção do Sistema</h3><p class="text-xs text-muted">Subitem: importar / exportar backup de dados.</p></div><span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Área desbloqueada</span></div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="card p-5 rounded-2xl border-l-4 border-l-primary"><p class="text-[10px] font-black uppercase text-muted">Pessoas</p><div class="text-3xl font-display font-black mt-2">${CANDIDATES.length}</div></div><div class="card p-5 rounded-2xl border-l-4 border-l-blue-400"><p class="text-[10px] font-black uppercase text-muted">Solicitações</p><div class="text-3xl font-display font-black mt-2">${SOLICITATIONS.length}</div></div><div class="card p-5 rounded-2xl border-l-4 border-l-amber-500"><p class="text-[10px] font-black uppercase text-muted">Backup Local</p><div class="text-3xl font-display font-black mt-2">${stateSize} KB</div></div></div>
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div class="card p-6 rounded-2xl"><div class="flex items-center gap-3 mb-4"><span class="material-symbols-outlined text-primary text-3xl">download</span><div><h4 class="font-display font-bold text-lg">Exportar Backup</h4><p class="text-xs text-muted">Gera arquivo JSON com pessoas, solicitações, matrizes e usuários.</p></div></div><button onclick="exportBackupData()" class="btn btn-primary"><span class="material-symbols-outlined text-sm">file_download</span> Exportar dados</button></div>
                <div class="card p-6 rounded-2xl"><div class="flex items-center gap-3 mb-4"><span class="material-symbols-outlined text-amber-400 text-3xl">upload_file</span><div><h4 class="font-display font-bold text-lg">Importar Backup</h4><p class="text-xs text-muted">Substitui a base local por um backup JSON exportado.</p></div></div><label class="maint-drop-zone rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/5"><span class="material-symbols-outlined text-primary text-3xl mb-2">cloud_upload</span><span class="text-sm font-bold text-on-surface">Selecionar arquivo JSON</span><span class="text-xs text-muted mt-1">Confirmação será solicitada antes de substituir os dados.</span><input type="file" accept="application/json,.json" class="hidden" onchange="importBackupData(this)"></label></div>
            </div>
            <div class="rounded-2xl border border-outline-variant bg-surface-container-low p-4 text-xs text-muted"><b class="text-on-surface">Senha de manutenção padrão:</b> M400-ADMIN. Em publicação real, substitua essa proteção local por autenticação com backend.</div>
        </div>`;
}

function updateAccessBadge() {
    const rightArea = document.querySelector('header .flex.items-center.gap-6');
    if (!rightArea) return;
    let chip = document.getElementById('access-session-chip');
    if (!chip) {
        chip = document.createElement('button');
        chip.id = 'access-session-chip';
        chip.type = 'button';
        chip.className = 'access-chip hidden md:inline-flex';
        chip.onclick = () => selectPage('acesso');
        rightArea.insertBefore(chip, rightArea.firstChild);
    }
    const user = getCurrentAccessUser();
    chip.innerHTML = `<span class="material-symbols-outlined text-sm">${user ? 'verified_user' : 'lock'}</span>${user ? escapeHtml(MOBI_ROLE_LABELS[user.role]) : 'Sem login'}`;
}

function applyPermissionLock() {
    const actionBtn = document.getElementById('topbar-action-btn');
    if (actionBtn) {
        if (currentPage === 'dashboard' || currentPage === 'recrutamento' || currentPage === 'acesso' || currentPage === 'manutencao' || !canEditPage(currentPage)) {
            actionBtn.classList.add('hidden');
            actionBtn.onclick = null;
        }
    }
    const pageEl = document.getElementById(`page-${currentPage}`);
    if (!pageEl) return;
    const editable = canEditPage(currentPage) || currentPage === 'acesso' || currentPage === 'manutencao';
    pageEl.querySelectorAll('input, select, textarea').forEach(el => {
        const id = String(el.id || '').toLowerCase();
        const placeholder = String(el.getAttribute('placeholder') || '').toLowerCase();
        const handler = String(el.getAttribute('onchange') || '') + String(el.getAttribute('oninput') || '');
        const isSearchOrFilter = id.includes('search') || id.includes('filter') || placeholder.includes('buscar') || /set.*Filter|set.*Search/.test(handler);
        if (!editable && !isSearchOrFilter) {
            el.disabled = true;
            el.classList.add('locked-control');
            el.title = 'Somente visualização para o perfil atual.';
        }
    });
}

function guardEdit(page, message) {
    if (canEditPage(page)) return true;
    return accessDenied(page || currentPage);
}

// Wrappers de funções críticas de edição
const __mobiOpenAddPersonModal = typeof openAddPersonModal === 'function' ? openAddPersonModal : null;
if (__mobiOpenAddPersonModal) openAddPersonModal = function(...args) { if (!canEditPage('recrutamento') && !canEditPage(currentPage)) return accessDenied('recrutamento'); return __mobiOpenAddPersonModal.apply(this, args); };
const __mobiOpenEditPersonModal = typeof openEditPersonModal === 'function' ? openEditPersonModal : null;
if (__mobiOpenEditPersonModal) openEditPersonModal = function(...args) { if (!canEditPage('recrutamento') && !canEditPage('mobilizacao')) return accessDenied('recrutamento'); return __mobiOpenEditPersonModal.apply(this, args); };
const __mobiOpenNewSolicitationModal = typeof openNewSolicitationModal === 'function' ? openNewSolicitationModal : null;
if (__mobiOpenNewSolicitationModal) openNewSolicitationModal = function(...args) { if (!canEditPage('solicitacao') && !isGerencial()) return accessDenied('solicitacao'); return __mobiOpenNewSolicitationModal.apply(this, args); };
const __mobiOpenNewFunctionModal = typeof openNewFunctionModal === 'function' ? openNewFunctionModal : null;
if (__mobiOpenNewFunctionModal) openNewFunctionModal = function(...args) { if (!canEditPage('treinamentos')) return accessDenied('treinamentos'); return __mobiOpenNewFunctionModal.apply(this, args); };
const __mobiToggleCandidateTraining = typeof toggleCandidateTraining === 'function' ? toggleCandidateTraining : null;
if (__mobiToggleCandidateTraining) toggleCandidateTraining = function(...args) { if (!canEditPage('mobilizacao') && !canEditPage('treinamentos')) return accessDenied('mobilizacao'); return __mobiToggleCandidateTraining.apply(this, args); };
const __mobiOpenDeclineCandidateModal = typeof openDeclineCandidateModal === 'function' ? openDeclineCandidateModal : null;
if (__mobiOpenDeclineCandidateModal) openDeclineCandidateModal = function(...args) { if (!canEditPage('mobilizacao')) return accessDenied('mobilizacao'); return __mobiOpenDeclineCandidateModal.apply(this, args); };
const __mobiUpdateBadgeField = typeof updateBadgeField === 'function' ? updateBadgeField : null;
if (__mobiUpdateBadgeField) updateBadgeField = function(...args) { if (!canEditPage('cracha')) return accessDenied('cracha'); return __mobiUpdateBadgeField.apply(this, args); };
const __mobiUpdateBadgeDelayReasonDraft = typeof updateBadgeDelayReasonDraft === 'function' ? updateBadgeDelayReasonDraft : null;
if (__mobiUpdateBadgeDelayReasonDraft) updateBadgeDelayReasonDraft = function(...args) { if (!canEditPage('cracha')) return accessDenied('cracha'); return __mobiUpdateBadgeDelayReasonDraft.apply(this, args); };
const __mobiUpdateAlojRealizado = typeof updateCandidateAlojamentoRealizado === 'function' ? updateCandidateAlojamentoRealizado : null;
if (__mobiUpdateAlojRealizado) updateCandidateAlojamentoRealizado = function(...args) { if (!canEditPage('alojamento')) return accessDenied('alojamento'); return __mobiUpdateAlojRealizado.apply(this, args); };
const __mobiUpdateAlojResp = typeof updateCandidateAlojamentoResponsavel === 'function' ? updateCandidateAlojamentoResponsavel : null;
if (__mobiUpdateAlojResp) updateCandidateAlojamentoResponsavel = function(...args) { if (!canEditPage('alojamento')) return accessDenied('alojamento'); return __mobiUpdateAlojResp.apply(this, args); };

// Status ajustado: mobilizado -> concluídos treinamentos
const __mobiGetCandidateStatus = typeof getCandidateStatus === 'function' ? getCandidateStatus : null;
if (__mobiGetCandidateStatus) getCandidateStatus = function(c) {
    const status = __mobiGetCandidateStatus(c);
    if (status && status.label === 'MOBILIZADO') status.label = 'CONCLUÍDOS TREINAMENTOS';
    return status;
};

// Mobilização: default somente quem está em treinamento; concluídos em filtro separado.
function renderMobilização() {
    const container = document.getElementById('page-mobilizacao');
    if (!container) return;
    const base = CANDIDATES.filter(c => c.admitted && !c.declined_date)
        .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity: 'base' }));
    const training = base.filter(isCandidateInTraining);
    const completedTraining = base.filter(isCandidateMobilized);
    const q = String(window.mobilizacaoSearch || '').toUpperCase();
    const statusFilter = String(window.mobilizacaoStatusFilter || 'TREINAMENTO').toUpperCase();
    window.mobilizacaoStatusFilter = statusFilter;
    const filtered = base
        .filter(c => statusFilter === 'TODOS' || (statusFilter === 'TREINAMENTO' && isCandidateInTraining(c)) || (statusFilter === 'CONCLUIDOS' && isCandidateMobilized(c)))
        .filter(c => personSearchMatch(c, q));
    const sideBox = (key, label, value, icon, tone) => `
        <button onclick="setMobilizacaoStatusFilter('${key}')" class="w-full text-left card p-4 rounded-2xl border-l-4 ${window.mobilizacaoStatusFilter === key ? 'border-l-primary bg-primary/10' : tone} hover:bg-surface-container-highest">
            <div class="flex items-center justify-between gap-2"><div><p class="text-[10px] uppercase font-black tracking-widest text-muted">${label}</p><div class="text-3xl font-display font-black text-on-surface">${value}</div></div><span class="material-symbols-outlined text-primary text-2xl">${icon}</span></div>
        </button>`;
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4"><div><h3 class="text-xl font-display font-bold">Mobilização e Treinamentos</h3><p class="text-xs text-muted">A listagem inicial mostra apenas quem ainda está em fluxo de treinamento. Use os filtros laterais por status.</p></div><span class="badge bg-primary/10 text-primary border-primary/20">${training.length} em treinamento</span></div>
            <div class="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6">
                <aside class="space-y-3">${sideBox('TREINAMENTO', 'Em treinamento', training.length, 'school', 'border-l-amber-500')}${sideBox('CONCLUIDOS', 'Concluídos Treinamentos', completedTraining.length, 'verified', 'border-l-green-500')}${sideBox('TODOS', 'Todos admitidos', base.length, 'groups', 'border-l-primary')}</aside>
                <div class="space-y-4"><div class="card p-4 rounded-2xl"><label class="text-[10px] font-bold uppercase text-muted block mb-1">Buscar em mobilização</label><input id="mobilizacao-search-input" class="modal-input uppercase" value="${escapeHtml(window.mobilizacaoSearch || '')}" oninput="setMobilizacaoSearch(this.value)" placeholder="BUSCAR POR NOME, FUNÇÃO, RM OU OBRA" autocomplete="off"></div><div class="card rounded-2xl overflow-hidden"><div class="divide-y divide-outline-variant">${filtered.length ? filtered.map(c => renderMobilizationPersonRow(c)).join('') : '<div class="empty-state rounded-2xl p-10 text-center text-muted">Nenhum colaborador encontrado para o filtro selecionado.</div>'}</div></div></div>
            </div>
        </div>`;
    updateAlertIcon();
    setTimeout(applyPermissionLock, 0);
}

// Navegação: novos módulos, botão superior e permissões
const __mobiRenderCurrentPage = typeof renderCurrentPage === 'function' ? renderCurrentPage : null;
renderCurrentPage = function() {
    if (typeof applyMenuCorrections === 'function') applyMenuCorrections();
    if (currentPage === 'acesso') renderAcesso();
    else if (currentPage === 'manutencao') renderManutencao();
    else if (__mobiRenderCurrentPage) __mobiRenderCurrentPage();
    updateAccessBadge();
    setTimeout(applyPermissionLock, 0);
};

const __mobiSelectPage = typeof selectPage === 'function' ? selectPage : null;
selectPage = function(page) {
    if (__mobiSelectPage) __mobiSelectPage(page);
    const actionBtn = document.getElementById('topbar-action-btn');
    if (actionBtn && (currentPage === 'dashboard' || currentPage === 'recrutamento' || currentPage === 'acesso' || currentPage === 'manutencao' || !canEditPage(currentPage))) {
        actionBtn.classList.add('hidden');
        actionBtn.onclick = null;
    }
    updateAccessBadge();
    setTimeout(applyPermissionLock, 0);
};

// Atualiza listeners dos itens novos do menu e re-renderiza página atual
setTimeout(() => {
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.dataset.accessBound === '1') return;
        item.dataset.accessBound = '1';
        item.addEventListener('click', (e) => { e.preventDefault(); selectPage(item.dataset.page); });
    });
    updateAccessBadge();
    if (typeof currentPage !== 'undefined') selectPage(currentPage || 'dashboard');
}, 50);
