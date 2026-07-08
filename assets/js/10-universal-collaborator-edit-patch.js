
/* ============================================================
   MOBILIZAPRO — EDIÇÃO DE COLABORADOR EM QUALQUER STATUS
   ============================================================ */
(function(){
    function mproCurrentUser() {
        try { return typeof getCurrentAccessUser === 'function' ? getCurrentAccessUser() : null; } catch(e) { return null; }
    }

    function mproCanEditCollaboratorData() {
        const user = mproCurrentUser();
        if (!user) return false;
        // Perfil OBRA permanece como visualização. Todos os demais perfis operacionais podem editar dados do colaborador em qualquer status.
        return String(user.role || '').toUpperCase() !== 'OBRA';
    }

    function mproDeniedCollaboratorEdit() {
        const user = mproCurrentUser();
        if (!user) {
            alert('Realize o login para editar dados de colaboradores.');
            if (typeof selectPage === 'function') selectPage('acesso');
            return false;
        }
        alert('Perfil Obra possui somente visualização. Edição de dados do colaborador não autorizada.');
        return false;
    }

    window.mproCanEditCollaboratorData = mproCanEditCollaboratorData;

    const originalOpenEditPersonModal = typeof openEditPersonModal === 'function' ? openEditPersonModal : null;
    if (originalOpenEditPersonModal) {
        window.openEditPersonModal = openEditPersonModal = function(id) {
            if (!mproCanEditCollaboratorData()) return mproDeniedCollaboratorEdit();
            return originalOpenEditPersonModal.apply(this, arguments);
        };
    }

    function mproEditButton(id, label = 'Editar dados') {
        return `
            <button type="button"
                data-mpro-collab-edit="1"
                onclick="event.preventDefault(); event.stopPropagation(); openEditPersonModal(${Number(id)});"
                class="mpro-edit-any-status inline-flex items-center justify-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-[10px] font-black uppercase tracking-wide text-primary transition-all hover:bg-primary/20 hover:border-primary/60">
                <span class="material-symbols-outlined text-sm">edit_square</span>
                ${label}
            </button>`;
    }

    function mproEnableUniversalEditButtons() {
        const canEdit = mproCanEditCollaboratorData();
        document.querySelectorAll('[data-mpro-collab-edit="1"]').forEach(btn => {
            btn.disabled = !canEdit;
            btn.classList.toggle('locked-control', !canEdit);
            btn.title = canEdit ? 'Editar dados do colaborador' : 'Edição não autorizada para este perfil';
        });
    }

    function mproInjectEditButtons() {
        // Crachá: acrescenta botão explícito de edição ao lado do nome em qualquer status de crachá.
        document.querySelectorAll('#page-cracha tbody tr').forEach(tr => {
            const firstCell = tr.querySelector('td');
            if (!firstCell || firstCell.querySelector('[data-mpro-collab-edit="1"]')) return;
            const nameBtn = firstCell.querySelector('button[onclick*="openEditPersonModal"]');
            const onclick = String(nameBtn?.getAttribute('onclick') || '');
            const id = (onclick.match(/openEditPersonModal\((\d+)\)/) || [])[1];
            if (!id) return;
            const wrap = document.createElement('div');
            wrap.className = 'mt-3';
            wrap.innerHTML = mproEditButton(id, 'Editar');
            firstCell.appendChild(wrap);
        });

        // Alojamento: acrescenta botão de edição também para tratado, não tratado ou declinado.
        document.querySelectorAll('#page-alojamento tbody tr').forEach(tr => {
            const firstCell = tr.querySelector('td');
            if (!firstCell || firstCell.querySelector('[data-mpro-collab-edit="1"]')) return;
            const nameEl = firstCell.querySelector('.font-bold, .font-semibold, div');
            const name = String(nameEl?.textContent || '').trim().toUpperCase();
            if (!name) return;
            const candidate = (window.CANDIDATES || CANDIDATES || []).find(c => String(c.name || '').trim().toUpperCase() === name);
            if (!candidate) return;
            const wrap = document.createElement('div');
            wrap.className = 'mt-3';
            wrap.innerHTML = mproEditButton(candidate.id, 'Editar');
            firstCell.appendChild(wrap);
        });

        mproEnableUniversalEditButtons();
    }

    // Recrutamento: reforça que o botão é de edição de dados, não apenas "fluxo".
    if (typeof renderCandidateCard === 'function') {
        const previousRenderCandidateCard = renderCandidateCard;
        window.renderCandidateCard = renderCandidateCard = function(c, showTrainingPanel = false) {
            return previousRenderCandidateCard(c, showTrainingPanel)
                .replace('>EDITAR FLUXO</button>', '>EDITAR DADOS</button>')
                .replace(`onclick="openEditPersonModal(${c.id})"`, `data-mpro-collab-edit="1" onclick="openEditPersonModal(${c.id})"`);
        };
    }

    // Mobilização: deixa o colaborador editável mesmo em treinamento, concluído, liberado ou qualquer status futuro.
    window.renderMobilizationPersonRow = renderMobilizationPersonRow = function(c) {
        const matrix = TRAINING_MATRIX.find(m => m.function === c.func);
        const trainings = matrix?.trainings || [];
        const done = trainings.filter(t => (c.trainings || []).some(ct => ct.name === t.name && ct.date)).length;
        const status = typeof getCandidateStatus === 'function'
            ? getCandidateStatus(c)
            : { label: 'STATUS', color: 'bg-primary/10 text-primary border-primary/20' };
        return `
            <div class="w-full p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container-highest transition-colors">
                <button type="button" onclick="openCandidateTrainingsModal(${c.id})" class="min-w-0 flex-1 text-left flex items-start gap-3">
                    <span class="material-symbols-outlined text-primary mt-1">school</span>
                    <div class="min-w-0">
                        <p class="font-bold text-on-surface">${escapeHtml(c.name)}</p>
                        <p class="text-[10px] text-muted uppercase font-bold tracking-widest">${escapeHtml(c.func)}</p>
                        <p class="text-[10px] text-muted mt-1">Admissão: ${escapeHtml(dateOrDash(c.admitted))} - CPF ${escapeHtml(formatCpf(c.cpf) || '-')}</p>
                        <p class="text-[10px] text-muted mt-1">RM ${escapeHtml(c.rm || '-')} • Obra ${escapeHtml(c.digital_obra || '-')}</p>
                    </div>
                </button>
                <div class="flex flex-wrap items-center gap-2 md:justify-end">
                    <span class="badge ${status.color}">${status.label}</span>
                    <span class="badge ${done === trainings.length && trainings.length ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">${done} / ${trainings.length} treinamentos</span>
                    ${mproEditButton(c.id, 'Editar dados')}
                    <button type="button" onclick="openCandidateTrainingsModal(${c.id})" class="inline-flex items-center justify-center rounded-lg border border-outline-variant px-3 py-2 text-[10px] font-black uppercase text-muted hover:text-primary hover:border-primary/40">
                        <span class="material-symbols-outlined text-sm">school</span>
                    </button>
                </div>
            </div>
        `;
    };

    // Reaplica injeções após renderizações.
    const previousRenderCurrentPage = typeof renderCurrentPage === 'function' ? renderCurrentPage : null;
    if (previousRenderCurrentPage) {
        window.renderCurrentPage = renderCurrentPage = function() {
            const result = previousRenderCurrentPage.apply(this, arguments);
            setTimeout(mproInjectEditButtons, 0);
            return result;
        };
    }

    const previousApplyPermissionLock = typeof applyPermissionLock === 'function' ? applyPermissionLock : null;
    window.applyPermissionLock = applyPermissionLock = function() {
        if (previousApplyPermissionLock) previousApplyPermissionLock.apply(this, arguments);
        // Reabilita apenas a edição universal de colaborador para perfis operacionais autenticados.
        mproEnableUniversalEditButtons();
    };

    const previousSelectPage = typeof selectPage === 'function' ? selectPage : null;
    if (previousSelectPage) {
        window.selectPage = selectPage = function(page) {
            const result = previousSelectPage.apply(this, arguments);
            setTimeout(mproInjectEditButtons, 0);
            return result;
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(mproInjectEditButtons, 80));
    } else {
        setTimeout(mproInjectEditButtons, 80);
    }
})();
