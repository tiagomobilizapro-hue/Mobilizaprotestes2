// ============================================================
// MobilizaPro 1.10 - Ficha 360 Premium + Excluir no Recrutamento
// Escopo: acabamento operacional, sem alterar banco/fluxo principal
// ============================================================
(function () {
  'use strict';

  function esc(v) {
    if (typeof escapeHtml === 'function') return escapeHtml(v);
    return String(v ?? '').replace(/[&<>"']/g, function (ch) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[ch];
    });
  }
  function clean(v, max) {
    v = String(v ?? '').trim();
    if (max && v.length > max) v = v.slice(0, max);
    return v;
  }
  function listCandidates() {
    try { return Array.isArray(window.CANDIDATES) ? window.CANDIDATES : (Array.isArray(CANDIDATES) ? CANDIDATES : []); } catch (e) { return []; }
  }
  function byId(id) { return listCandidates().find(function (c) { return Number(c.id) === Number(id); }); }
  function fmtCpf(v) { try { return typeof formatCpf === 'function' ? formatCpf(v) : v; } catch(e) { return v || '-'; } }
  function fmtPhone(v) { try { return typeof formatPhone === 'function' ? formatPhone(v) : v; } catch(e) { return v || '-'; } }
  function dateBR(v) {
    v = String(v || '').slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return '-';
    return v.slice(8,10) + '/' + v.slice(5,7) + '/' + v.slice(0,4);
  }
  function isManager() {
    try { if (typeof isGerencial === 'function' && isGerencial()) return true; } catch(e) {}
    var u = window.MOBI_USER || {};
    var role = String(u.role || u.perfil || u.nivel || '').toUpperCase();
    return role === 'GERENCIAL' || role === 'ADMIN' || role === 'ADMINISTRADOR';
  }
  function hasTrainingDone(c) {
    try { if (typeof hasCompletedRequiredTrainings === 'function') return hasCompletedRequiredTrainings(c); } catch(e) {}
    return !!(c && c.training_end_real);
  }
  function statusInfo(c) {
    if (!c) return { label:'Sem dados', tone:'danger' };
    if (c.declined_date) return { label:'Declinado', tone:'danger' };
    if (c.badge_real_date || c.badge_ok) return { label:'Crachá emitido', tone:'success' };
    if (c.badge_posted_date) return { label:'Fila para crachá', tone:'primary' };
    if (c.admitted) return { label:'Mobilização', tone:'warning' };
    if (c.aso) return { label:'Admissão', tone:'warning' };
    return { label:'Recrutamento', tone:'primary' };
  }
  function initials(name) {
    return clean(name || '?').split(/\s+/).filter(Boolean).slice(0, 2).map(function (p) { return p.charAt(0); }).join('').toUpperCase() || '?';
  }

  function ensureCss() {
    if (document.getElementById('mobi360-premium-css')) return;
    var css = document.createElement('style');
    css.id = 'mobi360-premium-css';
    css.textContent = `
      #modal-overlay:has(.mobi360-premium){align-items:stretch!important;justify-content:stretch!important;padding:10px!important;}
      #modal:has(.mobi360-premium),#modal.mobi360p-modal-active{width:calc(100vw - 20px)!important;max-width:calc(100vw - 20px)!important;height:calc(100vh - 20px)!important;max-height:calc(100vh - 20px)!important;margin:0!important;border-radius:18px!important;display:flex!important;align-self:stretch!important;}
      .mobi360-premium{width:100%;height:100%;max-height:none;overflow:hidden;display:flex;flex-direction:column;background:radial-gradient(circle at top left,rgba(31,85,170,.22),transparent 35%),linear-gradient(180deg,rgba(10,23,42,.99),rgba(4,13,25,.99));border:1px solid rgba(65,111,180,.45);border-radius:18px;box-shadow:0 34px 110px rgba(0,0,0,.62);color:#eef6ff}
      .mobi360p-head{padding:24px 28px;border-bottom:1px solid rgba(65,111,180,.35);display:flex;align-items:flex-start;justify-content:space-between;gap:18px;background:linear-gradient(135deg,rgba(37,99,235,.18),transparent 60%)}
      .mobi360p-eyebrow{display:flex;align-items:center;gap:7px;color:#58a6ff;font-weight:950;font-size:12px;text-transform:uppercase;letter-spacing:.10em;margin-bottom:10px}.mobi360p-title{font-size:28px;font-weight:950;letter-spacing:-.03em;line-height:1.05;text-transform:uppercase}.mobi360p-sub{margin-top:10px;color:#bdcce5;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.10em}.mobi360p-head-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}
      .mobi360p-body{padding:18px;overflow:auto;flex:1;min-height:0}.mobi360p-grid{display:grid;grid-template-columns:minmax(520px,1.45fr) minmax(340px,.86fr) minmax(250px,.62fr);gap:14px;align-items:stretch}.mobi360p-panel{border:1px solid rgba(65,111,180,.34);background:linear-gradient(180deg,rgba(9,24,45,.83),rgba(4,15,29,.83));border-radius:18px;padding:16px;box-shadow:inset 0 1px 0 rgba(255,255,255,.035)}.mobi360p-panel h4{font-weight:950;color:#f8fbff;margin:0 0 14px;text-transform:uppercase;font-size:12px;letter-spacing:.09em}.mobi360p-fields{display:grid;grid-template-columns:86px repeat(3,minmax(0,1fr));gap:10px}.mobi360p-avatar{width:68px;height:68px;border-radius:16px;display:grid;place-items:center;background:linear-gradient(135deg,#facc15,#60a5fa);color:#07111f;font-weight:950;font-size:24px;box-shadow:0 12px 26px rgba(37,99,235,.22)}.mobi360p-avatarbox{grid-row:span 2;display:flex;align-items:center;justify-content:center;border:1px solid rgba(65,111,180,.28);border-radius:14px;background:rgba(255,255,255,.025)}.mobi360p-field{border:1px solid rgba(65,111,180,.28);border-radius:13px;padding:12px 13px;background:rgba(2,10,22,.34);min-height:68px}.mobi360p-field label{display:block;font-size:9px;color:#8ba1c4;text-transform:uppercase;font-weight:950;letter-spacing:.08em}.mobi360p-field strong{display:block;margin-top:6px;font-size:13px;color:#f4f8ff;word-break:break-word;line-height:1.25}.mobi360p-field.wide{grid-column:span 2}.mobi360p-docs{margin-top:14px;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}.mobi360p-doc{border:1px solid rgba(65,111,180,.28);border-radius:13px;padding:10px 8px;background:rgba(255,255,255,.025);text-align:center;min-height:76px}.mobi360p-doc .material-symbols-outlined{color:#80b7ff}.mobi360p-doc strong{display:block;font-size:10px;margin-top:4px}.mobi360p-doc small{display:inline-flex;margin-top:5px;padding:2px 7px;border-radius:999px;border:1px solid rgba(34,197,94,.45);color:#4ade80;font-size:9px;font-weight:950}.mobi360p-drop{margin-top:12px;border:1px dashed rgba(101,163,255,.42);border-radius:14px;padding:16px;text-align:center;color:#a9bad8;background:rgba(37,99,235,.045)}
      .mobi360p-step{position:relative;display:grid;grid-template-columns:38px 1fr auto;gap:12px;align-items:center;padding:13px 12px;border-radius:15px;border:1px solid rgba(65,111,180,.28);background:rgba(255,255,255,.025);margin-bottom:10px}.mobi360p-step:before{content:'';position:absolute;left:31px;top:48px;bottom:-16px;border-left:2px dashed rgba(88,166,255,.42)}.mobi360p-step:last-child:before{display:none}.mobi360p-ico{width:34px;height:34px;border-radius:999px;display:grid;place-items:center;background:rgba(58,132,255,.16);color:#55a0ff}.mobi360p-step.ok .mobi360p-ico{background:rgba(34,197,94,.17);color:#51e486}.mobi360p-step.warn .mobi360p-ico{background:rgba(245,158,11,.16);color:#ffc857}.mobi360p-step.danger .mobi360p-ico{background:rgba(239,68,68,.16);color:#ff8b8b}.mobi360p-step strong{display:block;font-size:13px;color:#f8fbff}.mobi360p-step small{display:block;margin-top:2px;font-size:11px;color:#93a7c8}.mobi360p-badge{display:inline-flex;align-items:center;justify-content:center;min-width:86px;padding:5px 8px;border-radius:999px;font-size:10px;font-weight:950;text-transform:uppercase;border:1px solid rgba(88,166,255,.45);color:#82b6ff;background:rgba(58,132,255,.10)}.mobi360p-badge.success{border-color:rgba(34,197,94,.55);color:#54e08b;background:rgba(34,197,94,.10)}.mobi360p-badge.warning{border-color:rgba(245,158,11,.55);color:#ffd15a;background:rgba(245,158,11,.10)}.mobi360p-badge.danger{border-color:rgba(239,68,68,.55);color:#ff9494;background:rgba(239,68,68,.10)}
      .mobi360p-actions{min-width:0}.mobi360p-actions .mobi360p-btn{width:100%;justify-content:flex-start;margin-bottom:10px;padding:12px 13px}.mobi360p-btn{display:inline-flex;align-items:center;gap:9px;border-radius:12px;border:1px solid rgba(65,111,180,.42);background:rgba(18,38,67,.88);color:#dbeafe;font-size:12px;font-weight:900;min-height:42px;transition:.15s ease}.mobi360p-btn:hover{transform:translateY(-1px);filter:brightness(1.09)}.mobi360p-btn.primary{background:linear-gradient(135deg,#176bff,#3b82f6);border-color:rgba(96,165,250,.75);color:white;box-shadow:0 10px 24px rgba(37,99,235,.28)}.mobi360p-btn.success{background:linear-gradient(135deg,#148442,#22c55e);border-color:rgba(34,197,94,.60);color:white}.mobi360p-btn.warn{background:linear-gradient(135deg,#aa6a00,#eab308);border-color:rgba(250,204,21,.65);color:#08111f}.mobi360p-btn.danger{background:linear-gradient(135deg,#991b1b,#dc2626);border-color:rgba(248,113,113,.65);color:white}.mobi360p-btn.ghost{background:rgba(255,255,255,.045)}.mobi360p-btn span{font-size:19px}.mobi360p-note{font-size:11px;color:#9fb1d0;line-height:1.45;padding:12px;border-radius:13px;border:1px dashed rgba(65,111,180,.35);background:rgba(255,255,255,.025)}.mobi360p-danger{border-color:rgba(239,68,68,.42)!important;background:rgba(127,29,29,.20)!important}.mobi360p-foot{padding:14px 18px;border-top:1px solid rgba(65,111,180,.28);display:flex;align-items:center;justify-content:center;gap:12px;background:rgba(2,10,22,.44)}
      .mobi-recruit-actions{display:grid;grid-template-columns:1fr auto auto;gap:8px;margin-top:10px}.mobi-recruit-delete{border-color:rgba(248,113,113,.40)!important;color:#fecaca!important;background:rgba(127,29,29,.16)!important}.mobi-recruit-delete:hover{background:rgba(220,38,38,.22)!important;color:#fff!important}.mobi-recruit-360{border-color:rgba(96,165,250,.45)!important;color:#bfdbfe!important;background:rgba(37,99,235,.12)!important}
      @media(max-width:1320px){.mobi360p-grid{grid-template-columns:minmax(0,1fr) minmax(320px,.72fr)}.mobi360p-actions{grid-column:1 / -1;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.mobi360p-actions h4{grid-column:1 / -1}.mobi360p-actions .mobi360p-btn{margin-bottom:0}.mobi360p-note{grid-column:1 / -1}}@media(max-width:1220px){.mobi360p-grid{grid-template-columns:1fr}.mobi360p-fields{grid-template-columns:86px repeat(2,minmax(0,1fr))}.mobi360p-docs{grid-template-columns:repeat(3,1fr)}}@media(max-width:760px){.mobi360p-head{flex-direction:column}.mobi360p-head-actions{justify-content:flex-start}.mobi360p-fields{grid-template-columns:1fr}.mobi360p-avatarbox{grid-row:auto}.mobi360p-docs{grid-template-columns:repeat(2,1fr)}.mobi360p-foot{flex-direction:column}.mobi360p-foot .mobi360p-btn{width:100%;justify-content:center}.mobi360p-title{font-size:21px}}
    `;
    document.head.appendChild(css);
  }

  function setWideModal() {
    var modal = document.getElementById('modal');
    if (!modal) return;
    modal.classList.remove('max-w-2xl');
    modal.classList.add('max-w-none', 'mobi360p-modal-active');
    modal.style.width = 'calc(100vw - 20px)';
    modal.style.maxWidth = 'calc(100vw - 20px)';
    modal.style.height = 'calc(100vh - 20px)';
    modal.style.maxHeight = 'calc(100vh - 20px)';
  }

  function field(label, value, extra) {
    return '<div class="mobi360p-field ' + (extra || '') + '"><label>' + esc(label) + '</label><strong>' + esc(value || '-') + '</strong></div>';
  }
  function doc(name, ok) {
    return '<div class="mobi360p-doc"><span class="material-symbols-outlined">description</span><strong>' + esc(name) + '</strong><small>' + (ok ? 'OK' : 'PEND.') + '</small></div>';
  }
  function step(label, ok, icon, sub) {
    var tone = ok ? 'ok' : 'warn';
    var badge = ok ? '<span class="mobi360p-badge success">Concluído</span>' : '<span class="mobi360p-badge warning">Pendente</span>';
    return '<div class="mobi360p-step ' + tone + '"><div class="mobi360p-ico"><span class="material-symbols-outlined">' + esc(icon) + '</span></div><div><strong>' + esc(label) + '</strong><small>' + esc(sub || (ok ? 'Concluído' : 'Pendente')) + '</small></div>' + badge + '</div>';
  }

  window.mproOpenPerson360 = function (id) {
    ensureCss();
    var c = byId(id);
    if (!c) return alert('Cadastro não localizado.');
    var st = statusInfo(c);
    var html = '<div class="mobi360-premium">' +
      '<div class="mobi360p-head"><div><div class="mobi360p-eyebrow"><span class="material-symbols-outlined">account_circle</span> Ficha 360</div><div class="mobi360p-title">' + esc(c.name || '-') + '</div><div class="mobi360p-sub">' + esc(c.func || '-') + ' • RM ' + esc(c.rm || '-') + ' • Obra ' + esc(c.digital_obra || c.digitalObra || '-') + '</div></div>' +
      '<div class="mobi360p-head-actions"><button class="mobi360p-btn primary" onclick="closeModal(); openEditPersonModal(' + Number(c.id) + ')"><span class="material-symbols-outlined">edit</span> Editar dados</button><button class="mobi360p-btn success" onclick="closeModal(); if(typeof marcarASO===\'function\'){marcarASO(' + Number(c.id) + ')}"><span class="material-symbols-outlined">medical_services</span> Marcar ASO</button>' + (isManager() ? '<button class="mobi360p-btn danger" onclick="excluirCadastroCompleto(' + Number(c.id) + ')"><span class="material-symbols-outlined">delete_forever</span> Excluir cadastro</button>' : '') + '<button class="mobi360p-btn ghost" onclick="closeModal()"><span class="material-symbols-outlined">close</span></button></div></div>' +
      '<div class="mobi360p-body"><div class="mobi360p-grid">' +
        '<section class="mobi360p-panel"><h4>Dados do cadastro</h4><div class="mobi360p-fields"><div class="mobi360p-avatarbox"><div class="mobi360p-avatar">' + esc(initials(c.name)) + '</div></div>' +
          field('CPF', fmtCpf(c.cpf)) + field('Telefone', fmtPhone(c.phone)) + field('Função', c.func) + field('RM', c.rm) + field('Obra', c.digital_obra || c.digitalObra) + field('Cidade/UF', [c.city, c.state].filter(Boolean).join(' / ')) + field('Recrutado', dateBR(c.recruited)) + field('ASO previsto', dateBR(c.aso_planned)) + field('ASO real', dateBR(c.aso)) + field('Admissão', dateBR(c.admitted)) + field('Treinamento fim', dateBR(c.training_end_real)) + field('Crachá emitido', dateBR(c.badge_real_date)) +
        '</div><h4 style="margin-top:16px">Documentos</h4><div class="mobi360p-docs">' + doc('RG', true) + doc('CPF', true) + doc('CNH', true) + doc('CTPS', true) + doc('Comprovante', true) + doc('Reservista', false) + '</div><div class="mobi360p-drop"><span class="material-symbols-outlined">cloud_upload</span><br><strong>Adicionar ou arrastar documentos</strong><br><small>PDF, JPG ou PNG (máx. 10MB)</small></div></section>' +
        '<section class="mobi360p-panel"><h4>Fluxo operacional</h4>' +
          step('Recrutamento', !!c.recruited, 'person_search', dateBR(c.recruited)) +
          step('Medicina / ASO', !!c.aso, 'medical_services', c.aso ? dateBR(c.aso) : 'Previsto: ' + dateBR(c.aso_planned)) +
          step('Admissão', !!c.admitted, 'how_to_reg', dateBR(c.admitted)) +
          step('Treinamentos', hasTrainingDone(c), 'school', hasTrainingDone(c) ? dateBR(c.training_end_real) : 'Treinamento pendente') +
          step('Mobilização', !!c.admitted, 'moving', c.admitted ? 'Aguardando documentos/conferência' : 'Pendente') +
          step('Crachá', !!(c.badge_real_date || c.badge_ok), 'badge', c.badge_real_date ? dateBR(c.badge_real_date) : (c.badge_posted_date ? 'Na fila de crachá' : 'Aguardando envio')) +
        '</section>' +
        '<aside class="mobi360p-panel mobi360p-actions"><h4>Ações rápidas</h4><button class="mobi360p-btn primary" onclick="closeModal(); openEditPersonModal(' + Number(c.id) + ')"><span class="material-symbols-outlined">edit_square</span><div><strong>Editar cadastro</strong><br><small>Alterar informações</small></div></button><button class="mobi360p-btn success" onclick="closeModal(); if(typeof marcarASO===\'function\'){marcarASO(' + Number(c.id) + ')}"><span class="material-symbols-outlined">medical_services</span><div><strong>Marcar ASO</strong><br><small>Agendar exame</small></div></button><button class="mobi360p-btn ghost" onclick="closeModal(); if(typeof openCandidateTrainingsModal===\'function\'){openCandidateTrainingsModal(' + Number(c.id) + ')}else{selectPage(\'treinamentos\')}"><span class="material-symbols-outlined">school</span><div><strong>Adicionar treinamento</strong><br><small>Incluir novo treinamento</small></div></button><button class="mobi360p-btn ghost" onclick="closeModal(); selectPage(\'cracha\')"><span class="material-symbols-outlined">badge</span><div><strong>Emitir crachá</strong><br><small>Enviar para fila</small></div></button><button class="mobi360p-btn ghost" onclick="alert(\'Histórico será detalhado na próxima release.\')"><span class="material-symbols-outlined">history</span><div><strong>Histórico</strong><br><small>Ver histórico completo</small></div></button>' + (isManager() ? '<button class="mobi360p-btn danger mobi360p-danger" onclick="excluirCadastroCompleto(' + Number(c.id) + ')"><span class="material-symbols-outlined">delete</span><div><strong>Excluir cadastro</strong><br><small>Excluir definitivamente</small></div></button>' : '<div class="mobi360p-note">Exclusão definitiva disponível somente para nível Gerencial.</div>') + '</aside>' +
      '</div></div><div class="mobi360p-foot"><button class="mobi360p-btn ghost" onclick="closeModal()"><span class="material-symbols-outlined">arrow_back</span> Voltar</button><button class="mobi360p-btn primary" onclick="closeModal(); openEditPersonModal(' + Number(c.id) + ')"><span class="material-symbols-outlined">save</span> Salvar alterações</button>' + (isManager() ? '<button class="mobi360p-btn danger" onclick="excluirCadastroCompleto(' + Number(c.id) + ')"><span class="material-symbols-outlined">delete</span> Excluir cadastro</button>' : '') + '</div>' +
    '</div>';
    if (typeof openModal === 'function') {
      openModal(html);
      setTimeout(setWideModal, 0);
    }
  };

  var oldCard = window.renderCandidateCard;
  if (typeof oldCard === 'function' && !oldCard.__mobiRecruitDeletePremium) {
    var patched = function (c, showTrainingPanel) {
      var html = oldCard.apply(this, arguments);
      if (!c || String(window.currentPage || currentPage || '') !== 'recrutamento') return html;
      var extra = '<div class="mobi-recruit-actions"><button onclick="openEditPersonModal(' + Number(c.id) + ')" class="btn btn-ghost w-full py-1.5 text-[10px] font-bold border border-outline-variant"><span class="material-symbols-outlined text-sm">edit</span> Editar</button><button onclick="mproOpenPerson360(' + Number(c.id) + ')" class="btn btn-ghost p-1.5 mobi-recruit-360" title="Ficha 360"><span class="material-symbols-outlined text-sm">account_circle</span></button>' + (isManager() ? '<button onclick="excluirCadastroCompleto(' + Number(c.id) + ')" class="btn btn-ghost p-1.5 mobi-recruit-delete" title="Excluir cadastro"><span class="material-symbols-outlined text-sm">delete_forever</span></button>' : '') + '</div>';
      return html.replace(/<div class="flex gap-2">[\s\S]*?<\/div>\s*<\/div>\s*$/,
        extra + '</div>');
    };
    patched.__mobiRecruitDeletePremium = true;
    window.renderCandidateCard = patched;
    try { renderCandidateCard = patched; } catch(e) {}
  }

  document.addEventListener('DOMContentLoaded', function () { ensureCss(); });

  // Ao fechar a Ficha 360, devolve o modal ao tamanho padrão dos demais formulários.
  if (typeof window.closeModal === 'function' && !window.closeModal.__mobi360FullscreenPatch) {
    var originalCloseModal = window.closeModal;
    window.closeModal = function () {
      var modal = document.getElementById('modal');
      if (modal) {
        modal.classList.remove('mobi360p-modal-active', 'max-w-none');
        modal.style.width = '';
        modal.style.maxWidth = '';
        modal.style.height = '';
        modal.style.maxHeight = '';
        modal.style.margin = '';
      }
      return originalCloseModal.apply(this, arguments);
    };
    window.closeModal.__mobi360FullscreenPatch = true;
  }

})();
