// ============================================================
// MobilizaPro 1.13 - Ajuste visual Hostinger 2026-07-08
// - Medicina / ASO: justificativa contida na tabela, sem estouro de margem.
// - Pipeline: gráfico 3D de vagas solicitadas x vagas declinadas.
// ============================================================
(function () {
  'use strict';

  const clean = (value, max = 255) => (typeof cleanString === 'function'
    ? cleanString(value, max)
    : String(value ?? '').trim().slice(0, max));

  const esc = (value) => (typeof escapeHtml === 'function'
    ? escapeHtml(value ?? '')
    : String(value ?? '').replace(/[&<>'"]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[s])));

  function injectVisualStyles() {
    if (document.getElementById('mobi-visual-hostinger-20260708-style')) return;
    const style = document.createElement('style');
    style.id = 'mobi-visual-hostinger-20260708-style';
    style.textContent = `
/* ============================================================
   MobilizaPro 1.13 - Ajustes visuais sem sobreposição
   ============================================================ */
.mobi-pipeline-3d-card {
  position: relative;
  overflow: hidden;
}
.mobi-pipeline-3d-card::before {
  content: "";
  position: absolute;
  inset: -90px -80px auto auto;
  width: 240px;
  height: 240px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(34,197,94,.14), transparent 62%);
  pointer-events: none;
}
.mobi-pipeline-3d-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}
.mobi-pipeline-3d-title {
  flex: 1 1 260px;
  min-width: 0;
}
.mobi-pipeline-3d-title h4,
.mobi-pipeline-3d-title p {
  overflow-wrap: anywhere;
}
.mobi-pipeline-3d-badge {
  flex: 0 0 auto;
  white-space: nowrap;
}
.mobi-pipeline-3d-stage {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 278px;
  padding: 10px 0 4px;
  perspective: 1000px;
}
.mobi-3d-donut-wrap {
  position: relative;
  width: min(100%, 296px);
  height: 258px;
  display: grid;
  place-items: center;
}
.mobi-3d-donut-shadow {
  position: absolute;
  left: 50%;
  bottom: 6px;
  width: 230px;
  height: 54px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,.62), rgba(0,0,0,.28) 44%, transparent 72%);
  filter: blur(2px);
}
.mobi-3d-donut {
  --mobi-donut-gradient: conic-gradient(#22c55e 0 100%);
  position: absolute;
  top: 22px;
  left: 50%;
  width: 226px;
  height: 226px;
  transform: translateX(-50%) rotateX(58deg) rotateZ(-8deg);
  transform-style: preserve-3d;
  border-radius: 999px;
}
.mobi-3d-donut::before,
.mobi-3d-donut::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: var(--mobi-donut-gradient);
  -webkit-mask: radial-gradient(circle, transparent 0 42%, #000 43% 100%);
  mask: radial-gradient(circle, transparent 0 42%, #000 43% 100%);
}
.mobi-3d-donut::before {
  transform: translateY(32px) translateZ(-22px) scale(.985);
  filter: brightness(.47) saturate(1.14);
  box-shadow: 0 18px 36px rgba(0,0,0,.44), inset 0 -18px 30px rgba(0,0,0,.46);
}
.mobi-3d-donut::after {
  transform: translateZ(8px);
  box-shadow: inset 0 7px 10px rgba(255,255,255,.26), inset 0 -16px 24px rgba(0,0,0,.28), 0 10px 24px rgba(0,0,0,.22);
}
.mobi-3d-donut-highlight {
  position: absolute;
  top: 28px;
  left: 50%;
  width: 214px;
  height: 214px;
  transform: translateX(-50%) rotateX(58deg) rotateZ(-8deg) translateZ(14px);
  border-radius: 999px;
  background: radial-gradient(circle at 34% 20%, rgba(255,255,255,.22), transparent 30%);
  -webkit-mask: radial-gradient(circle, transparent 0 42%, #000 43% 100%);
  mask: radial-gradient(circle, transparent 0 42%, #000 43% 100%);
  pointer-events: none;
}
.mobi-3d-donut-label {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 118px;
  height: 118px;
  transform: translate(-50%, -52%);
  border-radius: 999px;
  display: grid;
  place-items: center;
  text-align: center;
  background: radial-gradient(circle at 50% 35%, rgba(30,41,59,.98), rgba(8,17,31,.98));
  border: 1px solid rgba(148,163,184,.26);
  box-shadow: inset 0 10px 20px rgba(255,255,255,.05), 0 16px 34px rgba(0,0,0,.32);
  z-index: 3;
}
.mobi-pipeline-3d-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin-top: 2px;
  font-size: 10px;
  color: rgb(148 163 184);
}
.mobi-pipeline-3d-legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
.mobi-pipeline-3d-legend i {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  display: inline-block;
}
.mobi-pipeline-3d-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}
.mobi-pipeline-3d-stat {
  min-width: 0;
  border-radius: 16px;
  padding: 15px;
  overflow: hidden;
}
.mobi-pipeline-3d-stat p,
.mobi-pipeline-3d-stat div {
  overflow-wrap: anywhere;
}
@media (max-width: 720px) {
  .mobi-pipeline-3d-stage { min-height: 238px; }
  .mobi-3d-donut-wrap { height: 228px; }
  .mobi-3d-donut { width: 194px; height: 194px; }
  .mobi-3d-donut::before { transform: translateY(28px) translateZ(-18px) scale(.985); }
  .mobi-3d-donut-label { width: 104px; height: 104px; }
  .mobi-pipeline-3d-stats { grid-template-columns: 1fr; }
}
#page-medicina .card.table-scroll,
#page-medicina .table-scroll {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: visible;
}
#page-medicina table {
  table-layout: fixed;
  min-width: 1240px !important;
  width: 100%;
}
#page-medicina th,
#page-medicina td {
  vertical-align: top;
  min-width: 0;
}
#page-medicina th:nth-child(1), #page-medicina td:nth-child(1) { width: 190px; }
#page-medicina th:nth-child(2), #page-medicina td:nth-child(2) { width: 125px; }
#page-medicina th:nth-child(3), #page-medicina td:nth-child(3) { width: 92px; }
#page-medicina th:nth-child(4), #page-medicina td:nth-child(4) { width: 82px; }
#page-medicina th:nth-child(5), #page-medicina td:nth-child(5) { width: 168px; }
#page-medicina th:nth-child(6), #page-medicina td:nth-child(6) { width: 130px; }
#page-medicina th:nth-child(7), #page-medicina td:nth-child(7) { width: 168px; }
#page-medicina th:nth-child(8), #page-medicina td:nth-child(8) { width: 220px; max-width: 220px; }
#page-medicina th:nth-child(9), #page-medicina td:nth-child(9) { width: 115px; }
#page-medicina td:nth-child(8) {
  overflow: hidden;
}
#page-medicina td:nth-child(8) .modal-input,
#page-medicina td:nth-child(8) textarea,
#page-medicina td:nth-child(8) input {
  display: block;
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0 !important;
  box-sizing: border-box;
}
#page-medicina td:nth-child(8) textarea {
  min-height: 64px;
  resize: vertical;
}
#page-medicina td:nth-child(8) p {
  white-space: normal;
  overflow-wrap: anywhere;
}
#page-medicina td:nth-child(5) .modal-input,
#page-medicina td:nth-child(7) .modal-input {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0 !important;
}
#page-medicina .badge {
  max-width: 100%;
  white-space: normal;
  text-align: center;
}
`;
    document.head.appendChild(style);
  }

  injectVisualStyles();

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
    const activePct = requested ? Math.max(0, 100 - declinedPct) : 0;
    return { requested, declined, activeRequested, declinedPct, activePct };
  }

  window.renderPipelinePieChart = function () {
    const m = pipelineVacancyDeclineMetrics();
    const gradient = m.requested
      ? `conic-gradient(#22c55e 0 ${m.activePct}%, #ef4444 ${m.activePct}% 100%)`
      : 'conic-gradient(#334155 0 100%)';

    return `<div class="pro-glass mobi-pipeline-3d-card rounded-2xl p-5">
      <div class="mobi-pipeline-3d-header">
        <div class="mobi-pipeline-3d-title">
          <h4 class="font-display font-bold text-lg text-on-surface leading-tight">Vagas Solicitadas x Vagas Declinadas</h4>
          <p class="text-xs text-muted mt-1">Cálculo por quantidade de vagas solicitadas na RM e vagas declinadas no filtro selecionado.</p>
        </div>
        <span class="pro-pill mobi-pipeline-3d-badge">${m.requested} vaga(s)</span>
      </div>
      <div class="mobi-pipeline-3d-stage" aria-label="Gráfico 3D de vagas solicitadas e vagas declinadas">
        <div class="mobi-3d-donut-wrap">
          <div class="mobi-3d-donut-shadow"></div>
          <div class="mobi-3d-donut" style="--mobi-donut-gradient:${gradient};"></div>
          <div class="mobi-3d-donut-highlight"></div>
          <div class="mobi-3d-donut-label">
            <div>
              <div class="text-4xl font-display font-black text-on-surface leading-none">${m.declinedPct}%</div>
              <div class="text-[10px] font-bold uppercase tracking-widest text-muted mt-2">Declinadas</div>
            </div>
          </div>
        </div>
      </div>
      <div class="mobi-pipeline-3d-legend">
        <span><i style="background:#22c55e"></i>Vagas sem declínio</span>
        <span><i style="background:#ef4444"></i>Vagas declinadas</span>
      </div>
      <div class="mobi-pipeline-3d-stats">
        <div class="mobi-pipeline-3d-stat border border-green-500/20 bg-green-500/10">
          <p class="text-[10px] uppercase font-black tracking-widest text-green-300">Vagas solicitadas</p>
          <div class="text-3xl font-display font-black text-green-400 mt-1">${m.requested}</div>
          <p class="text-[10px] text-muted mt-1">${m.activeRequested} sem declínio</p>
        </div>
        <div class="mobi-pipeline-3d-stat border border-red-500/20 bg-red-500/10">
          <p class="text-[10px] uppercase font-black tracking-widest text-red-300">Vagas declinadas</p>
          <div class="text-3xl font-display font-black text-red-400 mt-1">${m.declined}</div>
          <p class="text-[10px] text-muted mt-1">${m.declinedPct}% das solicitadas</p>
        </div>
      </div>
    </div>`;
  };

  try { renderPipelinePieChart = window.renderPipelinePieChart; } catch (error) {}

  const previousRenderMedicina = window.renderMedicina;
  if (typeof previousRenderMedicina === 'function') {
    window.renderMedicina = function () {
      injectVisualStyles();
      const result = previousRenderMedicina.apply(this, arguments);
      const table = document.querySelector('#page-medicina table');
      if (table) table.classList.add('mobi-aso-safe-table');
      return result;
    };
    try { renderMedicina = window.renderMedicina; } catch (error) {}
  }

  document.addEventListener('DOMContentLoaded', injectVisualStyles);
})();
