
function getRequiredTrainingStatus(c) {
    const matrix = TRAINING_MATRIX.find(f => f.function === c.func);
    if (!matrix) return { total: 0, done: 0, complete: false };
    const required = matrix.trainings.filter(t => t.required !== 'E');
    const done = required.filter(rt => c.trainings.some(ct => ct.name === rt.name)).length;
    return { total: required.length, done, complete: required.length === 0 || done === required.length };
}

function getPipelineMetrics() {
    const counts = {
        documentacao: 0,
        exames: 0,
        admissao: 0,
        treinamento: 0,
        mobilizado: 0
    };

    CANDIDATES.forEach(c => {
        if (c.declined_date) return;
        const training = getRequiredTrainingStatus(c);
        if (!c.aso) counts.documentacao += 1;
        else if (!c.admitted) counts.exames += 1;
        else if (!training.complete) counts.treinamento += 1;
        else counts.mobilizado += 1;
    });

    return counts;
}

function renderProgressBar(label, value, total, colorClass = 'bg-primary') {
    const pct = total > 0 ? Math.round((value / total) * 100) : 0;
    return `
        <div>
            <div class="flex justify-between text-xs mb-1">
                <span class="text-muted">${label}</span>
                <span class="font-bold text-on-surface">${value} / ${total}</span>
            </div>
            <div class="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div class="${colorClass} h-full" style="width: ${pct}%"></div>
            </div>
        </div>
    `;
}

function parseDashboardDate(inputDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(inputDate || ''))) return null;
    const [year, month, day] = String(inputDate).split('-').map(Number);
    return new Date(year, month - 1, day);
}

function formatDashboardDate(inputDate) {
    const date = parseDashboardDate(inputDate);
    return date ? date.toLocaleDateString('pt-BR') : '-';
}

function getDashboardLateDays(plannedDate, compareDate = todayInputDate()) {
    const planned = parseDashboardDate(plannedDate);
    const compare = parseDashboardDate(compareDate);
    if (!planned || !compare || compare <= planned) return 0;
    return Math.ceil((compare - planned) / (1000 * 60 * 60 * 24));
}

function getDashboardMetrics() {
    syncBadgeQueue();
    CANDIDATES.forEach(refreshBadgeConclusion);

    const today = todayInputDate();
    const activeCandidates = CANDIDATES.filter(c => !c.declined_date);
    const vacancy = getVacancySummary();
    const trainingDone = activeCandidates.filter(c => c.admitted && hasCompletedRequiredTrainings(c));
    const badgeQueue = trainingDone.filter(c => c.badge_posted_date || c.admitted);
    const badgeCompleted = badgeQueue.filter(isBadgeCompleted);
    const badgePending = badgeQueue.filter(c => !isBadgeCompleted(c));
    const alojamento = activeCandidates.filter(c => c.alojado);
    const canceledSolicitations = SOLICITATIONS.filter(isSolicitationCanceled);

    const asoPending = activeCandidates.filter(c => !c.aso);
    const activationPending = activeCandidates.filter(c => c.aso && !c.admitted);
    const asoLate = activeCandidates.filter(c => c.aso_planned && today > c.aso_planned && !c.aso);
    const activationLate = activeCandidates.filter(c => c.admission_planned && today > c.admission_planned && !c.admitted);
    const badgeLate = badgeQueue.filter(c => getBadgeReleaseDate(c) && today > getBadgeReleaseDate(c) && !c.badge_real_date);
    const badgeJustificationPending = badgeQueue.filter(c => isBadgeDelayed(c) && !cleanString(c.badge_delay_reason || '', 500));
    const openVacancyRows = vacancy.rows.filter(row => row.open > 0 && row.requested > 0 && !row.sem_rm);
    const orphanRecruitment = vacancy.rows.filter(row => row.sem_rm && row.recruited > 0);

    const funnel = [
        { label: 'Solicitação M.O.', value: vacancy.requested, icon: 'assignment_add' },
        { label: 'Recrutamento', value: activeCandidates.length, icon: 'person_search' },
        { label: 'ASO Real', value: activeCandidates.filter(c => c.aso).length, icon: 'health_and_safety' },
        { label: 'Admissão Real', value: activeCandidates.filter(c => c.admitted).length, icon: 'how_to_reg' },
        { label: 'Mobilização', value: activeCandidates.filter(c => c.admitted).length, icon: 'engineering' },
        { label: 'Treinamento OK', value: trainingDone.length, icon: 'school' },
        { label: 'Crachá Emitido', value: badgeCompleted.length, icon: 'badge' },
        { label: 'Liberado', value: badgeCompleted.length, icon: 'verified' }
    ];

    return {
        today,
        vacancy,
        activeCandidates,
        declined: CANDIDATES.filter(c => c.declined_date),
        asoPending,
        activationPending,
        asoLate,
        activationLate,
        badgeQueue,
        badgePending,
        badgeCompleted,
        badgeLate,
        badgeJustificationPending,
        openVacancyRows,
        orphanRecruitment,
        alojamento,
        canceledSolicitations,
        funnel,
        trainingDone
    };
}

function buildDashboardGargalos(metrics) {
    const rows = [];

    metrics.asoLate.forEach(c => rows.push({
        type: 'ASO atrasado',
        owner: c.name,
        ref: `${c.func} • RM ${c.rm || '-'} • ${c.digital_obra || 'SEM OBRA'}`,
        planned: c.aso_planned,
        real: c.aso || '',
        late: getDashboardLateDays(c.aso_planned, metrics.today),
        action: 'Agendar ou atualizar ASO real',
        open: () => `openEditPersonModal(${c.id})`
    }));

    metrics.activationLate.forEach(c => rows.push({
        type: 'Admissão atrasada',
        owner: c.name,
        ref: `${c.func} • RM ${c.rm || '-'} • ${c.digital_obra || 'SEM OBRA'}`,
        planned: c.admission_planned,
        real: c.admitted || '',
        late: getDashboardLateDays(c.admission_planned, metrics.today),
        action: 'Atualizar data real de admissão',
        open: () => `openEditPersonModal(${c.id})`
    }));

    metrics.badgeLate.forEach(c => rows.push({
        type: 'Crachá atrasado',
        owner: c.name,
        ref: `${c.func} • ${c.digital_obra || 'SEM OBRA'}`,
        planned: getBadgeReleaseDate(c),
        real: c.badge_real_date || '',
        late: getDashboardLateDays(getBadgeReleaseDate(c), metrics.today),
        action: 'Cobrar emissão real do crachá',
        open: () => `selectPage('cracha')`
    }));

    metrics.badgeJustificationPending.forEach(c => rows.push({
        type: 'Justificativa pendente',
        owner: c.name,
        ref: `${c.func} • Crachá emitido fora do prazo`,
        planned: getBadgeReleaseDate(c),
        real: c.badge_real_date || '',
        late: getDashboardLateDays(getBadgeReleaseDate(c), c.badge_real_date),
        action: 'Preencher justificativa de atraso',
        open: () => `selectPage('cracha')`
    }));

    metrics.openVacancyRows.forEach(row => rows.push({
        type: 'Vaga sem baixa',
        owner: `RM ${row.rm || '-'} • ${row.digital_obra || 'SEM OBRA'}`,
        ref: `${row.func} • Saldo ${row.open} de ${row.requested}`,
        planned: '',
        real: '',
        late: row.open,
        action: 'Recrutar para esta RM/obra',
        open: () => `openRecruitmentFromVacancy(${jsArg(row.func)}, ${jsArg(row.rm)}, ${jsArg(row.digital_obra)})`
    }));

    metrics.orphanRecruitment.forEach(row => rows.push({
        type: 'Recrutamento sem RM',
        owner: row.func,
        ref: `${row.recruited} pessoa(s) sem vínculo de RM/Digital`,
        planned: '',
        real: '',
        late: row.recruited,
        action: 'Vincular pessoa à RM correta',
        open: () => `selectPage('recrutamento')`
    }));

    return rows.sort((a, b) => Number(b.late || 0) - Number(a.late || 0)).slice(0, 10);
}

function renderDashboardCard(label, value, subtitle, icon, color = 'primary', border = 'border-l-primary') {
    const colorMap = {
        primary: 'text-primary',
        green: 'text-green-400',
        amber: 'text-amber-400',
        red: 'text-red-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        cyan: 'text-cyan-400'
    };
    const textColor = colorMap[color] || colorMap.primary;
    return `
        <div class="card p-4 rounded-2xl border-l-4 ${border}">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <p class="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">${escapeHtml(label)}</p>
                    <div class="text-3xl font-display font-black ${textColor}">${value}</div>
                </div>
                <span class="material-symbols-outlined ${textColor} text-2xl">${icon}</span>
            </div>
            <p class="text-[10px] text-muted mt-2 leading-snug">${escapeHtml(subtitle)}</p>
        </div>
    `;
}

function renderDashboardFunnel(metrics) {
    const max = Math.max(...metrics.funnel.map(s => s.value), 1);
    return metrics.funnel.map((stage, index) => {
        const pct = Math.round((stage.value / max) * 100);
        const prev = index > 0 ? metrics.funnel[index - 1].value : stage.value;
        const conversion = prev > 0 ? Math.round((stage.value / prev) * 100) : 0;
        return `
            <div class="relative p-4 rounded-2xl border border-outline-variant bg-surface-container-low overflow-hidden">
                <div class="absolute inset-y-0 left-0 bg-primary/10" style="width:${pct}%"></div>
                <div class="relative flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                        <span class="material-symbols-outlined text-primary text-xl">${stage.icon}</span>
                        <div class="min-w-0">
                            <p class="text-xs font-bold text-on-surface truncate">${escapeHtml(stage.label)}</p>
                            <p class="text-[10px] text-muted">${index === 0 ? 'Base solicitada' : `${conversion}% da etapa anterior`}</p>
                        </div>
                    </div>
                    <div class="text-2xl font-display font-black text-primary">${stage.value}</div>
                </div>
            </div>
        `;
    }).join('');
}

function renderDashboardMiniBar(label, value, total, colorClass = 'bg-primary') {
    const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
    return `
        <div>
            <div class="flex items-center justify-between gap-3 mb-1">
                <span class="text-xs text-muted truncate">${escapeHtml(label)}</span>
                <span class="text-xs font-mono font-black text-on-surface">${value}</span>
            </div>
            <div class="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div class="${colorClass} h-full" style="width:${pct}%"></div>
            </div>
        </div>
    `;
}

