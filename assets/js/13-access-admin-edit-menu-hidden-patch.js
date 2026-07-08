
/* ============================================================
   MOBILIZAPRO — ACESSO
   1) Oculta menu antes do login
   2) Permite ao Gerencial editar usuários de acesso cadastrados
   ============================================================ */
(function(){
    function mproEscape(v) {
        return (typeof escapeHtml === 'function') ? escapeHtml(v) : String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    }

    function mproCurrentUser() {
        try { return typeof getCurrentAccessUser === 'function' ? getCurrentAccessUser() : null; } catch(e) { return null; }
    }

    window.mproApplyLoginVisibility = function() {
        const logged = Boolean(mproCurrentUser());
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.style.display = logged ? '' : 'none';
            sidebar.classList.toggle('hidden-before-login', !logged);
        }

        document.querySelectorAll('.nav-item').forEach(item => {
            const page = String(item.dataset.page || '');
            if (!logged && page !== 'acesso') {
                item.classList.add('pointer-events-none', 'opacity-0');
                item.setAttribute('aria-hidden', 'true');
                item.tabIndex = -1;
            } else {
                item.classList.remove('pointer-events-none', 'opacity-0');
                item.removeAttribute('aria-hidden');
                item.removeAttribute('tabindex');
            }
        });

        const topbarAction = document.getElementById('topbar-action-btn');
        if (topbarAction && !logged) topbarAction.classList.add('hidden');

        const title = document.getElementById('topbar-title');
        if (title && !logged) title.textContent = 'Acesso';

        document.body.classList.toggle('mpro-not-logged', !logged);
    };

    function mproRoleOptions(selected) {
        return Object.keys(MOBI_ROLE_LABELS).map(role =>
            `<option value="${role}" ${role === selected ? 'selected' : ''}>${mproEscape(MOBI_ROLE_LABELS[role])}</option>`
        ).join('');
    }

    window.openEditAccessUserModal = function(cpf) {
        if (!isGerencial()) return accessDenied('acesso');
        const cleanCpf = accessCpf(cpf);
        const user = getAccessUsers().find(u => u.cpf === cleanCpf);
        if (!user) return alert('Usuário não encontrado.');

        const isDefaultAdmin = cleanCpf === MOBI_DEFAULT_ADMIN.cpf;
        openModal(`
            <div class="p-6 border-b border-outline-variant flex justify-between items-center">
                <div>
                    <h3 class="font-display font-bold text-lg">Editar Cadastro de Acesso</h3>
                    <p class="text-xs text-muted mt-1">Alteração disponível apenas para perfil Gerencial.</p>
                </div>
                <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
            </div>
            <div class="p-6 space-y-4 overflow-y-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="md:col-span-2">
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Nome</label>
                        <input id="edit-user-name" class="modal-input uppercase" value="${mproEscape(user.name)}" maxlength="120" oninput="maskUppercaseInput(this, 120)">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">CPF</label>
                        <input id="edit-user-cpf" class="modal-input font-mono" value="${mproEscape(formatAccessCpf(user.cpf))}" inputmode="numeric" maxlength="14" oninput="maskCpfInput(this)" ${isDefaultAdmin ? 'readonly' : ''}>
                        ${isDefaultAdmin ? '<p class="text-[10px] text-amber-400 mt-1 font-bold uppercase">CPF padrão do administrador não pode ser alterado.</p>' : ''}
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Email</label>
                        <input id="edit-user-email" type="email" class="modal-input" value="${mproEscape(user.email)}">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Perfil</label>
                        <select id="edit-user-role" class="modal-input" ${isDefaultAdmin ? 'disabled' : ''}>${mproRoleOptions(isDefaultAdmin ? 'GERENCIAL' : user.role)}</select>
                        ${isDefaultAdmin ? '<p class="text-[10px] text-amber-400 mt-1 font-bold uppercase">Administrador padrão permanece Gerencial.</p>' : ''}
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Status</label>
                        <select id="edit-user-active" class="modal-input" ${isDefaultAdmin ? 'disabled' : ''}>
                            <option value="true" ${user.active !== false ? 'selected' : ''}>Ativo</option>
                            <option value="false" ${user.active === false ? 'selected' : ''}>Inativo</option>
                        </select>
                    </div>
                    <div class="md:col-span-2">
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Senha</label>
                        <input id="edit-user-password" type="password" class="modal-input" value="${mproEscape(user.password || '')}" placeholder="NOVA SENHA OU MANTER ATUAL">
                    </div>
                </div>
                <div class="rounded-xl border border-primary/20 bg-primary/5 p-3 text-[11px] text-muted">
                    Atenção: alterações de CPF afetam o login desse usuário. O usuário administrador padrão não pode ser removido e permanece Gerencial.
                </div>
            </div>
            <div class="p-6 bg-surface-container-low border-t border-outline-variant flex flex-col sm:flex-row justify-end gap-3">
                <button onclick="closeModal()" class="btn btn-ghost">Cancelar</button>
                <button onclick="saveEditedAccessUser('${cleanCpf}')" class="btn btn-primary px-8"><span class="material-symbols-outlined text-sm">save</span> Salvar Alterações</button>
            </div>
        `);
    };

    window.saveEditedAccessUser = function(originalCpf) {
        if (!isGerencial()) return accessDenied('acesso');
        const oldCpf = accessCpf(originalCpf);
        const users = getAccessUsers();
        const idx = users.findIndex(u => u.cpf === oldCpf);
        if (idx < 0) return alert('Usuário não encontrado.');

        const isDefaultAdmin = oldCpf === MOBI_DEFAULT_ADMIN.cpf;
        const name = accessUpper(document.getElementById('edit-user-name')?.value || '', 120);
        const newCpf = isDefaultAdmin ? MOBI_DEFAULT_ADMIN.cpf : accessCpf(document.getElementById('edit-user-cpf')?.value || '');
        const email = accessEmail(document.getElementById('edit-user-email')?.value || '');
        const role = isDefaultAdmin ? 'GERENCIAL' : accessRole(document.getElementById('edit-user-role')?.value || 'OBRA');
        const active = isDefaultAdmin ? true : String(document.getElementById('edit-user-active')?.value || 'true') === 'true';
        const password = String(document.getElementById('edit-user-password')?.value || '').trim();

        if (!name || name.length < 3) return alert('Informe o nome do usuário.');
        if (newCpf.length !== 11) return alert('Informe um CPF válido para acesso.');
        if (!email || !email.includes('@')) return alert('Informe um e-mail válido.');
        if (password.length < 4) return alert('A senha deve ter pelo menos 4 caracteres.');
        if (newCpf !== oldCpf && users.some(u => u.cpf === newCpf)) return alert('Já existe outro usuário cadastrado com este CPF.');

        users[idx] = sanitizeAccessUser({ name, cpf: newCpf, email, role, password, active });

        setAccessUsers(users);

        try {
            if (typeof getCurrentAccessUser === 'function') {
                const current = getCurrentAccessUser();
                if (current && current.cpf === oldCpf && oldCpf !== newCpf) {
                    if (typeof window.MOBI_RUNTIME_ACCESS_CPF !== 'undefined') window.MOBI_RUNTIME_ACCESS_CPF = newCpf;
                }
            }
        } catch(e) {}

        closeModal();
        renderAcesso();
        updateAccessBadge();
        mproApplyLoginVisibility();
    };

    const previousRemoveAccessUser = typeof removeAccessUser === 'function' ? removeAccessUser : null;
    if (previousRemoveAccessUser) {
        window.removeAccessUser = removeAccessUser = function(cpf) {
            if (!isGerencial()) return accessDenied('acesso');
            return previousRemoveAccessUser.apply(this, arguments);
        };
    }

    window.fillAccessUserForm = function(cpf) {
        if (!isGerencial()) return accessDenied('acesso');
        const u = getAccessUsers().find(x => x.cpf === accessCpf(cpf));
        if (!u) return alert('Usuário não encontrado.');
        const set = (id, value) => { const el = document.getElementById(id); if (el) el.value = value; };
        set('new-user-name', u.name);
        set('new-user-cpf', formatAccessCpf(u.cpf));
        set('new-user-email', u.email);
        set('new-user-role', u.role);
        set('new-user-password', u.password || '');
    };

    const previousRenderAcesso = typeof renderAcesso === 'function' ? renderAcesso : null;
    if (previousRenderAcesso) {
        window.renderAcesso = renderAcesso = function() {
            const result = previousRenderAcesso.apply(this, arguments);
            try {
                const container = document.getElementById('page-acesso');
                const user = getCurrentAccessUser();
                if (container && user) {
                    const table = container.querySelector('table');
                    if (table) {
                        const actionHeader = table.querySelector('thead tr th:last-child');
                        if (actionHeader) actionHeader.textContent = 'Ações';
                        table.querySelectorAll('tbody tr').forEach(row => {
                            const cpfCell = row.children[1];
                            const actionCell = row.children[row.children.length - 1];
                            const rawCpf = cpfCell ? accessCpf(cpfCell.textContent || '') : '';
                            const u = getAccessUsers().find(x => x.cpf === rawCpf);
                            if (!actionCell || !u) return;
                            const gerencial = isGerencial();
                            actionCell.innerHTML = `
                                <div class="flex justify-end gap-2">
                                    <button onclick="openEditAccessUserModal('${u.cpf}')" class="btn btn-ghost text-xs border border-primary/30 text-primary" ${!gerencial ? 'disabled' : ''}>
                                        <span class="material-symbols-outlined text-sm">edit</span> Editar
                                    </button>
                                    <button onclick="fillAccessUserForm('${u.cpf}')" class="btn btn-ghost text-xs border border-outline-variant" ${!gerencial ? 'disabled' : ''}>
                                        Usar no formulário
                                    </button>
                                    <button onclick="removeAccessUser('${u.cpf}')" class="btn btn-danger-ghost text-xs border border-error/20" ${!gerencial || u.cpf === MOBI_DEFAULT_ADMIN.cpf ? 'disabled' : ''}>
                                        Remover
                                    </button>
                                </div>
                            `;
                            const profileCell = row.children[3];
                            if (profileCell && u.active === false && !profileCell.querySelector('[data-inactive-user]')) {
                                profileCell.insertAdjacentHTML('beforeend', ' <span data-inactive-user="1" class="badge bg-error/10 text-error border-error/20 ml-2">Inativo</span>');
                            }
                        });
                    }
                }
            } catch(error) {
                console.error('Falha ao aplicar edição de usuários de acesso', error);
            }
            setTimeout(mproApplyLoginVisibility, 0);
            return result;
        };
    }

    const previousUpdateAccessBadge = typeof updateAccessBadge === 'function' ? updateAccessBadge : null;
    if (previousUpdateAccessBadge) {
        window.updateAccessBadge = updateAccessBadge = function() {
            const result = previousUpdateAccessBadge.apply(this, arguments);
            mproApplyLoginVisibility();
            return result;
        };
    }

    const previousLoginAccessUser = typeof loginAccessUser === 'function' ? loginAccessUser : null;
    if (previousLoginAccessUser) {
        window.loginAccessUser = loginAccessUser = function() {
            const result = previousLoginAccessUser.apply(this, arguments);
            setTimeout(mproApplyLoginVisibility, 0);
            return result;
        };
    }

    const previousLogoutAccessUser = typeof logoutAccessUser === 'function' ? logoutAccessUser : null;
    if (previousLogoutAccessUser) {
        window.logoutAccessUser = logoutAccessUser = function() {
            const result = previousLogoutAccessUser.apply(this, arguments);
            setTimeout(mproApplyLoginVisibility, 0);
            return result;
        };
    }

    const previousSelectPageAccessMenu = typeof selectPage === 'function' ? selectPage : null;
    if (previousSelectPageAccessMenu) {
        window.selectPage = selectPage = function(page) {
            const logged = Boolean(mproCurrentUser());
            const target = String(page || 'dashboard');
            if (!logged && target !== 'acesso') page = 'acesso';
            const result = previousSelectPageAccessMenu.apply(this, arguments);
            setTimeout(mproApplyLoginVisibility, 0);
            return result;
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(mproApplyLoginVisibility, 40));
    } else {
        setTimeout(mproApplyLoginVisibility, 40);
    }
})();
