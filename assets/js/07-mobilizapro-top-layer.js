
// ============================================================
// 🚀 MOBILIZAPRO TOP - CAMADA PROFISSIONAL 2.0
// Central de operação, motor único de status, ficha 360 e auditoria.
// ============================================================
(function(){
  const APP_NAME = 'MobilizaPRO';
  const TODAY_ISO = (typeof todayInputDate === 'function') ? todayInputDate() : new Date().toISOString().slice(0,10);
  window.MOBIPRO_OBRA_FILTER = window.MOBIPRO_OBRA_FILTER || '';

  function qs(id){ return document.getElementById(id); }
  function arr(v){ return Array.isArray(v) ? v : []; }
  function cand(){ return arr(window.CANDIDATES || CANDIDATES); }
  function sols(){ return arr(window.SOLICITATIONS || SOLICITATIONS); }
  function esc(v){ return (typeof escapeHtml === 'function') ? escapeHtml(v) : String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
  function clean(v){ return String(v ?? '').trim(); }
  function norm(v){ return clean(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase(); }
  function num(v){ const n = Number(v); return Number.isFinite(n) ? n : 0; }
  function dateIso(v){ return (typeof cleanDate === 'function') ? cleanDate(v) : (/^\d{4}-\d{2}-\d{2}$/.test(String(v||'')) ? String(v) : null); }
  function dateBR(v){
    const d = dateIso(v); if(!d) return '-';
    const [y,m,day] = d.split('-'); return `${day}/${m}/${y}`;
  }
  function daysBetween(a,b){
    a = dateIso(a); b = dateIso(b); if(!a || !b) return null;
    const A = new Date(a+'T00:00:00'); const B = new Date(b+'T00:00:00');
    return Math.round((B-A)/86400000);
  }
  function obra(x){ return clean(x?.digital_obra || x?.obra || x?.obra_vinculada || ''); }
  function activeCandidates(){ return cand().filter(c => !c.declined_date); }
  function filteredCandidates(includeDeclined=false){
    const f = norm(window.MOBIPRO_OBRA_FILTER || '');
    return cand().filter(c => (includeDeclined || !c.declined_date) && (!f || norm(obra(c)) === f));
  }
  function filteredSolicitations(){
    const f = norm(window.MOBIPRO_OBRA_FILTER || '');
    return sols().filter(s => !f || norm(obra(s)) === f);
  }
  function canceledSolicitation(s){ return Boolean(s?.canceled || String(s?.status||'').toUpperCase().includes('CANCEL')); }
  function completedTraining(c){
    if (typeof hasCompletedRequiredTrainings === 'function') return hasCompletedRequiredTrainings(c);
    return Boolean(dateIso(c.training_end_real));
  }
  function inTraining(c){ return Boolean(c?.admitted && !c?.declined_date && !completedTraining(c)); }
  function badgeComplete(c){
    if (typeof isBadgeCompleted === 'function') return isBadgeCompleted(c);
    return Boolean(dateIso(c.badge_real_date));
  }
  function badgePlan(c){
    if (typeof getBadgeReleaseDate === 'function') return getBadgeReleaseDate(c);
    return c?.source_data_prevista_cracha_samarco || '';
  }
  function late(planned, real){
    planned = dateIso(planned); if(!planned) return false;
    return !real && planned < TODAY_ISO;
  }
  function pct(a,b){ return b > 0 ? Math.round((a/b)*100) : 0; }
  function statusTone(stage){
    if (/DECLINADO|ATRASO|PENDÊNCIA|PENDENTE|AGUARDANDO/.test(stage)) return 'warning';
    if (/LIBERADO|CONCLUÍDO|CONCLUIDO/.test(stage)) return 'success';
    if (/CRÍTICO|CRITICO/.test(stage)) return 'danger';
    return 'primary';
  }
  function unifiedStatus(c){
    if (!c) return {stage:'SEM DADOS', tone:'danger', priority:99, action:'Validar cadastro'};
    if (c.declined_date) return {stage:'DECLINADO', tone:'danger', priority:0, action:'Histórico'};
    const bp = badgePlan(c);
    if (badgeComplete(c)) return {stage:'LIBERADO / CRACHÁ OK', tone:'success', priority:9, action:'Acompanhamento'};
    if (dateIso(c.badge_posted_date)) return {stage: late(bp, c.badge_real_date) ? 'CRACHÁ ATRASADO' : 'AGUARDANDO CRACHÁ', tone: late(bp, c.badge_real_date) ? 'danger' : 'warning', priority: late(bp, c.badge_real_date) ? 1 : 4, action:'Atualizar crachá'};
    if (c.admitted && completedTraining(c)) return {stage:'TREINAMENTO CONCLUÍDO', tone:'primary', priority:3, action:'Postar documentação/crachá'};
    if (c.admitted) return {stage: late(c.training_end_planned, c.training_end_real) ? 'TREINAMENTO ATRASADO' : 'EM TREINAMENTO', tone: late(c.training_end_planned, c.training_end_real) ? 'danger' : 'warning', priority: late(c.training_end_planned, c.training_end_real) ? 1 : 5, action:'Concluir treinamentos'};
    if (dateIso(c.aso)) return {stage: late(c.admission_planned, c.admitted) ? 'ADMISSÃO ATRASADA' : 'AGUARDANDO ADMISSÃO', tone: late(c.admission_planned, c.admitted) ? 'danger' : 'warning', priority: late(c.admission_planned, c.admitted) ? 1 : 6, action:'Informar admissão'};
    return {stage: late(c.aso_planned, c.aso) ? 'ASO ATRASADO' : 'AGUARDANDO ASO', tone: late(c.aso_planned, c.aso) ? 'danger' : 'warning', priority: late(c.aso_planned, c.aso) ? 1 : 7, action:'Informar ASO'};
  }
  function metrics(){
    const fc = filteredCandidates(true);
    const active = fc.filter(c => !c.declined_date);
    const fs = filteredSolicitations().filter(s => !canceledSolicitation(s));
    const requested = fs.reduce((sum,s) => sum + num(s.qty || 0), 0);
    const admitted = active.filter(c => dateIso(c.admitted));
    const training = admitted.filter(c => !completedTraining(c));
    const trainingDone = admitted.filter(c => completedTraining(c));
    const badgePending = active.filter(c => dateIso(c.badge_posted_date) && !badgeComplete(c));
    const badgeDone = active.filter(c => badgeComplete(c));
    const alojPending = active.filter(c => c.alojado && String(c.alojamento_realizado||'NAO').toUpperCase() !== 'SIM');
    const declined = fc.filter(c => c.declined_date);
    const open = Math.max(0, requested - active.length);
    const critical = active.map(c => ({c, s: unifiedStatus(c)})).filter(x => x.s.priority <= 3 && x.s.tone !== 'success');
    const cpfMissing = fc.filter(c => !clean(c.cpf)).length;
    const cpfDup = (() => { const m = {}; fc.map(c => clean(c.cpf)).filter(Boolean).forEach(cpf => m[cpf]=(m[cpf]||0)+1); return Object.values(m).filter(v=>v>1).length; })();
    return {fc, active, fs, requested, recruited: active.length, open, admitted: admitted.length, training: training.length, trainingDone: trainingDone.length, badgePending: badgePending.length, badgeDone: badgeDone.length, alojPending: alojPending.length, declined: declined.length, critical: critical.length, cpfMissing, cpfDup};
  }
  function obraOptions(){
    const set = new Set();
    cand().forEach(c => { if (obra(c)) set.add(obra(c)); });
    sols().forEach(s => { if (obra(s)) set.add(obra(s)); });
    return [...set].sort((a,b)=>a.localeCompare(b,'pt-BR',{sensitivity:'base'}));
  }
  function stageCounts(){
    const a = filteredCandidates(false);
    return {
      requested: metrics().requested,
      recruited: a.length,
      aso: a.filter(c=>dateIso(c.aso)).length,
      admitted: a.filter(c=>dateIso(c.admitted)).length,
      trainingDone: a.filter(c=>completedTraining(c)).length,
      badgePosted: a.filter(c=>dateIso(c.badge_posted_date)).length,
      badgeDone: a.filter(c=>badgeComplete(c)).length,
    };
  }
  function qualityScore(m){
    let score = 100;
    if (m.cpfMissing) score -= Math.min(24, Math.round((m.cpfMissing / Math.max(1,m.fc.length))*35));
    if (m.cpfDup) score -= 15;
    if (m.critical) score -= Math.min(28, m.critical * 2);
    if (m.alojPending) score -= Math.min(18, Math.round((m.alojPending / Math.max(1,m.active.length))*20));
    return Math.max(0, Math.min(100, score));
  }
  function leadStats(){
    const a = filteredCandidates(false);
    const avg = (vals) => vals.length ? (vals.reduce((s,v)=>s+v,0)/vals.length) : 0;
    const recAso = a.map(c => daysBetween(c.recruited, c.aso)).filter(v => v !== null && v >= 0);
    const asoAdm = a.map(c => daysBetween(c.aso, c.admitted)).filter(v => v !== null && v >= 0);
    const admTre = a.map(c => daysBetween(c.admitted, c.training_end_real)).filter(v => v !== null && v >= 0);
    const postCracha = a.map(c => daysBetween(c.badge_posted_date, c.badge_real_date)).filter(v => v !== null && v >= 0);
    return [
      {label:'Recrutamento → ASO', avg:avg(recAso), count:recAso.length, max:recAso.length?Math.max(...recAso):0},
      {label:'ASO → Admissão', avg:avg(asoAdm), count:asoAdm.length, max:asoAdm.length?Math.max(...asoAdm):0},
      {label:'Admissão → Treinamento', avg:avg(admTre), count:admTre.length, max:admTre.length?Math.max(...admTre):0},
      {label:'Postagem → Crachá', avg:avg(postCracha), count:postCracha.length, max:postCracha.length?Math.max(...postCracha):0}
    ];
  }
  function kpi(label,value,sub,icon,tone,target){
    return `<div class="pro-kpi ${tone||'primary'}" onclick="${target?`selectPage('${target}')`:'void(0)'}"><p class="pro-kpi-label">${esc(label)}</p><div class="pro-kpi-value">${value}</div><p class="pro-kpi-sub">${esc(sub||'')}</p><span class="material-symbols-outlined pro-kpi-icon">${icon}</span></div>`;
  }
  function step(label,value,sub,icon,tone,target){
    return `<div class="pro-step ${tone||''}" onclick="${target?`selectPage('${target}')`:'void(0)'}"><span class="material-symbols-outlined">${icon}</span><div class="pro-step-num">${value}</div><div class="pro-step-label">${esc(label)}</div><div class="pro-step-sub">${esc(sub||'')}</div></div>`;
  }
  function criticalList(){
    const rows = filteredCandidates(false)
      .map(c => ({c, st: unifiedStatus(c)}))
      .filter(x => x.st.tone !== 'success')
      .sort((a,b)=>a.st.priority-b.st.priority || String(a.c.name||'').localeCompare(String(b.c.name||''),'pt-BR'))
      .slice(0,14);
    return rows.map(({c,st}) => `<div class="pro-priority-item"><div class="min-w-0"><div class="flex flex-wrap items-center gap-2 mb-1"><button class="text-left font-black text-on-surface hover:text-primary" onclick="mproOpenPerson360(${c.id})">${esc(c.name)}</button><span class="pro-status-pill ${st.tone}">${esc(st.stage)}</span></div><div class="pro-mini truncate">${esc(c.func)} • RM ${esc(c.rm||'-')} • Obra ${esc(obra(c)||'-')}</div><div class="pro-mini mt-1">Ação recomendada: <strong class="text-primary">${esc(st.action)}</strong></div></div><button class="btn btn-ghost border border-outline-variant text-xs" onclick="mproOpenPerson360(${c.id})"><span class="material-symbols-outlined text-sm">account_circle</span> Ficha 360</button></div>`).join('') || `<div class="empty-state rounded-2xl p-8 text-center text-muted">Nenhuma pendência crítica no filtro atual.</div>`;
  }
  function coverageTable(){
    const m = new Map();
    filteredSolicitations().filter(s => !canceledSolicitation(s)).forEach(s => { const k=obra(s)||'SEM OBRA'; if(!m.has(k)) m.set(k,{obra:k,sol:0,rec:0,lib:0,alo:0}); m.get(k).sol += num(s.qty||0); });
    filteredCandidates(false).forEach(c => { const k=obra(c)||'SEM OBRA'; if(!m.has(k)) m.set(k,{obra:k,sol:0,rec:0,lib:0,alo:0}); const r=m.get(k); r.rec++; if(badgeComplete(c)) r.lib++; if(c.alojado) r.alo++; });
    const rows = [...m.values()].map(r => ({...r, open:Math.max(0,r.sol-r.rec), cov:pct(r.rec,r.sol)})).sort((a,b)=>b.open-a.open || a.obra.localeCompare(b.obra,'pt-BR'));
    return `<div class="pro-table-wrap"><table class="pro-table"><thead><tr><th>Obra</th><th>Solicitado</th><th>Recrutado</th><th>Aberto</th><th>Cobertura</th><th>Liberados</th><th>Alojamento</th></tr></thead><tbody>${rows.map(r => `<tr class="pro-row"><td><button class="font-black text-primary hover:underline" onclick="mproSetObraFilter('${esc(r.obra)}')">${esc(r.obra)}</button></td><td class="font-mono">${r.sol}</td><td class="font-mono">${r.rec}</td><td class="font-mono ${r.open?'text-amber-400 font-black':'text-green-400 font-black'}">${r.open}</td><td><div class="flex items-center gap-3"><div class="pro-score-bar flex-1"><span style="width:${Math.min(100,r.cov)}%"></span></div><span class="font-mono text-xs">${r.cov}%</span></div></td><td class="font-mono text-green-400 font-black">${r.lib}</td><td class="font-mono">${r.alo}</td></tr>`).join('') || `<tr><td colspan="7" class="text-center text-muted py-8">Sem dados para o filtro.</td></tr>`}</tbody></table></div>`;
  }
  function leadChart(){
    const stats = leadStats(); const max = Math.max(1, ...stats.map(s=>s.avg));
    return `<div class="grid grid-cols-1 md:grid-cols-4 gap-3">${stats.map(s => `<div class="pro-field"><label>${esc(s.label)}</label><div class="flex items-end gap-3 h-36 mt-3"><div class="w-16 rounded-t-2xl bg-primary/80" style="height:${Math.max(8,(s.avg/max)*118)}px"></div><div><strong class="text-2xl">${s.avg.toFixed(1)}d</strong><p class="pro-mini">${s.count} registro(s)</p><p class="pro-mini">Máx. ${s.max}d</p></div></div></div>`).join('')}</div>`;
  }
  window.mproSetObraFilter = function(value){ window.MOBIPRO_OBRA_FILTER = clean(value); renderDashboard(); };
  window.mproClearObraFilter = function(){ window.MOBIPRO_OBRA_FILTER = ''; renderDashboard(); };
  window.mproCopyExecutiveSummary = async function(){
    const m = metrics();
    const txt = `${APP_NAME} - Resumo Executivo\nObra: ${window.MOBIPRO_OBRA_FILTER || 'Todas'}\nVagas solicitadas: ${m.requested}\nVagas abertas: ${m.open}\nRecrutados ativos: ${m.recruited}\nAdmitidos: ${m.admitted}\nEm treinamento: ${m.training}\nCrachás concluídos: ${m.badgeDone}\nPendências críticas: ${m.critical}`;
    try{ await navigator.clipboard.writeText(txt); alert('Resumo executivo copiado.'); }catch(e){ prompt('Copie o resumo:', txt); }
  };
  window.mproExportAudit = function(){
    const payload = {app:APP_NAME, generatedAt:new Date().toISOString(), obraFilter: window.MOBIPRO_OBRA_FILTER || 'TODAS', metrics: metrics(), stages: stageCounts(), leadtime: leadStats()};
    const blob = new Blob([JSON.stringify(payload,null,2)], {type:'application/json'});
    const url = URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='auditoria-mobilizapro.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  };
  window.mproOpenPerson360 = function(id){
    const c = cand().find(x => String(x.id) === String(id)); if(!c) return alert('Pessoa não encontrada.');
    const st = unifiedStatus(c);
    const initials = clean(c.name).split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('') || 'M';
    const fields = [
      ['CPF', (typeof formatCpf === 'function' ? formatCpf(c.cpf) : c.cpf) || '-'], ['Telefone', (typeof formatPhone === 'function' ? formatPhone(c.phone) : c.phone) || '-'], ['Função', c.func || '-'], ['RM', c.rm || '-'], ['Obra', obra(c) || '-'], ['Cidade/UF', `${c.city||'-'} / ${c.state||'-'}`], ['Origem', c.source_indicacao || '-'], ['Tipo', c.source_tipo || '-']
    ];
    const timeline = [
      {label:'Recrutamento', plan:c.recruited, real:c.recruited, ok:!!dateIso(c.recruited)},
      {label:'ASO', plan:c.aso_planned, real:c.aso, ok:!!dateIso(c.aso), warn:late(c.aso_planned,c.aso)},
      {label:'Admissão', plan:c.admission_planned, real:c.admitted, ok:!!dateIso(c.admitted), warn:late(c.admission_planned,c.admitted)},
      {label:'Início Treinamento', plan:c.training_start_planned, real:c.training_start_real, ok:!!dateIso(c.training_start_real)},
      {label:'Fim Treinamento', plan:c.training_end_planned, real:c.training_end_real, ok:completedTraining(c), warn:late(c.training_end_planned,c.training_end_real)},
      {label:'Postagem Crachá', plan:c.badge_posted_date, real:c.badge_posted_date, ok:!!dateIso(c.badge_posted_date)},
      {label:'Emissão Crachá', plan:badgePlan(c), real:c.badge_real_date, ok:badgeComplete(c), warn:late(badgePlan(c),c.badge_real_date)}
    ];
    const html = `<div class="pro-ficha bg-surface-container-high border border-outline-variant w-full rounded-2xl shadow-2xl max-h-[92vh] overflow-hidden flex flex-col"><div class="p-5 border-b border-outline-variant flex items-start justify-between gap-4"><div><p class="pro-eyebrow"><span class="material-symbols-outlined text-sm">account_circle</span> Ficha 360</p><h3 class="font-display font-black text-2xl mt-1">${esc(c.name)}</h3><div class="mt-2"><span class="pro-status-pill ${st.tone}">${esc(st.stage)}</span></div></div><button onclick="closeModal()" class="btn btn-ghost"><span class="material-symbols-outlined">close</span></button></div><div class="p-5 overflow-y-auto"><div class="pro-ficha-grid"><aside class="pro-profile-card"><div class="flex items-center gap-4 mb-5"><div class="pro-avatar">${esc(initials)}</div><div><div class="font-black text-on-surface">${esc(c.name)}</div><p class="text-xs text-muted">${esc(c.func||'-')}</p></div></div><div class="grid grid-cols-1 gap-2">${fields.map(f => `<div class="pro-field"><label>${esc(f[0])}</label><strong>${esc(f[1])}</strong></div>`).join('')}</div><div class="flex flex-col gap-2 mt-4"><button onclick="closeModal(); openEditPersonModal(${c.id})" class="btn btn-primary w-full"><span class="material-symbols-outlined text-sm">edit</span> Editar fluxo</button><button onclick="closeModal(); selectPage('cracha')" class="btn btn-ghost border border-outline-variant w-full"><span class="material-symbols-outlined text-sm">badge</span> Ir para crachá</button></div></aside><section class="pro-section"><div class="pro-section-head"><div><h4 class="pro-section-title">Linha do tempo operacional</h4><p class="pro-section-desc">Previsto x real, com sinalização automática de conclusão e atraso.</p></div></div><div class="pro-section-body"><div class="pro-timeline">${timeline.map(t => `<div class="pro-timeline-item"><div class="pro-dot ${t.ok?'ok':(t.warn?'danger':'warn')}"><span class="material-symbols-outlined text-sm">${t.ok?'check':(t.warn?'priority_high':'schedule')}</span></div><div><strong class="text-sm text-on-surface">${esc(t.label)}</strong><p class="pro-mini">Previsto: ${esc(dateBR(t.plan))} • Real: ${esc(dateBR(t.real))}</p></div><span class="pro-status-pill ${t.ok?'success':(t.warn?'danger':'warning')}">${t.ok?'Concluído':(t.warn?'Atrasado':'Pendente')}</span></div>`).join('')}</div></div></section></div></div></div>`;
    if (typeof openModal === 'function') openModal(html); else alert(c.name);
  };
  window.renderDashboard = function(){
    const el = qs('page-dashboard'); if(!el) return;
    const m = metrics(); const sc = qualityScore(m); const stages = stageCounts(); const obraSel = window.MOBIPRO_OBRA_FILTER || '';
    const opts = obraOptions();
    const healthMsg = sc >= 85 ? 'Base saudável para operação' : sc >= 70 ? 'Base boa, com pontos de saneamento' : 'Base exige saneamento de dados';
    el.innerHTML = `<div class="pro-top-shell animate-up">
      <section class="pro-hero"><div class="pro-hero-grid"><div><div class="pro-eyebrow"><span class="material-symbols-outlined text-sm">rocket_launch</span> Central de Mobilização 2.0</div><h2 class="pro-hero-title"><span>${APP_NAME}</span><br>controle real da mobilização</h2><p class="pro-subtitle">Versão TOP consolidada: motor único de status, visão 360 do colaborador, fila de ação crítica, cobertura por obra, qualidade da base, leadtime e indicadores executivos conectados ao fluxo real.</p><div class="pro-hero-actions"><button class="pro-action" onclick="mproCopyExecutiveSummary()"><span class="material-symbols-outlined text-sm">content_copy</span> Copiar resumo</button><button class="pro-action" onclick="mproExportAudit()"><span class="material-symbols-outlined text-sm">download</span> Exportar auditoria</button><button class="pro-action" onclick="selectPage('pipeline')"><span class="material-symbols-outlined text-sm">analytics</span> Pipeline</button><button class="pro-action" onclick="selectPage('manutencao')"><span class="material-symbols-outlined text-sm">admin_panel_settings</span> Manutenção</button></div></div><aside class="pro-side-panel"><div><p class="pro-kpi-label">Índice de qualidade operacional</p><div class="pro-score">${sc}<small>/100</small></div><p class="pro-mini">${esc(healthMsg)}</p></div><div><div class="pro-score-bar"><span style="width:${sc}%"></span></div><div class="flex justify-between pro-mini mt-2"><span>Crítico</span><span>Excelente</span></div></div></aside></div></section>
      <div class="pro-filter-bar"><div><p class="pro-kpi-label">Filtro global por obra</p><p class="text-xs text-muted">Atualiza todos os painéis do dashboard.</p></div><div class="flex flex-wrap gap-2 items-center"><select class="modal-input pro-filter-select" onchange="mproSetObraFilter(this.value)"><option value="">Todas as obras</option>${opts.map(o=>`<option value="${esc(o)}" ${norm(o)===norm(obraSel)?'selected':''}>${esc(o)}</option>`).join('')}</select>${obraSel?`<button class="btn btn-ghost border border-outline-variant" onclick="mproClearObraFilter()">Limpar</button>`:''}</div></div>
      <div class="pro-kpi-grid">${kpi('Vagas solicitadas',m.requested,'Solicitações ativas','assignment_add','primary','solicitacao')}${kpi('Vagas em aberto',m.open,'Saldo sem baixa','view_list',m.open?'warning':'success','vagas')}${kpi('Pendências críticas',m.critical,'Ações com prioridade','warning',m.critical?'danger':'success','dashboard')}${kpi('Liberados',m.badgeDone,'Crachá emitido/concluído','verified',m.badgeDone?'success':'primary','cracha')}${kpi('Recrutados ativos',m.recruited,'Sem declinados','person_search','primary','recrutamento')}${kpi('Admitidos',m.admitted,'Base em mobilização','groups','primary','mobilizacao')}${kpi('Em treinamento',m.training,'Treinamento pendente','school',m.training?'warning':'success','mobilizacao')}${kpi('Alojamento pendente',m.alojPending,'Necessidade não tratada','home',m.alojPending?'warning':'success','alojamento')}</div>
      <section class="pro-section"><div class="pro-section-head"><div><h3 class="pro-section-title">Mapa da jornada</h3><p class="pro-section-desc">Fluxo completo, da vaga ao crachá.</p></div><span class="badge bg-primary/10 text-primary border-primary/20">${esc(obraSel || 'Todas as obras')}</span></div><div class="pro-section-body"><div class="pro-journey">${step('Solicitações',stages.requested,'Demanda formal','assignment_add','primary','solicitacao')}${step('Recrutados',stages.recruited,'Candidatos ativos','person_search','primary','recrutamento')}${step('ASO real',stages.aso,'Exames liberados','medical_services',stages.aso?'ok':'warn','recrutamento')}${step('Admissão real',stages.admitted,'Entraram no fluxo','assignment_ind',stages.admitted?'ok':'warn','mobilizacao')}${step('Treinamento OK',stages.trainingDone,'Concluídos','school',stages.trainingDone?'ok':'warn','mobilizacao')}${step('Crachá postado',stages.badgePosted,'Em emissão','outgoing_mail',stages.badgePosted?'primary':'warn','cracha')}${step('Crachá emitido',stages.badgeDone,'Liberados','badge',stages.badgeDone?'ok':'warn','cracha')}</div></div></section>
      <div class="pro-grid-2"><section class="pro-section"><div class="pro-section-head"><div><h3 class="pro-section-title">Fila de ação prioritária</h3><p class="pro-section-desc">Pessoas que exigem maior atenção pelo motor único de status.</p></div><span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">${m.critical} crítico(s)</span></div><div class="pro-section-body"><div class="pro-priority-list">${criticalList()}</div></div></section><section class="pro-section"><div class="pro-section-head"><div><h3 class="pro-section-title">Leadtime médio</h3><p class="pro-section-desc">Média por etapa concluída em dias corridos.</p></div><button class="btn btn-ghost border border-outline-variant text-xs" onclick="selectPage('pipeline')">Ver pipeline</button></div><div class="pro-section-body">${leadChart()}</div></section></div>
      <section class="pro-section"><div class="pro-section-head"><div><h3 class="pro-section-title">Cobertura por obra</h3><p class="pro-section-desc">Solicitado x recrutado x liberado, com filtro por obra no clique.</p></div></div><div class="pro-section-body">${coverageTable()}</div></section>
      <section class="pro-section"><div class="pro-section-head"><div><h3 class="pro-section-title">Governança da base</h3><p class="pro-section-desc">Crítica automática de dados para reduzir falhas de operação.</p></div><span class="badge bg-primary/10 text-primary border-primary/20">Auditoria ativa</span></div><div class="pro-section-body"><div class="pro-quality-grid"><div class="pro-quality-card"><span>Pessoas no filtro</span><strong>${m.fc.length}</strong></div><div class="pro-quality-card"><span>CPF pendente</span><strong class="${m.cpfMissing?'text-amber-400':''}">${m.cpfMissing}</strong></div><div class="pro-quality-card"><span>CPF duplicado</span><strong class="${m.cpfDup?'text-red-400':'text-green-400'}">${m.cpfDup}</strong></div><div class="pro-quality-card"><span>Declinados</span><strong>${m.declined}</strong></div></div></div></section>
    </div>`;
    try { updateAlertIcon?.(); applyPermissionLock?.(); } catch(e) {}
  };
  function applyBrand(){
    document.title = `${APP_NAME} - Sistema de Mobilização`;
    document.body?.classList.add('top-upgraded');
    document.querySelectorAll('h1').forEach(h => { if(norm(h.textContent).includes('MOBILIZA')) h.textContent = APP_NAME; });
    const footer = [...document.querySelectorAll('p,span')].find(x => norm(x.textContent) === 'GESTAO DE MOBILIZACAO' || norm(x.textContent) === '© GESTAO DE MOBILIZACAO');
    if (footer) footer.textContent = '© MobilizaPRO';
  }
  // Enriquecimento dos cards: botão Ficha 360 em Recrutamento/Mobilização sem perder ações existentes.
  const oldRenderCandidateCard = window.renderCandidateCard;
  if (typeof oldRenderCandidateCard === 'function') {
    window.renderCandidateCard = renderCandidateCard = function(c, showTrainingPanel=false){
      let html = oldRenderCandidateCard(c, showTrainingPanel);
      const btn = `<button onclick="mproOpenPerson360(${c.id})" class="btn btn-ghost p-1.5 border border-outline-variant" title="Ficha 360"><span class="material-symbols-outlined text-sm">account_circle</span></button>`;
      return html.replace('<div class="flex gap-2">', `<div class="flex gap-2">${btn}`);
    };
  }
  const oldRenderMobRow = window.renderMobilizationPersonRow;
  if (typeof oldRenderMobRow === 'function') {
    window.renderMobilizationPersonRow = renderMobilizationPersonRow = function(c){
      let html = oldRenderMobRow(c);
      const open = `<button onclick="mproOpenPerson360(${c.id})" class="ml-2 inline-flex items-center gap-1 text-primary text-[10px] font-black hover:underline"><span class="material-symbols-outlined text-sm">account_circle</span> Ficha 360</button>`;
      return html.replace('</div>\n        </div>', `${open}</div>\n        </div>`);
    };
  }
  const prevSelectPage = window.selectPage;
  if (typeof prevSelectPage === 'function') {
    window.selectPage = selectPage = function(page){
      const result = prevSelectPage(page);
      applyBrand();
      return result;
    };
  }
  window.MobilizaPROTop = {metrics, unifiedStatus, qualityScore, leadStats};
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyBrand); else applyBrand();
})();