function renderDashboard() {
    const container = document.getElementById('page-dashboard');
    const metrics = getDashboardMetrics();
    const vacancy = metrics.vacancy;
    const gargalos = buildDashboardGargalos(metrics);
    const coveragePct = vacancy.requested > 0 ? Math.min(100, Math.round((vacancy.recruited / vacancy.requested) * 100)) : 0;
    const criticalCount = metrics.asoLate.length + metrics.activationLate.length + metrics.badgeLate.length + metrics.badgeJustificationPending.length + metrics.openVacancyRows.length;
    const vacancyRows = vacancy.rows.slice(0, 8);
    const alojamentoRows = metrics.alojamento
        .slice()
        .sort((a, b) => String(a.admission_planned || '').localeCompare(String(b.admission_planned || '')) || a.name.localeCompare(b.name, 'pt-BR'))
        .slice(0, 8);
    const crachaRows = metrics.badgeQueue
        .slice()
        .sort((a, b) => String(getBadgeReleaseDate(a) || '').localeCompare(String(getBadgeReleaseDate(b) || '')) || a.name.localeCompare(b.name, 'pt-BR'))
        .slice(0, 8);
    const functionsRank = [...new Set(metrics.activeCandidates.map(c => c.func))]
        .map(func => ({ func, count: metrics.activeCandidates.filter(c => c.func === func).length }))
        .sort((a, b) => b.count - a.count || a.func.localeCompare(b.func, 'pt-BR'))
        .slice(0, 8);
    const maxFunctionCount = Math.max(...functionsRank.map(f => f.count), 1);

    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                <div>
                    <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                        <span class="material-symbols-outlined text-sm">monitoring</span> Central de Comando
                    </div>
                    <h3 class="font-display font-black text-2xl text-on-surface">Dashboard Executivo de Mobilização</h3>
                    <p class="text-xs text-muted mt-1">Visão integrada de Solicitação M.O., Vagas, Recrutamento, Mobilização, Crachá e Alojamento.</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge bg-primary/10 text-primary border-primary/20">Atualizado: ${formatDashboardDate(metrics.today)}</span>
                    <span class="badge ${criticalCount ? 'bg-error/10 text-error border-error/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}">${criticalCount} gargalo(s)</span>
                    <button onclick="selectPage('solicitacao')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">assignment_add</span> Solicitações</button>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8 gap-4">
                ${renderDashboardCard('Vagas Solicitadas', vacancy.requested, 'Total ativo das RMs não canceladas.', 'event_seat', 'primary', 'border-l-primary')}
                ${renderDashboardCard('Vagas em Aberto', vacancy.open, 'Saldo ainda não baixado pelo recrutamento.', 'hourglass_empty', vacancy.open ? 'amber' : 'green', vacancy.open ? 'border-l-amber-500' : 'border-l-green-500')}
                ${renderDashboardCard('Recrutados', metrics.activeCandidates.length, 'Pessoas ativas cadastradas.', 'person_search', 'blue', 'border-l-blue-500')}
                ${renderDashboardCard('ASO Pendente', metrics.asoPending.length, 'Sem data real de ASO.', 'health_and_safety', metrics.asoPending.length ? 'amber' : 'green', metrics.asoPending.length ? 'border-l-amber-500' : 'border-l-green-500')}
                ${renderDashboardCard('Admissão Pendente', metrics.activationPending.length, 'Com ASO real e sem admissão real.', 'how_to_reg', metrics.activationPending.length ? 'amber' : 'green', metrics.activationPending.length ? 'border-l-amber-500' : 'border-l-green-500')}
                ${renderDashboardCard('Em Mobilização', metrics.activeCandidates.filter(c => c.admitted).length, 'Com data real de admissão.', 'engineering', 'purple', 'border-l-purple-500')}
                ${renderDashboardCard('Crachá Pendente', metrics.badgePending.length, 'Fila de crachá sem conclusão.', 'badge', metrics.badgePending.length ? 'amber' : 'green', metrics.badgePending.length ? 'border-l-amber-500' : 'border-l-green-500')}
                ${renderDashboardCard('Liberados', metrics.badgeCompleted.length, 'Crachá emitido e validado.', 'verified', 'green', 'border-l-green-500')}
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div class="card p-6 rounded-2xl xl:col-span-2">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                        <div>
                            <h4 class="text-sm font-bold">Funil de Mobilização</h4>
                            <p class="text-xs text-muted">Da demanda formal até liberação por crachá.</p>
                        </div>
                        <span class="badge ${coveragePct >= 100 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-primary/10 text-primary border-primary/20'}">${coveragePct}% cobertura de vagas</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                        ${renderDashboardFunnel(metrics)}
                    </div>
                </div>

                <div class="card p-6 rounded-2xl">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h4 class="text-sm font-bold">Alertas Críticos</h4>
                            <p class="text-xs text-muted">Pendências que travam a liberação.</p>
                        </div>
                        <span class="material-symbols-outlined ${criticalCount ? 'text-error alert-pulse' : 'text-green-400'}">${criticalCount ? 'warning' : 'check_circle'}</span>
                    </div>
                    <div class="space-y-4">
                        ${renderDashboardMiniBar('ASO atrasado', metrics.asoLate.length, Math.max(metrics.activeCandidates.length, 1), 'bg-red-500')}
                        ${renderDashboardMiniBar('Admissão atrasada', metrics.activationLate.length, Math.max(metrics.activeCandidates.length, 1), 'bg-red-500')}
                        ${renderDashboardMiniBar('Crachá atrasado', metrics.badgeLate.length, Math.max(metrics.badgeQueue.length, 1), 'bg-amber-500')}
                        ${renderDashboardMiniBar('Justificativa crachá pendente', metrics.badgeJustificationPending.length, Math.max(metrics.badgeQueue.length, 1), 'bg-amber-500')}
                        ${renderDashboardMiniBar('Vagas em aberto', vacancy.open, Math.max(vacancy.requested, 1), 'bg-primary')}
                        ${renderDashboardMiniBar('Necessidade alojamento', metrics.alojamento.length, Math.max(metrics.activeCandidates.length, 1), 'bg-cyan-500')}
                    </div>
                </div>
            </div>

            <div class="card rounded-2xl overflow-hidden">
                <div class="p-5 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-low">
                    <div>
                        <h4 class="text-sm font-bold">Gargalos Prioritários</h4>
                        <p class="text-xs text-muted">Lista acionável por atraso, saldo ou inconsistência de vínculo.</p>
                    </div>
                    <button onclick="selectPage('mobilizacao')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">account_tree</span> Ver fluxo</button>
                </div>
                <div class="table-scroll">
                    <table class="w-full min-w-[1050px] text-left text-sm">
                        <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                            <tr>
                                <th class="px-5 py-4">Tipo</th>
                                <th class="px-5 py-4">Pessoa / RM</th>
                                <th class="px-5 py-4">Referência</th>
                                <th class="px-5 py-4">Previsto</th>
                                <th class="px-5 py-4">Realizado</th>
                                <th class="px-5 py-4 text-center">Atraso/Saldo</th>
                                <th class="px-5 py-4">Ação necessária</th>
                                <th class="px-5 py-4 text-right">Abrir</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-outline-variant">
                            ${gargalos.length ? gargalos.map(g => `
                                <tr class="hover:bg-surface-container-highest transition-colors">
                                    <td class="px-5 py-4"><span class="badge bg-error/10 text-error border-error/20">${escapeHtml(g.type)}</span></td>
                                    <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(g.owner)}</td>
                                    <td class="px-5 py-4 text-xs text-muted">${escapeHtml(g.ref)}</td>
                                    <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(g.planned)}</td>
                                    <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(g.real)}</td>
                                    <td class="px-5 py-4 text-center font-mono font-black text-error">${g.late}</td>
                                    <td class="px-5 py-4 text-xs text-on-surface">${escapeHtml(g.action)}</td>
                                    <td class="px-5 py-4 text-right"><button onclick="${g.open()}" class="btn btn-ghost text-[10px] border border-outline-variant">Abrir</button></td>
                                </tr>
                            `).join('') : '<tr><td colspan="8" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhum gargalo crítico identificado no momento.</div></td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div class="card rounded-2xl overflow-hidden xl:col-span-2">
                    <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
                        <div>
                            <h4 class="text-sm font-bold">Vagas por Nº Obra / RM / Função</h4>
                            <p class="text-xs text-muted">Baixa controlada por RM + Obra + Função.</p>
                        </div>
                        <button onclick="selectPage('vagas')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">view_list</span> Ver vagas</button>
                    </div>
                    <div class="table-scroll">
                        <table class="w-full min-w-[860px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                                <tr>
                                    <th class="px-5 py-4">Nº Obra</th>
                                    <th class="px-5 py-4">RM</th>
                                    <th class="px-5 py-4">Função</th>
                                    <th class="px-5 py-4 text-center">Solicitado</th>
                                    <th class="px-5 py-4 text-center">Baixado</th>
                                    <th class="px-5 py-4 text-center">Saldo</th>
                                    <th class="px-5 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${vacancyRows.length ? vacancyRows.map(row => {
                                    const status = row.requested > 0 && row.open === 0
                                        ? '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Atendida</span>'
                                        : row.sem_rm
                                            ? '<span class="badge bg-red-500/10 text-red-400 border-red-500/20">Sem RM</span>'
                                            : '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Aberta</span>';
                                    return `
                                        <tr class="hover:bg-surface-container-highest transition-colors">
                                            <td class="px-5 py-4 font-mono font-bold text-primary">${escapeHtml(row.digital_obra || '-')}</td>
                                            <td class="px-5 py-4 font-mono">${escapeHtml(row.rm || '-')}</td>
                                            <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(row.func)}</td>
                                            <td class="px-5 py-4 text-center font-mono font-bold">${row.requested}</td>
                                            <td class="px-5 py-4 text-center font-mono font-bold text-blue-400">${row.recruited}</td>
                                            <td class="px-5 py-4 text-center font-mono font-bold ${row.open ? 'text-amber-400' : 'text-green-400'}">${row.open}</td>
                                            <td class="px-5 py-4">${status}</td>
                                        </tr>
                                    `;
                                }).join('') : '<tr><td colspan="7" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma solicitação ativa cadastrada.</div></td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card p-6 rounded-2xl">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h4 class="text-sm font-bold">Ranking por Função</h4>
                            <p class="text-xs text-muted">Distribuição dos cadastros ativos.</p>
                        </div>
                        <span class="badge bg-primary/10 text-primary border-primary/20">Top ${functionsRank.length}</span>
                    </div>
                    <div class="space-y-4">
                        ${functionsRank.length ? functionsRank.map(f => renderDashboardMiniBar(f.func, f.count, maxFunctionCount, 'bg-primary')).join('') : '<div class="empty-state rounded-xl p-6 text-center text-muted">Nenhuma pessoa ativa cadastrada.</div>'}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div class="card rounded-2xl overflow-hidden">
                    <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
                        <div>
                            <h4 class="text-sm font-bold">Alojamento</h4>
                            <p class="text-xs text-muted">Pessoas marcadas com necessidade de alojamento.</p>
                        </div>
                        <button onclick="selectPage('alojamento')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">home</span> Ver alojamento</button>
                    </div>
                    <div class="table-scroll">
                        <table class="w-full min-w-[720px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                                <tr>
                                    <th class="px-5 py-4">Pessoa</th>
                                    <th class="px-5 py-4">Função</th>
                                    <th class="px-5 py-4">Nº Obra</th>
                                    <th class="px-5 py-4">Admissão</th>
                                    <th class="px-5 py-4">Necessidade</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${alojamentoRows.length ? alojamentoRows.map(c => `
                                    <tr class="hover:bg-surface-container-highest transition-colors">
                                        <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(c.name)}</td>
                                        <td class="px-5 py-4 text-xs text-muted">${escapeHtml(c.func)}</td>
                                        <td class="px-5 py-4 font-mono text-primary">${escapeHtml(c.digital_obra || c.rm || '-')}</td>
                                        <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(c.admitted || c.admission_planned)}</td>
                                        <td class="px-5 py-4"><span class="badge bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Sim</span></td>
                                    </tr>
                                `).join('') : '<tr><td colspan="5" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma necessidade de alojamento informada.</div></td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card rounded-2xl overflow-hidden">
                    <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
                        <div>
                            <h4 class="text-sm font-bold">Crachá</h4>
                            <p class="text-xs text-muted">Fila após treinamentos obrigatórios concluídos.</p>
                        </div>
                        <button onclick="selectPage('cracha')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">badge</span> Ver crachá</button>
                    </div>
                    <div class="table-scroll">
                        <table class="w-full min-w-[760px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                                <tr>
                                    <th class="px-5 py-4">Pessoa</th>
                                    <th class="px-5 py-4">Função</th>
                                    <th class="px-5 py-4">Previsão</th>
                                    <th class="px-5 py-4">Real</th>
                                    <th class="px-5 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${crachaRows.length ? crachaRows.map(c => {
                                    const delayed = isBadgeDelayed(c) && !cleanString(c.badge_delay_reason || '', 500);
                                    const completed = isBadgeCompleted(c);
                                    const status = completed
                                        ? '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Concluído</span>'
                                        : delayed
                                            ? '<span class="badge bg-error/10 text-error border-error/20">Justificar</span>'
                                            : '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Pendente</span>';
                                    return `
                                        <tr class="hover:bg-surface-container-highest transition-colors">
                                            <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(c.name)}</td>
                                            <td class="px-5 py-4 text-xs text-muted">${escapeHtml(c.func)}</td>
                                            <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(getBadgeReleaseDate(c))}</td>
                                            <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(c.badge_real_date)}</td>
                                            <td class="px-5 py-4">${status}</td>
                                        </tr>
                                    `;
                                }).join('') : '<tr><td colspan="5" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma pessoa na fila de crachá.</div></td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                ${[
                    ['Planejamento', 'Controla aderência entre demanda da obra e saldo por RM.', 'event_available'],
                    ['RH', 'Mostra quem está parado em ASO ou admissão.', 'groups'],
                    ['Mobilização', 'Evidencia crachá, treinamento e bloqueios de liberação.', 'engineering'],
                    ['Alojamento', 'Centraliza a necessidade por pessoa e Nº Obra.', 'home'],
                    ['BI / QA', 'Consolida indicadores acionáveis e inconsistências.', 'analytics']
                ].map(s => `
                    <div class="card p-4 rounded-2xl">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="material-symbols-outlined text-primary text-xl">${s[2]}</span>
                            <h5 class="font-bold text-sm text-on-surface">${s[0]}</h5>
                        </div>
                        <p class="text-[11px] text-muted leading-relaxed">${s[1]}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    updateVacancyBadge();
}

function renderEspecialistas() {
    switchPage('pipeline');
}



// ============================================================
// ✅ DASHBOARD EXECUTIVO — FILTRO GLOBAL POR OBRA + CONTAINERS CLICÁVEIS
// ============================================================
var DASHBOARD_ALL_OBRAS = '__TODAS__';
var dashboardSelectedObra = localStorage.getItem('mobilizaprp-dashboard-obra-filter') || DASHBOARD_ALL_OBRAS;

function dashboardGo(page) {
    if (typeof selectPage === 'function') selectPage(page);
}

function getDashboardObraDescriptor(entity = {}) {
    // Filtro global do dashboard usa exclusivamente o campo Obra.
    // RM não é mais usada como alternativa para compor o filtro por obra.
    const digital = cleanAlphanumeric(entity.digital_obra || entity.digitalObra || entity.obra_digital || entity.digital_vinculada || '', 40);
    if (digital) return { key: `DIGITAL:${digital}`, label: digital, type: 'digital', raw: digital };
    return { key: 'SEM_DIGITAL', label: 'Sem Obra', type: 'none', raw: '' };
}

function getDashboardAvailableObras() {
    const map = new Map();
    const add = (entity) => {
        const d = getDashboardObraDescriptor(entity);
        if (!d.raw) return;
        if (!map.has(d.key)) map.set(d.key, { ...d, count: 0 });
        map.get(d.key).count += 1;
    };

    SOLICITATIONS.forEach(s => { if (!isSolicitationCanceled(s)) add(s); });
    CANDIDATES.forEach(c => { if (!c.declined_date) add(c); });

    return Array.from(map.values()).sort((a, b) =>
        a.label.localeCompare(b.label, 'pt-BR', { numeric: true, sensitivity: 'base' })
    );
}

function getDashboardActiveObraFilter() {
    const availableKeys = new Set(getDashboardAvailableObras().map(o => o.key));
    if (!dashboardSelectedObra || dashboardSelectedObra === DASHBOARD_ALL_OBRAS) return DASHBOARD_ALL_OBRAS;
    if (!availableKeys.has(dashboardSelectedObra)) {
        dashboardSelectedObra = DASHBOARD_ALL_OBRAS;
        localStorage.setItem('mobilizaprp-dashboard-obra-filter', dashboardSelectedObra);
    }
    return dashboardSelectedObra;
}

function dashboardEntityMatchesObraFilter(entity, filterKey = getDashboardActiveObraFilter()) {
    if (!filterKey || filterKey === DASHBOARD_ALL_OBRAS) return true;
    return getDashboardObraDescriptor(entity).key === filterKey;
}

function setDashboardObraFilter(value) {
    dashboardSelectedObra = cleanString(value, 80) || DASHBOARD_ALL_OBRAS;
    localStorage.setItem('mobilizaprp-dashboard-obra-filter', dashboardSelectedObra);
    renderDashboard();
}

function clearDashboardObraFilter() {
    setDashboardObraFilter(DASHBOARD_ALL_OBRAS);
}

function renderDashboardObraFilter(selected, available) {
    const selectedInfo = selected === DASHBOARD_ALL_OBRAS
        ? 'Todas as obras'
        : (available.find(o => o.key === selected)?.label || 'Filtro ativo');

    return `
        <div class="card p-5 rounded-2xl border-l-4 border-l-cyan-500">
            <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div class="min-w-0">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="material-symbols-outlined text-cyan-400 text-xl">filter_alt</span>
                        <h4 class="font-display font-bold text-lg text-on-surface">Filtro por Obra</h4>
                    </div>
                    <p class="text-xs text-muted">Atualiza automaticamente cards, funil, alertas, vagas, alojamento e crachá usando o Obra.</p>
                    <p class="text-[11px] text-cyan-400 font-bold mt-2">Filtro atual: ${escapeHtml(selectedInfo)}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-2 sm:items-center w-full lg:w-auto">
                    <select id="dashboard-obra-filter" onchange="setDashboardObraFilter(this.value)" class="modal-input min-w-[260px]">
                        <option value="${DASHBOARD_ALL_OBRAS}" ${selected === DASHBOARD_ALL_OBRAS ? 'selected' : ''}>Todas as obras</option>
                        ${available.map(o => `<option value="${escapeHtml(o.key)}" ${selected === o.key ? 'selected' : ''}>${escapeHtml(o.label)} (${o.count})</option>`).join('')}
                    </select>
                    <button onclick="clearDashboardObraFilter()" class="btn btn-ghost text-xs border border-outline-variant whitespace-nowrap">
                        <span class="material-symbols-outlined text-sm">restart_alt</span> Limpar
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getDashboardMetrics() {
    const today = todayInputDate();
    CANDIDATES.forEach(refreshBadgeConclusion);

    const selectedObra = getDashboardActiveObraFilter();
    const availableObras = getDashboardAvailableObras();
    const vacancyRows = getVacancyRows().filter(row => dashboardEntityMatchesObraFilter(row, selectedObra));
    const vacancy = {
        requested: vacancyRows.reduce((sum, row) => sum + row.requested, 0),
        recruited: vacancyRows.reduce((sum, row) => sum + row.recruited, 0),
        declined: vacancyRows.reduce((sum, row) => sum + row.declined, 0),
        open: vacancyRows.reduce((sum, row) => sum + row.open, 0),
        over: vacancyRows.reduce((sum, row) => sum + row.over, 0),
        rows: vacancyRows
    };

    const activeCandidates = CANDIDATES
        .filter(c => !c.declined_date)
        .filter(c => dashboardEntityMatchesObraFilter(c, selectedObra));

    const asoPending = activeCandidates.filter(c => !c.aso);
    const activationPending = activeCandidates.filter(c => c.aso && !c.admitted);
    const asoLate = activeCandidates.filter(c => c.aso_planned && !c.aso && c.aso_planned < today);
    const activationLate = activeCandidates.filter(c => c.admission_planned && !c.admitted && c.admission_planned < today);
    const badgeQueue = activeCandidates.filter(c => c.badge_posted_date || hasCompletedRequiredTrainings(c));
    const badgePending = badgeQueue.filter(c => !isBadgeCompleted(c));
    const badgeCompleted = badgeQueue.filter(c => isBadgeCompleted(c));
    const badgeLate = badgePending.filter(c => getBadgeReleaseDate(c) && getBadgeReleaseDate(c) < today);
    const badgeJustificationPending = badgeQueue.filter(c => isBadgeDelayed(c) && !cleanString(c.badge_delay_reason || '', 500));
    const alojamento = activeCandidates.filter(c => c.alojado);
    const canceledSolicitations = SOLICITATIONS
        .filter(isSolicitationCanceled)
        .filter(s => dashboardEntityMatchesObraFilter(s, selectedObra));
    const trainingDone = activeCandidates.filter(hasCompletedRequiredTrainings);
    const openVacancyRows = vacancy.rows.filter(row => row.open > 0 && row.requested > 0 && !row.sem_rm);
    const orphanRecruitment = vacancy.rows.filter(row => row.sem_rm && row.recruited > 0);

    const funnel = [
        { label: 'Solicitação M.O.', value: vacancy.requested, icon: 'assignment_add', page: 'solicitacao' },
        { label: 'Recrutamento', value: activeCandidates.length, icon: 'person_search', page: 'recrutamento' },
        { label: 'ASO Real', value: activeCandidates.filter(c => c.aso).length, icon: 'health_and_safety', page: 'recrutamento' },
        { label: 'Admissão Real', value: activeCandidates.filter(c => c.admitted).length, icon: 'how_to_reg', page: 'recrutamento' },
        { label: 'Mobilização', value: activeCandidates.filter(c => c.admitted).length, icon: 'engineering', page: 'mobilizacao' },
        { label: 'Treinamento OK', value: trainingDone.length, icon: 'school', page: 'mobilizacao' },
        { label: 'Crachá Emitido', value: badgeCompleted.length, icon: 'badge', page: 'cracha' },
        { label: 'Liberado', value: badgeCompleted.length, icon: 'verified', page: 'cracha' }
    ];

    return {
        today,
        selectedObra,
        availableObras,
        vacancy,
        activeCandidates,
        declined: CANDIDATES.filter(c => c.declined_date).filter(c => dashboardEntityMatchesObraFilter(c, selectedObra)),
        asoPending,
        activationPending,
        asoLate,
        activationLate,
        badgeQueue,
        badgePending,
        badgeCompleted,
        badgeLate,
        badgeJustificationPending,
        openVacancyRows,
        orphanRecruitment,
        alojamento,
        canceledSolicitations,
        funnel,
        trainingDone
    };
}

function renderDashboardCard(label, value, subtitle, icon, color = 'primary', border = 'border-l-primary', targetPage = 'dashboard') {
    const colorMap = {
        primary: 'text-primary',
        green: 'text-green-400',
        amber: 'text-amber-400',
        red: 'text-red-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        cyan: 'text-cyan-400'
    };
    const textColor = colorMap[color] || colorMap.primary;
    return `
        <button type="button" onclick="dashboardGo('${targetPage}')" class="card text-left p-4 rounded-2xl border-l-4 ${border} cursor-pointer hover:ring-1 hover:ring-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/60">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <p class="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">${escapeHtml(label)}</p>
                    <div class="text-3xl font-display font-black ${textColor}">${value}</div>
                </div>
                <span class="material-symbols-outlined ${textColor} text-2xl">${icon}</span>
            </div>
            <p class="text-[10px] text-muted mt-2 leading-snug">${escapeHtml(subtitle)}</p>
            <p class="text-[10px] text-primary font-bold mt-3 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">open_in_new</span> Abrir informação
            </p>
        </button>
    `;
}

function renderDashboardFunnel(metrics) {
    const max = Math.max(...metrics.funnel.map(s => s.value), 1);
    return metrics.funnel.map((stage, index) => {
        const pct = Math.round((stage.value / max) * 100);
        const prev = index > 0 ? metrics.funnel[index - 1].value : stage.value;
        const conversion = prev > 0 ? Math.round((stage.value / prev) * 100) : 0;
        return `
            <button type="button" onclick="dashboardGo('${stage.page || 'dashboard'}')" class="relative text-left p-4 rounded-2xl border border-outline-variant bg-surface-container-low overflow-hidden cursor-pointer hover:border-primary/60 hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/50">
                <div class="absolute inset-y-0 left-0 bg-primary/10" style="width:${pct}%"></div>
                <div class="relative flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                        <span class="material-symbols-outlined text-primary text-xl">${stage.icon}</span>
                        <div class="min-w-0">
                            <p class="text-xs font-bold text-on-surface truncate">${escapeHtml(stage.label)}</p>
                            <p class="text-[10px] text-muted">${index === 0 ? 'Base solicitada' : `${conversion}% da etapa anterior`}</p>
                        </div>
                    </div>
                    <div class="text-2xl font-display font-black text-primary">${stage.value}</div>
                </div>
            </button>
        `;
    }).join('');
}

function renderDashboardMiniBar(label, value, total, colorClass = 'bg-primary', targetPage = 'dashboard') {
    const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
    return `
        <button type="button" onclick="dashboardGo('${targetPage}')" class="block w-full text-left rounded-xl p-2 -m-2 hover:bg-surface-container-high focus:outline-none focus:ring-2 focus:ring-primary/50">
            <div class="flex items-center justify-between gap-3 mb-1">
                <span class="text-xs text-muted truncate">${escapeHtml(label)}</span>
                <span class="text-xs font-mono font-black text-on-surface">${value}</span>
            </div>
            <div class="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div class="${colorClass} h-full" style="width:${pct}%"></div>
            </div>
        </button>
    `;
}

function renderDashboard() {
    const container = document.getElementById('page-dashboard');
    if (!container) return;

    const metrics = getDashboardMetrics();
    const vacancy = metrics.vacancy;
    const coveragePct = vacancy.requested > 0 ? Math.min(100, Math.round((vacancy.recruited / vacancy.requested) * 100)) : 0;
    const criticalCount = metrics.asoLate.length + metrics.activationLate.length + metrics.badgeLate.length + metrics.badgeJustificationPending.length + metrics.openVacancyRows.length;
    const vacancyRows = vacancy.rows.slice(0, 10);
    const alojamentoRows = metrics.alojamento
        .slice()
        .sort((a, b) => String(a.admission_planned || '').localeCompare(String(b.admission_planned || '')) || a.name.localeCompare(b.name, 'pt-BR'))
        .slice(0, 8);
    const crachaRows = metrics.badgeQueue
        .slice()
        .sort((a, b) => String(getBadgeReleaseDate(a) || '').localeCompare(String(getBadgeReleaseDate(b) || '')) || a.name.localeCompare(b.name, 'pt-BR'))
        .slice(0, 8);
    const functionsRank = [...new Set(metrics.activeCandidates.map(c => c.func))]
        .map(func => ({ func, count: metrics.activeCandidates.filter(c => c.func === func).length }))
        .sort((a, b) => b.count - a.count || a.func.localeCompare(b.func, 'pt-BR'))
        .slice(0, 8);
    const maxFunctionCount = Math.max(...functionsRank.map(f => f.count), 1);

    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                <div>
                    <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                        <span class="material-symbols-outlined text-sm">monitoring</span> Central de Comando
                    </div>
                    <h3 class="font-display font-black text-2xl text-on-surface">Dashboard Executivo de Mobilização</h3>
                    <p class="text-xs text-muted mt-1">Visão integrada de Solicitação M.O., Vagas, Recrutamento, Mobilização, Crachá e Alojamento.</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge bg-primary/10 text-primary border-primary/20">Atualizado: ${formatDashboardDate(metrics.today)}</span>
                    <span class="badge ${criticalCount ? 'bg-error/10 text-error border-error/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}">${criticalCount} alerta(s)</span>
                    <button onclick="dashboardGo('solicitacao')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">assignment_add</span> Solicitações</button>
                    <button onclick="dashboardGo('vagas')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">view_list</span> Vagas</button>
                </div>
            </div>

            ${renderDashboardObraFilter(metrics.selectedObra, metrics.availableObras)}

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                ${renderDashboardCard('Vagas Solicitadas', vacancy.requested, 'Total ativo das RMs não canceladas.', 'event_seat', 'primary', 'border-l-primary', 'solicitacao')}
                ${renderDashboardCard('Vagas em Aberto', vacancy.open, 'Saldo ainda não baixado pelo recrutamento.', 'hourglass_empty', vacancy.open ? 'amber' : 'green', vacancy.open ? 'border-l-amber-500' : 'border-l-green-500', 'vagas')}
                ${renderDashboardCard('Recrutados', metrics.activeCandidates.length, 'Pessoas ativas cadastradas.', 'person_search', 'blue', 'border-l-blue-500', 'recrutamento')}
                ${renderDashboardCard('ASO Pendente', metrics.asoPending.length, 'Sem data real de ASO.', 'health_and_safety', metrics.asoPending.length ? 'amber' : 'green', metrics.asoPending.length ? 'border-l-amber-500' : 'border-l-green-500', 'recrutamento')}
                ${renderDashboardCard('Admissão Pendente', metrics.activationPending.length, 'Com ASO real e sem admissão real.', 'how_to_reg', metrics.activationPending.length ? 'amber' : 'green', metrics.activationPending.length ? 'border-l-amber-500' : 'border-l-green-500', 'recrutamento')}
                ${renderDashboardCard('Em Mobilização', metrics.activeCandidates.filter(c => c.admitted).length, 'Com data real de admissão.', 'engineering', 'purple', 'border-l-purple-500', 'mobilizacao')}
                ${renderDashboardCard('Crachá Pendente', metrics.badgePending.length, 'Fila de crachá sem conclusão.', 'badge', metrics.badgePending.length ? 'amber' : 'green', metrics.badgePending.length ? 'border-l-amber-500' : 'border-l-green-500', 'cracha')}
                ${renderDashboardCard('Liberados', metrics.badgeCompleted.length, 'Crachá emitido e validado.', 'verified', 'green', 'border-l-green-500', 'cracha')}
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div class="xl:col-span-2 card p-6 rounded-2xl">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h4 class="text-sm font-bold">Funil de Mobilização</h4>
                            <p class="text-xs text-muted">Clique em qualquer etapa para abrir o módulo de origem.</p>
                        </div>
                        <span class="badge bg-primary/10 text-primary border-primary/20">Cobertura ${coveragePct}%</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                        ${renderDashboardFunnel(metrics)}
                    </div>
                </div>

                <div class="card p-6 rounded-2xl">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h4 class="text-sm font-bold">Alertas Críticos</h4>
                            <p class="text-xs text-muted">Containers clicáveis por origem da informação.</p>
                        </div>
                        <span class="material-symbols-outlined ${criticalCount ? 'text-error alert-pulse' : 'text-green-400'}">${criticalCount ? 'warning' : 'check_circle'}</span>
                    </div>
                    <div class="space-y-4">
                        ${renderDashboardMiniBar('ASO atrasado', metrics.asoLate.length, Math.max(metrics.activeCandidates.length, 1), 'bg-red-500', 'recrutamento')}
                        ${renderDashboardMiniBar('Admissão atrasada', metrics.activationLate.length, Math.max(metrics.activeCandidates.length, 1), 'bg-red-500', 'recrutamento')}
                        ${renderDashboardMiniBar('Crachá atrasado', metrics.badgeLate.length, Math.max(metrics.badgeQueue.length, 1), 'bg-amber-500', 'cracha')}
                        ${renderDashboardMiniBar('Justificativa crachá pendente', metrics.badgeJustificationPending.length, Math.max(metrics.badgeQueue.length, 1), 'bg-amber-500', 'cracha')}
                        ${renderDashboardMiniBar('Vagas em aberto', vacancy.open, Math.max(vacancy.requested, 1), 'bg-primary', 'vagas')}
                        ${renderDashboardMiniBar('Necessidade alojamento', metrics.alojamento.length, Math.max(metrics.activeCandidates.length, 1), 'bg-cyan-500', 'alojamento')}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div class="xl:col-span-2 card rounded-2xl overflow-hidden">
                    <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
                        <div>
                            <h4 class="text-sm font-bold">Vagas por Nº Obra / RM / Função</h4>
                            <p class="text-xs text-muted">Linhas clicáveis abrem o controle de vagas.</p>
                        </div>
                        <button onclick="dashboardGo('vagas')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">view_list</span> Ver Vagas</button>
                    </div>
                    <div class="table-scroll">
                        <table class="w-full min-w-[860px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                                <tr>
                                    <th class="px-5 py-4">Nº Obra</th>
                                    <th class="px-5 py-4">RM</th>
                                    <th class="px-5 py-4">Função</th>
                                    <th class="px-5 py-4 text-center">Solicitado</th>
                                    <th class="px-5 py-4 text-center">Baixado</th>
                                    <th class="px-5 py-4 text-center">Saldo</th>
                                    <th class="px-5 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${vacancyRows.length ? vacancyRows.map(row => {
                                    const status = row.requested > 0 && row.open === 0
                                        ? '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Atendida</span>'
                                        : row.sem_rm
                                            ? '<span class="badge bg-red-500/10 text-red-400 border-red-500/20">Sem RM</span>'
                                            : '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Aberta</span>';
                                    return `
                                        <tr onclick="dashboardGo('vagas')" class="hover:bg-surface-container-highest transition-colors cursor-pointer">
                                            <td class="px-5 py-4 font-mono font-bold text-primary">${escapeHtml(row.digital_obra || '-')}</td>
                                            <td class="px-5 py-4 font-mono">${escapeHtml(row.rm || '-')}</td>
                                            <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(row.func)}</td>
                                            <td class="px-5 py-4 text-center font-mono font-bold">${row.requested}</td>
                                            <td class="px-5 py-4 text-center font-mono font-bold text-blue-400">${row.recruited}</td>
                                            <td class="px-5 py-4 text-center font-mono font-bold ${row.open ? 'text-amber-400' : 'text-green-400'}">${row.open}</td>
                                            <td class="px-5 py-4">${status}</td>
                                        </tr>
                                    `;
                                }).join('') : '<tr><td colspan="7" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma solicitação ativa cadastrada no filtro atual.</div></td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card p-6 rounded-2xl">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h4 class="text-sm font-bold">Ranking por Função</h4>
                            <p class="text-xs text-muted">Distribuição dos cadastros ativos.</p>
                        </div>
                        <span class="badge bg-primary/10 text-primary border-primary/20">Top ${functionsRank.length}</span>
                    </div>
                    <div class="space-y-4">
                        ${functionsRank.length ? functionsRank.map(f => renderDashboardMiniBar(f.func, f.count, maxFunctionCount, 'bg-primary', 'recrutamento')).join('') : '<div class="empty-state rounded-xl p-6 text-center text-muted">Nenhuma pessoa ativa cadastrada no filtro atual.</div>'}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div class="card rounded-2xl overflow-hidden">
                    <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
                        <div>
                            <h4 class="text-sm font-bold">Alojamento</h4>
                            <p class="text-xs text-muted">Clique para abrir o controle de alojamento.</p>
                        </div>
                        <button onclick="dashboardGo('alojamento')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">home</span> Ver alojamento</button>
                    </div>
                    <div class="table-scroll">
                        <table class="w-full min-w-[720px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                                <tr>
                                    <th class="px-5 py-4">Pessoa</th>
                                    <th class="px-5 py-4">Função</th>
                                    <th class="px-5 py-4">Nº Obra</th>
                                    <th class="px-5 py-4">Admissão</th>
                                    <th class="px-5 py-4">Necessidade</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${alojamentoRows.length ? alojamentoRows.map(c => `
                                    <tr onclick="dashboardGo('alojamento')" class="hover:bg-surface-container-highest transition-colors cursor-pointer">
                                        <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(c.name)}</td>
                                        <td class="px-5 py-4 text-xs text-muted">${escapeHtml(c.func)}</td>
                                        <td class="px-5 py-4 font-mono text-primary">${escapeHtml(c.digital_obra || '-')}</td>
                                        <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(c.admitted || c.admission_planned)}</td>
                                        <td class="px-5 py-4"><span class="badge bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Sim</span></td>
                                    </tr>
                                `).join('') : '<tr><td colspan="5" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma necessidade de alojamento no filtro atual.</div></td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card rounded-2xl overflow-hidden">
                    <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
                        <div>
                            <h4 class="text-sm font-bold">Crachá</h4>
                            <p class="text-xs text-muted">Clique para abrir o controle de crachá.</p>
                        </div>
                        <button onclick="dashboardGo('cracha')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">badge</span> Ver crachá</button>
                    </div>
                    <div class="table-scroll">
                        <table class="w-full min-w-[760px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                                <tr>
                                    <th class="px-5 py-4">Pessoa</th>
                                    <th class="px-5 py-4">Função</th>
                                    <th class="px-5 py-4">Previsão</th>
                                    <th class="px-5 py-4">Real</th>
                                    <th class="px-5 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${crachaRows.length ? crachaRows.map(c => {
                                    const delayed = isBadgeDelayed(c) && !cleanString(c.badge_delay_reason || '', 500);
                                    const completed = isBadgeCompleted(c);
                                    const status = completed
                                        ? '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Concluído</span>'
                                        : delayed
                                            ? '<span class="badge bg-error/10 text-error border-error/20">Justificar</span>'
                                            : '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Pendente</span>';
                                    return `
                                        <tr onclick="dashboardGo('cracha')" class="hover:bg-surface-container-highest transition-colors cursor-pointer">
                                            <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(c.name)}</td>
                                            <td class="px-5 py-4 text-xs text-muted">${escapeHtml(c.func)}</td>
                                            <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(getBadgeReleaseDate(c))}</td>
                                            <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(c.badge_real_date)}</td>
                                            <td class="px-5 py-4">${status}</td>
                                        </tr>
                                    `;
                                }).join('') : '<tr><td colspan="5" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma pessoa na fila de crachá no filtro atual.</div></td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    updateVacancyBadge();
}



