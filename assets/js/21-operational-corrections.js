// ============================================================
// MobilizaPro 1.10 - Correções operacionais solicitadas
// Mantém o design original e ajusta fluxo, filtros, medicina,
// crachá, solicitação M.O., ordenação e sincronização Hostinger.
// ============================================================
(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const safe = (v) => (typeof escapeHtml === 'function' ? escapeHtml(v ?? '') : String(v ?? '').replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])));
  const clean = (v, n = 255) => (typeof cleanString === 'function' ? cleanString(v, n) : String(v ?? '').trim().slice(0, n));
  const upper = (v) => clean(v).toUpperCase();
  const today = () => (typeof todayInputDate === 'function' ? todayInputDate() : new Date().toISOString().slice(0, 10));
  const br = (v) => (typeof dateOrDash === 'function' ? dateOrDash(v) : (v || '-'));

  // ------------------------------------------------------------
  // 10) Salvamento seguro
  // A sincronização automática agressiva foi desativada.
  // O salvamento ocorre apenas via camada central 00-hostinger-cloud-storage.js
  // quando saveData() grava o estado principal no localStorage.
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // 4) Obras sempre por lista suspensa.
  // ------------------------------------------------------------
  function getObrasList() {
    const set = new Set();
    (SOLICITATIONS || []).forEach(s => { const o = upper(s.digital_obra || s.digitalObra || s.obra); if (o) set.add(o); });
    (CANDIDATES || []).forEach(c => { const o = upper(c.digital_obra || c.digitalObra || c.obra); if (o) set.add(o); });
    return Array.from(set).sort((a,b) => a.localeCompare(b, 'pt-BR', { numeric:true, sensitivity:'base' }));
  }
  window.getMobilizaObrasList = getObrasList;
  function obraSelectHtml(id, selected, extra = '') {
    const obras = getObrasList();
    const sel = upper(selected);
    if (sel && !obras.includes(sel)) obras.push(sel);
    obras.sort((a,b) => a.localeCompare(b, 'pt-BR', { numeric:true, sensitivity:'base' }));
    return `<select id="${id}" class="modal-input font-mono uppercase" ${extra}>`+
      `<option value="">SELECIONE A OBRA</option>`+
      obras.map(o => `<option value="${safe(o)}" ${o === sel ? 'selected' : ''}>${safe(o)}</option>`).join('')+
      `</select>`;
  }

  // ------------------------------------------------------------
  // 7) Turno em Solicitação M.O. + 2) exclusão definitiva da solicitação.
  // ------------------------------------------------------------
  window.openNewSolicitationModal = function () {
    openModal(`
      <div class="p-6 border-b border-outline-variant flex justify-between items-center"><h3 class="font-display font-bold text-lg">Nova Solicitação de M.O.</h3><button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button></div>
      <div class="p-6 space-y-4">
        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">RM (Somente Números)</label><input type="number" id="s-rm" class="modal-input" placeholder="00000"></div>
        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Obra</label>${obraSelectHtml('s-digital-obra','')}</div>
        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Função</label><select id="s-func" class="modal-input">${(TRAINING_MATRIX || []).map(f => `<option value="${safe(f.function)}">${safe(f.function)}</option>`).join('')}</select></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Quantidade</label><input type="number" id="s-qty" class="modal-input" min="1" max="999" value="1"></div>
          <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Turno</label><select id="s-turno" class="modal-input"><option value="DIURNO">Diurno</option><option value="NOTURNO">Noturno</option></select></div>
        </div>
      </div>
      <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3"><button onclick="closeModal()" class="btn btn-ghost">Cancelar</button><button onclick="saveSolicitation()" class="btn btn-primary px-8">Registrar RM</button></div>`);
  };
  window.saveSolicitation = function () {
    const rm = clean($('s-rm')?.value, 24).replace(/\D/g, '');
    const digitalObra = upper($('s-digital-obra')?.value).replace(/[^A-Z0-9_-]/g, '').slice(0, 40);
    const func = clean($('s-func')?.value, 120);
    const qty = Math.max(1, Math.min(999, parseInt($('s-qty')?.value, 10) || 0));
    const turno = upper($('s-turno')?.value || 'DIURNO') === 'NOTURNO' ? 'NOTURNO' : 'DIURNO';
    if (!rm || !digitalObra || !qty) return alert('Preencha RM, Obra e quantidade válida.');
    SOLICITATIONS.push({ rm, digital_obra: digitalObra, date: new Date().toLocaleDateString('pt-BR'), func, qty, turno, canceled:false, status:'ABERTA', cancel_reason:'', canceled_at:'' });
    saveData(); closeModal(); renderCurrentPage();
  };
  window.openEditSolicitationModal = function (index) {
    const s = (SOLICITATIONS || [])[index];
    if (!s) return alert('Solicitação não encontrada para edição.');
    openModal(`
      <div class="p-6 border-b border-outline-variant flex justify-between items-center"><h3 class="font-display font-bold text-lg">Editar Solicitação de M.O.</h3><button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button></div>
      <div class="p-6 space-y-4">
        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">RM</label><input type="number" id="s-edit-rm" class="modal-input" value="${safe(s.rm)}"></div>
        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Obra</label>${obraSelectHtml('s-edit-digital-obra', s.digital_obra || s.digitalObra || '')}</div>
        <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Função</label><select id="s-edit-func" class="modal-input">${(TRAINING_MATRIX || []).map(f => `<option value="${safe(f.function)}" ${f.function === s.func ? 'selected' : ''}>${safe(f.function)}</option>`).join('')}</select></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Quantidade</label><input type="number" id="s-edit-qty" class="modal-input" min="1" max="999" value="${safe(s.qty)}"></div>
          <div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Turno</label><select id="s-edit-turno" class="modal-input"><option value="DIURNO" ${upper(s.turno || 'DIURNO') !== 'NOTURNO' ? 'selected' : ''}>Diurno</option><option value="NOTURNO" ${upper(s.turno) === 'NOTURNO' ? 'selected' : ''}>Noturno</option></select></div>
        </div>
      </div>
      <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3"><button onclick="closeModal()" class="btn btn-ghost">Cancelar</button><button onclick="updateSolicitation(${index})" class="btn btn-primary px-8">Salvar Alterações</button></div>`);
  };
  window.updateSolicitation = function (index) {
    const existing = SOLICITATIONS[index];
    if (!existing) return alert('Solicitação não encontrada.');
    const rm = clean($('s-edit-rm')?.value, 24).replace(/\D/g, '');
    const digitalObra = upper($('s-edit-digital-obra')?.value).replace(/[^A-Z0-9_-]/g, '').slice(0, 40);
    const func = clean($('s-edit-func')?.value, 120);
    const qty = Math.max(1, Math.min(999, parseInt($('s-edit-qty')?.value, 10) || 0));
    const turno = upper($('s-edit-turno')?.value || 'DIURNO') === 'NOTURNO' ? 'NOTURNO' : 'DIURNO';
    if (!rm || !digitalObra || !qty) return alert('Preencha RM, Obra e quantidade válida.');
    SOLICITATIONS[index] = Object.assign({}, existing, { rm, digital_obra:digitalObra, func, qty, turno, date: existing.date || new Date().toLocaleDateString('pt-BR') });
    saveData(); closeModal(); renderCurrentPage();
  };
  window.deleteSolicitationDefinitive = function (index) {
    const s = SOLICITATIONS[index];
    if (!s) return alert('Solicitação não encontrada.');
    if (!confirm(`Excluir definitivamente a solicitação RM ${s.rm || '-'} / ${s.digital_obra || '-'} / ${s.func || '-'}?`)) return;
    SOLICITATIONS.splice(index, 1);
    saveData();
    try {
      fetch('api/store.php?action=delete_solicitation_definitive', { method:'POST', credentials:'include', headers:{ 'Content-Type':'application/json', 'X-Mobiliza-CSRF': window.MOBI_CSRF_TOKEN || '' }, body: JSON.stringify({ rm:s.rm, digital_obra:s.digital_obra || s.digitalObra || '', func:s.func }) });
    } catch(e) {}
    renderCurrentPage();
  };
  window.renderSolicitacoes = function () {
    const container = $('page-solicitacao'); if (!container) return;
    const rows = (SOLICITATIONS || []).map((s, idx) => ({s, idx}));
    container.innerHTML = `<div class="space-y-6 animate-up"><div class="flex justify-between items-center"><div><h3 class="text-xl font-display font-bold">Solicitações de Mão de Obra</h3><p class="text-xs text-muted">Registro de RMs com turno e exclusão definitiva quando necessário.</p></div><button onclick="openNewSolicitationModal()" class="btn btn-primary text-xs"><span class="material-symbols-outlined text-sm">assignment_add</span> Nova RM</button></div><div class="card rounded-2xl overflow-hidden table-scroll"><table class="w-full min-w-[1220px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-6 py-4">RM</th><th class="px-6 py-4">Obra</th><th class="px-6 py-4">Data</th><th class="px-6 py-4">Função</th><th class="px-6 py-4">Turno</th><th class="px-6 py-4">Qtd</th><th class="px-6 py-4">Status / Justificativa</th><th class="px-6 py-4 text-right">Ações</th></tr></thead><tbody class="divide-y divide-outline-variant">${rows.length ? rows.map(({s,idx}) => { const canceled = typeof isSolicitationCanceled === 'function' ? isSolicitationCanceled(s) : !!s.canceled; const statusBadge = canceled ? '<span class="badge bg-red-500/10 text-red-400 border-red-500/20">Cancelada</span>' : '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Aberta</span>'; return `<tr class="hover:bg-surface-container-highest ${canceled ? 'opacity-75' : ''}"><td class="px-6 py-4 font-mono font-bold text-primary">${safe(s.rm)}</td><td class="px-6 py-4 font-mono font-bold">${safe(s.digital_obra || '-')}</td><td class="px-6 py-4">${safe(s.date || '-')}</td><td class="px-6 py-4 font-medium">${safe(s.func)}</td><td class="px-6 py-4"><span class="badge bg-primary/10 text-primary border-primary/20">${safe(s.turno || 'DIURNO')}</span></td><td class="px-6 py-4">${safe(s.qty)}</td><td class="px-6 py-4">${statusBadge}${canceled && s.cancel_reason ? `<p class="mt-2 text-[11px] text-muted max-w-[340px]">${safe(s.cancel_reason)}</p>` : ''}</td><td class="px-6 py-4 text-right"><div class="flex flex-wrap justify-end gap-2"><button class="btn btn-ghost text-xs border border-primary/20" onclick="openEditSolicitationModal(${idx})"><span class="material-symbols-outlined text-sm">edit</span> Editar</button>${!canceled ? `<button class="btn btn-ghost text-xs border border-red-500/20 text-red-400" onclick="openCancelSolicitationModal(${idx})"><span class="material-symbols-outlined text-sm">cancel</span> Cancelar</button>` : ''}<button class="btn btn-ghost text-xs border border-red-500/30 text-red-300" onclick="deleteSolicitationDefinitive(${idx})"><span class="material-symbols-outlined text-sm">delete_forever</span> Excluir definitivo</button></div></td></tr>`; }).join('') : '<tr><td colspan="8" class="p-12 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma solicitação registrada.</div></td></tr>'}</tbody></table></div></div>`;
    enableSortableTables();
  };

  // ------------------------------------------------------------
  // 1) Medicina / ASO: opção no recrutamento e módulo dedicado.
  // ------------------------------------------------------------
  function getMedicinaRows() { return (CANDIDATES || []).filter(c => !c.declined_date && !c.admitted && (c.aso_marcado || c.aso_alerta || c.aso_planned || c.aso_previsto)); }
  window.marcarASO = function (id) {
    const c = (CANDIDATES || []).find(x => Number(x.id) === Number(id));
    if (!c) return alert('Colaborador não localizado.');
    c.aso_marcado = true;
    c.aso_alerta = true;
    c.aso_marcado_em = today();
    if (!c.aso_planned) c.aso_planned = today();
    saveData();
    alert(`Necessidade de exame médico/ASO registrada para ${c.name}.`);
    updateMedicinaAlert();
    if (currentPage === 'medicina') renderMedicina(); else renderCurrentPage();
  };
  window.concluirASO = function (id, date) {
    const c = (CANDIDATES || []).find(x => Number(x.id) === Number(id));
    if (!c) return;
    c.aso = date || today();
    c.aso_alerta = false;
    c.aso_concluido_em = c.aso;
    saveData();
    renderCurrentPage();
  };
  window.renderMedicina = function () {
    const container = $('page-medicina'); if (!container) return;
    const base = getMedicinaRows().sort((a,b) => String(a.name||'').localeCompare(String(b.name||''),'pt-BR',{sensitivity:'base'}));
    const pend = base.filter(c => !c.aso);
    const done = base.filter(c => c.aso);
    container.innerHTML = `<div class="space-y-6 animate-up"><div class="flex flex-col md:flex-row md:items-end justify-between gap-4"><div><h3 class="text-xl font-display font-bold text-primary">Medicina / ASO</h3><p class="text-xs text-muted">Necessidades geradas pelo Recrutamento em “Marcar ASO”.</p></div><div class="flex gap-2"><span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">${pend.length} pendente(s)</span><span class="badge bg-green-500/10 text-green-400 border-green-500/20">${done.length} concluído(s)</span></div></div><div class="card rounded-2xl overflow-hidden table-scroll"><table class="w-full min-w-[1100px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-6 py-4">Pessoa</th><th class="px-6 py-4">Função</th><th class="px-6 py-4">RM</th><th class="px-6 py-4">Obra</th><th class="px-6 py-4">Marcação</th><th class="px-6 py-4">ASO Real</th><th class="px-6 py-4">Status</th></tr></thead><tbody class="divide-y divide-outline-variant">${base.length ? base.map(c => `<tr class="hover:bg-surface-container-highest"><td class="px-6 py-4"><button onclick="openEditPersonModal(${c.id})" class="font-bold hover:text-primary">${safe(c.name)}</button><p class="text-[10px] text-muted">CPF ${safe(typeof formatCpf === 'function' ? formatCpf(c.cpf) : c.cpf)}</p></td><td class="px-6 py-4 font-bold uppercase text-muted">${safe(c.func)}</td><td class="px-6 py-4 font-mono text-primary">${safe(c.rm || '-')}</td><td class="px-6 py-4 font-mono">${safe(c.digital_obra || '-')}</td><td class="px-6 py-4">${br(c.aso_marcado_em || c.aso_planned)}</td><td class="px-6 py-4"><input type="date" class="modal-input w-40 text-xs" value="${safe(c.aso || '')}" onchange="concluirASO(${c.id}, this.value)"></td><td class="px-6 py-4"><span class="badge ${c.aso ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">${c.aso ? 'Concluído' : 'Necessário exame médico'}</span></td></tr>`).join('') : '<tr><td colspan="7" class="p-12 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhum ASO marcado pelo recrutamento.</div></td></tr>'}</tbody></table></div></div>`;
    enableSortableTables();
  };
  const originalRenderCandidateCard = window.renderCandidateCard;
  if (typeof originalRenderCandidateCard === 'function') {
    window.renderCandidateCard = function (c, showTrainingPanel) {
      let html = originalRenderCandidateCard(c, showTrainingPanel);
      const btn = `<button onclick="marcarASO(${c.id})" class="btn btn-ghost w-full py-1.5 text-[10px] font-bold border border-amber-500/30 text-amber-300" title="Gerar alerta de necessidade de exame médico"><span class="material-symbols-outlined text-sm">medical_services</span> Marcar ASO</button>`;
      return html.replace('<div class="flex gap-2">', '<div class="flex gap-2 flex-wrap">' + (!c.aso && !c.aso_marcado ? btn : ''));
    };
  }
  function updateMedicinaAlert() {
    const count = getMedicinaRows().filter(c => !c.aso).length;
    const icon = $('medicina-alert-icon'), badge = $('medicina-alert-count');
    if (icon) icon.classList.toggle('hidden', count === 0);
    if (badge) { badge.textContent = count; badge.classList.toggle('hidden', count === 0); }
  }

  // ------------------------------------------------------------
  // 9) Crachá: concluído sai da fila; resumo separado.
  // ------------------------------------------------------------
  const originalRenderCracha = window.renderCracha;
  if (typeof originalRenderCracha === 'function') {
    window.renderCracha = function () {
      const old = window.crachaStatusFilter;
      window.crachaStatusFilter = 'AGUARDANDO';
      originalRenderCracha();
      window.crachaStatusFilter = old || 'AGUARDANDO';
      const h = $('page-cracha')?.querySelector('h3');
      if (h) h.textContent = 'Crachás Pendentes';
      enableSortableTables();
    };
  }
  window.renderResumoCracha = function () {
    const container = $('page-resumo-cracha'); if (!container) return;
    if (typeof syncBadgeQueue === 'function') syncBadgeQueue();
    (CANDIDATES || []).forEach(c => { try { refreshBadgeConclusion?.(c); } catch(e) {} });
    const rows = (CANDIDATES || []).filter(c => !c.declined_date && (typeof isBadgeCompleted === 'function' ? isBadgeCompleted(c) : c.badge_ok));
    container.innerHTML = `<div class="space-y-6 animate-up"><div class="flex justify-between items-end gap-4"><div><h3 class="text-xl font-display font-bold text-primary">Resumo de Crachás Emitidos</h3><p class="text-xs text-muted">Histórico de crachás concluídos, removidos da fila operacional. Gerência pode reabrir para Mobilização quando houver treinamento pendente.</p></div><span class="badge bg-green-500/10 text-green-400 border-green-500/20">${rows.length} emitido(s)</span></div><div class="card rounded-2xl overflow-hidden table-scroll"><table class="w-full min-w-[1220px] text-left text-sm"><thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest"><tr><th class="px-6 py-4">Pessoa</th><th class="px-6 py-4">Função</th><th class="px-6 py-4">RM</th><th class="px-6 py-4">Obra</th><th class="px-6 py-4">Postagem</th><th class="px-6 py-4">Emissão</th><th class="px-6 py-4">Justificativa</th><th class="px-6 py-4 text-right">Ações</th></tr></thead><tbody class="divide-y divide-outline-variant">${rows.length ? rows.map(c => `<tr class="hover:bg-surface-container-highest"><td class="px-6 py-4 font-bold">${safe(c.name)}</td><td class="px-6 py-4 text-xs font-bold uppercase text-muted">${safe(c.func)}</td><td class="px-6 py-4 font-mono text-primary">${safe(c.rm || '-')}</td><td class="px-6 py-4 font-mono">${safe(c.digital_obra || '-')}</td><td class="px-6 py-4">${br(c.badge_posted_date)}</td><td class="px-6 py-4 text-green-400 font-bold">${br(c.badge_real_date)}</td><td class="px-6 py-4 text-xs text-muted">${safe(c.badge_delay_reason || '-')}</td><td class="px-6 py-4 text-right"><button type="button" onclick="reabrirMobilizacaoCracha(${Number(c.id)})" class="btn btn-ghost text-xs border border-amber-500/30 text-amber-300"><span class="material-symbols-outlined text-sm">edit</span> Reabrir Mobilização</button></td></tr>`).join('') : '<tr><td colspan="8" class="p-12 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhum crachá emitido ainda.</div></td></tr>'}</tbody></table></div></div>`;
    enableSortableTables();
  };




  window.reabrirMobilizacaoCracha = function (id) {
    const c = (CANDIDATES || []).find(x => Number(x.id) === Number(id));
    if (!c) return alert('Colaborador não localizado.');
    const motivo = prompt('Informe o motivo da reabertura para Mobilização:', 'Acrescentar treinamento pendente');
    if (motivo === null) return;
    const motivoLimpo = clean(motivo, 300);
    if (!motivoLimpo) return alert('Motivo obrigatório para reabrir a mobilização.');
    if (!confirm(`Reabrir ${c.name || 'colaborador'} para Mobilização?

Ele sairá do Resumo de Crachás Emitidos e voltará para Mobilização.`)) return;
    const evento = {
      acao: 'REABRIR_MOBILIZACAO_APOS_CRACHA',
      motivo: motivoLimpo,
      data: today(),
      cracha_postagem_anterior: c.badge_posted_date || '',
      cracha_emissao_anterior: c.badge_real_date || '',
      usuario: (window.MOBI_USER && (window.MOBI_USER.nome || window.MOBI_USER.name || window.MOBI_USER.cpf)) || ''
    };
    c.historico_mobilizacao = Array.isArray(c.historico_mobilizacao) ? c.historico_mobilizacao : [];
    c.historico_mobilizacao.push(evento);
    c.mobilizacao_reaberta = true;
    c.status_fluxo = 'MOBILIZACAO_REABERTA';
    c.mobilizacao_reaberta_em = today();
    c.mobilizacao_reabertura_motivo = motivoLimpo;
    c.badge_real_date_anterior = c.badge_real_date || c.badge_real_date_anterior || '';
    c.badge_ok = false;
    c.badge_real_date = '';
    c.badge_completed_at = '';
    c.cracha_emitido = false;
    c.lastStageUpdate = today();
    saveData?.();
    alert('Mobilização reaberta. O colaborador voltou para Mobilização.');
    selectPage('mobilizacao');
  };

  // ------------------------------------------------------------
  // 11) Fluxo Mobilizacao -> Crachá:
  // Depois que a mobilização/treinamentos forem concluídos, o
  // colaborador sai da lista de Mobilização e aparece apenas em Crachá.
  // Depois que o crachá for emitido, sai de Crachá e fica no Resumo.
  // ------------------------------------------------------------
  function mobiReadyForCracha(c) {
    if (!c || c.declined_date || !c.admitted) return false;
    // Quando um crachá emitido é reaberto pela gerência, o colaborador
    // precisa voltar para Mobilização, mesmo que os treinamentos antigos
    // estejam completos. Ele só avança novamente quando o usuário concluir
    // a reabertura pelo botão Enviar para Crachá.
    if (c.mobilizacao_reaberta === true || String(c.status_fluxo || '').toUpperCase() === 'MOBILIZACAO_REABERTA') return false;
    try {
      return typeof hasCompletedRequiredTrainings === 'function'
        ? hasCompletedRequiredTrainings(c)
        : Boolean(c.training_end_real);
    } catch (e) {
      return Boolean(c.training_end_real);
    }
  }
  function mobiBadgeCompleted(c) {
    try {
      return typeof isBadgeCompleted === 'function' ? isBadgeCompleted(c) : Boolean(c && c.badge_ok);
    } catch (e) {
      return Boolean(c && c.badge_ok);
    }
  }
  function mobiSyncBadgeReady(c) {
    if (!mobiReadyForCracha(c)) return;
    if (!c.badge_posted_date) c.badge_posted_date = today();
    if (c.badge_release_days === undefined || c.badge_release_days === null || c.badge_release_days === '') c.badge_release_days = 2;
    try { refreshBadgeConclusion?.(c); } catch (e) {}
  }
  function mobiSyncAllBadgeReady() {
    (CANDIDATES || []).forEach(mobiSyncBadgeReady);
  }
  window.mobiReadyForCracha = mobiReadyForCracha;


  function renderMobilizacaoReabertaRow(c) {
    const base = (typeof renderMobilizationPersonRow === 'function' ? renderMobilizationPersonRow(c) : '');
    if (!(c && (c.mobilizacao_reaberta === true || String(c.status_fluxo || '').toUpperCase() === 'MOBILIZACAO_REABERTA'))) return base;
    const motivo = clean(c.mobilizacao_reabertura_motivo || '', 300) || 'Reabertura gerencial para ajuste operacional.';
    const data = c.mobilizacao_reaberta_em ? br(c.mobilizacao_reaberta_em) : '-';
    return `<div class="bg-amber-500/5 border-l-4 border-amber-500/60">
      ${base}
      <div class="px-4 pb-4 -mt-1 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div class="text-[11px] text-amber-300 font-semibold">
          <span class="material-symbols-outlined text-sm align-middle mr-1">history</span>
          Reaberto a partir de Crachá Emitido em ${safe(data)}. Motivo: ${safe(motivo)}
        </div>
        <button type="button" onclick="concluirReaberturaMobilizacao(${Number(c.id)})" class="btn btn-primary text-xs px-4 py-2">
          <span class="material-symbols-outlined text-sm">send</span> Enviar novamente para Crachá
        </button>
      </div>
    </div>`;
  }

  window.concluirReaberturaMobilizacao = function (id) {
    const c = (CANDIDATES || []).find(x => Number(x.id) === Number(id));
    if (!c) return alert('Colaborador não localizado.');
    c.mobilizacao_reaberta = false;
    c.status_fluxo = 'CRACHA';
    c.mobilizacao_reaberta_concluida_em = today();
    c.lastStageUpdate = today();
    if (!c.badge_posted_date) c.badge_posted_date = today();
    if (c.badge_release_days === undefined || c.badge_release_days === null || c.badge_release_days === '') c.badge_release_days = 2;
    try { refreshBadgeConclusion?.(c); } catch(e) {}
    saveData?.();
    alert('Mobilização reaberta concluída. O colaborador voltou para a fila de Crachá.');
    selectPage('cracha');
  };

  window.renderMobilização = window.renderMobilizacao = function () {
    mobiSyncAllBadgeReady();
    const container = $('page-mobilizacao');
    if (!container) return;
    const mobilizacao = (CANDIDATES || [])
      .filter(c => c.admitted && !c.declined_date && !mobiReadyForCracha(c))
      .sort((a,b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity:'base' }));
    const enviadosCracha = (CANDIDATES || []).filter(c => mobiReadyForCracha(c) && !mobiBadgeCompleted(c)).length;
    container.innerHTML = `
      <div class="space-y-6 animate-up">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 class="text-xl font-display font-bold">Mobilização e Treinamentos</h3>
            <p class="text-xs text-muted">Colaboradores saem desta lista automaticamente após concluir a mobilização e seguem para Crachá.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="badge bg-primary/10 text-primary border-primary/20">${mobilizacao.length} em mobilização</span>
            <span class="badge bg-green-500/10 text-green-400 border-green-500/20">${enviadosCracha} em crachá</span>
          </div>
        </div>
        <div class="card rounded-2xl overflow-hidden">
          <div class="divide-y divide-outline-variant">
            ${mobilizacao.length ? mobilizacao.map(c => renderMobilizacaoReabertaRow(c)).join('') : '<div class="empty-state rounded-2xl p-10 text-center text-muted">Nenhum colaborador pendente de mobilização. Concluídos seguem automaticamente para Crachá.</div>'}
          </div>
        </div>
      </div>`;
    updateAlertIcon?.();
    enableSortableTables?.();
  };

  window.renderCracha = function () {
    mobiSyncAllBadgeReady();
    (CANDIDATES || []).forEach(c => { try { refreshBadgeConclusion?.(c); } catch(e) {} });
    const container = $('page-cracha');
    if (!container) return;
    const rows = (CANDIDATES || [])
      .filter(c => mobiReadyForCracha(c) && !mobiBadgeCompleted(c))
      .sort((a,b) => String(a.badge_posted_date || '').localeCompare(String(b.badge_posted_date || '')) || String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity:'base' }));
    const emitidos = (CANDIDATES || []).filter(c => !c.declined_date && mobiBadgeCompleted(c)).length;
    container.innerHTML = `
      <div class="space-y-6 animate-up">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 class="text-xl font-display font-bold text-primary">Crachás Pendentes</h3>
            <p class="text-xs text-muted">Somente colaboradores com mobilização concluída e crachá ainda não emitido.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">${rows.length} pendente(s)</span>
            <span class="badge bg-green-500/10 text-green-400 border-green-500/20">${emitidos} emitido(s)</span>
          </div>
        </div>
        <div class="card rounded-2xl overflow-hidden table-scroll">
          <table class="w-full min-w-[1220px] text-left text-sm">
            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
              <tr>
                <th class="px-5 py-4">Pessoa</th><th class="px-5 py-4">Função</th><th class="px-5 py-4">Postagem</th><th class="px-5 py-4">Dias liberação</th><th class="px-5 py-4">Previsão</th><th class="px-5 py-4">Data Real Emissão</th><th class="px-5 py-4">Justificativa</th><th class="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant">
              ${rows.length ? rows.map(c => {
                const releaseDate = typeof getBadgeReleaseDate === 'function' ? getBadgeReleaseDate(c) : '';
                const realDate = typeof cleanDate === 'function' ? (cleanDate(c.badge_real_date) || '') : (c.badge_real_date || '');
                const delayed = typeof isBadgeDelayed === 'function' ? isBadgeDelayed(c) : false;
                const reason = clean(c.badge_delay_reason || '', 500);
                const warning = delayed && !reason;
                return `<tr class="hover:bg-surface-container-highest transition-colors">
                  <td class="px-5 py-4 align-top"><button onclick="openEditPersonModal(${c.id})" class="font-bold text-on-surface hover:text-primary">${safe(c.name)}</button><p class="text-[10px] text-muted mt-1">CPF ${safe(typeof formatCpf === 'function' ? formatCpf(c.cpf) : c.cpf)}</p></td>
                  <td class="px-5 py-4 align-top text-xs font-bold uppercase text-muted">${safe(c.func)}</td>
                  <td class="px-5 py-4 align-top"><input type="date" class="modal-input w-40 text-xs" value="${safe(c.badge_posted_date || '')}" onchange="updateBadgeField(${c.id}, 'badge_posted_date', this.value)"></td>
                  <td class="px-5 py-4 align-top"><input type="number" min="0" max="60" class="modal-input w-24 text-center font-mono" value="${safe(c.badge_release_days ?? 2)}" onchange="updateBadgeField(${c.id}, 'badge_release_days', this.value)"></td>
                  <td class="px-5 py-4 align-top font-mono text-primary">${safe(releaseDate || '-')}</td>
                  <td class="px-5 py-4 align-top"><input type="date" class="modal-input w-40 text-xs" value="${safe(realDate)}" onchange="updateBadgeField(${c.id}, 'badge_real_date', this.value)">${delayed ? '<p class="text-[10px] text-error mt-1 font-bold uppercase">Atrasado vs. previsão</p>' : ''}</td>
                  <td class="px-5 py-4 align-top min-w-[260px]">${delayed ? `<textarea class="modal-input min-h-[72px] text-xs ${warning ? 'border-error' : ''}" placeholder="Obrigatório: informe a justificativa do atraso" oninput="updateBadgeDelayReasonDraft(${c.id}, this.value)" onchange="updateBadgeField(${c.id}, 'badge_delay_reason', this.value)">${safe(reason)}</textarea>${warning ? '<p class="text-[10px] text-error mt-1 font-bold uppercase">Justificativa obrigatória para concluir</p>' : ''}` : `<input type="text" class="modal-input text-xs" value="${safe(reason)}" placeholder="Sem atraso" onchange="updateBadgeField(${c.id}, 'badge_delay_reason', this.value)">`}</td>
                  <td class="px-5 py-4 align-top"><span class="badge ${warning ? 'bg-error/10 text-error border-error/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">${warning ? 'Justificar atraso' : 'Aguardando emissão'}</span></td>
                </tr>`;
              }).join('') : '<tr><td colspan="8" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhum crachá pendente. Mobilizações concluídas aparecerão aqui automaticamente.</div></td></tr>'}
            </tbody>
          </table>
        </div>
      </div>`;
    enableSortableTables?.();
    saveData?.();
  };

  // ------------------------------------------------------------
  // 5) Editar descrição/nome da função na matriz.
  // ------------------------------------------------------------
  window.openEditFunctionDescriptionModal = function () {
    const name = selectedFunction || TRAINING_MATRIX?.[0]?.function || '';
    const f = (TRAINING_MATRIX || []).find(x => x.function === name);
    if (!f) return alert('Selecione uma função.');
    openModal(`<div class="p-6 border-b border-outline-variant flex justify-between items-center"><h3 class="font-display font-bold text-lg">Editar função</h3><button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button></div><div class="p-6 space-y-4"><div><label class="text-[10px] font-bold uppercase text-muted block mb-1">Descrição da função</label><input id="edit-function-name" class="modal-input uppercase" maxlength="120" value="${safe(f.function)}"></div><p class="text-xs text-muted">A alteração atualiza a matriz, candidatos e solicitações vinculadas à função.</p></div><div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3"><button onclick="closeModal()" class="btn btn-ghost">Cancelar</button><button onclick="saveFunctionDescriptionEdit('${safe(f.function)}')" class="btn btn-primary px-8">Salvar</button></div>`);
  };
  window.saveFunctionDescriptionEdit = function (oldName) {
    const newName = upper($('edit-function-name')?.value).slice(0, 120);
    if (newName.length < 3) return alert('Informe uma descrição válida.');
    const f = (TRAINING_MATRIX || []).find(x => x.function === oldName);
    if (!f) return alert('Função não localizada.');
    f.function = newName;
    (CANDIDATES || []).forEach(c => { if (upper(c.func) === upper(oldName)) c.func = newName; });
    (SOLICITATIONS || []).forEach(s => { if (upper(s.func) === upper(oldName)) s.func = newName; });
    selectedFunction = newName;
    saveData(); closeModal(); renderCurrentPage();
  };
  function injectEditFunctionButton() {
    if (!['treinamentos','matriz-recrutamento'].includes(currentPage)) return;
    const page = $('page-' + currentPage); if (!page || page.querySelector('#mobi-edit-function-btn')) return;
    const target = page.querySelector('.flex.gap-2, .flex.flex-wrap');
    if (target) target.insertAdjacentHTML('beforeend', `<button id="mobi-edit-function-btn" onclick="openEditFunctionDescriptionModal()" class="btn btn-ghost text-xs border border-primary/20"><span class="material-symbols-outlined text-sm">edit_note</span> Editar função</button>`);
  }

  // ------------------------------------------------------------
  // 3) Ordenação alfabética/númerica em todas as tabelas.
  // ------------------------------------------------------------
  window.enableSortableTables = function () {
    document.querySelectorAll('table').forEach(table => {
      const headers = table.querySelectorAll('thead th');
      headers.forEach((th, idx) => {
        if (th.dataset.mobiSortable === '1') return;
        th.dataset.mobiSortable = '1';
        th.style.cursor = 'pointer';
        th.title = 'Clique para ordenar';
        th.addEventListener('click', () => {
          const tbody = table.tBodies[0]; if (!tbody) return;
          const asc = th.dataset.sortDir !== 'asc';
          headers.forEach(h => delete h.dataset.sortDir);
          th.dataset.sortDir = asc ? 'asc' : 'desc';
          Array.from(tbody.rows).sort((a,b) => {
            const av = (a.cells[idx]?.innerText || '').trim();
            const bv = (b.cells[idx]?.innerText || '').trim();
            return av.localeCompare(bv, 'pt-BR', { numeric:true, sensitivity:'base' }) * (asc ? 1 : -1);
          }).forEach(r => tbody.appendChild(r));
        });
      });
    });
  };
  const tableObserver = new MutationObserver(() => setTimeout(enableSortableTables, 30));
  window.addEventListener('load', () => { enableSortableTables(); tableObserver.observe(document.body, { childList:true, subtree:true }); });

  // ------------------------------------------------------------
  // 6) Logo: usa SVG local nítido se imagem externa vier baixa.
  // ------------------------------------------------------------
  function sharpenLogo() {
    document.querySelectorAll('aside img[alt="Logo"], img.login-logo, .login-card img').forEach(img => {
      img.style.imageRendering = 'auto';
      img.style.objectFit = 'contain';
      img.loading = 'eager';
      if (!img.dataset.mobiLogoFixed) {
        img.dataset.mobiLogoFixed = '1';
        img.src = 'assets/img/mobilizapro-logo.svg';
      }
    });
  }

  // Menu/páginas novas + navegação.
  function ensureOperationalMenu() {
    if (!$('page-medicina')) $('content-pages')?.insertAdjacentHTML('beforeend', '<div class="page hidden" id="page-medicina"></div>');
    if (!$('page-resumo-cracha')) $('content-pages')?.insertAdjacentHTML('beforeend', '<div class="page hidden" id="page-resumo-cracha"></div>');
    if (!document.querySelector('.nav-item[data-page="medicina"]')) {
      const aloj = document.querySelector('.nav-item[data-page="alojamento"]');
      aloj?.insertAdjacentHTML('afterend', `<a class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium" data-page="medicina" href="#"><span class="material-symbols-outlined text-xl">medical_services</span> Medicina <span class="material-symbols-outlined text-sm text-amber-400 alert-pulse ml-auto hidden" id="medicina-alert-icon">warning</span><span class="hidden ml-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 text-[10px] font-bold" id="medicina-alert-count">0</span></a>`);
    }
    if (!document.querySelector('.nav-item[data-page="resumo-cracha"]')) {
      const cracha = document.querySelector('.nav-item[data-page="cracha"]');
      cracha?.insertAdjacentHTML('afterend', `<a class="nav-item flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium" data-page="resumo-cracha" href="#"><span class="material-symbols-outlined text-xl">fact_check</span> Resumo Crachás</a>`);
    }
    document.querySelectorAll('.nav-item[data-page="medicina"], .nav-item[data-page="resumo-cracha"]').forEach(item => {
      if (item.dataset.mobiBound === '1') return;
      item.dataset.mobiBound = '1';
      item.addEventListener('click', e => { e.preventDefault(); window.selectPage(item.dataset.page); });
    });
    updateMedicinaAlert(); sharpenLogo();
  }
  const originalRenderCurrentPage = window.renderCurrentPage;
  window.renderCurrentPage = function () {
    ensureOperationalMenu();
    if (currentPage === 'medicina') renderMedicina();
    else if (currentPage === 'resumo-cracha') renderResumoCracha();
    else if (typeof originalRenderCurrentPage === 'function') originalRenderCurrentPage();
    updateMedicinaAlert(); injectEditFunctionButton(); enableSortableTables(); sharpenLogo();
  };
  const originalSelectPage = window.selectPage;
  window.selectPage = function (page) {
    ensureOperationalMenu();
    currentPage = page;
    if (typeof originalSelectPage === 'function' && !['medicina','resumo-cracha'].includes(page)) return originalSelectPage(page);
    document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === page));
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    $('page-' + page)?.classList.remove('hidden');
    const title = document.querySelector(`.nav-item[data-page="${page}"]`)?.textContent?.trim() || 'Dashboard';
    if ($('topbar-title')) $('topbar-title').textContent = title.replace(/\d+$/, '').trim();
    if ($('topbar-action-btn')) $('topbar-action-btn').classList.add('hidden');
    renderCurrentPage();
  };

  // 0,5s nos campos de busca (sobrescreve 160ms anterior).
  if (typeof window.scheduleFilterRender === 'function') {
    window.scheduleFilterRender = function (key, renderFn, inputId) {
      window.__mobilizaFilterTimers = window.__mobilizaFilterTimers || {};
      clearTimeout(window.__mobilizaFilterTimers[key]);
      window.__mobilizaFilterTimers[key] = setTimeout(() => { renderFn(); setTimeout(() => { try { restoreSearchFocus?.(inputId); } catch(e) {} }, 0); }, 500);
    };
  }

  window.addEventListener('load', () => {
    ensureOperationalMenu();
    // Garante dashboard como primeira tela operacional após login.
    if (!location.hash && typeof window.selectPage === 'function') setTimeout(() => window.selectPage('dashboard'), 50);
    setTimeout(() => { updateMedicinaAlert(); enableSortableTables(); sharpenLogo(); }, 250);
  });
})();
