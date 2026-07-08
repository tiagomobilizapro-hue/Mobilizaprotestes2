// ============================================================
// MobilizaPro 1.12 - Regras operacionais 2026-07-07
// ============================================================
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const esc = (value) => (typeof escapeHtml === 'function'
    ? escapeHtml(value ?? '')
    : String(value ?? '').replace(/[&<>'"]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[s])));
  const clean = (value, max = 255) => (typeof cleanString === 'function'
    ? cleanString(value, max)
    : String(value ?? '').trim().slice(0, max));
  const todayIso = () => (typeof todayInputDate === 'function' ? todayInputDate() : new Date().toISOString().slice(0, 10));
  const dateLabel = (value) => (typeof dateOrDash === 'function' ? dateOrDash(value) : (value || '-'));

  function currentRecruiter() {
    let user = null;
    try {
      if (typeof getCurrentAccessUser === 'function') user = getCurrentAccessUser();
    } catch (error) {}
    return {
      name: clean(user?.name || user?.nome || 'SEM USUARIO LOGADO', 120).toUpperCase(),
      cpf: String(user?.cpf || '').replace(/\D/g, '').slice(0, 11)
    };
  }

  function candidateKey(c) {
    return [
      c?.id || '',
      String(c?.cpf || '').replace(/\D/g, ''),
      clean(c?.name || '', 140).toUpperCase(),
      clean(c?.rm || '', 30),
      clean(c?.digital_obra || c?.digitalObra || '', 40).toUpperCase(),
      clean(c?.func || '', 120).toUpperCase()
    ].join('|');
  }

  function stampRecruiter(candidate, force) {
    if (!candidate || (candidate.recruiter_name && !force)) return;
    const recruiter = currentRecruiter();
    candidate.recruiter_name = recruiter.name;
    candidate.recruiter_cpf = recruiter.cpf;
    candidate.recruited_by_name = recruiter.name;
    candidate.recruited_by_cpf = recruiter.cpf;
    if (!candidate.recruiter_registered_at) candidate.recruiter_registered_at = todayIso();
  }

  const previousSaveNewPerson = window.saveNewPerson;
  if (typeof previousSaveNewPerson === 'function') {
    window.saveNewPerson = function () {
      const before = new Set((window.CANDIDATES || []).map(candidateKey));
      const result = previousSaveNewPerson.apply(this, arguments);
      let changed = false;
      (window.CANDIDATES || []).forEach(candidate => {
        if (!before.has(candidateKey(candidate)) && !candidate.recruiter_name) {
          stampRecruiter(candidate, true);
          changed = true;
        }
      });
      if (changed) {
        try { saveData?.(); } catch (error) {}
        try { renderCurrentPage?.(); } catch (error) {}
      }
      return result;
    };
    try { saveNewPerson = window.saveNewPerson; } catch (error) {}
  }

  const previousRenderCandidateCard = window.renderCandidateCard;
  if (typeof previousRenderCandidateCard === 'function') {
    window.renderCandidateCard = function (candidate, showTrainingPanel) {
      let html = previousRenderCandidateCard.apply(this, arguments);
      if (html.includes('data-mobi-recruiter-line')) return html;
      const recruiter = clean(candidate?.recruiter_name || candidate?.recruited_by_name || '', 120).toUpperCase();
      const line = `<span data-mobi-recruiter-line class="text-[9px] text-muted block mt-0.5">Recrutador: <b class="text-on-surface">${esc(recruiter || 'NAO REGISTRADO')}</b></span>`;
      if (/Recrutado em[^<]*<\/span>/.test(html)) {
        return html.replace(/(<span class="text-\[9px\] text-muted">Recrutado em[^<]*<\/span>)/, `$1${line}`);
      }
      return html.replace('</h4>', `</h4>${line}`);
    };
    try { renderCandidateCard = window.renderCandidateCard; } catch (error) {}
  }

  function entityObra(entity) {
    return clean(entity?.digital_obra || entity?.digitalObra || entity?.obra_digital || entity?.obra || '', 80).toUpperCase();
  }
  function selectedObra() {
    try {
      if (typeof PANEL_SELECTED_OBRA !== 'undefined') return clean(PANEL_SELECTED_OBRA || '', 80).toUpperCase();
    } catch (error) {}
    try {
      if (typeof dashboardSelectedObra !== 'undefined' && typeof DASHBOARD_ALL_OBRAS !== 'undefined') {
        return dashboardSelectedObra === DASHBOARD_ALL_OBRAS ? '' : clean(dashboardSelectedObra || '', 80).toUpperCase();
      }
    } catch (error) {}
    return '';
  }
  function matchesObra(entity, obra) {
    return !obra || entityObra(entity) === obra;
  }
  function isCanceled(solicitation) {
    if (typeof isSolicitationCanceled === 'function') return isSolicitationCanceled(solicitation);
    return Boolean(solicitation?.canceled) || clean(solicitation?.status || '', 40).toUpperCase() === 'CANCELADA';
  }
  function pipelineVacancyDeclineMetrics() {
    const obra = selectedObra();
    const requested = (window.SOLICITATIONS || [])
      .filter(s => !isCanceled(s) && matchesObra(s, obra))
      .reduce((sum, s) => sum + Math.max(0, Number(s.qty || 0) || 0), 0);
    const declined = (window.CANDIDATES || [])
      .filter(c => c.declined_date && matchesObra(c, obra))
      .length;
    const activeRequested = Math.max(0, requested - declined);
    const declinedPct = requested ? Math.min(100, Math.round((declined / requested) * 100)) : 0;
    return { requested, declined, activeRequested, declinedPct };
  }

  window.renderPipelinePieChart = function () {
    const m = pipelineVacancyDeclineMetrics();
    const requestedPct = m.requested ? Math.max(0, 100 - m.declinedPct) : 0;
    const gradient = m.requested
      ? `conic-gradient(#22c55e 0 ${requestedPct}%, #ef4444 ${requestedPct}% 100%)`
      : 'conic-gradient(#334155 0 100%)';
    return `<div class="pro-glass rounded-2xl p-5">
      <div class="flex items-start justify-between gap-3 mb-5"><div><h4 class="font-display font-bold text-lg text-on-surface">Vagas Solicitadas x Vagas Declinadas</h4><p class="text-xs text-muted">Calculo por quantidade de vagas solicitadas na RM e vagas declinadas no filtro selecionado.</p></div><span class="pro-pill">${m.requested} vaga(s)</span></div>
      <div class="relative pro-donut" style="background:${gradient}"><div class="pro-donut-label"><div class="text-center"><div class="text-3xl font-display font-black text-on-surface">${m.declinedPct}%</div><div class="text-[10px] font-bold uppercase tracking-widest text-muted">Declinadas</div></div></div></div>
      <div class="grid grid-cols-2 gap-3 mt-6"><div class="rounded-xl border border-green-500/20 bg-green-500/10 p-4"><p class="text-[10px] uppercase font-black tracking-widest text-green-300">Vagas solicitadas</p><div class="text-3xl font-display font-black text-green-400 mt-1">${m.requested}</div><p class="text-[10px] text-muted mt-1">${m.activeRequested} sem declinio</p></div><div class="rounded-xl border border-red-500/20 bg-red-500/10 p-4"><p class="text-[10px] uppercase font-black tracking-widest text-red-300">Vagas declinadas</p><div class="text-3xl font-display font-black text-red-400 mt-1">${m.declined}</div><p class="text-[10px] text-muted mt-1">${m.declinedPct}% das solicitadas</p></div></div>
    </div>`;
  };
  try { renderPipelinePieChart = window.renderPipelinePieChart; } catch (error) {}

  function parseIso(value) {
    const raw = clean(value || '', 20);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return null;
    const date = new Date(`${raw}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  function addDaysIso(base, days) {
    const date = parseIso(base);
    if (!date) return '';
    date.setDate(date.getDate() + Math.max(0, Number(days || 0) || 0));
    return date.toISOString().slice(0, 10);
  }
  function asoDeadline(candidate) {
    const planned = clean(candidate?.aso_planned || candidate?.asoPrevista || '', 20);
    if (parseIso(planned)) return planned;
    const matrix = (window.TRAINING_MATRIX || []).find(item => clean(item?.function || '', 120).toUpperCase() === clean(candidate?.func || '', 120).toUpperCase());
    const days = Number(matrix?.aso_days ?? matrix?.recruitment_aso_days ?? matrix?.aso ?? 0) || 0;
    return addDaysIso(candidate?.recruited, days);
  }
  function isAsoDelayed(candidate, emissionDate) {
    const deadline = asoDeadline(candidate);
    const compare = clean(emissionDate || candidate?.aso || todayIso(), 20);
    return Boolean(deadline && compare && compare > deadline);
  }

  window.marcarASO = function (id) {
    const candidate = (window.CANDIDATES || []).find(item => Number(item.id) === Number(id));
    if (!candidate) return alert('Colaborador nao localizado.');
    candidate.aso_marcado = true;
    candidate.aso_alerta = true;
    candidate.aso_marcado_em = candidate.aso_marcado_em || todayIso();
    candidate.aso_status = 'PENDENTE';
    if (!candidate.aso_planned) candidate.aso_planned = asoDeadline(candidate) || todayIso();
    try { saveData?.(); } catch (error) {}
    alert(`Marcacao de ASO registrada para ${candidate.name}.`);
    try { renderCurrentPage?.(); } catch (error) {}
  };

  window.concluirASO = function (id, date) {
    const candidate = (window.CANDIDATES || []).find(item => Number(item.id) === Number(id));
    if (!candidate) return;
    const emission = clean(date || todayIso(), 20);
    if (!emission) return;
    if (isAsoDelayed(candidate, emission) && !clean(candidate.aso_delay_reason || '', 500)) {
      const reason = prompt(`ASO atrasado em relacao ao prazo da matriz (${dateLabel(asoDeadline(candidate))}). Informe a justificativa para concluir:`);
      if (!clean(reason || '', 500)) {
        alert('Justificativa obrigatoria para ASO atrasado.');
        try { renderCurrentPage?.(); } catch (error) {}
        return;
      }
      candidate.aso_delay_reason = clean(reason, 500);
    }
    candidate.aso = emission;
    candidate.aso_real = emission;
    candidate.aso_emissao_em = emission;
    candidate.aso_concluido_em = emission;
    candidate.aso_alerta = false;
    candidate.aso_status = 'CONCLUIDO';
    try { saveData?.(); } catch (error) {}
    try { renderCurrentPage?.(); } catch (error) {}
  };

  window.updateAsoDelayReason = function (id, value) {
    const candidate = (window.CANDIDATES || []).find(item => Number(item.id) === Number(id));
    if (!candidate) return;
    candidate.aso_delay_reason = clean(value, 500);
    try { saveData?.(); } catch (error) {}
  };

  function medicinaRows() {
    return (window.CANDIDATES || [])
      .filter(c => !c.declined_date && !c.admitted && (c.aso_marcado || c.aso_alerta || c.aso_marcado_em || c.aso_planned || c.aso))
      .sort((a, b) => clean(a.name || '').localeCompare(clean(b.name || ''), 'pt-BR', { sensitivity: 'base' }));
  }

  window.renderMedicina = function () {
    const container = $('page-medicina');
    if (!container) return;
    const rows = medicinaRows();
    const pending = rows.filter(c => !c.aso);
    const done = rows.filter(c => c.aso);
    container.innerHTML = `<div class="space-y-6 animate-up"><div class="flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h3 class="text-xl font-display font-bold text-primary">Medicina / ASO</h3><p class="text-xs text-muted">Controle de marcacao, emissao e justificativa quando o ASO atrasar conforme a matriz de recrutamento.</p></div><div class="flex gap-2"><span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">${pending.length} pendente(s)</span><span class="badge bg-green-500/10 text-green-400 border-green-500/20">${done.length} concluido(s)</span></div></div><div class="card rounded-2xl overflow-hidden table-scroll"><table class="w-full min-w-[1320px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-5 py-4">Pessoa</th><th class="px-5 py-4">Funcao</th><th class="px-5 py-4">RM</th><th class="px-5 py-4">Obra</th><th class="px-5 py-4">Data Marcacao ASO</th><th class="px-5 py-4">Prazo Matriz</th><th class="px-5 py-4">Data Emissao ASO</th><th class="px-5 py-4">Justificativa</th><th class="px-5 py-4">Status</th></tr></thead><tbody class="divide-y divide-outline-variant">${rows.length ? rows.map(c => {
      const deadline = asoDeadline(c);
      const delayed = isAsoDelayed(c, c.aso || todayIso());
      const reason = clean(c.aso_delay_reason || '', 500);
      const concluded = Boolean(c.aso);
      return `<tr class="hover:bg-surface-container-highest ${delayed && !reason ? 'bg-red-500/5' : ''}"><td class="px-5 py-4"><button onclick="openEditPersonModal(${Number(c.id)})" class="font-bold hover:text-primary">${esc(c.name)}</button><p class="text-[10px] text-muted">CPF ${esc(typeof formatCpf === 'function' ? formatCpf(c.cpf) : c.cpf)}</p></td><td class="px-5 py-4 font-bold uppercase text-muted">${esc(c.func)}</td><td class="px-5 py-4 font-mono text-primary">${esc(c.rm || '-')}</td><td class="px-5 py-4 font-mono">${esc(c.digital_obra || c.digitalObra || '-')}</td><td class="px-5 py-4"><input type="date" class="modal-input w-40 text-xs" value="${esc(c.aso_marcado_em || '')}" onchange="const c=CANDIDATES.find(x=>Number(x.id)===${Number(c.id)}); if(c){c.aso_marcado_em=this.value;c.aso_marcado=true;c.aso_status='PENDENTE';saveData?.();}"></td><td class="px-5 py-4 font-mono ${delayed ? 'text-red-400 font-bold' : 'text-muted'}">${esc(dateLabel(deadline))}${delayed ? '<p class="text-[10px] uppercase font-black text-red-400 mt-1">Atrasado</p>' : ''}</td><td class="px-5 py-4"><input type="date" class="modal-input w-40 text-xs" value="${esc(c.aso || '')}" onchange="concluirASO(${Number(c.id)}, this.value)"></td><td class="px-5 py-4 min-w-[260px]">${delayed ? `<textarea class="modal-input min-h-[70px] text-xs ${!reason ? 'border-error' : ''}" placeholder="Obrigatorio se o ASO atrasar" onchange="updateAsoDelayReason(${Number(c.id)}, this.value)">${esc(reason)}</textarea>${!reason ? '<p class="text-[10px] text-error uppercase font-black mt-1">Justificativa obrigatoria</p>' : ''}` : `<input type="text" class="modal-input text-xs" value="${esc(reason)}" placeholder="Sem atraso" onchange="updateAsoDelayReason(${Number(c.id)}, this.value)">`}</td><td class="px-5 py-4"><span class="badge ${concluded ? 'bg-green-500/10 text-green-400 border-green-500/20' : (delayed ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20')}">${concluded ? 'Concluido' : 'Pendente'}</span></td></tr>`;
    }).join('') : '<tr><td colspan="9" class="p-12 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhum ASO marcado pelo recrutamento.</div></td></tr>'}</tbody></table></div></div>`;
    try { enableSortableTables?.(); } catch (error) {}
  };

  const previousRenderCurrentPage = window.renderCurrentPage;
  if (typeof previousRenderCurrentPage === 'function') {
    window.renderCurrentPage = function () {
      if (typeof currentPage !== 'undefined' && currentPage === 'medicina') return window.renderMedicina();
      return previousRenderCurrentPage.apply(this, arguments);
    };
    try { renderCurrentPage = window.renderCurrentPage; } catch (error) {}
  }
})();
