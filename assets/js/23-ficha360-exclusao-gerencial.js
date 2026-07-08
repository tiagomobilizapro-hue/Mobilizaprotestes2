// ============================================================
// MobilizaPro 1.10 - Ficha 360 operacional + exclusão gerencial
// - Não altera banco por DROP/TRUNCATE
// - Exclusão definitiva somente perfil Gerencial
// - Melhora botões da Ficha 360 e ações rápidas
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
  function arr(v) { return Array.isArray(v) ? v : []; }
  function candidates() { return arr(window.CANDIDATES || CANDIDATES); }
  function byId(id) { return candidates().find(function (c) { return Number(c.id) === Number(id); }); }
  function today() { return (typeof todayInputDate === 'function') ? todayInputDate() : new Date().toISOString().slice(0, 10); }
  function dateBR(v) {
    v = String(v || '').slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return '-';
    return v.slice(8,10) + '/' + v.slice(5,7) + '/' + v.slice(0,4);
  }
  function isManager() {
    try { if (typeof isGerencial === 'function' && isGerencial()) return true; } catch(e) {}
    var u = window.MOBI_USER || {};
    return String(u.role || u.perfil || '').toUpperCase() === 'GERENCIAL';
  }
  function statusInfo(c) {
    if (!c) return ['Sem dados', 'danger'];
    if (c.declined_date) return ['Declinado', 'danger'];
    if (c.badge_real_date || c.badge_ok) return ['Crachá emitido', 'success'];
    if (c.badge_posted_date) return ['Fila para crachá', 'primary'];
    if (c.admitted) return ['Mobilização', 'warning'];
    if (c.aso) return ['Admissão', 'warning'];
    return ['Recrutamento', 'primary'];
  }
  function hasTrainingDone(c) {
    try { if (typeof hasCompletedRequiredTrainings === 'function') return hasCompletedRequiredTrainings(c); } catch(e) {}
    return !!(c && c.training_end_real);
  }
  function progressItem(label, ok, icon, sub) {
    return '<div class="mobi360-step ' + (ok ? 'ok' : 'wait') + '">' +
      '<span class="material-symbols-outlined">' + esc(icon) + '</span>' +
      '<div><strong>' + esc(label) + '</strong><small>' + esc(sub || (ok ? 'Concluído' : 'Pendente')) + '</small></div>' +
    '</div>';
  }
  function ensureCss() {
    if (document.getElementById('mobi360-exclusao-css')) return;
    var css = document.createElement('style');
    css.id = 'mobi360-exclusao-css';
    css.textContent = `
      .mobi360-wrap{width:min(1180px,96vw);max-height:92vh;overflow:hidden;display:flex;flex-direction:column;background:linear-gradient(180deg,rgba(15,25,44,.98),rgba(7,16,30,.98));border:1px solid rgba(62,103,163,.45);border-radius:24px;box-shadow:0 30px 90px rgba(0,0,0,.55)}
      .mobi360-head{padding:22px 24px;border-bottom:1px solid rgba(62,103,163,.35);display:flex;align-items:flex-start;justify-content:space-between;gap:18px;background:linear-gradient(135deg,rgba(25,84,180,.20),transparent 55%)}
      .mobi360-title{font-size:22px;font-weight:900;letter-spacing:.02em;color:#f8fbff;text-transform:uppercase}.mobi360-sub{font-size:11px;color:#a9bad8;margin-top:6px;text-transform:uppercase;font-weight:800;letter-spacing:.08em}.mobi360-body{padding:22px;overflow:auto}.mobi360-grid{display:grid;grid-template-columns:1.05fr .95fr 280px;gap:18px}@media(max-width:1050px){.mobi360-grid{grid-template-columns:1fr}.mobi360-actions{position:static!important}}
      .mobi360-panel{border:1px solid rgba(62,103,163,.35);background:rgba(11,22,40,.78);border-radius:20px;padding:18px}.mobi360-panel h4{font-weight:900;color:#f8fbff;margin:0 0 14px;text-transform:uppercase;font-size:12px;letter-spacing:.09em}.mobi360-fields{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.mobi360-field{border:1px solid rgba(62,103,163,.28);border-radius:14px;padding:10px 12px;background:rgba(0,0,0,.13)}.mobi360-field label{display:block;font-size:9px;color:#7f96bd;text-transform:uppercase;font-weight:900;letter-spacing:.08em}.mobi360-field strong{display:block;margin-top:4px;font-size:13px;color:#eef6ff;word-break:break-word}.mobi360-pill{display:inline-flex;align-items:center;gap:6px;padding:8px 12px;border-radius:999px;border:1px solid rgba(58,132,255,.45);color:#8ebcff;background:rgba(58,132,255,.12);font-size:11px;font-weight:900;text-transform:uppercase}.mobi360-pill.success{color:#54e08b;border-color:rgba(84,224,139,.45);background:rgba(84,224,139,.10)}.mobi360-pill.warning{color:#ffd05b;border-color:rgba(255,208,91,.45);background:rgba(255,208,91,.10)}.mobi360-pill.danger{color:#ff7b7b;border-color:rgba(255,123,123,.45);background:rgba(255,123,123,.10)}
      .mobi360-step{display:flex;gap:12px;align-items:center;padding:12px;border-radius:16px;border:1px solid rgba(62,103,163,.30);background:rgba(255,255,255,.025);margin-bottom:10px}.mobi360-step span{width:34px;height:34px;border-radius:12px;display:grid;place-items:center;background:rgba(58,132,255,.16);color:#55a0ff}.mobi360-step.ok span{background:rgba(34,197,94,.16);color:#56e48a}.mobi360-step.wait span{background:rgba(245,158,11,.14);color:#ffc857}.mobi360-step strong{display:block;color:#f5f9ff;font-size:13px}.mobi360-step small{display:block;color:#92a6c7;font-size:11px;margin-top:2px}.mobi360-actions{position:sticky;top:0;align-self:start}.mobi360-actions .mobi360-btn{width:100%;justify-content:center;margin-bottom:10px}.mobi360-btn{display:inline-flex;align-items:center;gap:8px;border-radius:14px;padding:11px 14px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:.03em;border:1px solid rgba(62,103,163,.45);background:rgba(15,34,62,.85);color:#d8e8ff;transition:.15s ease;min-height:42px}.mobi360-btn:hover{transform:translateY(-1px);filter:brightness(1.08)}.mobi360-btn.primary{background:linear-gradient(135deg,#176bff,#3b82f6);border-color:rgba(77,148,255,.75);color:#fff;box-shadow:0 10px 24px rgba(37,99,235,.28)}.mobi360-btn.warn{background:linear-gradient(135deg,#a96500,#eab308);border-color:rgba(250,204,21,.55);color:#101827}.mobi360-btn.success{background:linear-gradient(135deg,#148442,#22c55e);border-color:rgba(34,197,94,.55);color:#fff}.mobi360-btn.danger{background:linear-gradient(135deg,#8b1d1d,#dc2626);border-color:rgba(248,113,113,.55);color:#fff}.mobi360-btn.ghost{background:rgba(255,255,255,.04)}.mobi360-note{font-size:11px;line-height:1.45;color:#92a6c7;border:1px dashed rgba(62,103,163,.35);border-radius:14px;padding:10px;margin-top:10px}.mobi360-danger-box{border:1px solid rgba(239,68,68,.45);background:rgba(127,29,29,.22);border-radius:16px;padding:12px;color:#fecaca;font-size:11px;line-height:1.45}.mobi360-card-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.mobi360-card-actions .mobi360-btn{padding:8px 10px;font-size:10px;min-height:34px}
    `;
    document.head.appendChild(css);
  }

  window.mproOpenPerson360 = function (id) {
    ensureCss();
    var c = byId(id);
    if (!c) return alert('Cadastro não localizado.');
    var st = statusInfo(c);
    var initials = clean(c.name || '?').split(/\s+/).slice(0,2).map(function (p) { return p.charAt(0); }).join('').toUpperCase() || '?';
    var fields = [
      ['CPF', (typeof formatCpf === 'function' ? formatCpf(c.cpf) : c.cpf) || '-'],
      ['Telefone', (typeof formatPhone === 'function' ? formatPhone(c.phone) : c.phone) || '-'],
      ['Função', c.func || '-'],
      ['RM', c.rm || '-'],
      ['Obra', c.digital_obra || c.digitalObra || '-'],
      ['Cidade/UF', [c.city, c.state].filter(Boolean).join(' / ') || '-'],
      ['Recrutado', dateBR(c.recruited)],
      ['ASO previsto', dateBR(c.aso_planned)],
      ['ASO real', dateBR(c.aso)],
      ['Admissão', dateBR(c.admitted)],
      ['Treinamento fim', dateBR(c.training_end_real)],
      ['Crachá emitido', dateBR(c.badge_real_date)]
    ];
    var html = '<div class="mobi360-wrap">' +
      '<div class="mobi360-head"><div><div class="pro-eyebrow"><span class="material-symbols-outlined text-sm">account_circle</span> Ficha 360</div><div class="mobi360-title">' + esc(c.name || '-') + '</div><div class="mobi360-sub">' + esc(c.func || '-') + ' • RM ' + esc(c.rm || '-') + ' • Obra ' + esc(c.digital_obra || c.digitalObra || '-') + '</div></div><div class="flex items-center gap-3"><span class="mobi360-pill ' + esc(st[1]) + '">' + esc(st[0]) + '</span><button onclick="closeModal()" class="mobi360-btn ghost" title="Fechar"><span class="material-symbols-outlined">close</span></button></div></div>' +
      '<div class="mobi360-body"><div class="mobi360-grid">' +
        '<section class="mobi360-panel"><div class="flex items-center gap-4 mb-4"><div class="pro-avatar" style="width:58px;height:58px;font-size:20px">' + esc(initials) + '</div><div><h4 style="margin-bottom:4px">Dados do cadastro</h4><span class="mobi360-pill ' + esc(st[1]) + '">' + esc(st[0]) + '</span></div></div><div class="mobi360-fields">' + fields.map(function (f) { return '<div class="mobi360-field"><label>' + esc(f[0]) + '</label><strong>' + esc(f[1]) + '</strong></div>'; }).join('') + '</div></section>' +
        '<section class="mobi360-panel"><h4>Fluxo operacional</h4>' +
          progressItem('Recrutamento', !!c.recruited, 'person_search', dateBR(c.recruited)) +
          progressItem('Medicina / ASO', !!c.aso, 'medical_services', c.aso ? dateBR(c.aso) : 'Necessita acompanhamento') +
          progressItem('Admissão', !!c.admitted, 'how_to_reg', dateBR(c.admitted)) +
          progressItem('Treinamentos', hasTrainingDone(c), 'school', hasTrainingDone(c) ? dateBR(c.training_end_real) : 'Treinamento pendente') +
          progressItem('Crachá', !!(c.badge_real_date || c.badge_ok), 'badge', c.badge_real_date ? dateBR(c.badge_real_date) : (c.badge_posted_date ? 'Na fila de crachá' : 'Aguardando envio')) +
        '</section>' +
        '<aside class="mobi360-panel mobi360-actions"><h4>Ações rápidas</h4>' +
          '<button class="mobi360-btn primary" onclick="closeModal(); openEditPersonModal(' + Number(c.id) + ')"><span class="material-symbols-outlined">edit_square</span> Editar dados</button>' +
          '<button class="mobi360-btn warn" onclick="closeModal(); if(typeof marcarASO===\'function\'){marcarASO(' + Number(c.id) + ')}else{alert(\'Função Marcar ASO não localizada.\')}"><span class="material-symbols-outlined">medical_services</span> Marcar ASO</button>' +
          '<button class="mobi360-btn success" onclick="closeModal(); selectPage(\'mobilizacao\')"><span class="material-symbols-outlined">moving</span> Ir para Mobilização</button>' +
          '<button class="mobi360-btn ghost" onclick="closeModal(); selectPage(\'cracha\')"><span class="material-symbols-outlined">badge</span> Ir para Crachá</button>' +
          (isManager() ? '<div class="mobi360-danger-box"><strong>Área gerencial</strong><br>Use exclusão definitiva somente para cadastro criado errado ou duplicado.</div><button class="mobi360-btn danger" onclick="excluirCadastroCompleto(' + Number(c.id) + ')"><span class="material-symbols-outlined">delete_forever</span> Excluir cadastro</button>' : '<div class="mobi360-note">Exclusão definitiva disponível somente para perfil Gerencial.</div>') +
        '</aside>' +
      '</div></div>' +
    '</div>';
    if (typeof openModal === 'function') openModal(html);
  };

  window.excluirCadastroCompleto = function (id) {
    if (!isManager()) {
      if (typeof accessDenied === 'function') return accessDenied('cadastro');
      return alert('Acesso negado. Perfil Gerencial necessário.');
    }
    var list = candidates();
    var idx = list.findIndex(function (c) { return Number(c.id) === Number(id); });
    if (idx < 0) return alert('Cadastro não localizado.');
    var c = list[idx];
    var nome = c.name || 'CADASTRO SEM NOME';
    var cpf = (typeof formatCpf === 'function' ? formatCpf(c.cpf) : c.cpf) || '-';
    var msg = 'Você está prestes a EXCLUIR DEFINITIVAMENTE:\n\n' + nome + '\nCPF: ' + cpf + '\nRM: ' + (c.rm || '-') + '\nObra: ' + (c.digital_obra || '-') + '\n\nEsta ação remove o cadastro da operação e não deve ser usada para declínio normal.';
    if (!confirm(msg)) return;
    var typed = prompt('Para confirmar, digite EXCLUIR:');
    if (typed === null) return;
    if (String(typed).trim().toUpperCase() !== 'EXCLUIR') return alert('Exclusão cancelada. Confirmação inválida.');
    var motivo = prompt('Informe o motivo da exclusão definitiva:', 'Cadastro duplicado ou lançado incorretamente');
    if (motivo === null) return;
    motivo = clean(motivo, 300);
    if (!motivo) return alert('Motivo obrigatório.');

    list.splice(idx, 1);
    try { if (typeof closeModal === 'function') closeModal(); } catch(e) {}
    try { if (typeof saveData === 'function') saveData(); } catch(e) {}
    try {
      fetch('api/store.php?action=delete_candidate_definitive', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-Mobiliza-CSRF': window.MOBI_CSRF_TOKEN || '' },
        body: JSON.stringify({ id: c.id, cpf: c.cpf || '', motivo: motivo })
      }).catch(function () {});
    } catch(e) {}
    alert('Cadastro excluído definitivamente da lista operacional.');
    try { if (typeof renderCurrentPage === 'function') renderCurrentPage(); } catch(e) {}
  };

  // Acabamento visual nos botões pequenos que já aparecem nos cards.
  function polishCardButtons() {
    ensureCss();
    document.querySelectorAll('button[title="Ficha 360"]').forEach(function (btn) {
      btn.classList.add('mobi360-btn', 'primary');
      btn.style.minHeight = '34px';
      btn.style.padding = '8px 10px';
      btn.style.fontSize = '10px';
      if (!/Ficha 360/i.test(btn.textContent || '')) btn.insertAdjacentHTML('beforeend', '<span class="ml-1">Ficha 360</span>');
    });
    document.querySelectorAll('button').forEach(function (btn) {
      if (/Marcar ASO/i.test(btn.textContent || '') && !btn.classList.contains('mobi360-btn')) {
        btn.classList.add('mobi360-btn', 'warn');
        btn.style.width = '100%';
      }
    });
  }
  var oldRender = window.renderCurrentPage;
  if (typeof oldRender === 'function') {
    window.renderCurrentPage = function () {
      var r = oldRender.apply(this, arguments);
      setTimeout(polishCardButtons, 60);
      return r;
    };
  }
  document.addEventListener('DOMContentLoaded', function () { setTimeout(polishCardButtons, 500); });
})();