// ============================================================
// 📈 PIPELINE — KPIs E LEADTIME DO PROCESSO COMPLETO
// ============================================================
function parsePipelineDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return null;
    const [year, month, day] = String(value).split('-').map(Number);
    return new Date(year, month - 1, day);
}

function diffPipelineDays(startValue, endValue) {
    const start = parsePipelineDate(startValue);
    const end = parsePipelineDate(endValue);
    if (!start || !end || end < start) return null;
    return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

function latestPipelineTrainingDate(candidate) {
    const dates = (candidate?.trainings || [])
        .map(t => cleanDate(t?.date))
        .filter(Boolean);
    const importedEnd = cleanDate(candidate?.training_end_real);
    if (importedEnd) dates.push(importedEnd);
    dates.sort();
    return dates.length ? dates[dates.length - 1] : null;
}

function getPipelineLeadtimeStats() {
    const activeCandidates = CANDIDATES.filter(c => !c.declined_date);
    const stages = [
        {
            key: 'rec_aso',
            label: 'Recrutamento a ASO',
            getStart: c => c.recruited,
            getEnd: c => c.aso,
            icon: 'health_and_safety'
        },
        {
            key: 'aso_adm',
            label: 'ASO a Admissão',
            getStart: c => c.aso,
            getEnd: c => c.admitted,
            icon: 'how_to_reg'
        },
        {
            key: 'adm_trein',
            label: 'Admissão a Fim de Treinamentos',
            getStart: c => c.admitted,
            getEnd: c => hasCompletedRequiredTrainings(c) ? latestPipelineTrainingDate(c) : null,
            icon: 'school'
        },
        {
            key: 'post_cracha',
            label: 'Postagem a Emissão do Crachá',
            getStart: c => c.badge_posted_date,
            getEnd: c => c.badge_real_date,
            icon: 'badge'
        }
    ];

    return stages.map(stage => {
        const samples = activeCandidates
            .map(c => ({ candidate: c, days: diffPipelineDays(stage.getStart(c), stage.getEnd(c)) }))
            .filter(x => Number.isFinite(x.days));
        const total = samples.reduce((sum, item) => sum + item.days, 0);
        const avg = samples.length ? Number((total / samples.length).toFixed(1)) : 0;
        const max = samples.length ? Math.max(...samples.map(x => x.days)) : 0;
        const min = samples.length ? Math.min(...samples.map(x => x.days)) : 0;
        return { ...stage, samples, avg, max, min, total };
    });
}

function getPipelineStageCounts() {
    const active = CANDIDATES.filter(c => !c.declined_date);
    return {
        total: CANDIDATES.length,
        active: active.length,
        recruited: active.length,
        asoDone: active.filter(c => c.aso).length,
        admitted: active.filter(c => c.admitted).length,
        trainingDone: active.filter(c => c.admitted && hasCompletedRequiredTrainings(c)).length,
        badgePosted: active.filter(c => c.badge_posted_date).length,
        badgeIssued: CANDIDATES.filter(c => cleanDate(c.badge_real_date)).length,
        declined: CANDIDATES.filter(c => c.declined_date).length
    };
}

function renderPipelineBarChart(stats) {
    const maxAvg = Math.max(...stats.map(s => Number(s.avg) || 0), 1);
    return `
        <div class="card p-5 sm:p-6 rounded-2xl overflow-hidden">
            <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
                <div>
                    <h4 class="font-display font-bold text-lg text-on-surface">Leadtime Médio do Processo</h4>
                    <p class="text-xs text-muted">Média em dias corridos por etapa concluída.</p>
                </div>
                <span class="badge bg-primary/10 text-primary border-primary/20 self-start sm:self-auto">Gráfico de barras</span>
            </div>

            <div class="rounded-2xl border border-outline-variant bg-surface-container-low/60 p-4 overflow-hidden">
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    ${stats.map(stage => {
                        const rawAvg = Number(stage.avg) || 0;
                        const height = Math.max(10, Math.min(142, Math.round((rawAvg / maxAvg) * 142)));
                        return `
                            <button onclick="dashboardGo('pipeline')" class="group rounded-2xl border border-outline-variant bg-surface-container-low p-4 hover:border-primary/50 hover:bg-surface-container-high transition-all text-left overflow-hidden">
                                <div class="relative h-44 rounded-xl bg-surface-container-highest/40 border border-outline-variant/70 overflow-hidden flex items-end justify-center px-4 pt-6 pb-3">
                                    <div class="absolute inset-x-3 bottom-3 border-t border-outline-variant/70"></div>
                                    <div class="relative w-full max-w-[86px] rounded-t-2xl bg-primary/80 shadow-[0_0_20px_rgba(96,165,250,0.18)] flex items-start justify-center pt-2 transition-all group-hover:bg-primary" style="height:${height}px; max-height:142px;">
                                        <span class="text-xs font-mono font-black text-surface leading-none">${stage.avg}</span>
                                    </div>
                                </div>
                                <div class="pt-4 text-center min-h-[98px] flex flex-col items-center justify-start">
                                    <span class="material-symbols-outlined text-primary text-lg">${stage.icon}</span>
                                    <p class="text-xs font-bold text-on-surface leading-tight mt-1 max-w-[180px] mx-auto">${escapeHtml(stage.label)}</p>
                                    <p class="text-[10px] text-muted mt-1 leading-tight">${stage.samples.length} registro(s) • Máx. ${stage.max}d</p>
                                </div>
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderPipelinePieChart(counts) {
    const emitted = counts.badgeIssued;
    const declined = counts.declined;
    const total = emitted + declined;
    const emittedPct = total ? Math.round((emitted / total) * 100) : 0;
    const declinedPct = total ? 100 - emittedPct : 0;
    const gradient = total
        ? `conic-gradient(#22c55e 0 ${emittedPct}%, #ef4444 ${emittedPct}% 100%)`
        : 'conic-gradient(#334155 0 100%)';

    return `
        <div class="card p-6 rounded-2xl">
            <div class="flex items-start justify-between gap-3 mb-6">
                <div>
                    <h4 class="font-display font-bold text-lg text-on-surface">Crachás Emitidos x Declinados</h4>
                    <p class="text-xs text-muted">Composição dos cadastros com crachá emitido e candidatos declinados.</p>
                </div>
                <span class="badge bg-green-500/10 text-green-400 border-green-500/20">Pizza</span>
            </div>
            <div class="flex flex-col lg:flex-row items-center gap-6">
                <div class="relative w-52 h-52 rounded-full shadow-[0_18px_40px_rgba(0,0,0,0.35)]" style="background:${gradient}">
                    <div class="absolute inset-8 rounded-full bg-surface-container flex flex-col items-center justify-center border border-outline-variant">
                        <span class="text-3xl font-display font-black text-on-surface">${total}</span>
                        <span class="text-[10px] font-bold uppercase tracking-widest text-muted">Total</span>
                    </div>
                </div>
                <div class="flex-1 w-full space-y-4">
                    <div class="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                        <div class="flex items-center justify-between gap-3">
                            <div class="flex items-center gap-2">
                                <span class="w-3 h-3 rounded-full bg-green-500"></span>
                                <span class="text-sm font-bold text-on-surface">Crachás emitidos</span>
                            </div>
                            <span class="text-2xl font-display font-black text-green-400">${emitted}</span>
                        </div>
                        <p class="text-[10px] text-muted mt-1">${emittedPct}% da composição</p>
                    </div>
                    <div class="p-4 rounded-xl bg-error/10 border border-error/20">
                        <div class="flex items-center justify-between gap-3">
                            <div class="flex items-center gap-2">
                                <span class="w-3 h-3 rounded-full bg-error"></span>
                                <span class="text-sm font-bold text-on-surface">Declinados</span>
                            </div>
                            <span class="text-2xl font-display font-black text-error">${declined}</span>
                        </div>
                        <p class="text-[10px] text-muted mt-1">${declinedPct}% da composição</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPipelineKpiCard(title, value, subtitle, icon, color = 'primary') {
    const colorMap = {
        primary: 'text-primary border-l-primary',
        green: 'text-green-400 border-l-green-500',
        amber: 'text-amber-400 border-l-amber-500',
        red: 'text-red-400 border-l-red-500',
        cyan: 'text-cyan-400 border-l-cyan-500',
        purple: 'text-purple-400 border-l-purple-500'
    };
    const classes = colorMap[color] || colorMap.primary;
    const [textColor, borderClass] = classes.split(' ');
    return `
        <div class="card p-4 rounded-2xl border-l-4 ${borderClass}">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <p class="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">${escapeHtml(title)}</p>
                    <div class="text-3xl font-display font-black ${textColor}">${value}</div>
                </div>
                <span class="material-symbols-outlined ${textColor} text-2xl">${icon}</span>
            </div>
            <p class="text-[10px] text-muted mt-2 leading-snug">${escapeHtml(subtitle)}</p>
        </div>
    `;
}

function renderPipeline() {
    const container = document.getElementById('page-pipeline');
    if (!container) return;

    const stats = getPipelineLeadtimeStats();
    const counts = getPipelineStageCounts();
    const totalAvg = stats.reduce((sum, s) => sum + s.avg, 0).toFixed(1);
    const worstStage = stats.slice().sort((a, b) => b.avg - a.avg)[0] || { label: '-', avg: 0 };
    const pendingTraining = CANDIDATES.filter(c => !c.declined_date && c.admitted && !hasCompletedRequiredTrainings(c)).length;
    const pendingBadge = CANDIDATES.filter(c => !c.declined_date && hasCompletedRequiredTrainings(c) && !isBadgeCompleted(c)).length;

    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                <div>
                    <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                        <span class="material-symbols-outlined text-sm">account_tree</span> Análise do Processo Completo
                    </div>
                    <h3 class="font-display font-black text-2xl text-on-surface">Pipeline de Mobilização</h3>
                    <p class="text-xs text-muted mt-1">KPIs de leadtime, conversão por etapa, emissão de crachá e declínios.</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge bg-primary/10 text-primary border-primary/20">${counts.active} ativo(s)</span>
                    <span class="badge bg-error/10 text-error border-error/20">${counts.declined} declinado(s)</span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                ${renderPipelineKpiCard('Leadtime Total Médio', `${totalAvg}d`, 'Soma das médias das quatro etapas principais.', 'timer', 'primary')}
                ${renderPipelineKpiCard('Maior Leadtime', `${worstStage.avg}d`, worstStage.label, 'trending_up', worstStage.avg ? 'amber' : 'green')}
                ${renderPipelineKpiCard('Treinamento Pendente', pendingTraining, 'Admitidos sem todos os treinamentos obrigatórios.', 'school', pendingTraining ? 'amber' : 'green')}
                ${renderPipelineKpiCard('Crachá Pendente', pendingBadge, 'Treinamento concluído sem crachá concluído.', 'badge', pendingBadge ? 'amber' : 'green')}
            </div>

            ${renderPipelineBarChart(stats)}

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                ${renderPipelinePieChart(counts)}
                <div class="card rounded-2xl overflow-hidden">
                    <div class="p-5 border-b border-outline-variant bg-surface-container-low">
                        <h4 class="font-display font-bold text-lg text-on-surface">Resumo por Etapa</h4>
                        <p class="text-xs text-muted">Base consolidada do processo completo.</p>
                    </div>
                    <div class="table-scroll">
                        <table class="w-full min-w-[620px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                                <tr>
                                    <th class="px-5 py-4">Etapa</th>
                                    <th class="px-5 py-4 text-center">Qtd.</th>
                                    <th class="px-5 py-4 text-center">% Ativos</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${[
                                    ['Recrutados', counts.recruited],
                                    ['ASO realizado', counts.asoDone],
                                    ['Admitidos / Ativados', counts.admitted],
                                    ['Fim de treinamentos', counts.trainingDone],
                                    ['Crachá postado', counts.badgePosted],
                                    ['Crachá emitido', counts.badgeIssued]
                                ].map(([label, value]) => {
                                    const pct = counts.active ? Math.round((value / counts.active) * 100) : 0;
                                    return `
                                        <tr class="hover:bg-surface-container-highest">
                                            <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(label)}</td>
                                            <td class="px-5 py-4 text-center font-mono font-black text-primary">${value}</td>
                                            <td class="px-5 py-4 text-center">
                                                <div class="flex items-center justify-center gap-3">
                                                    <div class="w-24 h-2 rounded-full bg-surface-container-highest overflow-hidden">
                                                        <div class="h-full bg-primary" style="width:${pct}%"></div>
                                                    </div>
                                                    <span class="font-mono text-xs text-muted w-10 text-right">${pct}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="card rounded-2xl overflow-hidden">
                <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
                    <div>
                        <h4 class="font-display font-bold text-lg text-on-surface">Detalhe do Leadtime</h4>
                        <p class="text-xs text-muted">Quantidade de registros usados em cada média, mínimo, médio e máximo.</p>
                    </div>
                    <span class="badge bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Dias corridos</span>
                </div>
                <div class="table-scroll">
                    <table class="w-full min-w-[760px] text-left text-sm">
                        <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                            <tr>
                                <th class="px-5 py-4">Etapa</th>
                                <th class="px-5 py-4 text-center">Registros</th>
                                <th class="px-5 py-4 text-center">Mín.</th>
                                <th class="px-5 py-4 text-center">Médio</th>
                                <th class="px-5 py-4 text-center">Máx.</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-outline-variant">
                            ${stats.map(stage => `
                                <tr class="hover:bg-surface-container-highest">
                                    <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(stage.label)}</td>
                                    <td class="px-5 py-4 text-center font-mono">${stage.samples.length}</td>
                                    <td class="px-5 py-4 text-center font-mono">${stage.min}d</td>
                                    <td class="px-5 py-4 text-center font-mono font-black text-primary">${stage.avg}d</td>
                                    <td class="px-5 py-4 text-center font-mono ${stage.max > stage.avg ? 'text-amber-400 font-bold' : ''}">${stage.max}d</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Sobrescreve o roteamento para incluir o módulo Pipeline funcional.
renderCurrentPage = function() {
    if (currentPage === 'dashboard') renderDashboard();
        else if (currentPage === 'treinamentos') renderTreinamentos();
    else if (currentPage === 'recrutamento') renderRecrutamento();
    else if (currentPage === 'matriz-recrutamento') renderMatrizRecrutamento();
    else if (currentPage === 'mobilizacao') renderMobilização();
    else if (currentPage === 'cracha') renderCracha();
    else if (currentPage === 'alojamento') renderAlojamento();
    else if (currentPage === 'solicitacao') renderSolicitacoes();
    else if (currentPage === 'vagas') renderVagas();
    else if (currentPage === 'pipeline') renderPipeline();
    else {
        const pageNode = document.getElementById(`page-${currentPage}`);
        if (pageNode) pageNode.innerHTML = `<div class="empty-state rounded-2xl p-12 text-center text-muted">Modulo em desenvolvimento.</div>`;
    }
};


if (typeof currentPage !== 'undefined' && currentPage === 'dashboard') {
    setTimeout(() => renderDashboard(), 0);
}



// ============================================================
// ✅ CORREÇÕES OPERACIONAIS - 26/06/2026
// ============================================================

window.recruitmentSearch = window.recruitmentSearch || '';
window.recruitmentFunctionFilter = window.recruitmentFunctionFilter || 'TODAS';
window.mobilizacaoSearch = window.mobilizacaoSearch || '';
window.mobilizacaoStatusFilter = window.mobilizacaoStatusFilter || 'TODOS';
window.crachaSearch = window.crachaSearch || '';
window.crachaStatusFilter = window.crachaStatusFilter || 'TODOS';
window.alojamentoStatusFilter = window.alojamentoStatusFilter || 'TODOS';
window.alojamentoSearch = window.alojamentoSearch || '';

function formatDateBR(value) {
    const raw = String(value || '').trim();
    if (!raw || raw === '-' || raw.toLowerCase() === 'null' || raw.toLowerCase() === 'undefined') return '-';
    let match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) return `${match[3]}/${match[2]}/${match[1]}`;
    match = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
    if (match) {
        const day = match[1].padStart(2, '0');
        const month = match[2].padStart(2, '0');
        const year = match[3].length === 2 ? `20${match[3]}` : match[3];
        return `${day}/${month}/${year}`;
    }
    return raw;
}

function dateOrDash(value) { return formatDateBR(cleanDate(value) || value || '-'); }

function normalizeForSearch(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .replace(/[^A-Z0-9\s\-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function cleanSearchInput(value, max = 140) {
    return String(value || '').toUpperCase().slice(0, max);
}

function personSearchMatch(c, q) {
    const query = normalizeForSearch(q);
    if (!query) return true;
    const haystackValues = [
        c.name,
        c.func,
        c.cpf,
        formatCpf(c.cpf),
        c.phone,
        formatPhone(c.phone),
        c.city,
        c.state,
        c.uf,
        c.rm,
        c.digital_obra,
        c.obra,
        c.status,
        c.declined_reason,
        c.alojamento_responsavel,
        c.badge_delay_reason,
        dateOrDash(c.recruited),
        dateOrDash(c.aso),
        dateOrDash(c.admitted),
        dateOrDash(c.badge_real_date)
    ];
    const haystack = normalizeForSearch(haystackValues.join(' '));
    const compactHaystack = haystack.replace(/\s+/g, '');
    const compactQuery = query.replace(/\s+/g, '');
    const digitsQuery = onlyDigits(q);
    const digitsHaystack = onlyDigits(haystackValues.join(' '));
    return haystack.includes(query) || compactHaystack.includes(compactQuery) || (digitsQuery.length >= 2 && digitsHaystack.includes(digitsQuery));
}

window.__mobilizaFilterTimers = window.__mobilizaFilterTimers || {};
function restoreSearchFocus(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.focus();
    try {
        const pos = input.value.length;
        input.setSelectionRange(pos, pos);
    } catch (error) {
        // tipos de input que nao suportam cursor nao precisam de tratamento
    }
}
function scheduleFilterRender(key, renderFn, inputId) {
    clearTimeout(window.__mobilizaFilterTimers[key]);
    window.__mobilizaFilterTimers[key] = setTimeout(() => {
        renderFn();
        setTimeout(() => restoreSearchFocus(inputId), 0);
    }, 160);
}
function isCandidateInTraining(c) { return Boolean(c && c.admitted && !hasCompletedRequiredTrainings(c)); }
function isCandidateMobilized(c) { return Boolean(c && c.admitted && hasCompletedRequiredTrainings(c)); }
function brToday() { return formatDateBR(todayInputDate()); }

// Menu: remover Resumo e manter Pipeline no topo
function applyMenuCorrections() {
    document.querySelectorAll('.nav-item[data-page="resumo"]').forEach(el => el.remove());
    const pipeline = document.querySelector('.nav-item[data-page="pipeline"]');
    const dashboard = document.querySelector('.nav-item[data-page="dashboard"]');
    if (pipeline && dashboard && dashboard.nextElementSibling !== pipeline) {
        dashboard.parentNode.insertBefore(pipeline, dashboard.nextElementSibling);
    }
}

// ------------------------------------------------------------
// Gestão de Pessoas / Recrutamento
// ------------------------------------------------------------
function setRecruitmentSearch(value) { window.recruitmentSearch = cleanSearchInput(value); scheduleFilterRender('recrutamento', renderRecrutamento, 'recruitment-search-input'); }
function setRecruitmentFunctionFilter(value) { window.recruitmentFunctionFilter = String(value || 'TODAS').toUpperCase(); renderRecrutamento(); }

function renderCandidateCard(c, showTrainingPanel = false) {
    const status = getCandidateStatus(c);
    const asoPlanned = dateOrDash(c.aso_planned || c.aso);
    const admissionPlanned = dateOrDash(c.admission_planned || c.admitted);
    const asoReal = dateOrDash(c.aso);
    const admissionReal = dateOrDash(c.admitted);
    return `
        <div class="card p-5 rounded-2xl relative overflow-hidden group">
            <div class="flex justify-between items-start gap-4 mb-4">
                <div class="min-w-0">
                    <h4 class="font-bold text-on-surface group-hover:text-primary transition-colors truncate">${escapeHtml(c.name)}</h4>
                    <p class="text-[10px] text-muted font-bold uppercase tracking-widest truncate">${escapeHtml(c.func)}</p>
                    <p class="text-[10px] text-muted mt-1">CPF <span class="font-mono text-on-surface">${escapeHtml(formatCpf(c.cpf) || '-')}</span></p>
                    ${(c.city || c.state) ? `<p class="text-[10px] text-muted mt-1">Local <span class="font-mono text-on-surface">${escapeHtml(c.city || '-')} / ${escapeHtml(c.state || '-')}</span></p>` : ''}
                    <p class="text-[10px] text-muted mt-1">RM <span class="font-mono text-primary">${escapeHtml(c.rm || '-')}</span> • Obra <span class="font-mono text-on-surface">${escapeHtml(c.digital_obra || '-')}</span></p>
                </div>
                <div class="flex flex-col items-end gap-1 shrink-0">
                    <span class="badge ${status.color}">
                        ${status.stagnant ? '<span class="material-symbols-outlined text-[10px] alert-pulse">priority_high</span>' : ''}
                        ${status.label}
                    </span>
                    <span class="text-[9px] text-muted">Recrutado em ${escapeHtml(dateOrDash(c.recruited))}</span>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-[10px]">
                <div class="rounded-lg border border-outline-variant bg-surface-container-low p-2">
                    <p class="font-black uppercase tracking-widest text-muted">ASO</p>
                    <p class="mt-1 text-muted">Previsto: <span class="font-mono text-on-surface">${escapeHtml(asoPlanned)}</span></p>
                    <p class="text-muted">Real: <span class="font-mono ${asoReal !== '-' ? 'text-green-400' : 'text-muted'}">${escapeHtml(asoReal)}</span></p>
                </div>
                <div class="rounded-lg border border-outline-variant bg-surface-container-low p-2">
                    <p class="font-black uppercase tracking-widest text-muted">Admissão</p>
                    <p class="mt-1 text-muted">Prevista: <span class="font-mono text-on-surface">${escapeHtml(admissionPlanned)}</span></p>
                    <p class="text-muted">Real: <span class="font-mono ${admissionReal !== '-' ? 'text-green-400' : 'text-muted'}">${escapeHtml(admissionReal)}</span></p>
                </div>
            </div>
            ${showTrainingPanel ? renderMobilizationTrainingPanel(c) : ''}
            <div class="flex gap-2">
                <button onclick="openEditPersonModal(${c.id})" class="btn btn-ghost w-full py-1.5 text-[10px] font-bold border border-outline-variant">EDITAR FLUXO</button>
                <button onclick="openCandidateTrainingsModal(${c.id})" class="btn btn-ghost p-1.5 border border-outline-variant ${!c.admitted ? 'hidden' : ''}" title="Treinamentos">
                    <span class="material-symbols-outlined text-sm">school</span>
                </button>
            </div>
        </div>
    `;
}

function renderRecrutamento() {
    const container = document.getElementById('page-recrutamento');
    if (!container) return;
    const declined = CANDIDATES.filter(c => c.declined_date)
        .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity: 'base' }));
    const functions = [...new Set(CANDIDATES.filter(c => !c.declined_date && !c.admitted).map(c => c.func).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }));
    const q = String(window.recruitmentSearch || '').toUpperCase();
    const f = String(window.recruitmentFunctionFilter || 'TODAS').toUpperCase();
    const recs = CANDIDATES
        .filter(c => !c.declined_date && !c.admitted)
        .filter(c => f === 'TODAS' || String(c.func || '').toUpperCase() === f)
        .filter(c => personSearchMatch(c, q))
        .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity: 'base' }));
    const recruitmentBase = CANDIDATES.filter(c => !c.declined_date && !c.admitted);
    const recruitmentAsoPending = recruitmentBase.filter(c => !cleanDate(c.aso)).length;
    const recruitmentAdmissionPending = recruitmentBase.filter(c => cleanDate(c.aso) && !cleanDate(c.admitted)).length;
    const recruitmentWithAso = recruitmentBase.filter(c => cleanDate(c.aso)).length;
    const recIndicatorBox = (label, value, icon, tone) => `
        <div class="card p-4 rounded-2xl border-l-4 ${tone}">
            <div class="flex items-center justify-between gap-3">
                <div>
                    <p class="text-[10px] uppercase font-black tracking-widest text-muted">${label}</p>
                    <div class="text-3xl font-display font-black text-on-surface mt-1">${value}</div>
                </div>
                <span class="material-symbols-outlined text-primary text-2xl">${icon}</span>
            </div>
        </div>`;

    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h3 class="text-xl font-display font-bold">Gestão de Pessoas (Recrutamento)</h3>
                    <p class="text-xs text-muted">Exibe apenas candidatos ainda não admitidos. Admitidos seguem para Mobilização.</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <button onclick="toggleDeclinedRecruitmentList()" class="inline-flex items-center justify-center gap-2 rounded-lg bg-error-container px-5 py-3 text-sm font-black text-on-error-container border border-error/40 shadow-lg shadow-red-950/20 transition-all hover:brightness-110 active:scale-95">
                        <span class="material-symbols-outlined text-xl">block</span> Declinados (${declined.length})
                    </button>
                    <button onclick="openAddPersonModal()" class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-lg shadow-blue-500/10 transition-all hover:brightness-110 active:scale-95">
                        <span class="material-symbols-outlined text-lg">person_add</span> Novo Colaborador
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                ${recIndicatorBox('Em recrutamento', recruitmentBase.length, 'person_search', 'border-l-primary')}
                ${recIndicatorBox('Aguardando ASO', recruitmentAsoPending, 'medical_services', 'border-l-amber-500')}
                ${recIndicatorBox('ASO realizado', recruitmentWithAso, 'verified_user', 'border-l-blue-400')}
                ${recIndicatorBox('Aguardando admissão', recruitmentAdmissionPending, 'assignment_ind', 'border-l-purple-400')}
            </div>

            <div class="card p-4 rounded-2xl">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div class="md:col-span-2">
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Buscar em recrutamento</label>
                        <input id="recruitment-search-input" class="modal-input uppercase" value="${escapeHtml(window.recruitmentSearch || '')}" oninput="setRecruitmentSearch(this.value)" placeholder="BUSCAR POR NOME, CPF, FUNÇÃO, RM OU OBRA" autocomplete="off">
                    </div>
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Filtrar por função</label>
                        <select class="modal-input" onchange="setRecruitmentFunctionFilter(this.value)">
                            <option value="TODAS" ${f === 'TODAS' ? 'selected' : ''}>Todas as funções</option>
                            ${functions.map(fn => `<option value="${escapeHtml(fn)}" ${f === String(fn).toUpperCase() ? 'selected' : ''}>${escapeHtml(fn)}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>

            <div id="recruitment-declined-list" class="hidden">
                <div class="card rounded-2xl overflow-hidden border-error/30">
                    <div class="px-5 py-4 bg-error/10 border-b border-error/20 flex items-center justify-between">
                        <h4 class="text-sm font-bold text-error">Candidatos Declinados</h4>
                        <span class="badge bg-error/10 text-error border-error/20">${declined.length} registros</span>
                    </div>
                    <div class="divide-y divide-outline-variant max-h-[420px] overflow-y-auto">
                        ${declined.length ? declined.map(c => `
                            <div class="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container-highest">
                                <div>
                                    <p class="text-sm font-bold text-on-surface">${escapeHtml(c.name)}</p>
                                    <p class="text-[10px] text-muted uppercase font-bold">${escapeHtml(c.func)} - ${escapeHtml(dateOrDash(c.declined_date))}</p>
                                    <p class="text-xs text-muted mt-1">${escapeHtml(c.declined_reason || 'Sem motivo informado')}</p>
                                </div>
                                <button onclick="openEditPersonModal(${c.id})" class="btn btn-danger-ghost text-xs border border-error/20">Abrir Cadastro</button>
                            </div>
                        `).join('') : '<div class="p-6 text-center text-muted">Nenhum candidato declinado.</div>'}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${recs.map(c => renderCandidateCard(c)).join('')}
                ${recs.length === 0 ? '<div class="col-span-full empty-state rounded-2xl p-10 text-center text-muted">Nenhuma pessoa em recrutamento para o filtro selecionado.</div>' : ''}
            </div>
        </div>
    `;
}

// ------------------------------------------------------------
// Mobilização / Treinamentos
// ------------------------------------------------------------
function setMobilizacaoSearch(value) { window.mobilizacaoSearch = cleanSearchInput(value); scheduleFilterRender('mobilizacao', renderMobilização, 'mobilizacao-search-input'); }
function setMobilizacaoStatusFilter(value) { window.mobilizacaoStatusFilter = String(value || 'TODOS').toUpperCase(); renderMobilização(); }

function renderMobilização() {
    const container = document.getElementById('page-mobilizacao');
    if (!container) return;
    const base = CANDIDATES.filter(c => c.admitted && !c.declined_date)
        .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity: 'base' }));
    const training = base.filter(isCandidateInTraining);
    const mobilized = base.filter(isCandidateMobilized);
    const q = String(window.mobilizacaoSearch || '').toUpperCase();
    const statusFilter = String(window.mobilizacaoStatusFilter || 'TODOS').toUpperCase();
    const filtered = base
        .filter(c => statusFilter === 'TODOS' || (statusFilter === 'TREINAMENTO' && isCandidateInTraining(c)) || (statusFilter === 'MOBILIZADO' && isCandidateMobilized(c)))
        .filter(c => personSearchMatch(c, q));
    const sideBox = (key, label, value, icon, tone) => `
        <button onclick="setMobilizacaoStatusFilter('${key}')" class="w-full text-left card p-4 rounded-2xl border-l-4 ${window.mobilizacaoStatusFilter === key ? 'border-l-primary bg-primary/10' : tone} hover:bg-surface-container-highest">
            <div class="flex items-center justify-between gap-2">
                <div>
                    <p class="text-[10px] uppercase font-black tracking-widest text-muted">${label}</p>
                    <div class="text-3xl font-display font-black text-on-surface">${value}</div>
                </div>
                <span class="material-symbols-outlined text-primary text-2xl">${icon}</span>
            </div>
        </button>`;
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 class="text-xl font-display font-bold">Mobilização e Treinamentos</h3>
                    <p class="text-xs text-muted">Lista em ordem alfabética. Use os filtros laterais por status.</p>
                </div>
                <span class="badge bg-primary/10 text-primary border-primary/20">${base.length} admitidos</span>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6">
                <aside class="space-y-3">
                    ${sideBox('TODOS', 'Todos', base.length, 'groups', 'border-l-primary')}
                    ${sideBox('TREINAMENTO', 'Em treinamento', training.length, 'school', 'border-l-amber-500')}
                    ${sideBox('MOBILIZADO', 'Mobilizados', mobilized.length, 'verified', 'border-l-green-500')}
                </aside>
                <div class="space-y-4">
                    <div class="card p-4 rounded-2xl">
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Buscar em mobilização</label>
                        <input id="mobilizacao-search-input" class="modal-input uppercase" value="${escapeHtml(window.mobilizacaoSearch || '')}" oninput="setMobilizacaoSearch(this.value)" placeholder="BUSCAR POR NOME, FUNÇÃO, RM OU OBRA" autocomplete="off">
                    </div>
                    <div class="card rounded-2xl overflow-hidden">
                        <div class="divide-y divide-outline-variant">
                            ${filtered.length ? filtered.map(c => renderMobilizationPersonRow(c)).join('') : '<div class="empty-state rounded-2xl p-10 text-center text-muted">Nenhum colaborador encontrado na Mobilização.</div>'}
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    updateAlertIcon();
}

function renderMobilizationPersonRow(c) {
    const matrix = TRAINING_MATRIX.find(m => m.function === c.func);
    const trainings = matrix?.trainings || [];
    const done = trainings.filter(t => c.trainings.some(ct => ct.name === t.name && ct.date)).length;
    const status = getCandidateStatus(c);
    return `
        <button type="button" onclick="openCandidateTrainingsModal(${c.id})" class="w-full text-left p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container-highest transition-colors">
            <div class="flex items-start gap-3 min-w-0">
                <span class="material-symbols-outlined text-primary mt-1">school</span>
                <div class="min-w-0">
                    <p class="font-bold text-on-surface">${escapeHtml(c.name)}</p>
                    <p class="text-[10px] text-muted uppercase font-bold tracking-widest">${escapeHtml(c.func)}</p>
                    <p class="text-[10px] text-muted mt-1">Admissão: ${escapeHtml(dateOrDash(c.admitted))} - CPF ${escapeHtml(formatCpf(c.cpf) || '-')}</p>
                    <p class="text-[10px] text-muted mt-1">RM ${escapeHtml(c.rm || '-')} • Obra ${escapeHtml(c.digital_obra || '-')}</p>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-2 md:justify-end">
                <span class="badge ${status.color}">${status.label}</span>
                <span class="badge ${done === trainings.length && trainings.length ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">${done} / ${trainings.length} treinamentos</span>
                <span class="material-symbols-outlined text-muted">chevron_right</span>
            </div>
        </button>`;
}

function openDeclineCandidateModal(id) {
    const c = CANDIDATES.find(x => x.id === id);
    if (!c) return alert('Pessoa não encontrada.');
    openModal(`
        <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-red-400 text-2xl">block</span>
                <div>
                    <h3 class="font-display font-bold text-lg">Declinar Colaborador</h3>
                    <p class="text-[10px] text-muted font-bold uppercase tracking-widest">${escapeHtml(c.name)} - ${escapeHtml(c.func)}</p>
                </div>
            </div>
            <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-6 space-y-4">
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data de declínio *</label>
                <input type="date" id="decline-date" class="modal-input" value="${todayInputDate()}">
            </div>
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">Justificativa *</label>
                <textarea id="decline-reason" class="modal-input min-h-[120px] uppercase" maxlength="500" placeholder="INFORME O MOTIVO DO DECLÍNIO" oninput="maskUppercaseInput(this, 500)"></textarea>
            </div>
        </div>
        <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
            <button onclick="closeModal()" class="btn btn-ghost">Cancelar</button>
            <button onclick="declineCandidateFromModal(${id})" class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all bg-red-500/90 hover:bg-red-500 text-white active:scale-95"><span class="material-symbols-outlined text-sm">block</span> Confirmar Declínio</button>
        </div>`);
}

function declineCandidateFromModal(id) {
    const c = CANDIDATES.find(x => x.id === id);
    if (!c) return alert('Pessoa não encontrada.');
    const date = cleanDate(document.getElementById('decline-date')?.value || '');
    const reason = cleanString(document.getElementById('decline-reason')?.value || '', 500).toUpperCase();
    if (!date) return alert('Informe a data de declínio.');
    if (!reason || reason.length < 3) return alert('Informe a justificativa do declínio.');
    c.declined_date = date;
    c.declined_reason = reason;
    c.lastStageUpdate = date;
    saveData();
    closeModal();
    renderCurrentPage();
    updateAlertIcon();
}

function openCandidateTrainingsModal(id) {
    const c = CANDIDATES.find(x => x.id === id);
    if (!c) return alert('Pessoa não encontrada.');
    const matrix = TRAINING_MATRIX.find(m => m.function === c.func);
    openModal(`
        <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <div>
                <h3 class="font-display font-bold text-lg">Matriz de Treinamento</h3>
                <p class="text-[10px] text-muted font-bold uppercase tracking-widest">${escapeHtml(c.name)} - ${escapeHtml(c.func)}</p>
            </div>
            <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-6 overflow-y-auto max-h-[60vh]">
            <div class="space-y-3">
                ${matrix ? matrix.trainings.map(t => {
                    const ct = c.trainings.find(x => x.name === t.name);
                    return `
                        <div class="flex items-center justify-between gap-4 p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                            <div class="flex items-center gap-3 min-w-0">
                                <span class="material-symbols-outlined ${ct ? 'text-green-400' : 'text-muted'}">${ct ? 'check_circle' : 'circle'}</span>
                                <div class="min-w-0">
                                    <p class="text-sm font-bold text-on-surface leading-snug">${escapeHtml(t.name)}</p>
                                    <p class="text-[10px] text-muted uppercase font-bold">${t.hours} Horas • ${t.required === 'E' ? 'Eletivo' : 'Obrigatório'} ${ct?.date ? '• ' + formatDateBR(ct.date) : ''}</p>
                                </div>
                            </div>
                            <input type="date" value="${ct ? escapeHtml(ct.date) : ''}" class="modal-input w-auto text-xs" onchange='toggleCandidateTraining(${c.id}, ${jsArg(t.name)}, this.value)'>
                        </div>`;
                }).join('') : '<p class="text-center py-4 text-muted">Função não configurada na matriz.</p>'}
            </div>
        </div>
        <div class="p-6 bg-surface-container-low border-t border-outline-variant flex flex-col sm:flex-row justify-between gap-3">
            <button onclick="openDeclineCandidateModal(${c.id})" class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all bg-red-500/90 hover:bg-red-500 text-white active:scale-95"><span class="material-symbols-outlined text-sm">block</span> Declinado</button>
            <button onclick="closeModal(); renderCurrentPage();" class="btn btn-primary px-8">Concluir</button>
        </div>`);
}

// ------------------------------------------------------------
// Crachá
// ------------------------------------------------------------
function setCrachaSearch(value) { window.crachaSearch = cleanSearchInput(value); scheduleFilterRender('cracha', renderCracha, 'cracha-search-input'); }
function setCrachaStatusFilter(value) { window.crachaStatusFilter = String(value || 'TODOS').toUpperCase(); renderCracha(); }

function renderCracha() {
    syncBadgeQueue();
    CANDIDATES.forEach(refreshBadgeConclusion);
    const container = document.getElementById('page-cracha');
    if (!container) return;
    const base = CANDIDATES
        .filter(c => c.admitted && !c.declined_date && hasCompletedRequiredTrainings(c))
        .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity: 'base' }));
    const completedRows = base.filter(isBadgeCompleted);
    const pendingRows = base.filter(c => !isBadgeCompleted(c));
    const q = String(window.crachaSearch || '').toUpperCase();
    const status = String(window.crachaStatusFilter || 'TODOS').toUpperCase();
    const rows = base
        .filter(c => status === 'TODOS' || (status === 'AGUARDANDO' && !isBadgeCompleted(c)) || (status === 'CONCLUIDO' && isBadgeCompleted(c)))
        .filter(c => personSearchMatch(c, q));
    const box = (key, label, value, icon, tone) => `
        <button onclick="setCrachaStatusFilter('${key}')" class="w-full text-left card p-4 rounded-2xl border-l-4 ${window.crachaStatusFilter === key ? 'border-l-primary bg-primary/10' : tone} hover:bg-surface-container-highest">
            <div class="flex items-center justify-between gap-2"><div><p class="text-[10px] uppercase font-black tracking-widest text-muted">${label}</p><div class="text-3xl font-display font-black text-on-surface">${value}</div></div><span class="material-symbols-outlined text-primary text-2xl">${icon}</span></div>
        </button>`;
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h3 class="text-xl font-display font-bold text-primary">Crachás para Liberação</h3>
                    <p class="text-xs text-muted">Controle de emissão real, previsão em padrão brasileiro e justificativa de atraso.</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge bg-primary/10 text-primary border-primary/20">${base.length} em crachá</span>
                    <span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">${pendingRows.length} aguardando emissão</span>
                    <span class="badge bg-green-500/10 text-green-400 border-green-500/20">${completedRows.length} concluído(s)</span>
                </div>
            </div>
            <div class="grid grid-cols-1 gap-4">
                <aside class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${box('TODOS', 'Todos', base.length, 'badge', 'border-l-primary')}
                    ${box('AGUARDANDO', 'Aguardando emissão', pendingRows.length, 'hourglass_top', 'border-l-amber-500')}
                    ${box('CONCLUIDO', 'Concluído', completedRows.length, 'check_circle', 'border-l-green-500')}
                </aside>
                <div class="space-y-4">
                    <div class="card p-4 rounded-2xl">
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Buscar em crachá</label>
                        <input id="cracha-search-input" class="modal-input uppercase" value="${escapeHtml(window.crachaSearch || '')}" oninput="setCrachaSearch(this.value)" placeholder="BUSCAR POR NOME, FUNÇÃO, RM OU OBRA" autocomplete="off">
                    </div>
                    <div class="card rounded-2xl overflow-hidden table-scroll">
                        <table class="w-full min-w-[1580px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-5 py-4 w-[360px] min-w-[360px]">Pessoa</th><th class="px-5 py-4 w-[280px] min-w-[280px]">Função</th><th class="px-5 py-4 w-[190px] min-w-[190px]">Postagem</th><th class="px-5 py-4 w-[140px] min-w-[140px]">Dias liberação</th><th class="px-5 py-4 w-[150px] min-w-[150px]">Previsão</th><th class="px-5 py-4 w-[190px] min-w-[190px]">Data Real Emissão</th><th class="px-5 py-4 w-[280px] min-w-[280px]">Justificativa</th><th class="px-5 py-4 w-[170px] min-w-[170px]">Status</th></tr></thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${rows.length ? rows.map(c => {
                                    const releaseDate = getBadgeReleaseDate(c);
                                    const realDate = cleanDate(c.badge_real_date) || '';
                                    const delayed = isBadgeDelayed(c);
                                    const completed = isBadgeCompleted(c);
                                    const reason = cleanString(c.badge_delay_reason || '', 500);
                                    const warning = delayed && !reason;
                                    return `
                                        <tr class="hover:bg-surface-container-highest transition-colors ${completed ? 'opacity-85' : ''}">
                                            <td class="px-5 py-4 align-top w-[360px] min-w-[360px]"><button onclick="openEditPersonModal(${c.id})" class="font-bold text-on-surface hover:text-primary leading-tight block whitespace-normal break-words">${escapeHtml(c.name)}</button><p class="text-[10px] text-muted mt-1">CPF <span class="font-mono text-on-surface">${escapeHtml(formatCpf(c.cpf) || '-')}</span></p><p class="text-[10px] text-muted mt-1">Obra <span class="font-mono text-on-surface">${escapeHtml(c.digital_obra || '-')}</span></p></td>
                                            <td class="px-5 py-4 align-top text-xs font-bold uppercase text-muted">${escapeHtml(c.func)}</td>
                                            <td class="px-5 py-4 align-top"><input type="date" class="modal-input w-40 text-xs" value="${escapeHtml(c.badge_posted_date || '')}" onchange="updateBadgeField(${c.id}, 'badge_posted_date', this.value)"><p class="text-[10px] text-muted mt-1">${escapeHtml(dateOrDash(c.badge_posted_date))}</p></td>
                                            <td class="px-5 py-4 align-top"><input type="number" min="0" max="60" class="modal-input w-24 text-center font-mono" value="${escapeHtml(c.badge_release_days ?? BADGE_RELEASE_DAYS_DEFAULT)}" onchange="updateBadgeField(${c.id}, 'badge_release_days', this.value)"></td>
                                            <td class="px-5 py-4 align-top font-mono text-primary">${escapeHtml(dateOrDash(releaseDate))}</td>
                                            <td class="px-5 py-4 align-top"><input type="date" class="modal-input w-40 text-xs ${completed ? 'border-green-500/50' : ''}" value="${escapeHtml(realDate)}" onchange="updateBadgeField(${c.id}, 'badge_real_date', this.value)"><p class="text-[10px] text-muted mt-1">${escapeHtml(dateOrDash(realDate))}</p>${delayed ? '<p class="text-[10px] text-error mt-1 font-bold uppercase">Atrasado vs. previsão</p>' : ''}</td>
                                            <td class="px-5 py-4 align-top min-w-[260px]">${delayed ? `<textarea class="modal-input min-h-[72px] text-xs uppercase ${warning ? 'border-error' : ''}" placeholder="OBRIGATÓRIO: INFORME A JUSTIFICATIVA DO ATRASO" oninput="maskUppercaseInput(this, 500); updateBadgeDelayReasonDraft(${c.id}, this.value)" onchange="updateBadgeField(${c.id}, 'badge_delay_reason', this.value)">${escapeHtml(reason)}</textarea>${warning ? '<p class="text-[10px] text-error mt-1 font-bold uppercase">Justificativa obrigatória para concluir</p>' : ''}` : `<input type="text" class="modal-input text-xs uppercase" value="${escapeHtml(reason)}" placeholder="SEM ATRASO" oninput="maskUppercaseInput(this, 500)" onchange="updateBadgeField(${c.id}, 'badge_delay_reason', this.value)">`}</td>
                                            <td class="px-5 py-4 align-top"><span class="badge ${completed ? 'bg-green-500/10 text-green-400 border-green-500/20' : warning ? 'bg-error/10 text-error border-error/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">${completed ? 'Concluído' : warning ? 'Justificar atraso' : 'Aguardando emissão'}</span></td>
                                        </tr>`;
                                }).join('') : '<tr><td colspan="8" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhum colaborador encontrado no filtro de crachá.</div></td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>`;
    saveData();
}

// ------------------------------------------------------------
// Alojamento
// ------------------------------------------------------------
function setAlojamentoStatusFilter(value) { window.alojamentoStatusFilter = String(value || 'TODOS').toUpperCase(); renderAlojamento(); }
function setAlojamentoSearch(value) { window.alojamentoSearch = cleanSearchInput(value); scheduleFilterRender('alojamento', renderAlojamento, 'alojamento-search-input'); }

function renderAlojamento() {
    const container = document.getElementById('page-alojamento');
    if (!container) return;
    const base = getAlojados().sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity: 'base' }));
    const tratados = base.filter(c => !c.declined_date && String(c.alojamento_realizado || 'NAO').toUpperCase() === 'SIM' && cleanString(c.alojamento_responsavel || '', 100));
    const naoTratados = base.filter(c => !c.declined_date && !(String(c.alojamento_realizado || 'NAO').toUpperCase() === 'SIM' && cleanString(c.alojamento_responsavel || '', 100)));
    const declinados = base.filter(c => c.declined_date);
    const status = String(window.alojamentoStatusFilter || 'TODOS').toUpperCase();
    const q = String(window.alojamentoSearch || '').toUpperCase();
    const filtered = base
        .filter(c => status === 'TODOS' || (status === 'TRATADO' && tratados.includes(c)) || (status === 'NAO_TRATADO' && naoTratados.includes(c)) || (status === 'DECLINADO' && c.declined_date))
        .filter(c => personSearchMatch(c, q));
    const box = (key, label, value, icon, tone) => `<button onclick="setAlojamentoStatusFilter('${key}')" class="w-full text-left card p-4 rounded-2xl border-l-4 ${window.alojamentoStatusFilter === key ? 'border-l-primary bg-primary/10' : tone} hover:bg-surface-container-highest transition-colors"><div class="flex items-center justify-between gap-2"><div><p class="text-[10px] uppercase font-black tracking-widest text-muted">${label}</p><div class="text-3xl font-display font-black text-on-surface">${value}</div></div><span class="material-symbols-outlined text-primary text-2xl">${icon}</span></div></button>`;
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div><h3 class="text-xl font-display font-bold text-primary">Controle de Alojamento</h3><p class="text-xs text-muted">Acompanhamento de necessidade, tratamento e responsável.</p></div>
                <div class="flex flex-wrap gap-2"><span class="badge bg-primary/10 text-primary border-primary/20">${base.length} necessidade(s)</span><span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">${naoTratados.length} não tratado(s)</span><span class="badge bg-green-500/10 text-green-400 border-green-500/20">${tratados.length} tratado(s)</span></div>
            </div>
            <div class="space-y-4">
                <div class="dashboard-indicators-row grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    ${box('TODOS', 'Todos', base.length, 'home', 'border-l-primary')}
                    ${box('NAO_TRATADO', 'Não tratados', naoTratados.length, 'warning', 'border-l-amber-500')}
                    ${box('TRATADO', 'Tratados', tratados.length, 'check_circle', 'border-l-green-500')}
                    ${box('DECLINADO', 'Declinados', declinados.length, 'block', 'border-l-red-500')}
                </div>
                <div class="card p-4 rounded-2xl">
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Buscar em alojamento</label>
                    <input id="alojamento-search-input" class="modal-input uppercase" value="${escapeHtml(window.alojamentoSearch || '')}" oninput="setAlojamentoSearch(this.value)" placeholder="BUSCAR POR NOME, FUNÇÃO, RM OU OBRA" autocomplete="off">
                </div>
                <div class="card rounded-2xl overflow-hidden table-scroll">
                    <table class="w-full min-w-[1360px] text-left text-sm">
                        <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-6 py-4 w-[260px] min-w-[260px]">Pessoa</th><th class="px-6 py-4 w-[230px] min-w-[230px]">Função</th><th class="px-6 py-4 w-[140px] min-w-[140px]">Nº Obra</th><th class="px-6 py-4 w-[180px] min-w-[180px]">Cidade/UF</th><th class="px-6 py-4 w-[140px] min-w-[140px]">Lançamento</th><th class="px-6 py-4 w-[190px] min-w-[190px]">Necessidade</th><th class="px-6 py-4 w-[150px] min-w-[150px]">Foi Alojado?</th><th class="px-6 py-4 w-[270px] min-w-[270px]">Responsável pelo Tratamento</th></tr></thead>
                        <tbody class="divide-y divide-outline-variant">${filtered.length ? filtered.map(c => {
                            const foiAlojado = String(c.alojamento_realizado || 'NAO').toUpperCase() === 'SIM' ? 'SIM' : 'NAO';
                            const responsavel = cleanString(c.alojamento_responsavel || '', 100).toUpperCase();
                            const tratamentoPendente = !c.declined_date && (foiAlojado !== 'SIM' || !responsavel.trim());
                            const necessidade = c.declined_date ? '<span class="badge bg-red-500/10 text-red-400 border-red-500/20">Declinado</span>' : tratamentoPendente ? '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20"><span class="material-symbols-outlined text-xs alert-pulse">warning</span> Sim - Não tratado</span>' : '<span class="badge bg-green-500/10 text-green-400 border-green-500/20"><span class="material-symbols-outlined text-xs">check_circle</span> Sim - Tratado</span>';
                            return `<tr class="hover:bg-surface-container-highest transition-colors ${c.declined_date ? 'opacity-70' : tratamentoPendente ? 'bg-amber-500/5' : ''}"><td class="px-6 py-4 align-top"><div class="font-bold text-on-surface leading-tight whitespace-normal break-words">${escapeHtml(c.name)}</div><div class="text-[11px] text-muted font-mono mt-1">CPF ${escapeHtml(formatCpf(c.cpf) || '-')}</div></td><td class="px-6 py-4 align-top font-semibold whitespace-normal break-words">${escapeHtml(c.func || '-')}</td><td class="px-6 py-4 align-top font-mono text-xs whitespace-normal break-words">${escapeHtml(c.digital_obra || c.rm || '-')}</td><td class="px-6 py-4 align-top whitespace-normal break-words">${escapeHtml(c.city || '-')}${c.state ? ' / ' + escapeHtml(c.state) : ''}</td><td class="px-6 py-4 align-top font-mono text-xs">${escapeHtml(dateOrDash(c.alojamento_lancado_em))}</td><td class="px-6 py-4 align-top">${necessidade}</td><td class="px-6 py-4 align-top"><select class="modal-input text-xs font-bold uppercase min-w-[96px]" onchange="updateCandidateAlojamentoRealizado(${c.id}, this.value)"><option value="NAO" ${foiAlojado === 'NAO' ? 'selected' : ''}>Não</option><option value="SIM" ${foiAlojado === 'SIM' ? 'selected' : ''}>Sim</option></select></td><td class="px-6 py-4 align-top min-w-[260px]">${foiAlojado === 'SIM' ? `<div class="space-y-1"><input type="text" class="modal-input uppercase text-xs" maxlength="100" value="${escapeHtml(responsavel)}" placeholder="NOME DO RESPONSÁVEL" oninput="maskUppercaseInput(this, 100); updateCandidateAlojamentoResponsavel(${c.id}, this.value)" onblur="renderCurrentPage()">${!responsavel.trim() ? '<div class="flex items-center gap-1 text-[10px] font-bold uppercase text-amber-400"><span class="material-symbols-outlined text-xs alert-pulse">warning</span> Responsável pendente</div>' : ''}</div>` : '<div class="flex items-center gap-1 text-xs text-amber-400 font-bold uppercase"><span class="material-symbols-outlined text-sm alert-pulse">warning</span> Não tratado</div>'}</td></tr>`;
                        }).join('') : '<tr><td colspan="8" class="p-12 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma pessoa no filtro de alojamento.</div></td></tr>'}</tbody>
                    </table>
                </div>
            </div>
        </div>`;
}

// ------------------------------------------------------------
// Solicitações / Vagas
// ------------------------------------------------------------
function getSolicitationIndexForVacancyRow(row) {
    return SOLICITATIONS.findIndex(s => !isSolicitationCanceled(s) && String(s.rm || '') === String(row.rm || '') && String(s.digital_obra || '').toUpperCase() === String(row.digital_obra || '').toUpperCase() && String(s.func || '').toUpperCase() === String(row.func || '').toUpperCase());
}

function renderVagas() {
    const container = document.getElementById('page-vagas');
    if (!container) return;
    const summary = getVacancySummary();
    const coveragePct = summary.requested > 0 ? Math.min(100, Math.round((summary.recruited / summary.requested) * 100)) : 0;
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h3 class="font-display font-bold text-xl text-primary">Controle de Vagas</h3><p class="text-xs text-muted">As vagas vêm das Solicitações de M.O. e são baixadas por RM, Obra e função vinculados ao colaborador.</p></div><div class="flex flex-col sm:flex-row gap-2"><button onclick="openNewSolicitationModal()" class="btn btn-primary text-xs"><span class="material-symbols-outlined text-sm">assignment_add</span> Nova RM</button><button onclick="selectPage('recrutamento')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">person_search</span> Abrir Recrutamento</button></div></div>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"><div class="card p-5 rounded-2xl border-l-4 border-l-primary"><p class="text-[10px] font-bold uppercase text-muted tracking-widest">Vagas Solicitadas</p><div class="text-3xl font-display font-black text-on-surface mt-2">${summary.requested}</div></div><div class="card p-5 rounded-2xl border-l-4 border-l-blue-400"><p class="text-[10px] font-bold uppercase text-muted tracking-widest">Baixadas no Recrutamento</p><div class="text-3xl font-display font-black text-blue-400 mt-2">${summary.recruited}</div></div><div class="card p-5 rounded-2xl border-l-4 ${summary.open > 0 ? 'border-l-amber-500' : 'border-l-green-500'}"><p class="text-[10px] font-bold uppercase text-muted tracking-widest">Saldo em Aberto</p><div class="text-3xl font-display font-black ${summary.open > 0 ? 'text-amber-400' : 'text-green-400'} mt-2">${summary.open}</div></div><div class="card p-5 rounded-2xl border-l-4 border-l-red-500"><p class="text-[10px] font-bold uppercase text-muted tracking-widest">Declinados</p><div class="text-3xl font-display font-black text-red-400 mt-2">${summary.declined}</div></div></div>
            <div class="card p-6 rounded-2xl"><div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5"><div><h4 class="text-sm font-bold">Cobertura Geral de Vagas</h4><p class="text-xs text-muted">${coveragePct}% coberto pelo recrutamento ativo.</p></div><span class="badge ${summary.open === 0 && summary.requested > 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">${summary.open === 0 && summary.requested > 0 ? 'Cobertura completa' : `${summary.open} em aberto`}</span></div><div class="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden"><div class="bg-primary h-full" style="width: ${coveragePct}%"></div></div></div>
            <div class="card rounded-2xl overflow-hidden table-scroll"><table class="w-full min-w-[1220px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-5 py-4">RM / Obra</th><th class="px-5 py-4">Função</th><th class="px-5 py-4 text-center">Ícone / Saldo</th><th class="px-5 py-4 text-center">Solicitadas</th><th class="px-5 py-4 text-center">Baixadas</th><th class="px-5 py-4 text-center">Em Aberto</th><th class="px-5 py-4 text-center">Excedente</th><th class="px-5 py-4 text-right">Ação</th></tr></thead><tbody class="divide-y divide-outline-variant">
                ${summary.rows.length ? summary.rows.map(row => {
                    const pct = row.requested > 0 ? Math.min(100, Math.round((row.recruited / row.requested) * 100)) : 0;
                    const isClosed = row.open === 0 && row.requested > 0;
                    const isUnlinked = row.sem_rm || (!row.rm && !row.digital_obra);
                    const statusBadge = isClosed ? '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Atendida</span>' : isUnlinked ? '<span class="badge bg-red-500/10 text-red-400 border-red-500/20">Sem RM</span>' : '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Aberta</span>';
                    const solIdx = getSolicitationIndexForVacancyRow(row);
                    return `<tr class="hover:bg-surface-container-highest transition-colors"><td class="px-5 py-4"><div class="font-mono font-bold text-primary">RM ${escapeHtml(row.rm || '-')}</div><div class="text-[11px] text-on-surface font-mono">${escapeHtml(row.digital_obra || 'SEM OBRA')}</div><div class="mt-2">${statusBadge}</div></td><td class="px-5 py-4"><div class="font-bold text-on-surface">${escapeHtml(row.func)}</div><div class="mt-2 w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden"><div class="bg-primary h-full" style="width: ${pct}%"></div></div></td><td class="px-5 py-4 text-center"><div class="inline-flex items-center justify-center gap-2 rounded-full border ${row.open > 0 ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-green-500/30 bg-green-500/10 text-green-400'} px-3 py-2 font-black" title="Saldo desta RM/Obra/Função"><span class="material-symbols-outlined text-lg">event_seat</span><span>${row.open}</span></div></td><td class="px-5 py-4 text-center font-mono font-bold">${row.requested}</td><td class="px-5 py-4 text-center font-mono font-bold text-blue-400">${row.recruited}</td><td class="px-5 py-4 text-center font-mono font-bold ${row.open > 0 ? 'text-amber-400' : 'text-green-400'}">${row.open}</td><td class="px-5 py-4 text-center font-mono font-bold ${row.over > 0 ? 'text-red-400' : 'text-muted'}">${row.over}</td><td class="px-5 py-4 text-right"><div class="flex flex-wrap justify-end gap-2"><button onclick='openRecruitmentFromVacancy(${jsArg(row.func)}, ${jsArg(row.rm)}, ${jsArg(row.digital_obra)})' class="inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${row.open <= 0 && row.requested > 0 ? 'border-outline-variant text-muted opacity-60 cursor-not-allowed' : 'border-primary/20 text-primary hover:bg-primary/10'}" ${row.open <= 0 && row.requested > 0 ? 'disabled title="Todas as vagas desta RM já foram baixadas"' : ''}><span class="material-symbols-outlined text-sm">person_add</span> Recrutar</button>${solIdx >= 0 ? `<button onclick="openCancelSolicitationModal(${solIdx})" class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10"><span class="material-symbols-outlined text-sm">cancel</span> Cancelado</button>` : ''}</div></td></tr>`;
                }).join('') : '<tr><td colspan="8" class="p-12 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma vaga cadastrada. Registre uma Solicitação de M.O. para iniciar o controle.</div></td></tr>'}
            </tbody></table></div>
        </div>`;
    updateVacancyBadge();
}

