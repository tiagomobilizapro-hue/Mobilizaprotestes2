// ============================================================
// MobilizaPRO 1.17 - Revisão gráficos + filtros 2026-07-08
// - Pipeline: rosca 3D premium, menos achatada e com mais profundidade.
// - Gráficos novos passam a recalcular explicitamente conforme filtro de Obra.
// - Camada incremental; não altera PHP, MySQL ou dados de produção.
// ============================================================
(function () {
  'use strict';

  const STYLE_ID = 'mobi-117-graficos-filtros-style';

  const esc = (value) => (typeof escapeHtml === 'function'
    ? escapeHtml(value ?? '')
    : String(value ?? '').replace(/[&<>'"]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[s])));

  const clean = (value, max = 255) => (typeof cleanString === 'function'
    ? cleanString(value, max)
    : String(value ?? '').trim().slice(0, max));

  const number = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  };

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
/* ============================================================
   MobilizaPRO 1.17 - Gráficos filtráveis e rosca 3D premium
   ============================================================ */
.mobi117-pipeline-card {
  position: relative;
  overflow: hidden;
  min-height: 100%;
}
.mobi117-pipeline-card::before {
  content: "";
  position: absolute;
  inset: -120px -100px auto auto;
  width: 320px;
  height: 320px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(34,197,94,.18), rgba(34,197,94,.04) 42%, transparent 68%);
  pointer-events: none;
}
.mobi117-pipeline-card::after {
  content: "";
  position: absolute;
  inset: auto auto -130px -120px;
  width: 300px;
  height: 300px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(239,68,68,.11), transparent 68%);
  pointer-events: none;
}
.mobi117-pipeline-head {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.mobi117-pipeline-head-main {
  flex: 1 1 280px;
  min-width: 0;
}
.mobi117-pipeline-head-main h4,
.mobi117-pipeline-head-main p {
  overflow-wrap: anywhere;
}
.mobi117-pipeline-badges {
  flex: 0 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  max-width: 100%;
}
.mobi117-filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid rgba(96,165,250,.30);
  background: rgba(59,130,246,.10);
  color: rgb(147,197,253);
  padding: 7px 10px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: .08em;
  white-space: nowrap;
}
.mobi117-stage {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  min-height: 350px;
  padding: 8px 0 2px;
  perspective: 1150px;
}
.mobi117-donut-wrap {
  position: relative;
  width: min(100%, 430px);
  height: 330px;
  display: grid;
  place-items: center;
  transform: translateZ(0);
}
.mobi117-ground-shadow {
  position: absolute;
  left: 50%;
  bottom: 25px;
  width: 330px;
  height: 74px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: radial-gradient(ellipse at center, rgba(0,0,0,.66), rgba(0,0,0,.32) 48%, transparent 76%);
  filter: blur(4px);
  opacity: .92;
}
.mobi117-donut {
  --mobi117-gradient: conic-gradient(#22c55e 0 100%);
  position: absolute;
  top: 14px;
  left: 50%;
  width: 322px;
  height: 322px;
  transform: translateX(-50%) rotateX(49deg) rotateZ(-7deg);
  transform-style: preserve-3d;
  border-radius: 999px;
  isolation: isolate;
}
.mobi117-donut::before,
.mobi117-donut::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: var(--mobi117-gradient);
  -webkit-mask: radial-gradient(circle, transparent 0 38%, #000 39.25% 100%);
  mask: radial-gradient(circle, transparent 0 38%, #000 39.25% 100%);
}
.mobi117-donut::before {
  transform: translateY(44px) translateZ(-34px) scale(.985);
  filter: brightness(.44) saturate(1.22);
  box-shadow: 0 28px 44px rgba(0,0,0,.48), inset 0 -24px 38px rgba(0,0,0,.54);
}
.mobi117-donut::after {
  transform: translateZ(12px);
  box-shadow: inset 0 10px 16px rgba(255,255,255,.24), inset 0 -22px 34px rgba(0,0,0,.30), 0 18px 32px rgba(0,0,0,.20);
}
.mobi117-donut-bevel {
  position: absolute;
  top: 21px;
  left: 50%;
  width: 304px;
  height: 304px;
  transform: translateX(-50%) rotateX(49deg) rotateZ(-7deg) translateZ(22px);
  border-radius: 999px;
  background: radial-gradient(circle at 34% 19%, rgba(255,255,255,.28), transparent 24%),
              radial-gradient(circle at 50% 78%, rgba(0,0,0,.20), transparent 44%);
  -webkit-mask: radial-gradient(circle, transparent 0 38%, #000 39.25% 100%);
  mask: radial-gradient(circle, transparent 0 38%, #000 39.25% 100%);
  pointer-events: none;
}
.mobi117-donut-hole-shadow {
  position: absolute;
  left: 50%;
  top: 43%;
  width: 172px;
  height: 112px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  background: radial-gradient(ellipse at center, rgba(3,7,18,.86), rgba(15,23,42,.48) 52%, transparent 70%);
  filter: blur(.2px);
  z-index: 3;
  pointer-events: none;
}
.mobi117-donut-label {
  position: absolute;
  left: 50%;
  top: 45%;
  width: 136px;
  height: 136px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  display: grid;
  place-items: center;
  text-align: center;
  background: radial-gradient(circle at 50% 31%, rgba(30,41,59,.98), rgba(2,6,23,.99));
  border: 1px solid rgba(148,163,184,.27);
  box-shadow: inset 0 12px 24px rgba(255,255,255,.05), 0 20px 42px rgba(0,0,0,.38);
  z-index: 4;
}
.mobi117-donut-label strong {
  display: block;
  color: rgb(248,250,252);
  font-size: clamp(2.35rem, 4vw, 3.25rem);
  line-height: .9;
  font-family: var(--font-display, inherit);
  font-weight: 950;
}
.mobi117-donut-label span {
  display: block;
  margin-top: 8px;
  color: rgb(148,163,184);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.mobi117-legend {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-top: -4px;
  color: rgb(148,163,184);
  font-size: 11px;
}
.mobi117-legend span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  white-space: nowrap;
}
.mobi117-legend i {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  box-shadow: 0 0 14px currentColor;
}
.mobi117-stats {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}
.mobi117-stat {
  min-width: 0;
  border-radius: 18px;
  padding: 17px;
  overflow: hidden;
}
.mobi117-stat * { overflow-wrap: anywhere; }
.mobi117-filter-note {
  position: relative;
  z-index: 2;
  margin-top: 12px;
  color: rgb(148,163,184);
  font-size: 11px;
  line-height: 1.45;
}
@media (max-width: 760px) {
  .mobi117-stage { min-height: 296px; }
  .mobi117-donut-wrap { height: 286px; }
  .mobi117-donut { width: 260px; height: 260px; top: 16px; }
  .mobi117-donut::before { transform: translateY(36px) translateZ(-28px) scale(.985); }
  .mobi117-donut-bevel { width: 246px; height: 246px; top: 22px; }
  .mobi117-ground-shadow { width: 260px; bottom: 30px; }
  .mobi117-donut-label { width: 118px; height: 118px; }
  .mobi117-stats { grid-template-columns: 1fr; }
  .mobi117-pipeline-badges { justify-content: flex-start; }
}
`;
    document.head.appendChild(style);
  }

  function entityObra(entity) {
    return clean(entity?.digital_obra || entity?.digitalObra || entity?.obra_digital || entity?.obra || '', 80).toUpperCase();
  }

  function currentObraFilter() {
    try {
      if (typeof PANEL_SELECTED_OBRA !== 'undefined' && clean(PANEL_SELECTED_OBRA, 80)) {
        return clean(PANEL_SELECTED_OBRA, 80).toUpperCase();
      }
    } catch (error) {}

    try {
      if (typeof dashboardSelectedObra !== 'undefined' && typeof DASHBOARD_ALL_OBRAS !== 'undefined') {
        if (dashboardSelectedObra && dashboardSelectedObra !== DASHBOARD_ALL_OBRAS) {
          return clean(dashboardSelectedObra, 80).toUpperCase();
        }
      }
    } catch (error) {}

    const proSelect = document.querySelector('select[onchange*="proSetObra"]');
    if (proSelect && clean(proSelect.value, 80)) return clean(proSelect.value, 80).toUpperCase();

    const dashboardSelect = document.getElementById('dashboard-obra-filter');
    if (dashboardSelect && clean(dashboardSelect.value, 80) && !/TODAS|ALL/i.test(dashboardSelect.value)) {
      return clean(dashboardSelect.value, 80).toUpperCase();
    }

    return '';
  }

  function matchesObra(entity, obra) {
    return !obra || entityObra(entity) === obra;
  }

  function isCanceled(solicitation) {
    if (typeof isSolicitationCanceled === 'function') return isSolicitationCanceled(solicitation);
    const status = clean(solicitation?.status || '', 40).toUpperCase();
    return Boolean(solicitation?.canceled) || status === 'CANCELADA' || status === 'CANCELADO';
  }

  function pipelineMetrics() {
    const obra = currentObraFilter();
    const solicitations = Array.isArray(window.SOLICITATIONS) ? window.SOLICITATIONS : [];
    const candidates = Array.isArray(window.CANDIDATES) ? window.CANDIDATES : [];

    const requested = solicitations
      .filter(s => !isCanceled(s) && matchesObra(s, obra))
      .reduce((sum, s) => sum + Math.max(0, number(s.qty || s.quantidade || 0)), 0);

    const declined = candidates
      .filter(c => c && c.declined_date && matchesObra(c, obra))
      .length;

    const activeRequested = Math.max(0, requested - declined);
    const declinedPct = requested ? Math.min(100, Math.round((declined / requested) * 100)) : 0;
    const greenPct = requested ? Math.max(0, 100 - declinedPct) : 0;
    const labelObra = obra || 'Todas as obras';

    return { obra, labelObra, requested, declined, activeRequested, declinedPct, greenPct };
  }

  function gradientFor(m) {
    if (!m.requested) return 'conic-gradient(#334155 0 100%)';
    return `conic-gradient(from -96deg, #22c55e 0 ${m.greenPct}%, #ef4444 ${m.greenPct}% 100%)`;
  }

  function renderPipelinePieChart117() {
    injectStyle();
    const m = pipelineMetrics();
    const gradient = gradientFor(m);

    return `<div class="pro-glass mobi117-pipeline-card rounded-2xl p-5 sm:p-6" data-mobi-chart="pipeline-vagas-declinadas" data-mobi-filter-obra="${esc(m.labelObra)}">
      <div class="mobi117-pipeline-head">
        <div class="mobi117-pipeline-head-main">
          <h4 class="font-display font-bold text-lg text-on-surface leading-tight">Vagas Solicitadas x Vagas Declinadas</h4>
          <p class="text-xs text-muted mt-1">Cálculo por quantidade de vagas solicitadas na RM e vagas declinadas no filtro selecionado.</p>
        </div>
        <div class="mobi117-pipeline-badges">
          <span class="mobi117-filter-chip"><span class="material-symbols-outlined text-sm">filter_alt</span>${esc(m.labelObra)}</span>
          <span class="pro-pill">${m.requested} vaga(s)</span>
        </div>
      </div>

      <div class="mobi117-stage" aria-label="Gráfico 3D de vagas solicitadas e vagas declinadas">
        <div class="mobi117-donut-wrap">
          <div class="mobi117-ground-shadow"></div>
          <div class="mobi117-donut" style="--mobi117-gradient:${gradient};"></div>
          <div class="mobi117-donut-bevel"></div>
          <div class="mobi117-donut-hole-shadow"></div>
          <div class="mobi117-donut-label">
            <div><strong>${m.declinedPct}%</strong><span>Declinadas</span></div>
          </div>
        </div>
      </div>

      <div class="mobi117-legend">
        <span><i style="background:#22c55e;color:#22c55e"></i>Vagas sem declínio</span>
        <span><i style="background:#ef4444;color:#ef4444"></i>Vagas declinadas</span>
      </div>

      <div class="mobi117-stats">
        <div class="mobi117-stat border border-green-500/25 bg-green-500/10">
          <p class="text-[10px] uppercase font-black tracking-widest text-green-300">Vagas solicitadas</p>
          <div class="text-4xl font-display font-black text-green-400 mt-1 leading-none">${m.requested}</div>
          <p class="text-[10px] text-muted mt-2">${m.activeRequested} sem declínio no filtro</p>
        </div>
        <div class="mobi117-stat border border-red-500/25 bg-red-500/10">
          <p class="text-[10px] uppercase font-black tracking-widest text-red-300">Vagas declinadas</p>
          <div class="text-4xl font-display font-black text-red-400 mt-1 leading-none">${m.declined}</div>
          <p class="text-[10px] text-muted mt-2">${m.declinedPct}% das solicitadas no filtro</p>
        </div>
      </div>

      <p class="mobi117-filter-note">Este gráfico recalcula automaticamente quando o filtro de obra da tela é alterado. Dados cancelados não entram no total solicitado.</p>
    </div>`;
  }

  window.renderPipelinePieChart = renderPipelinePieChart117;
  try { renderPipelinePieChart = window.renderPipelinePieChart; } catch (error) {}

  function scheduleGraphRefresh(reason) {
    window.clearTimeout(window.__mobi117GraphRefreshTimer);
    window.__mobi117GraphRefreshTimer = window.setTimeout(function () {
      try {
        injectStyle();
        if (typeof currentPage !== 'undefined' && currentPage === 'pipeline' && typeof renderPipeline === 'function') {
          renderPipeline();
          return;
        }
        if (typeof currentPage !== 'undefined' && currentPage === 'dashboard' && typeof renderDashboard === 'function') {
          renderDashboard();
        }
      } catch (error) {
        console.warn('MobilizaPRO: falha ao atualizar gráficos filtráveis.', reason || '', error);
      }
    }, 70);
  }

  function wrapFilterFunctions() {
    if (window.__mobi117FilterWrapDone) return;
    window.__mobi117FilterWrapDone = true;

    const previousProSetObra = (typeof window.proSetObra === 'function')
      ? window.proSetObra
      : (typeof proSetObra === 'function' ? proSetObra : null);
    if (previousProSetObra) {
      window.proSetObra = function () {
        const result = previousProSetObra.apply(this, arguments);
        scheduleGraphRefresh('proSetObra');
        return result;
      };
      try { proSetObra = window.proSetObra; } catch (error) {}
    }

    const previousDashboardSetObra = (typeof window.setDashboardObraFilter === 'function')
      ? window.setDashboardObraFilter
      : (typeof setDashboardObraFilter === 'function' ? setDashboardObraFilter : null);
    if (previousDashboardSetObra) {
      window.setDashboardObraFilter = function () {
        const result = previousDashboardSetObra.apply(this, arguments);
        scheduleGraphRefresh('setDashboardObraFilter');
        return result;
      };
      try { setDashboardObraFilter = window.setDashboardObraFilter; } catch (error) {}
    }
  }

  document.addEventListener('change', function (event) {
    const target = event.target;
    if (!target || !target.matches) return;
    if (target.matches('select[onchange*="proSetObra"], select#dashboard-obra-filter')) {
      scheduleGraphRefresh('filter-change');
    }
  }, true);

  window.MobilizaProGraphFilters = {
    version: '1.17',
    currentObraFilter,
    pipelineMetrics,
    refresh: function () { scheduleGraphRefresh('manual'); }
  };

  injectStyle();
  wrapFilterFunctions();
  setTimeout(function () {
    wrapFilterFunctions();
    try {
      if (typeof currentPage !== 'undefined' && currentPage === 'pipeline') scheduleGraphRefresh('initial');
    } catch (error) {}
  }, 0);
})();
