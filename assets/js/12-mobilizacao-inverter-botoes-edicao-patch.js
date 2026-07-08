
/* ============================================================
   MOBILIZAPRO — MOBILIZAÇÃO: INVERTER BOTÕES
   Botão principal: Editar Treinamentos
   Botão secundário: Editar Dados
   ============================================================ */
(function(){
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

                    <button type="button"
                        onclick="event.preventDefault(); event.stopPropagation(); openCandidateTrainingsModal(${c.id});"
                        class="inline-flex items-center justify-center gap-1 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-[10px] font-black uppercase tracking-wide text-primary transition-all hover:bg-primary/20 hover:border-primary/60">
                        <span class="material-symbols-outlined text-sm">school</span>
                        Editar treinamentos
                    </button>

                    <button type="button"
                        data-mpro-collab-edit="1"
                        onclick="event.preventDefault(); event.stopPropagation(); openEditPersonModal(${c.id});"
                        class="mpro-edit-any-status inline-flex items-center justify-center rounded-lg border border-outline-variant px-3 py-2 text-[10px] font-black uppercase text-muted hover:text-primary hover:border-primary/40"
                        title="Editar dados do colaborador">
                        <span class="material-symbols-outlined text-sm">edit_square</span>
                    </button>
                </div>
            </div>
        `;
    };

    const previousRenderMobilizacaoInvert = typeof renderMobilização === 'function' ? renderMobilização : null;
    if (previousRenderMobilizacaoInvert) {
        window.renderMobilização = renderMobilização = function() {
            const result = previousRenderMobilizacaoInvert.apply(this, arguments);
            setTimeout(() => {
                try {
                    if (typeof applyPermissionLock === 'function') applyPermissionLock();
                } catch(e) {}
            }, 0);
            return result;
        };
    }
})();