// ------------------------------------------------------------
// Pipeline / Leadtime no modelo solicitado
// ------------------------------------------------------------
function diffDaysInclusiveSafe(startValue, endValue) {
    const start = parsePipelineDate(startValue);
    const end = parsePipelineDate(endValue);
    if (!start || !end) return null;
    return Math.max(0, Math.round((end - start) / (1000 * 60 * 60 * 24)));
}
function getLeadtimeModelStats() {
    const active = CANDIDATES.filter(c => !c.declined_date);
    const stages = [
        { label: 'Média Recrutamento x ASO - DIAS', short: 'Recrutamento x ASO', getStart: c => c.recruited, getEnd: c => c.aso, color: 'bg-green-500' },
        { label: 'Média ASO x Admissão - DIAS', short: 'ASO x Admissão', getStart: c => c.aso, getEnd: c => c.admitted, color: 'bg-sky-600' },
        { label: 'Média Admissão x Crachá liberado - DIAS', short: 'Admissão x Crachá', getStart: c => c.admitted, getEnd: c => c.badge_real_date, color: 'bg-amber-400' },
        { label: 'Tempo Recrutamento x Emissão Crachá', short: 'Recrutamento x Crachá', getStart: c => c.recruited, getEnd: c => c.badge_real_date, color: 'bg-cyan-700' }
    ];
    return stages.map(stage => {
        const samples = active.map(c => diffDaysInclusiveSafe(stage.getStart(c), stage.getEnd(c))).filter(v => Number.isFinite(v));
        const avg = samples.length ? +(samples.reduce((a,b) => a + b, 0) / samples.length).toFixed(1) : 0;
        return { ...stage, samples, avg, min: samples.length ? Math.min(...samples) : 0, max: samples.length ? Math.max(...samples) : 0 };
    });
}

