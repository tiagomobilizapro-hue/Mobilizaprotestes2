
// ============================================================
// 🔎 INDICADORES ACIMA DA BUSCA + DEBOUNCE DE 1 SEGUNDO
// ============================================================
(function() {
    window.MOBI_FILTER_DEBOUNCE_MS = 1000;
    window.__mobilizaFilterTimers = window.__mobilizaFilterTimers || {};

    scheduleFilterRender = function(key, renderFn, inputId) {
        clearTimeout(window.__mobilizaFilterTimers[key]);
        window.__mobilizaFilterTimers[key] = setTimeout(() => {
            renderFn();
            setTimeout(() => restoreSearchFocus(inputId), 0);
        }, window.MOBI_FILTER_DEBOUNCE_MS);
    };

    renderMobilização = function() {
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

        const indicatorBox = (key, label, value, icon, tone) => `
            <button onclick="setMobilizacaoStatusFilter('${key}')" class="w-full text-left card p-4 rounded-2xl border-l-4 ${window.mobilizacaoStatusFilter === key ? 'border-l-primary bg-primary/10 ring-1 ring-primary/30' : tone} hover:bg-surface-container-highest transition-all">
                <div class="flex items-center justify-between gap-3">
                    <div>
                        <p class="text-[10px] uppercase font-black tracking-widest text-muted">${label}</p>
                        <div class="text-3xl font-display font-black text-on-surface mt-1">${value}</div>
                    </div>
                    <span class="material-symbols-outlined text-primary text-2xl">${icon}</span>
                </div>
            </button>`;

        container.innerHTML = `
            <div class="space-y-6 animate-up">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 class="text-xl font-display font-bold">Mobilização e Treinamentos</h3>
                        <p class="text-xs text-muted">A listagem inicial mostra apenas quem ainda está em fluxo de treinamento. Use os indicadores para filtrar por status.</p>
                    </div>
                    <span class="badge bg-primary/10 text-primary border-primary/20">${filtered.length} exibido(s)</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${indicatorBox('TREINAMENTO', 'Em treinamento', training.length, 'school', 'border-l-amber-500')}
                    ${indicatorBox('CONCLUIDOS', 'Concluídos Treinamentos', completedTraining.length, 'verified', 'border-l-green-500')}
                    ${indicatorBox('TODOS', 'Todos admitidos', base.length, 'groups', 'border-l-primary')}
                </div>

                <div class="card p-4 rounded-2xl">
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Buscar em mobilização</label>
                    <input id="mobilizacao-search-input" class="modal-input uppercase" value="${escapeHtml(window.mobilizacaoSearch || '')}" oninput="setMobilizacaoSearch(this.value)" placeholder="BUSCAR POR NOME, FUNÇÃO, RM OU OBRA" autocomplete="off">
                    <p class="text-[10px] text-muted mt-2">A busca atualiza 1 segundo após a última tecla digitada.</p>
                </div>

                <div class="card rounded-2xl overflow-hidden">
                    <div class="divide-y divide-outline-variant">
                        ${filtered.length ? filtered.map(c => renderMobilizationPersonRow(c)).join('') : '<div class="empty-state rounded-2xl p-10 text-center text-muted">Nenhum colaborador encontrado para o filtro selecionado.</div>'}
                    </div>
                </div>
            </div>`;

        updateAlertIcon();
        setTimeout(applyPermissionLock, 0);
    };
})();
