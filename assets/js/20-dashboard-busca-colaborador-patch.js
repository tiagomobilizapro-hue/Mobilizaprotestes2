
// ============================================================
// MOBILIZAPRO 1.10 - DASHBOARD: BUSCA POR NOME / FUNÇÃO / CPF
// Adiciona filtro ao lado da busca por obra e recalcula indicadores.
// ============================================================
(function(){
  const arr=v=>Array.isArray(v)?v:[];
  const getCands=()=>{try{return arr(typeof CANDIDATES!=='undefined'?CANDIDATES:window.CANDIDATES)}catch(e){return arr(window.CANDIDATES)}};
  const getSols=()=>{try{return arr(typeof SOLICITATIONS!=='undefined'?SOLICITATIONS:window.SOLICITATIONS)}catch(e){return arr(window.SOLICITATIONS)}};
  const clean=v=>String(v??'').trim();
  const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const norm=v=>clean(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase();
  const cpfDigits=v=>String(v??'').replace(/\D+/g,'');
  const num=v=>{const n=Number(v);return Number.isFinite(n)?n:0};
  const iso=v=>{try{if(typeof cleanDate==='function')return cleanDate(v)}catch(e){} const s=clean(v); if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s; if(/^\d{2}\/\d{2}\/\d{4}$/.test(s)){const [d,m,y]=s.split('/');return `${y}-${m}-${d}`} return ''};
  const today=()=>new Date().toISOString().slice(0,10);
  const obra=x=>clean(x?.digital_obra||x?.obra||x?.obra_vinculada||'');
  const func=x=>clean(x?.func||x?.function_name||x?.funcao||x?.cargo||'');
  const canceled=s=>Boolean(s?.canceled||norm(s?.status).includes('CANCEL'));
  const badgeComplete=c=>{try{if(typeof isBadgeCompleted==='function')return isBadgeCompleted(c)}catch(e){} return Boolean(iso(c?.badge_real_date))};
  const trainingComplete=c=>{try{if(typeof hasCompletedRequiredTrainings==='function')return hasCompletedRequiredTrainings(c)}catch(e){} return Boolean(iso(c?.training_end_real))};
  const badgePlan=c=>{try{if(typeof getBadgeReleaseDate==='function')return getBadgeReleaseDate(c)}catch(e){} return c?.source_data_prevista_cracha_samarco||c?.badge_planned_date||''};
  const obraFilter=()=>norm(window.MOBIPRO_OBRA_FILTER||'');
  const searchFilter=()=>norm(window.MOBIPRO_COLLAB_SEARCH||'');
  const searchDigits=()=>cpfDigits(window.MOBIPRO_COLLAB_SEARCH||'');

  function candidateMatchesSearch(c){
    const q = searchFilter();
    const qDigits = searchDigits();
    if(!q && !qDigits) return true;
    const hay = norm([c?.name, func(c), c?.cpf, c?.phone, c?.rm, obra(c)].filter(Boolean).join(' '));
    if(q && hay.includes(q)) return true;
    if(qDigits && cpfDigits(c?.cpf).includes(qDigits)) return true;
    return false;
  }
  function candidateMatchesObra(c){ return !obraFilter() || norm(obra(c)) === obraFilter(); }
  function cands(all=false){
    return getCands().filter(c=>(all||!c.declined_date)&&candidateMatchesObra(c)&&candidateMatchesSearch(c));
  }
  function matchedCandidateKeys(){
    const set = new Set();
    cands(true).forEach(c=>{
      const rm=clean(c?.rm), ob=norm(obra(c)), fn=norm(func(c));
      if(rm || ob || fn) set.add(`${rm}|${ob}|${fn}`);
    });
    return set;
  }
  function solMatchesSearch(s){
    const q=searchFilter();
    const qDigits=searchDigits();
    if(!q && !qDigits) return true;
    const solHay = norm([func(s), s?.func, s?.function_name, s?.rm, obra(s)].filter(Boolean).join(' '));
    if(q && solHay.includes(q)) return true;
    const keys = matchedCandidateKeys();
    const key = `${clean(s?.rm)}|${norm(obra(s))}|${norm(func(s))}`;
    return keys.has(key);
  }
  function sols(){return getSols().filter(s=>(!obraFilter()||norm(obra(s))===obraFilter())&&solMatchesSearch(s));}
  const late=(p,r)=>{p=iso(p);return Boolean(p&&!iso(r)&&p<today())};

  function st(c){
    if(c.declined_date)return {name:'Declinado',tone:'danger',page:'recrutamento',act:'Histórico',rank:90};
    if(badgeComplete(c))return {name:'Liberado',tone:'ok',page:'cracha',act:'Ver',rank:20};
    if(iso(c.badge_posted_date))return late(badgePlan(c),c.badge_real_date)?{name:'Crachá atrasado',tone:'danger',page:'cracha',act:'Emitir',rank:1}:{name:'Aguardando crachá',tone:'warn',page:'cracha',act:'Emitir',rank:5};
    if(iso(c.admitted)&&trainingComplete(c))return {name:'Treinamento OK',tone:'primary',page:'cracha',act:'Postar',rank:4};
    if(iso(c.admitted))return late(c.training_end_planned,c.training_end_real)?{name:'Treino atrasado',tone:'danger',page:'mobilizacao',act:'Concluir',rank:1}:{name:'Em treinamento',tone:'warn',page:'mobilizacao',act:'Concluir',rank:6};
    if(iso(c.aso))return late(c.admission_planned,c.admitted)?{name:'Admissão atrasada',tone:'danger',page:'recrutamento',act:'Admitir',rank:1}:{name:'Aguardando admissão',tone:'warn',page:'recrutamento',act:'Admitir',rank:7};
    return late(c.aso_planned,c.aso)?{name:'ASO atrasado',tone:'danger',page:'recrutamento',act:'ASO',rank:1}:{name:'Aguardando ASO',tone:'warn',page:'recrutamento',act:'ASO',rank:8};
  }

  function metrics(){
    const all=cands(true), active=all.filter(c=>!c.declined_date), s=sols().filter(x=>!canceled(x));
    const requested=s.reduce((a,x)=>a+num(x.qty||x.requested_qty||0),0), open=Math.max(0,requested-active.length);
    const asoPending=active.filter(c=>!iso(c.aso)), admPending=active.filter(c=>iso(c.aso)&&!iso(c.admitted)), admitted=active.filter(c=>iso(c.admitted));
    const training=admitted.filter(c=>!trainingComplete(c)), trainingDone=admitted.filter(trainingComplete);
    const badgePending=active.filter(c=>iso(c.badge_posted_date)&&!badgeComplete(c)), badgeDone=active.filter(badgeComplete);
    const alojPending=active.filter(c=>c.alojado&&norm(c.alojamento_realizado||'NAO')!=='SIM');
    const danger=active.map(c=>({c,s:st(c)})).filter(x=>x.s.tone==='danger'||x.s.rank<=4);
    return {all,active,requested,open,asoPending,admPending,admitted,training,trainingDone,badgePending,badgeDone,alojPending,danger};
  }
  function obras(){const set=new Set();getCands().forEach(c=>obra(c)&&set.add(obra(c)));getSols().forEach(s=>obra(s)&&set.add(obra(s)));return [...set].sort((a,b)=>a.localeCompare(b,'pt-BR',{sensitivity:'base'}))}
  function setObraFilter(v){window.MOBIPRO_OBRA_FILTER=clean(v);window.renderDashboard?.()}
  function setSearch(v){window.MOBIPRO_COLLAB_SEARCH=clean(v);clearTimeout(window.__mproDashSearchTimer);window.__mproDashSearchTimer=setTimeout(()=>window.renderDashboard?.(),500)}
  window.mproSetObraFilter=setObraFilter;
  window.mproClearObraFilter=()=>setObraFilter('');
  window.mproSetCollaboratorSearch=setSearch;
  window.mproClearCollaboratorSearch=()=>{window.MOBIPRO_COLLAB_SEARCH='';window.renderDashboard?.()};

  function card(label,val,page,icon,tone){return `<button class="mprox-kpi ${tone}" onclick="selectPage('${page}')"><div class="mprox-kpi-head"><div class="mprox-num">${val}</div><span class="material-symbols-outlined mprox-icon">${icon}</span></div><div class="mprox-label">${esc(label)}</div><div class="mprox-action"><span>Abrir</span><span class="material-symbols-outlined text-sm">arrow_forward</span></div></button>`}
  function queue(){const rows=cands(false).map(c=>({c,s:st(c)})).filter(x=>x.s.tone!=='ok').sort((a,b)=>a.s.rank-b.s.rank||String(a.c.name||'').localeCompare(String(b.c.name||''),'pt-BR')).slice(0,12);return rows.map(({c,s})=>`<div class="mprox-row"><div class="mprox-stripe ${s.tone}"></div><div class="min-w-0"><div class="flex gap-2 items-center flex-wrap"><button class="mprox-name hover:text-primary" onclick="${typeof window.mproOpenPerson360==='function'?`mproOpenPerson360(${c.id})`:`selectPage('${s.page}')`}">${esc(c.name||'-')}</button><span class="mprox-badge ${s.tone}">${esc(s.name)}</span></div><div class="mprox-meta">${esc(func(c)||'-')} • RM ${esc(c.rm||'-')} • ${esc(obra(c)||'-')} • CPF ${esc(c.cpf||'-')}</div></div><button class="mprox-btn" onclick="selectPage('${s.page}')">${esc(s.act)}</button></div>`).join('')||`<div class="mprox-empty">Sem pendências para o filtro aplicado.</div>`}
  function stages(m){const data=[['Solicitações',m.requested,'solicitacao'],['Recrutados',m.active.length,'recrutamento'],['ASO real',m.active.filter(c=>iso(c.aso)).length,'recrutamento'],['Admissão',m.admitted.length,'mobilizacao'],['Treinamento OK',m.trainingDone.length,'mobilizacao'],['Crachá postado',m.active.filter(c=>iso(c.badge_posted_date)).length,'cracha'],['Liberados',m.badgeDone.length,'cracha']];const max=Math.max(1,...data.map(x=>x[1]));return `<div class="mprox-stage">${data.map(([l,v,p])=>`<div class="mprox-stage-row" onclick="selectPage('${p}')"><div class="mprox-stage-name">${esc(l)}</div><div class="mprox-track"><div class="mprox-bar" style="width:${Math.max(4,(v/max)*100)}%"></div></div><div class="mprox-stage-val">${v}</div></div>`).join('')}</div>`}
  const days=(a,b)=>{a=iso(a);b=iso(b);return(!a||!b)?null:Math.round((new Date(b+'T00:00:00')-new Date(a+'T00:00:00'))/86400000)};
  function lead(){const vals=cands(false);const avg=a=>a.length?a.reduce((s,v)=>s+v,0)/a.length:0;const col=fn=>vals.map(fn).filter(v=>v!==null&&v>=0);const rows=[['Recrut.→ASO',col(c=>days(c.recruited,c.aso))],['ASO→Admissão',col(c=>days(c.aso,c.admitted))],['Admissão→Treino',col(c=>days(c.admitted,c.training_end_real))],['Postagem→Crachá',col(c=>days(c.badge_posted_date,c.badge_real_date))]].map(([l,a])=>[l,avg(a),a.length]);const max=Math.max(1,...rows.map(r=>r[1]));return `<div class="mprox-lead">${rows.map(([l,v,n])=>`<div class="mprox-lead-row"><div class="mprox-lead-l">${esc(l)}</div><div class="mprox-track"><div class="mprox-bar" style="width:${Math.max(4,(v/max)*100)}%"></div></div><div class="mprox-lead-v">${v.toFixed(1)}d</div></div>`).join('')}</div>`}
  function coverage(){const map=new Map();sols().filter(s=>!canceled(s)).forEach(s=>{const k=obra(s)||'SEM OBRA';if(!map.has(k))map.set(k,{obra:k,sol:0,rec:0,lib:0});map.get(k).sol+=num(s.qty||s.requested_qty||0)});cands(false).forEach(c=>{const k=obra(c)||'SEM OBRA';if(!map.has(k))map.set(k,{obra:k,sol:0,rec:0,lib:0});const r=map.get(k);r.rec++;if(badgeComplete(c))r.lib++});const rows=[...map.values()].map(r=>({...r,open:Math.max(0,r.sol-r.rec),cov:r.sol?Math.round((r.rec/r.sol)*100):0})).sort((a,b)=>b.open-a.open||a.obra.localeCompare(b.obra,'pt-BR')).slice(0,8);return `<div class="mprox-table-wrap"><table class="mprox-table"><thead><tr><th>Obra</th><th>Solicitado</th><th>Recrutado</th><th>Aberto</th><th>Cobertura</th><th>Liberados</th></tr></thead><tbody>${rows.map(r=>`<tr><td><button class="text-primary font-black hover:underline" onclick="mproSetObraFilter(${JSON.stringify(r.obra)})">${esc(r.obra)}</button></td><td>${r.sol}</td><td>${r.rec}</td><td class="${r.open?'text-amber-400':'text-green-400'} font-black">${r.open}</td><td>${r.cov}%</td><td class="text-green-400 font-black">${r.lib}</td></tr>`).join('')||'<tr><td colspan="6" class="text-center text-muted py-8">Sem dados para o filtro aplicado.</td></tr>'}</tbody></table></div>`}

  window.renderDashboard=function(){
    const el=document.getElementById('page-dashboard'); if(!el)return;
    const m=metrics(), opts=obras(), f=window.MOBIPRO_OBRA_FILTER||'', q=window.MOBIPRO_COLLAB_SEARCH||'';
    const hasFilter=Boolean(clean(f)||clean(q));
    el.innerHTML=`<div class="mprox animate-up">
      <section class="mprox-top"><h2 class="mprox-title">Mobiliza<span>PRO</span> | Painel de ação</h2><div class="mprox-actions"><button class="mprox-btn" onclick="selectPage('recrutamento')"><span class="material-symbols-outlined text-sm">person_search</span>Recrutamento</button><button class="mprox-btn" onclick="selectPage('mobilizacao')"><span class="material-symbols-outlined text-sm">school</span>Treinamentos</button><button class="mprox-btn" onclick="selectPage('cracha')"><span class="material-symbols-outlined text-sm">badge</span>Crachá</button></div></section>
      <section class="mprox-filter mprox-filter-plus">
        <div class="mprox-field">
          <div class="mprox-filter-label mprox-filter-label-obra">Obra</div>
          <select class="modal-input" onchange="mproSetObraFilter(this.value)"><option value="">Todas as obras</option>${opts.map(o=>`<option value="${esc(o)}" ${norm(o)===norm(f)?'selected':''}>${esc(o)}</option>`).join('')}</select>
        </div>
        <div class="mprox-field mprox-field-search">
          <div class="mprox-filter-label mprox-filter-label-colaborador">Colaborador</div>
          <div class="mprox-searchbox"><span class="material-symbols-outlined text-sm">search</span><input class="modal-input" value="${esc(q)}" placeholder="Buscar por nome, função ou CPF" oninput="mproSetCollaboratorSearch(this.value)" onkeydown="if(event.key==='Escape')mproClearCollaboratorSearch()"></div>
        </div>
        <div class="mprox-filter-actions">${hasFilter?`<button class="mprox-btn" onclick="mproClearObraFilter();mproClearCollaboratorSearch()">Limpar filtros</button>`:''}</div>
      </section>
      <section class="mprox-kpis">${card('Vagas em aberto',m.open,'vagas','view_list',m.open?'warn':'ok')}${card('Aguardando ASO',m.asoPending.length,'recrutamento','medical_services',m.asoPending.length?'warn':'ok')}${card('Admissão pendente',m.admPending.length,'recrutamento','assignment_ind',m.admPending.length?'warn':'ok')}${card('Em treinamento',m.training.length,'mobilizacao','school',m.training.length?'warn':'ok')}${card('Crachá pendente',m.badgePending.length,'cracha','badge',m.badgePending.length?'warn':'ok')}${card('Alojamento pendente',m.alojPending.length,'alojamento','home',m.alojPending.length?'danger':'ok')}</section>
      <div class="mprox-grid"><section class="mprox-panel"><div class="mprox-head"><h3 class="mprox-h">Fila de ação</h3><span class="mprox-badge ${m.danger.length?'danger':'ok'}">${m.danger.length} crítico(s)</span></div><div class="mprox-body"><div class="mprox-queue">${queue()}</div></div></section><div class="mprox-stack"><section class="mprox-panel"><div class="mprox-head"><h3 class="mprox-h">Fluxo operacional</h3></div><div class="mprox-body">${stages(m)}</div></section><section class="mprox-panel"><div class="mprox-head"><h3 class="mprox-h">Leadtime</h3><button class="mprox-btn" onclick="selectPage('pipeline')">Pipeline</button></div><div class="mprox-body">${lead()}</div></section></div></div>
      <section class="mprox-panel"><div class="mprox-head"><h3 class="mprox-h">Cobertura por obra</h3><button class="mprox-btn" onclick="selectPage('vagas')">Vagas</button></div><div class="mprox-body">${coverage()}</div></section>
    </div>`;
    try{updateAlertIcon?.();applyPermissionLock?.()}catch(e){}
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{try{if(document.querySelector('#page-dashboard.active')||document.querySelector('#page-dashboard:not(.hidden)'))window.renderDashboard()}catch(e){}});else{try{if(document.querySelector('#page-dashboard.active')||document.querySelector('#page-dashboard:not(.hidden)'))window.renderDashboard()}catch(e){}}
})();