function renderPipelineBarChart() {
    const stats = getLeadtimeModelStats();
    const maxAvg = Math.max(...stats.map(s => s.avg), 1);
    return `
        <div class="rounded-2xl border border-sky-400/50 bg-[#3f3f3f] shadow-2xl overflow-hidden">
            <div class="relative p-5 sm:p-7 min-h-[420px]" style="background: radial-gradient(circle at 48% 45%, rgba(255,255,255,.12), rgba(0,0,0,.22) 52%, rgba(0,0,0,.38));">
                <div class="text-center mb-6">
                    <h4 class="font-display font-black text-xl sm:text-2xl tracking-[0.12em] uppercase text-white drop-shadow">Status Mobilização - Recrutamento a Crachá</h4>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-end">
                    ${stats.map(stage => {
                        const height = Math.max(32, Math.round((stage.avg / maxAvg) * 250));
                        return `
                            <div class="flex flex-col items-center justify-end min-h-[330px]">
                                <div class="h-[270px] w-full flex items-end justify-center">
                                    <div class="relative w-28 sm:w-32 rounded-t-sm ${stage.color} shadow-lg" style="height:${height}px; background-image:linear-gradient(to bottom, rgba(255,255,255,.23), rgba(0,0,0,.16));">
                                        <div class="absolute -top-7 left-0 right-0 text-center text-sm font-bold text-white tracking-widest">${stage.avg}</div>
                                    </div>
                                </div>
                                <div class="mt-3 text-center text-xs sm:text-sm text-white/90 leading-tight min-h-[48px] flex items-start justify-center">${escapeHtml(stage.label)}</div>
                                <div class="mt-1 text-[11px] text-white/70">${stage.samples.length} registro(s) • Máx. ${stage.max}d</div>
                            </div>`;
                    }).join('')}
                </div>
            </div>
        </div>`;
}

// Ajusta detalhes do pipeline para usar o modelo novo e os mesmos cálculos
function renderPipeline() {
    const container = document.getElementById('page-pipeline');
    if (!container) return;
    const stats = getLeadtimeModelStats();
    const counts = getPipelineStageCounts();
    const totalAvg = stats.reduce((sum, s) => sum + s.avg, 0).toFixed(1);
    const worstStage = stats.slice().sort((a, b) => b.avg - a.avg)[0] || { label: '-', avg: 0 };
    const pendingTraining = CANDIDATES.filter(c => !c.declined_date && c.admitted && !hasCompletedRequiredTrainings(c)).length;
    const pendingBadge = CANDIDATES.filter(c => !c.declined_date && hasCompletedRequiredTrainings(c) && !isBadgeCompleted(c)).length;
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                <div><div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary mb-3"><span class="material-symbols-outlined text-sm">account_tree</span> Análise do Processo Completo</div><h3 class="font-display font-black text-2xl text-on-surface">Pipeline de Mobilização</h3><p class="text-xs text-muted mt-1">KPIs de leadtime, conversão por etapa, emissão de crachá e declínios.</p></div>
                <div class="flex flex-wrap gap-2"><span class="badge bg-primary/10 text-primary border-primary/20">${counts.active} ativo(s)</span><span class="badge bg-error/10 text-error border-error/20">${counts.declined} declinado(s)</span></div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">${renderPipelineKpiCard('Leadtime Total Médio', `${totalAvg}d`, 'Soma das médias das etapas principais.', 'timer', 'primary')}${renderPipelineKpiCard('Maior Leadtime', `${worstStage.avg}d`, worstStage.label, 'trending_up', worstStage.avg ? 'amber' : 'green')}${renderPipelineKpiCard('Treinamento Pendente', pendingTraining, 'Admitidos sem todos os treinamentos obrigatórios.', 'school', pendingTraining ? 'amber' : 'green')}${renderPipelineKpiCard('Crachá Pendente', pendingBadge, 'Treinamento concluído sem crachá concluído.', 'badge', pendingBadge ? 'amber' : 'green')}</div>
            ${renderPipelineBarChart()}
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">${renderPipelinePieChart(counts)}<div class="card rounded-2xl overflow-hidden"><div class="p-5 border-b border-outline-variant bg-surface-container-low"><h4 class="font-display font-bold text-lg text-on-surface">Resumo por Etapa</h4><p class="text-xs text-muted">Base consolidada do processo completo.</p></div><div class="table-scroll"><table class="w-full min-w-[620px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-5 py-4">Etapa</th><th class="px-5 py-4 text-center">Qtd.</th><th class="px-5 py-4 text-center">% Ativos</th></tr></thead><tbody class="divide-y divide-outline-variant">${[['Recrutados', counts.recruited], ['ASO realizado', counts.asoDone], ['Admitidos', counts.admitted], ['Fim de treinamentos', counts.trainingDone], ['Crachá postado', counts.badgePosted], ['Crachá emitido', counts.badgeIssued]].map(([label, value]) => { const pct = counts.active ? Math.round((value / counts.active) * 100) : 0; return `<tr class="hover:bg-surface-container-highest"><td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(label)}</td><td class="px-5 py-4 text-center font-mono font-black text-primary">${value}</td><td class="px-5 py-4 text-center"><div class="flex items-center justify-center gap-3"><div class="w-24 h-2 rounded-full bg-surface-container-highest overflow-hidden"><div class="h-full bg-primary" style="width:${pct}%"></div></div><span class="font-mono text-xs text-muted w-10 text-right">${pct}%</span></div></td></tr>`; }).join('')}</tbody></table></div></div></div>
            <div class="card rounded-2xl overflow-hidden"><div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3"><div><h4 class="font-display font-bold text-lg text-on-surface">Detalhe do Leadtime</h4><p class="text-xs text-muted">Quantidade de registros usados em cada média, mínimo, médio e máximo.</p></div><span class="badge bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Dias corridos</span></div><div class="table-scroll"><table class="w-full min-w-[760px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-5 py-4">Etapa</th><th class="px-5 py-4 text-center">Registros</th><th class="px-5 py-4 text-center">Mín.</th><th class="px-5 py-4 text-center">Médio</th><th class="px-5 py-4 text-center">Máx.</th></tr></thead><tbody class="divide-y divide-outline-variant">${stats.map(stage => `<tr class="hover:bg-surface-container-highest"><td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(stage.label)}</td><td class="px-5 py-4 text-center font-mono">${stage.samples.length}</td><td class="px-5 py-4 text-center font-mono">${stage.min}d</td><td class="px-5 py-4 text-center font-mono font-black text-primary">${stage.avg}d</td><td class="px-5 py-4 text-center font-mono ${stage.max > stage.avg ? 'text-amber-400 font-bold' : ''}">${stage.max}d</td></tr>`).join('')}</tbody></table></div></div>
        </div>`;
}

// Regras de navegação atualizadas
const originalSelectPageAfterCorrections = typeof selectPage === 'function' ? selectPage : null;
selectPage = function(page) {
    if (page === 'resumo') page = 'dashboard';
    currentPage = page;
    applyMenuCorrections();
    document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === page));
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) pageEl.classList.remove('hidden');
    const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    const titleNode = navItem ? navItem.cloneNode(true) : null;
    titleNode?.querySelectorAll('.material-symbols-outlined, #vacancies-nav-badge, #alojamento-alert-icon, #alojamento-alert-count').forEach(icon => icon.remove());
    const title = titleNode ? titleNode.textContent.trim() : 'Dashboard';
    const topTitle = document.getElementById('topbar-title');
    if (topTitle) topTitle.textContent = title;
    const actionBtn = document.getElementById('topbar-action-btn');
    if (actionBtn) {
        actionBtn.classList.remove('hidden');
        if (page === 'dashboard' || page === 'solicitacao' || page === 'vagas') { actionBtn.innerHTML = '<span class="material-symbols-outlined text-sm">assignment_add</span> Nova RM'; actionBtn.onclick = openNewSolicitationModal; }
        else if (page === 'treinamentos') { actionBtn.innerHTML = '<span class="material-symbols-outlined text-sm">add_circle</span> Nova Função'; actionBtn.onclick = openNewFunctionModal; }
        else if (page === 'mobilizacao' || page === 'recrutamento') { actionBtn.innerHTML = '<span class="material-symbols-outlined text-sm">person_add</span> Nova Pessoa'; actionBtn.onclick = openAddPersonModal; }
        else if (page === 'alojamento') { actionBtn.innerHTML = '<span class="material-symbols-outlined text-sm">groups</span> Gestão de Pessoas'; actionBtn.onclick = () => selectPage('recrutamento'); }
        else { actionBtn.classList.add('hidden'); actionBtn.onclick = null; }
    }
    renderCurrentPage();
    updateAlertIcon();
};

renderCurrentPage = function() {
    applyMenuCorrections();
    if (currentPage === 'dashboard') renderDashboard();
    else if (currentPage === 'treinamentos') renderTreinamentos();
    else if (currentPage === 'recrutamento') renderRecrutamento();
    else if (currentPage === 'matriz-recrutamento') renderMatrizRecrutamento();
    else if (currentPage === 'mobilizacao') renderMobilização();
    else if (currentPage === 'cracha') renderCracha();
    else if (currentPage === 'alojamento') renderAlojamento();
    else if (currentPage === 'solicitacao') renderSolicitacoes();
    else if (currentPage === 'vagas') renderVagas();
    else if (currentPage === 'pipeline') renderPipeline();
    else {
        const pageNode = document.getElementById(`page-${currentPage}`);
        if (pageNode) pageNode.innerHTML = `<div class="empty-state rounded-2xl p-12 text-center text-muted">Módulo em desenvolvimento.</div>`;
    }
};

setTimeout(() => {
    applyMenuCorrections();
    if (typeof currentPage !== 'undefined') renderCurrentPage();
}, 0);


// ============================================================
// DESIGN PRO PATCH - Painéis executivos e funcionalidades
// ============================================================
let PANEL_SELECTED_OBRA = '';

function proClean(value) { return String(value ?? '').trim(); }
function proNumber(value) { const n = Number(value); return Number.isFinite(n) ? n : 0; }
function proPct(value, total) { return total ? Math.max(0, Math.min(100, Math.round((value / total) * 100))) : 0; }
function proObra(item) { return proClean(item?.digital_obra || item?.obra || ''); }
function proObras() {
    const set = new Set();
    (SOLICITATIONS || []).forEach(s => { const o = proObra(s); if (o) set.add(o); });
    (CANDIDATES || []).forEach(c => { const o = proObra(c); if (o) set.add(o); });
    return [...set].sort((a,b) => a.localeCompare(b, 'pt-BR', { numeric: true, sensitivity: 'base' }));
}
function proSolicitations() {
    return (SOLICITATIONS || []).filter(s => !PANEL_SELECTED_OBRA || proObra(s) === PANEL_SELECTED_OBRA);
}
function proCandidates(includeDeclined = false) {
    return (CANDIDATES || []).filter(c => (includeDeclined || !c.declined_date) && (!PANEL_SELECTED_OBRA || proObra(c) === PANEL_SELECTED_OBRA));
}
function proSetObra(value) { PANEL_SELECTED_OBRA = value || ''; renderCurrentPage(); }
function proGo(page) { if (typeof selectPage === 'function') selectPage(page); }
function proCandidateStage(c) {
    if (c.declined_date) return 'Declinado';
    if (isBadgeCompleted(c)) return 'Liberado';
    if (c.badge_posted_date || (c.admitted && hasCompletedRequiredTrainings(c))) return 'Aguardando Crachá';
    if (c.admitted) return hasCompletedRequiredTrainings(c) ? 'Treinamento OK' : 'Em Treinamento';
    if (c.aso) return 'Aguardando Admissão';
    return 'Aguardando ASO';
}
function proPanelMetrics() {
    syncBadgeQueue?.();
    (CANDIDATES || []).forEach(c => refreshBadgeConclusion?.(c));
    const sol = proSolicitations();
    const active = proCandidates(false);
    const all = proCandidates(true);
    const requested = sol.filter(s => !isSolicitationCanceled(s)).reduce((sum, s) => sum + proNumber(s.qty || 0), 0);
    const recruited = active.length;
    const open = Math.max(0, requested - recruited);
    const asoPending = active.filter(c => !c.aso).length;
    const admissionPending = active.filter(c => c.aso && !c.admitted).length;
    const inTraining = active.filter(c => c.admitted && !hasCompletedRequiredTrainings(c)).length;
    const trainingDone = active.filter(c => c.admitted && hasCompletedRequiredTrainings(c)).length;
    const badgeCompleted = active.filter(isBadgeCompleted).length;
    const badgePending = active.filter(c => (c.badge_posted_date || (c.admitted && hasCompletedRequiredTrainings(c))) && !isBadgeCompleted(c)).length;
    const declined = all.filter(c => c.declined_date).length;
    const alojamentoNeed = active.filter(c => c.alojado).length;
    const alojamentoPending = active.filter(c => c.alojado && (String(c.alojamento_realizado || 'NAO').toUpperCase() !== 'SIM' || !proClean(c.alojamento_responsavel))).length;
    return { sol, active, all, requested, recruited, open, asoPending, admissionPending, inTraining, trainingDone, badgeCompleted, badgePending, declined, alojamentoNeed, alojamentoPending };
}
function proObraFilter() {
    const obras = proObras();
    return `
        <div class="pro-glass rounded-2xl p-4">
            <div class="grid grid-cols-1 lg:grid-cols-[1fr_260px_130px] gap-3 items-end">
                <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-muted mb-1">Filtro executivo</p>
                    <h4 class="font-display font-bold text-lg text-on-surface">Analisar por Obra</h4>
                    <p class="text-xs text-muted">O filtro usa exclusivamente o campo Obra/Digital de Obra e atualiza todos os painéis executivos.</p>
                </div>
                <label class="block">
                    <span class="text-[10px] font-black uppercase tracking-widest text-muted mb-1 block">Obra</span>
                    <select class="pro-select text-sm" onchange="proSetObra(this.value)">
                        <option value="">Todas as obras</option>
                        ${obras.map(o => `<option value="${escapeHtml(o)}" ${PANEL_SELECTED_OBRA === o ? 'selected' : ''}>${escapeHtml(o)}</option>`).join('')}
                    </select>
                </label>
                <button class="btn btn-ghost border border-outline-variant text-xs h-[44px]" onclick="proSetObra('')"><span class="material-symbols-outlined text-sm">filter_alt_off</span> Limpar</button>
            </div>
        </div>`;
}
function proKpi(title, value, subtitle, icon, page, tone = 'primary') {
    const toneMap = {
        primary: 'text-primary border-primary/30 bg-primary/10',
        green: 'text-green-400 border-green-500/30 bg-green-500/10',
        amber: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
        red: 'text-red-400 border-red-500/30 bg-red-500/10',
        cyan: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
    };
    const cls = toneMap[tone] || toneMap.primary;
    return `<button onclick="proGo('${page}')" class="pro-glass pro-card-action rounded-2xl p-5 text-left w-full">
        <div class="flex items-start justify-between gap-3">
            <div class="pro-kpi-icon ${cls}"><span class="material-symbols-outlined">${icon}</span></div>
            <span class="material-symbols-outlined text-muted/70 text-base">north_east</span>
        </div>
        <div class="mt-5 text-4xl font-display font-black text-on-surface leading-none">${value}</div>
        <div class="mt-3">
            <p class="text-[11px] font-black uppercase tracking-widest text-on-surface">${escapeHtml(title)}</p>
            <p class="text-xs text-muted mt-1 leading-snug">${escapeHtml(subtitle)}</p>
        </div>
    </button>`;
}
function proStatusMap(metrics) {
    const rows = [
        { label: 'Solicitado', value: metrics.requested, page: 'solicitacao', icon: 'assignment_add' },
        { label: 'Recrutado', value: metrics.recruited, page: 'recrutamento', icon: 'person_search' },
        { label: 'ASO pendente', value: metrics.asoPending, page: 'recrutamento', icon: 'health_and_safety' },
        { label: 'Admissão pendente', value: metrics.admissionPending, page: 'recrutamento', icon: 'how_to_reg' },
        { label: 'Em treinamento', value: metrics.inTraining, page: 'mobilizacao', icon: 'school' },
        { label: 'Crachá pendente', value: metrics.badgePending, page: 'cracha', icon: 'badge' },
        { label: 'Liberado', value: metrics.badgeCompleted, page: 'cracha', icon: 'verified' }
    ];
    const max = Math.max(...rows.map(r => r.value), 1);
    return `<div class="pro-glass rounded-2xl p-5">
        <div class="flex items-center justify-between gap-3 mb-5"><div><h4 class="font-display font-bold text-lg">Mapa do Processo</h4><p class="text-xs text-muted">Clique em uma etapa para abrir o módulo correspondente.</p></div><span class="pro-pill"><span class="material-symbols-outlined text-sm">route</span> Fluxo</span></div>
        <div class="space-y-3">
            ${rows.map(r => `<button onclick="proGo('${r.page}')" class="w-full pro-link-card pro-card-action text-left">
                <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary">${r.icon}</span>
                    <div class="flex-1 min-w-0"><div class="flex items-center justify-between gap-3"><p class="text-sm font-bold text-on-surface truncate">${escapeHtml(r.label)}</p><span class="font-mono font-black text-primary">${r.value}</span></div><div class="pro-progress mt-2"><span style="width:${proPct(r.value, max)}%"></span></div></div>
                </div>
            </button>`).join('')}
        </div>
    </div>`;
}
function proActionCenter(metrics) {
    const pending = metrics.active
        .filter(c => !isBadgeCompleted(c) || (c.alojado && (String(c.alojamento_realizado || 'NAO').toUpperCase() !== 'SIM' || !proClean(c.alojamento_responsavel))) || !c.aso || !c.admitted)
        .slice()
        .sort((a,b) => proCandidateStage(a).localeCompare(proCandidateStage(b), 'pt-BR') || String(a.name).localeCompare(String(b.name), 'pt-BR'))
        .slice(0, 9);
    return `<div class="pro-glass rounded-2xl p-5">
        <div class="flex items-center justify-between gap-3 mb-5"><div><h4 class="font-display font-bold text-lg">Central de Ação</h4><p class="text-xs text-muted">Pendências operacionais priorizadas.</p></div><span class="pro-pill"><span class="material-symbols-outlined text-sm">priority_high</span> ${pending.length} itens</span></div>
        <div class="space-y-2 max-h-[470px] overflow-y-auto pr-1">
            ${pending.length ? pending.map(c => {
                const stage = proCandidateStage(c);
                const target = stage.includes('Crachá') || stage === 'Liberado' ? 'cracha' : stage.includes('Treinamento') ? 'mobilizacao' : c.alojado ? 'alojamento' : 'recrutamento';
                return `<button onclick="proGo('${target}')" class="w-full pro-link-card pro-card-action text-left">
                    <div class="flex items-start gap-3"><span class="material-symbols-outlined text-amber-400 mt-0.5">notifications_active</span><div class="min-w-0 flex-1"><p class="text-sm font-bold text-on-surface truncate">${escapeHtml(c.name || '-')}</p><p class="text-xs text-muted truncate">${escapeHtml(c.func || '-')} • ${escapeHtml(proObra(c) || '-')}</p><span class="inline-flex mt-2 text-[10px] font-black uppercase tracking-widest text-amber-300">${escapeHtml(stage)}</span></div></div>
                </button>`;
            }).join('') : `<div class="empty-state rounded-2xl p-8 text-center text-muted">Nenhuma pendência para o filtro selecionado.</div>`}
        </div>
    </div>`;
}
function proObraCoverageTable(metrics) {
    const map = new Map();
    (SOLICITATIONS || []).filter(s => !isSolicitationCanceled(s)).forEach(s => {
        if (PANEL_SELECTED_OBRA && proObra(s) !== PANEL_SELECTED_OBRA) return;
        const key = proObra(s) || 'SEM OBRA';
        if (!map.has(key)) map.set(key, { obra: key, requested: 0, recruited: 0, badge: 0, open: 0 });
        map.get(key).requested += proNumber(s.qty || 0);
    });
    proCandidates(false).forEach(c => {
        const key = proObra(c) || 'SEM OBRA';
        if (!map.has(key)) map.set(key, { obra: key, requested: 0, recruited: 0, badge: 0, open: 0 });
        map.get(key).recruited += 1;
        if (isBadgeCompleted(c)) map.get(key).badge += 1;
    });
    const rows = [...map.values()].map(r => ({...r, open: Math.max(0, r.requested - r.recruited), pct: proPct(r.recruited, r.requested)})).sort((a,b) => b.open - a.open || a.obra.localeCompare(b.obra, 'pt-BR'));
    return `<div class="pro-glass rounded-2xl overflow-hidden">
        <div class="p-5 border-b border-outline-variant flex items-center justify-between gap-3"><div><h4 class="font-display font-bold text-lg">Cobertura por Obra</h4><p class="text-xs text-muted">Solicitado x recrutado x liberado.</p></div><button onclick="proExportCoverageCsv()" class="btn btn-ghost border border-outline-variant text-xs"><span class="material-symbols-outlined text-sm">download</span> CSV</button></div>
        <div class="table-scroll"><table class="w-full min-w-[760px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-5 py-4">Obra</th><th class="px-5 py-4 text-center">Solicitado</th><th class="px-5 py-4 text-center">Recrutado</th><th class="px-5 py-4 text-center">Aberto</th><th class="px-5 py-4">Cobertura</th><th class="px-5 py-4 text-center">Crachá OK</th></tr></thead><tbody class="divide-y divide-outline-variant">
            ${rows.map(r => `<tr class="pro-table-row cursor-pointer" onclick="PANEL_SELECTED_OBRA='${escapeHtml(r.obra)}'; renderCurrentPage();"><td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(r.obra)}</td><td class="px-5 py-4 text-center font-mono">${r.requested}</td><td class="px-5 py-4 text-center font-mono text-primary font-black">${r.recruited}</td><td class="px-5 py-4 text-center font-mono ${r.open ? 'text-amber-400 font-black' : 'text-green-400 font-black'}">${r.open}</td><td class="px-5 py-4"><div class="flex items-center gap-3"><div class="pro-progress flex-1"><span style="width:${r.pct}%"></span></div><span class="font-mono text-xs text-muted w-10 text-right">${r.pct}%</span></div></td><td class="px-5 py-4 text-center font-mono text-green-400 font-black">${r.badge}</td></tr>`).join('') || `<tr><td colspan="6" class="px-5 py-8 text-center text-muted">Sem dados para o filtro selecionado.</td></tr>`}
        </tbody></table></div>
    </div>`;
}
function proExportCoverageCsv() {
    const rows = [['Obra','Solicitado','Recrutado','Aberto','Cracha OK']];
    const metrics = proPanelMetrics();
    const map = new Map();
    proSolicitations().filter(s => !isSolicitationCanceled(s)).forEach(s => {
        const key = proObra(s) || 'SEM OBRA';
        if (!map.has(key)) map.set(key, { requested: 0, recruited: 0, badge: 0 });
        map.get(key).requested += proNumber(s.qty || 0);
    });
    metrics.active.forEach(c => { const key = proObra(c) || 'SEM OBRA'; if (!map.has(key)) map.set(key, { requested: 0, recruited: 0, badge: 0 }); map.get(key).recruited++; if (isBadgeCompleted(c)) map.get(key).badge++; });
    [...map.entries()].forEach(([obra, r]) => rows.push([obra, r.requested, r.recruited, Math.max(0, r.requested - r.recruited), r.badge]));
    proDownloadCsv('cobertura_mobilizaprp.csv', rows);
}
function proDownloadCsv(filename, rows) {
    const csv = rows.map(row => row.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(';')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
function proCopySummary() {
    const m = proPanelMetrics();
    const txt = `MobilizaPRO - Resumo Executivo\nObra: ${PANEL_SELECTED_OBRA || 'Todas'}\nVagas solicitadas: ${m.requested}\nVagas em aberto: ${m.open}\nRecrutados ativos: ${m.recruited}\nASO pendente: ${m.asoPending}\nAdmissão pendente: ${m.admissionPending}\nEm treinamento: ${m.inTraining}\nCrachá pendente: ${m.badgePending}\nCrachá concluído: ${m.badgeCompleted}\nAlojamento pendente: ${m.alojamentoPending}`;
    if (navigator.clipboard) navigator.clipboard.writeText(txt);
    alert('Resumo executivo copiado.');
}

function renderDashboard() {
    const container = document.getElementById('page-dashboard');
    if (!container) return;
    const m = proPanelMetrics();
    const coverage = proPct(m.recruited, m.requested);
    const critical = m.open + m.asoPending + m.admissionPending + m.inTraining + m.badgePending + m.alojamentoPending;
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="pro-hero rounded-3xl p-6 sm:p-7">
                <div class="relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-end">
                    <div>
                        <div class="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary mb-4"><span class="material-symbols-outlined text-sm">dashboard_customize</span> Painel Executivo</div>
                        <h3 class="font-display font-black text-3xl sm:text-4xl text-on-surface tracking-tight">Central de Mobilização</h3>
                        <p class="text-sm text-muted mt-2 max-w-3xl">Visão integrada e acionável do fluxo completo: Solicitação M.O., Recrutamento, Mobilização, Crachá, Alojamento, Vagas e Pipeline.</p>
                        <div class="flex flex-wrap gap-2 mt-5"><span class="pro-pill"><span class="material-symbols-outlined text-sm">domain</span>${escapeHtml(PANEL_SELECTED_OBRA || 'Todas as obras')}</span><span class="pro-pill"><span class="material-symbols-outlined text-sm">warning</span>${critical} ponto(s) de atenção</span><span class="pro-pill"><span class="material-symbols-outlined text-sm">percent</span>${coverage}% cobertura</span></div>
                    </div>
                    <div class="pro-glass rounded-2xl p-5">
                        <div class="flex items-center justify-between mb-3"><p class="text-[10px] font-black uppercase tracking-widest text-muted">Cobertura de Vagas</p><span class="font-mono text-primary font-black">${coverage}%</span></div>
                        <div class="pro-progress"><span style="width:${coverage}%"></span></div>
                        <div class="grid grid-cols-3 gap-3 mt-5 text-center"><div><div class="text-2xl font-display font-black">${m.requested}</div><p class="text-[10px] text-muted uppercase font-bold tracking-wider">Solicitado</p></div><div><div class="text-2xl font-display font-black text-primary">${m.recruited}</div><p class="text-[10px] text-muted uppercase font-bold tracking-wider">Recrutado</p></div><div><div class="text-2xl font-display font-black ${m.open ? 'text-amber-400' : 'text-green-400'}">${m.open}</div><p class="text-[10px] text-muted uppercase font-bold tracking-wider">Aberto</p></div></div>
                    </div>
                </div>
            </div>
            ${proObraFilter()}
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                ${proKpi('Vagas Solicitadas', m.requested, 'Solicitações ativas no filtro.', 'event_seat', 'solicitacao', 'primary')}
                ${proKpi('Vagas em Aberto', m.open, 'Saldo ainda sem baixa.', 'pending_actions', 'vagas', m.open ? 'amber' : 'green')}
                ${proKpi('ASO Pendente', m.asoPending, 'Candidatos aguardando ASO real.', 'health_and_safety', 'recrutamento', m.asoPending ? 'amber' : 'green')}
                ${proKpi('Admissão Pendente', m.admissionPending, 'ASO concluído sem admissão real.', 'how_to_reg', 'recrutamento', m.admissionPending ? 'amber' : 'green')}
                ${proKpi('Em Treinamento', m.inTraining, 'Admitidos aguardando fim dos treinamentos.', 'school', 'mobilizacao', m.inTraining ? 'cyan' : 'green')}
                ${proKpi('Crachá Pendente', m.badgePending, 'Aguardando emissão ou justificativa.', 'badge', 'cracha', m.badgePending ? 'amber' : 'green')}
                ${proKpi('Alojamento Pendente', m.alojamentoPending, 'Necessidade sim ainda não tratada.', 'home_work', 'alojamento', m.alojamentoPending ? 'red' : 'green')}
                ${proKpi('Liberados', m.badgeCompleted, 'Crachá concluído no filtro.', 'verified', 'cracha', 'green')}
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-[1.15fr_.85fr] gap-6">
                ${proStatusMap(m)}
                ${proActionCenter(m)}
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
                ${proObraCoverageTable(m)}
                <div class="pro-glass rounded-2xl p-5">
                    <h4 class="font-display font-bold text-lg">Funcionalidades rápidas</h4>
                    <p class="text-xs text-muted mt-1 mb-4">Atalhos para ações frequentes do controle.</p>
                    <div class="space-y-3">
                        <button onclick="openNewSolicitationModal()" class="w-full pro-link-card pro-card-action text-left"><span class="material-symbols-outlined text-primary align-middle mr-2">assignment_add</span><b>Nova solicitação M.O.</b><p class="text-xs text-muted mt-1">Cadastrar RM e quantidade solicitada.</p></button>
                        <button onclick="openAddPersonModal()" class="w-full pro-link-card pro-card-action text-left"><span class="material-symbols-outlined text-primary align-middle mr-2">person_add</span><b>Novo colaborador</b><p class="text-xs text-muted mt-1">Cadastrar candidato no recrutamento.</p></button>
                        <button onclick="proCopySummary()" class="w-full pro-link-card pro-card-action text-left"><span class="material-symbols-outlined text-primary align-middle mr-2">content_copy</span><b>Copiar resumo executivo</b><p class="text-xs text-muted mt-1">Gerar texto rápido com KPIs atuais.</p></button>
                        <button onclick="proGo('pipeline')" class="w-full pro-link-card pro-card-action text-left"><span class="material-symbols-outlined text-primary align-middle mr-2">bar_chart</span><b>Abrir Pipeline</b><p class="text-xs text-muted mt-1">Leadtime e conversão do processo completo.</p></button>
                    </div>
                </div>
            </div>
        </div>`;
}

function proLeadtimeStatsFiltered() {
    const active = proCandidates(false);
    const stages = [
        { label: 'Média Recrutamento x ASO - DIAS', short: 'Recrutamento x ASO', getStart: c => c.recruited, getEnd: c => c.aso, color: '#05b85c' },
        { label: 'Média ASO x Admissão - DIAS', short: 'ASO x Admissão', getStart: c => c.aso, getEnd: c => c.admitted, color: '#1f78a3' },
        { label: 'Média Admissão x Crachá liberado - DIAS', short: 'Admissão x Crachá liberado', getStart: c => c.admitted, getEnd: c => c.badge_real_date, color: '#fbbf24' },
        { label: 'Tempo Recrutamento x Emissão Crachá', short: 'Recrutamento x Emissão Crachá', getStart: c => c.recruited, getEnd: c => c.badge_real_date, color: '#146b88' }
    ];
    return stages.map(stage => {
        const samples = active.map(c => diffDaysInclusiveSafe(stage.getStart(c), stage.getEnd(c))).filter(v => Number.isFinite(v));
        const avg = samples.length ? +(samples.reduce((a,b) => a + b, 0) / samples.length).toFixed(1) : 0;
        return { ...stage, samples, avg, min: samples.length ? Math.min(...samples) : 0, max: samples.length ? Math.max(...samples) : 0 };
    });
}
function renderPipelineBarChart(stats = proLeadtimeStatsFiltered()) {
    const maxAvg = Math.max(...stats.map(s => s.avg), 1);
    return `<div class="pro-chart-card">
        <div class="relative p-5 sm:p-7">
            <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-5">
                <div class="text-center lg:text-left flex-1"><h4 class="font-display font-black text-xl sm:text-2xl tracking-[0.08em] uppercase text-white drop-shadow">Status Mobilização - Recrutamento a Crachá</h4><p class="text-xs text-white/70 mt-1">Leadtime médio em dias corridos por etapa concluída.</p></div>
                <span class="pro-pill bg-black/20 border-white/10 text-white/80">Gráfico de barras</span>
            </div>
            <div class="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-end min-h-[360px]">
                <div class="pro-chart-gridline"></div>
                ${stats.map(stage => {
                    const height = Math.max(24, Math.min(230, Math.round((stage.avg / maxAvg) * 230)));
                    return `<div class="relative flex flex-col items-center justify-end min-h-[315px] px-2">
                        <div class="h-[244px] w-full flex items-end justify-center">
                            <div class="pro-bar relative" style="height:${height}px; background-color:${stage.color};">
                                <div class="absolute -top-8 left-0 right-0 text-center text-sm font-black text-white tracking-widest">${stage.avg}</div>
                            </div>
                        </div>
                        <div class="mt-4 text-center text-xs sm:text-sm text-white/92 leading-tight min-h-[44px] flex items-start justify-center font-semibold">${escapeHtml(stage.label)}</div>
                        <div class="mt-1 text-[11px] text-white/66">${stage.samples.length} registro(s) • Máx. ${stage.max}d</div>
                    </div>`;
                }).join('')}
            </div>
        </div>
    </div>`;
}
function renderPipelinePieChart(counts) {
    const emitted = counts.badgeIssued;
    const declined = counts.declined;
    const total = emitted + declined;
    const emittedPct = total ? Math.round((emitted / total) * 100) : 0;
    const declinedPct = total ? 100 - emittedPct : 0;
    const gradient = total ? `conic-gradient(#22c55e 0 ${emittedPct}%, #ef4444 ${emittedPct}% 100%)` : 'conic-gradient(#334155 0 100%)';
    return `<div class="pro-glass rounded-2xl p-6">
        <div class="flex items-start justify-between gap-3 mb-5"><div><h4 class="font-display font-bold text-lg text-on-surface">Crachás Emitidos x Declinados</h4><p class="text-xs text-muted">Composição do resultado final no filtro selecionado.</p></div><span class="pro-pill">${total} registros</span></div>
        <div class="relative pro-donut" style="background:${gradient}"><div class="pro-donut-label"><div class="text-center"><div class="text-3xl font-display font-black text-on-surface">${emittedPct}%</div><div class="text-[10px] font-bold uppercase tracking-widest text-muted">Emitidos</div></div></div></div>
        <div class="grid grid-cols-2 gap-3 mt-6"><div class="rounded-xl border border-green-500/20 bg-green-500/10 p-4"><p class="text-[10px] uppercase font-black tracking-widest text-green-300">Emitidos</p><div class="text-3xl font-display font-black text-green-400 mt-1">${emitted}</div></div><div class="rounded-xl border border-red-500/20 bg-red-500/10 p-4"><p class="text-[10px] uppercase font-black tracking-widest text-red-300">Declinados</p><div class="text-3xl font-display font-black text-red-400 mt-1">${declined}</div></div></div>
    </div>`;
}
function proPipelineCountsFiltered() {
    const all = proCandidates(true);
    const active = proCandidates(false);
    return {
        total: all.length,
        active: active.length,
        recruited: active.length,
        asoDone: active.filter(c => c.aso).length,
        admitted: active.filter(c => c.admitted).length,
        trainingDone: active.filter(c => c.admitted && hasCompletedRequiredTrainings(c)).length,
        badgePosted: active.filter(c => c.badge_posted_date).length,
        badgeIssued: active.filter(c => cleanDate(c.badge_real_date)).length,
        declined: all.filter(c => c.declined_date).length
    };
}
function renderPipeline() {
    const container = document.getElementById('page-pipeline');
    if (!container) return;
    const stats = proLeadtimeStatsFiltered();
    const counts = proPipelineCountsFiltered();
    const totalAvg = stats.reduce((sum, s) => sum + s.avg, 0).toFixed(1);
    const worstStage = stats.slice().sort((a, b) => b.avg - a.avg)[0] || { label: '-', avg: 0 };
    const pendingTraining = proCandidates(false).filter(c => c.admitted && !hasCompletedRequiredTrainings(c)).length;
    const pendingBadge = proCandidates(false).filter(c => hasCompletedRequiredTrainings(c) && !isBadgeCompleted(c)).length;
    container.innerHTML = `<div class="space-y-6 animate-up">
        <div class="pro-hero rounded-3xl p-6 sm:p-7"><div class="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-4"><div><div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary mb-3"><span class="material-symbols-outlined text-sm">account_tree</span> Análise do Processo Completo</div><h3 class="font-display font-black text-3xl text-on-surface">Pipeline de Mobilização</h3><p class="text-sm text-muted mt-1">Leadtime, conversão e gargalos do ciclo Recrutamento → Crachá.</p></div><div class="flex flex-wrap gap-2"><span class="pro-pill">${escapeHtml(PANEL_SELECTED_OBRA || 'Todas as obras')}</span><span class="pro-pill">${counts.active} ativo(s)</span><span class="pro-pill">${counts.declined} declinado(s)</span></div></div></div>
        ${proObraFilter()}
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">${renderPipelineKpiCard('Leadtime Total Médio', `${totalAvg}d`, 'Soma das médias das etapas principais.', 'timer', 'primary')}${renderPipelineKpiCard('Maior Leadtime', `${worstStage.avg}d`, worstStage.label, 'trending_up', worstStage.avg ? 'amber' : 'green')}${renderPipelineKpiCard('Treinamento Pendente', pendingTraining, 'Admitidos sem todos os treinamentos obrigatórios.', 'school', pendingTraining ? 'amber' : 'green')}${renderPipelineKpiCard('Crachá Pendente', pendingBadge, 'Treinamento concluído sem crachá concluído.', 'badge', pendingBadge ? 'amber' : 'green')}</div>
        ${renderPipelineBarChart(stats)}
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">${renderPipelinePieChart(counts)}<div class="pro-glass rounded-2xl overflow-hidden"><div class="p-5 border-b border-outline-variant"><h4 class="font-display font-bold text-lg text-on-surface">Resumo por Etapa</h4><p class="text-xs text-muted">Conversão por etapa dentro do filtro selecionado.</p></div><div class="table-scroll"><table class="w-full min-w-[620px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-5 py-4">Etapa</th><th class="px-5 py-4 text-center">Qtd.</th><th class="px-5 py-4">Conversão</th></tr></thead><tbody class="divide-y divide-outline-variant">${[['Recrutados', counts.recruited], ['ASO realizado', counts.asoDone], ['Admitidos', counts.admitted], ['Fim de treinamentos', counts.trainingDone], ['Crachá postado', counts.badgePosted], ['Crachá emitido', counts.badgeIssued]].map(([label, value]) => { const pct = proPct(value, counts.active); return `<tr class="pro-table-row"><td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(label)}</td><td class="px-5 py-4 text-center font-mono font-black text-primary">${value}</td><td class="px-5 py-4"><div class="flex items-center gap-3"><div class="pro-progress flex-1"><span style="width:${pct}%"></span></div><span class="font-mono text-xs text-muted w-10 text-right">${pct}%</span></div></td></tr>`; }).join('')}</tbody></table></div></div></div>
        <div class="pro-glass rounded-2xl overflow-hidden"><div class="p-5 border-b border-outline-variant flex items-center justify-between gap-3"><div><h4 class="font-display font-bold text-lg text-on-surface">Detalhe do Leadtime</h4><p class="text-xs text-muted">Quantidade de registros usados em cada média, mínimo, médio e máximo.</p></div><button onclick="proExportLeadtimeCsv()" class="btn btn-ghost border border-outline-variant text-xs"><span class="material-symbols-outlined text-sm">download</span> CSV</button></div><div class="table-scroll"><table class="w-full min-w-[760px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-5 py-4">Etapa</th><th class="px-5 py-4 text-center">Registros</th><th class="px-5 py-4 text-center">Mín.</th><th class="px-5 py-4 text-center">Médio</th><th class="px-5 py-4 text-center">Máx.</th></tr></thead><tbody class="divide-y divide-outline-variant">${stats.map(stage => `<tr class="pro-table-row"><td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(stage.label)}</td><td class="px-5 py-4 text-center font-mono">${stage.samples.length}</td><td class="px-5 py-4 text-center font-mono">${stage.min}d</td><td class="px-5 py-4 text-center font-mono font-black text-primary">${stage.avg}d</td><td class="px-5 py-4 text-center font-mono ${stage.max > stage.avg ? 'text-amber-400 font-bold' : ''}">${stage.max}d</td></tr>`).join('')}</tbody></table></div></div>
    </div>`;
}
function proExportLeadtimeCsv() {
    const rows = [['Etapa','Registros','Minimo','Medio','Maximo']];
    proLeadtimeStatsFiltered().forEach(s => rows.push([s.label, s.samples.length, s.min, s.avg, s.max]));
    proDownloadCsv('leadtime_mobilizaprp.csv', rows);
}

setTimeout(() => {
    if (typeof renderCurrentPage === 'function') renderCurrentPage();
}, 0);


// ------------------------------------------------------------
// Menu lateral ajustável
// ------------------------------------------------------------
function initResizableSidebar() {
    const sidebar = document.getElementById('sidebar');
    const handle = document.getElementById('sidebar-resize-handle');
    if (!sidebar || !handle) return;

    const root = document.documentElement;
    const key = 'mobilizaprp_sidebar_width';
    const min = 220;
    const max = 430;
    const fallback = 280;

    const clamp = value => Math.max(min, Math.min(max, Number(value) || fallback));
    const applyWidth = value => {
        const width = clamp(value);
        root.style.setProperty('--sidebar-current-width', width + 'px');
        sidebar.setAttribute('data-sidebar-width', String(width));
        return width;
    };

    try {
        const saved = Number(localStorage.getItem(key));
        if (saved) applyWidth(saved);
        else applyWidth(fallback);
    } catch (err) {
        applyWidth(fallback);
    }

    let startX = 0;
    let startWidth = fallback;
    let resizing = false;

    const move = event => {
        if (!resizing) return;
        const x = event.touches && event.touches.length ? event.touches[0].clientX : event.clientX;
        const width = applyWidth(startWidth + (x - startX));
        try { localStorage.setItem(key, String(width)); } catch (err) {}
        event.preventDefault();
    };

    const stop = () => {
        if (!resizing) return;
        resizing = false;
        document.body.classList.remove('sidebar-is-resizing');
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', stop);
        window.removeEventListener('touchmove', move);
        window.removeEventListener('touchend', stop);
        window.removeEventListener('touchcancel', stop);
    };

    const start = event => {
        if (window.innerWidth < 1024) return;
        resizing = true;
        const x = event.touches && event.touches.length ? event.touches[0].clientX : event.clientX;
        startX = x;
        startWidth = Number(sidebar.getAttribute('data-sidebar-width')) || sidebar.getBoundingClientRect().width || fallback;
        document.body.classList.add('sidebar-is-resizing');
        window.addEventListener('mousemove', move, { passive: false });
        window.addEventListener('mouseup', stop);
        window.addEventListener('touchmove', move, { passive: false });
        window.addEventListener('touchend', stop);
        window.addEventListener('touchcancel', stop);
        event.preventDefault();
    };

    handle.addEventListener('mousedown', start);
    handle.addEventListener('touchstart', start, { passive: false });
    handle.addEventListener('dblclick', () => {
        const width = applyWidth(fallback);
        try { localStorage.setItem(key, String(width)); } catch (err) {}
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResizableSidebar);
} else {
    initResizableSidebar();
}

