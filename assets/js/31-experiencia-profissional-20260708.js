// ============================================================
// MobilizaPRO 1.18 - Experiência profissional / Executive UI
// - Camada visual avançada para GitHub Pages/homologação visual.
// - Redesenha Dashboard, Pipeline e Medicina/ASO com filtros vivos.
// - Não altera PHP, MySQL, configuração ou persistência real.
// ============================================================
(function () {
  'use strict';

  const VERSION = '1.18';
  const STYLE_ID = 'mobi-118-executive-experience-style';
  const STATE = { statusFilter: 'TODOS' };

  const esc = (value) => (typeof escapeHtml === 'function'
    ? escapeHtml(value ?? '')
    : String(value ?? '').replace(/[&<>'"]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[s])));

  const clean = (value, max = 255) => (typeof cleanString === 'function'
    ? cleanString(value ?? '', max)
    : String(value ?? '').trim().slice(0, max));

  const n = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
/* ============================================================
   MobilizaPRO 1.18 - camada executiva premium
   ============================================================ */
:root {
  --mobi118-bg0: #020617;
  --mobi118-bg1: #07111f;
  --mobi118-bg2: #0b1628;
  --mobi118-card: rgba(11, 22, 40, .78);
  --mobi118-card2: rgba(15, 23, 42, .86);
  --mobi118-border: rgba(148, 163, 184, .18);
  --mobi118-border-strong: rgba(96, 165, 250, .32);
  --mobi118-blue: #60a5fa;
  --mobi118-cyan: #22d3ee;
  --mobi118-green: #22c55e;
  --mobi118-red: #ef4444;
  --mobi118-amber: #f59e0b;
  --mobi118-violet: #a78bfa;
}
body {
  background:
    radial-gradient(circle at 22% -18%, rgba(59,130,246,.24), transparent 34%),
    radial-gradient(circle at 82% 6%, rgba(34,211,238,.13), transparent 33%),
    linear-gradient(135deg, var(--mobi118-bg0), var(--mobi118-bg1) 48%, #020617);
}
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: .08;
  background-image: linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at 50% 18%, black, transparent 76%);
  z-index: 0;
}
main, aside, header { position: relative; z-index: 1; }
#sidebar {
  background: linear-gradient(180deg, rgba(2,6,23,.94), rgba(8,17,31,.92));
  border-right: 1px solid rgba(96,165,250,.14);
  box-shadow: 18px 0 60px rgba(0,0,0,.28);
  backdrop-filter: blur(18px);
}
#sidebar .nav-item {
  border: 1px solid transparent;
  color: rgba(226,232,240,.76);
}
#sidebar .nav-item:hover {
  background: rgba(96,165,250,.08);
  border-color: rgba(96,165,250,.18);
  color: #f8fafc;
}
#sidebar .nav-item.active {
  background: linear-gradient(135deg, rgba(37,99,235,.98), rgba(14,165,233,.74));
  color: white;
  box-shadow: 0 18px 34px rgba(37,99,235,.28), inset 0 1px 0 rgba(255,255,255,.16);
}
header {
  background: rgba(2, 6, 23, .72) !important;
  border-bottom-color: rgba(96,165,250,.16) !important;
  backdrop-filter: blur(18px);
}
.content-shell { max-width: 1560px; margin-inline: auto; }
.mpro118-page { display: flex; flex-direction: column; gap: 18px; }
.mpro118-hero,
.mpro118-card,
.mpro118-panel,
.mpro118-kpi,
.mpro118-filterbar {
  position: relative;
  border: 1px solid var(--mobi118-border);
  background: linear-gradient(180deg, rgba(15,23,42,.86), rgba(8,17,31,.76));
  box-shadow: 0 24px 70px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.05);
  backdrop-filter: blur(18px);
  overflow: hidden;
}
.mpro118-hero {
  border-radius: 28px;
  padding: clamp(22px, 3vw, 34px);
  min-height: 182px;
}
.mpro118-hero::before {
  content: "";
  position: absolute;
  inset: -35% -20% auto auto;
  width: 540px;
  height: 540px;
  background: radial-gradient(circle, rgba(96,165,250,.26), rgba(34,211,238,.09) 43%, transparent 70%);
  pointer-events: none;
}
.mpro118-hero::after {
  content: "";
  position: absolute;
  inset: auto auto -42% -16%;
  width: 380px;
  height: 380px;
  background: radial-gradient(circle, rgba(34,197,94,.12), transparent 70%);
  pointer-events: none;
}
.mpro118-hero-inner { position: relative; z-index: 2; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 18px; align-items: end; }
.mpro118-eyebrow {
  display: inline-flex; align-items: center; gap: 8px; width: fit-content;
  padding: 8px 12px; border-radius: 999px;
  border: 1px solid rgba(96,165,250,.25); background: rgba(59,130,246,.11);
  color: #93c5fd; font-size: 10px; font-weight: 950; text-transform: uppercase; letter-spacing: .11em;
}
.mpro118-hero-title {
  margin-top: 14px; font-family: Outfit, Inter, sans-serif; font-weight: 950;
  font-size: clamp(30px, 4vw, 52px); line-height: .96; letter-spacing: -.04em;
  color: #f8fafc;
}
.mpro118-hero-subtitle { margin-top: 12px; color: rgba(203,213,225,.80); max-width: 860px; line-height: 1.55; }
.mpro118-hero-actions { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 10px; }
.mpro118-chip, .mpro118-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 38px;
  border-radius: 999px; padding: 9px 13px; font-size: 11px; font-weight: 900; letter-spacing: .04em;
  color: #dbeafe; border: 1px solid rgba(96,165,250,.24); background: rgba(15,23,42,.72);
  white-space: nowrap;
}
.mpro118-btn { cursor: pointer; transition: transform .18s ease, border-color .18s ease, background .18s ease; }
.mpro118-btn:hover { transform: translateY(-1px); border-color: rgba(96,165,250,.52); background: rgba(37,99,235,.18); }
.mpro118-filterbar { border-radius: 22px; padding: 16px; }
.mpro118-filterbar-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(220px, 320px) auto; gap: 14px; align-items: end; }
.mpro118-label { display: block; color: rgba(148,163,184,.92); font-size: 10px; font-weight: 950; text-transform: uppercase; letter-spacing: .11em; margin-bottom: 7px; }
.mpro118-select, .mpro118-input, .mpro118-textarea {
  width: 100%; min-height: 42px; border-radius: 14px; border: 1px solid rgba(148,163,184,.18);
  background: rgba(2,6,23,.58); color: #e2e8f0; padding: 10px 12px; outline: none;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.04);
}
.mpro118-select:focus, .mpro118-input:focus, .mpro118-textarea:focus { border-color: rgba(96,165,250,.55); box-shadow: 0 0 0 3px rgba(59,130,246,.14); }
.mpro118-grid-kpi { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.mpro118-kpi { border-radius: 22px; padding: 17px; min-height: 150px; }
.mpro118-kpi::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 90% 12%, var(--tone-bg, rgba(96,165,250,.16)), transparent 42%); pointer-events: none; }
.mpro118-kpi > * { position: relative; z-index: 1; }
.mpro118-kpi-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.mpro118-kpi-icon { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 14px; color: var(--tone, #60a5fa); border: 1px solid color-mix(in srgb, var(--tone, #60a5fa) 46%, transparent); background: color-mix(in srgb, var(--tone, #60a5fa) 13%, transparent); }
.mpro118-kpi-value { margin-top: 18px; font-family: Outfit, Inter, sans-serif; font-size: clamp(30px, 4vw, 42px); line-height: .88; font-weight: 950; color: #f8fafc; letter-spacing: -.04em; }
.mpro118-kpi-title { margin-top: 13px; font-size: 11px; font-weight: 950; text-transform: uppercase; letter-spacing: .09em; color: rgba(248,250,252,.88); }
.mpro118-kpi-subtitle { margin-top: 5px; font-size: 12px; line-height: 1.38; color: rgba(148,163,184,.92); }
.mpro118-layout { display: grid; grid-template-columns: minmax(0, 1.36fr) minmax(340px, .84fr); gap: 18px; align-items: start; }
.mpro118-stack { display: flex; flex-direction: column; gap: 18px; }
.mpro118-card, .mpro118-panel { border-radius: 24px; padding: 20px; }
.mpro118-card-head { display:flex; justify-content: space-between; align-items:flex-start; gap: 14px; margin-bottom: 16px; }
.mpro118-title { font-family: Outfit, Inter, sans-serif; color:#f8fafc; font-weight: 900; font-size: 20px; letter-spacing: -.02em; }
.mpro118-muted { color: rgba(148,163,184,.92); font-size: 12px; line-height: 1.45; }
.mpro118-progress { height: 9px; border-radius: 999px; overflow: hidden; background: rgba(30,41,59,.82); border: 1px solid rgba(148,163,184,.12); }
.mpro118-progress span { display:block; height:100%; border-radius: inherit; background: linear-gradient(90deg, #60a5fa, #22d3ee); box-shadow: 0 0 18px rgba(34,211,238,.35); }
.mpro118-scurve-wrap { overflow-x:auto; padding-bottom: 4px; }
.mpro118-scurve { min-width: 780px; width: 100%; display:block; }
.mpro118-axis { stroke: rgba(148,163,184,.24); stroke-width: 1; }
.mpro118-gridline { stroke: rgba(148,163,184,.12); stroke-width: 1; }
.mpro118-axis-text { fill: rgba(203,213,225,.66); font-size: 11px; font-weight: 800; }
.mpro118-line { fill: none; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 7px rgba(96,165,250,.35)); }
.mpro118-line.req { stroke: #38bdf8; }
.mpro118-line.rec { stroke: #22c55e; }
.mpro118-line.mob { stroke: #a78bfa; }
.mpro118-dot.req { fill: #38bdf8; }
.mpro118-dot.rec { fill: #22c55e; }
.mpro118-dot.mob { fill: #a78bfa; }
.mpro118-mini-metrics { display:grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 14px; }
.mpro118-mini { border-radius: 16px; border:1px solid rgba(148,163,184,.14); background:rgba(2,6,23,.35); padding: 13px; }
.mpro118-mini b { display:block; color:#f8fafc; font-family: Outfit, Inter, sans-serif; font-size: 25px; line-height: 1; }
.mpro118-mini span { display:block; color:rgba(148,163,184,.92); font-size:10px; font-weight:950; text-transform:uppercase; letter-spacing:.08em; margin-bottom: 8px; }
.mpro118-table { width: 100%; border-collapse: separate; border-spacing: 0 9px; }
.mpro118-table th { padding: 0 12px 5px; color: rgba(148,163,184,.90); font-size: 10px; text-transform: uppercase; letter-spacing:.10em; font-weight: 950; text-align:left; }
.mpro118-table td { padding: 14px 12px; background: rgba(15,23,42,.54); border-top: 1px solid rgba(148,163,184,.12); border-bottom: 1px solid rgba(148,163,184,.12); color: #e2e8f0; font-size: 13px; }
.mpro118-table td:first-child { border-left: 1px solid rgba(148,163,184,.12); border-radius: 15px 0 0 15px; }
.mpro118-table td:last-child { border-right: 1px solid rgba(148,163,184,.12); border-radius: 0 15px 15px 0; }
.mpro118-queue { display: flex; flex-direction: column; gap: 10px; }
.mpro118-person-card { display:flex; gap:12px; align-items:flex-start; padding: 13px; border-radius: 17px; border:1px solid rgba(148,163,184,.14); background:rgba(2,6,23,.30); }
.mpro118-avatar { flex:0 0 auto; width: 42px; height:42px; border-radius: 999px; display:grid; place-items:center; border:1px solid rgba(96,165,250,.30); background:rgba(59,130,246,.10); color:#93c5fd; font-weight: 950; }
.mpro118-status { display:inline-flex; align-items:center; gap:6px; padding: 6px 9px; border-radius: 999px; font-size: 10px; font-weight: 950; text-transform: uppercase; letter-spacing:.06em; border:1px solid rgba(148,163,184,.16); background:rgba(15,23,42,.66); color:#cbd5e1; }
.mpro118-status.green { color:#86efac; border-color:rgba(34,197,94,.22); background:rgba(34,197,94,.09); }
.mpro118-status.red { color:#fca5a5; border-color:rgba(239,68,68,.24); background:rgba(239,68,68,.10); }
.mpro118-status.amber { color:#fcd34d; border-color:rgba(245,158,11,.24); background:rgba(245,158,11,.10); }
.mpro118-status.blue { color:#93c5fd; border-color:rgba(96,165,250,.24); background:rgba(59,130,246,.10); }
.mpro118-pipeline-grid { display:grid; grid-template-columns: minmax(0, .92fr) minmax(360px, 1.08fr); gap:18px; align-items:stretch; }
.mpro118-donut-card { min-height: 606px; }
.mpro118-donut-stage { min-height: 382px; display:grid; place-items:center; perspective: 1260px; }
.mpro118-donut-wrap { position:relative; width:min(100%, 470px); height:360px; display:grid; place-items:center; }
.mpro118-donut-shadow { position:absolute; bottom: 34px; left:50%; width: 358px; height:82px; transform: translateX(-50%); border-radius:999px; background: radial-gradient(ellipse at center, rgba(0,0,0,.66), rgba(0,0,0,.28) 52%, transparent 76%); filter: blur(6px); }
.mpro118-donut { --mobi118-gradient: conic-gradient(#22c55e 0 100%); position:absolute; top:16px; left:50%; width:348px; height:348px; transform: translateX(-50%) rotateX(54deg) rotateZ(-12deg); transform-style: preserve-3d; border-radius:999px; }
.mpro118-donut::before,
.mpro118-donut::after { content:""; position:absolute; inset:0; border-radius:999px; background:var(--mobi118-gradient); -webkit-mask: radial-gradient(circle, transparent 0 37%, #000 38.5% 100%); mask: radial-gradient(circle, transparent 0 37%, #000 38.5% 100%); }
.mpro118-donut::before { transform: translateY(52px) translateZ(-38px) scale(.985); filter: brightness(.42) saturate(1.34); box-shadow: 0 34px 48px rgba(0,0,0,.50), inset 0 -28px 46px rgba(0,0,0,.64); }
.mpro118-donut::after { transform: translateZ(16px); box-shadow: inset 0 12px 18px rgba(255,255,255,.24), inset 0 -24px 36px rgba(0,0,0,.32), 0 20px 34px rgba(0,0,0,.22); }
.mpro118-donut-gloss { position:absolute; top:30px; left:50%; width:320px; height:320px; transform: translateX(-50%) rotateX(54deg) rotateZ(-12deg) translateZ(28px); border-radius:999px; background: radial-gradient(circle at 32% 18%, rgba(255,255,255,.34), transparent 22%), linear-gradient(135deg, rgba(255,255,255,.10), transparent 52%); -webkit-mask: radial-gradient(circle, transparent 0 37%, #000 38.5% 100%); mask: radial-gradient(circle, transparent 0 37%, #000 38.5% 100%); pointer-events:none; }
.mpro118-donut-center { position:absolute; left:50%; top:45%; transform:translate(-50%,-50%); z-index:5; width:152px; height:152px; border-radius:999px; display:grid; place-items:center; text-align:center; background:radial-gradient(circle at 50% 25%, rgba(30,41,59,.98), rgba(2,6,23,.99)); border:1px solid rgba(148,163,184,.28); box-shadow: inset 0 12px 24px rgba(255,255,255,.05), 0 24px 46px rgba(0,0,0,.42); }
.mpro118-donut-center strong { display:block; color:#f8fafc; font-family: Outfit, Inter, sans-serif; font-weight:950; font-size: 3.05rem; line-height:.9; letter-spacing:-.06em; }
.mpro118-donut-center span { display:block; margin-top:8px; color:rgba(203,213,225,.72); font-size:10px; font-weight:950; letter-spacing:.12em; text-transform:uppercase; }
.mpro118-donut-legend { display:flex; justify-content:center; flex-wrap:wrap; gap: 12px 18px; color:rgba(148,163,184,.92); font-size:11px; }
.mpro118-donut-legend i { display:inline-block; width:10px; height:10px; border-radius:999px; margin-right:7px; box-shadow: 0 0 16px currentColor; }
.mpro118-aso-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 14px; }
.mpro118-aso-card { border-radius: 20px; border:1px solid rgba(148,163,184,.14); background:rgba(15,23,42,.55); padding:16px; box-shadow: inset 0 1px 0 rgba(255,255,255,.04); }
.mpro118-aso-card.is-late { border-color: rgba(239,68,68,.28); background: linear-gradient(180deg, rgba(127,29,29,.24), rgba(15,23,42,.62)); }
.mpro118-aso-fields { display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 14px; }
.mpro118-aso-justificativa { margin-top: 10px; }
.mpro118-textarea { min-height: 74px; resize: vertical; }
@media (max-width: 1280px) {
  .mpro118-grid-kpi { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .mpro118-layout, .mpro118-pipeline-grid { grid-template-columns: 1fr; }
  .mpro118-donut-card { min-height: auto; }
}
@media (max-width: 760px) {
  .mpro118-hero-inner, .mpro118-filterbar-grid { grid-template-columns: 1fr; }
  .mpro118-hero-actions { justify-content: flex-start; }
  .mpro118-grid-kpi, .mpro118-mini-metrics, .mpro118-aso-fields { grid-template-columns: 1fr; }
  .mpro118-donut-stage { min-height: 326px; }
  .mpro118-donut-wrap { height: 310px; }
  .mpro118-donut { width: 286px; height: 286px; }
  .mpro118-donut::before { transform: translateY(42px) translateZ(-30px) scale(.985); }
  .mpro118-donut-gloss { width: 264px; height:264px; }
  .mpro118-donut-center { width: 126px; height:126px; }
  .mpro118-donut-center strong { font-size: 2.35rem; }
}
`;
    document.head.appendChild(style);
  }

  function candidates(includeDeclined = true) {
    try { return (Array.isArray(window.CANDIDATES) ? window.CANDIDATES : []).filter(c => includeDeclined || !c?.declined_date); }
    catch (error) { return []; }
  }

  function solicitations() {
    try { return Array.isArray(window.SOLICITATIONS) ? window.SOLICITATIONS : []; }
    catch (error) { return []; }
  }

  function obraOf(item) {
    return clean(item?.digital_obra || item?.digitalObra || item?.obra_digital || item?.obra || '', 80).toUpperCase();
  }

  function displayObra(item) {
    return clean(item?.digital_obra || item?.digitalObra || item?.obra_digital || item?.obra || '-', 80) || '-';
  }

  function currentObra() {
    try { if (typeof PANEL_SELECTED_OBRA !== 'undefined' && clean(PANEL_SELECTED_OBRA, 80)) return clean(PANEL_SELECTED_OBRA, 80).toUpperCase(); } catch (error) {}
    try {
      if (typeof dashboardSelectedObra !== 'undefined' && typeof DASHBOARD_ALL_OBRAS !== 'undefined') {
        if (dashboardSelectedObra && dashboardSelectedObra !== DASHBOARD_ALL_OBRAS) return clean(dashboardSelectedObra, 80).toUpperCase();
      }
    } catch (error) {}
    return '';
  }

  function setObra(value) {
    const raw = clean(value || '', 80);
    try {
      if (typeof window.proSetObra === 'function') {
        window.proSetObra(raw);
        return;
      }
    } catch (error) {}
    try { PANEL_SELECTED_OBRA = raw; } catch (error) {}
    try { if (typeof renderCurrentPage === 'function') renderCurrentPage(); } catch (error) {}
  }

  function obras() {
    const set = new Set();
    solicitations().forEach(s => { const o = displayObra(s); if (o && o !== '-') set.add(o); });
    candidates(true).forEach(c => { const o = displayObra(c); if (o && o !== '-') set.add(o); });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true, sensitivity: 'base' }));
  }

  function matches(item, obra = currentObra()) {
    return !obra || obraOf(item) === obra;
  }

  function canceled(s) {
    try { if (typeof isSolicitationCanceled === 'function') return isSolicitationCanceled(s); } catch (error) {}
    const status = clean(s?.status || '', 40).toUpperCase();
    return Boolean(s?.canceled) || status === 'CANCELADA' || status === 'CANCELADO';
  }

  function trainingDone(c) {
    try { if (typeof hasCompletedRequiredTrainings === 'function') return hasCompletedRequiredTrainings(c); } catch (error) {}
    return Boolean(c?.training_end_real || c?.training_end_date);
  }

  function badgeDone(c) {
    try { if (typeof isBadgeCompleted === 'function') return isBadgeCompleted(c); } catch (error) {}
    return Boolean(c?.badge_real_date || c?.badge_issued_date || c?.badge_done);
  }

  function dateLabel(value) {
    try { if (typeof dateOrDash === 'function') return dateOrDash(value); } catch (error) {}
    return value || '-';
  }

  function parseDate(value) {
    const raw = clean(value || '', 24);
    if (!raw) return null;
    let match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
    match = raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
    if (match) return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
    const fallback = new Date(raw);
    return Number.isNaN(fallback.getTime()) ? null : fallback;
  }

  function isoToday() {
    try { if (typeof todayInputDate === 'function') return todayInputDate(); } catch (error) {}
    return new Date().toISOString().slice(0, 10);
  }

  function fmtDate(date) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }

  function addDays(base, days) {
    const d = parseDate(base);
    if (!d) return '';
    d.setDate(d.getDate() + Math.max(0, n(days)));
    return d.toISOString().slice(0, 10);
  }

  function asoDeadline(c) {
    const planned = clean(c?.aso_planned || c?.asoPrevista || '', 20);
    if (parseDate(planned)) return planned;
    return addDays(c?.recruited, 3);
  }

  function asoDelayed(c, emission) {
    const deadline = clean(asoDeadline(c), 20);
    const compare = clean(emission || c?.aso || isoToday(), 20);
    return Boolean(deadline && compare && compare > deadline && !c?.aso);
  }

  function metrics() {
    const obra = currentObra();
    const sol = solicitations().filter(s => !canceled(s) && matches(s, obra));
    const all = candidates(true).filter(c => matches(c, obra));
    const active = all.filter(c => !c.declined_date);
    const requested = sol.reduce((sum, s) => sum + Math.max(0, n(s.qty || s.quantidade || 0)), 0);
    const recruited = active.length;
    const mobilized = active.filter(c => c.admitted).length;
    const declined = all.filter(c => c.declined_date).length;
    const open = Math.max(0, requested - recruited);
    const asoPending = active.filter(c => !c.aso).length;
    const asoLate = active.filter(c => asoDelayed(c)).length;
    const admissionPending = active.filter(c => c.aso && !c.admitted).length;
    const trainingPending = active.filter(c => c.admitted && !trainingDone(c)).length;
    const badgePending = active.filter(c => (c.badge_posted_date || (c.admitted && trainingDone(c))) && !badgeDone(c)).length;
    const badgeCompleted = active.filter(badgeDone).length;
    const alojPending = active.filter(c => c.alojado && (String(c.alojamento_realizado || 'NAO').toUpperCase() !== 'SIM' || !clean(c.alojamento_responsavel || '', 120))).length;
    const coverage = requested ? Math.min(100, Math.round((mobilized / requested) * 100)) : 0;
    const recruitmentCoverage = requested ? Math.min(100, Math.round((recruited / requested) * 100)) : 0;
    return { obra, sol, all, active, requested, recruited, mobilized, declined, open, asoPending, asoLate, admissionPending, trainingPending, badgePending, badgeCompleted, alojPending, coverage, recruitmentCoverage };
  }

  function stageOf(c) {
    if (c?.declined_date) return 'Declinado';
    if (badgeDone(c)) return 'Liberado';
    if (c?.badge_posted_date || (c?.admitted && trainingDone(c))) return 'Aguardando crachá';
    if (c?.admitted) return trainingDone(c) ? 'Treinamento OK' : 'Em treinamento';
    if (c?.aso) return 'Admissão pendente';
    if (asoDelayed(c)) return 'ASO atrasado';
    return 'ASO pendente';
  }

  function statusClass(label) {
    const raw = clean(label, 40).toUpperCase();
    if (raw.includes('LIBERADO') || raw.includes('OK') || raw.includes('CONCLU')) return 'green';
    if (raw.includes('ATRAS') || raw.includes('DECLIN')) return 'red';
    if (raw.includes('PENDENTE') || raw.includes('AGUARD')) return 'amber';
    return 'blue';
  }

  function initials(name) {
    return clean(name || '?', 80).split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase() || '?';
  }

  function toneStyle(tone) {
    const map = { blue: '#60a5fa', cyan: '#22d3ee', green: '#22c55e', red: '#ef4444', amber: '#f59e0b', violet: '#a78bfa' };
    const color = map[tone] || map.blue;
    return `--tone:${color};--tone-bg:color-mix(in srgb, ${color} 18%, transparent)`;
  }

  function hero({ eyebrow, icon, title, subtitle, chips = [] }) {
    return `<section class="mpro118-hero">
      <div class="mpro118-hero-inner">
        <div>
          <div class="mpro118-eyebrow"><span class="material-symbols-outlined text-sm">${esc(icon || 'auto_awesome')}</span>${esc(eyebrow || 'MobilizaPRO')}</div>
          <h3 class="mpro118-hero-title">${esc(title)}</h3>
          <p class="mpro118-hero-subtitle">${esc(subtitle)}</p>
        </div>
        <div class="mpro118-hero-actions">${chips.map(chip => `<span class="mpro118-chip"><span class="material-symbols-outlined text-sm">${esc(chip.icon || 'info')}</span>${esc(chip.label)}</span>`).join('')}</div>
      </div>
    </section>`;
  }

  function obraFilter(label = 'Análise por obra', help = 'Todos os gráficos e cards desta tela recalculam conforme o filtro ativo.') {
    const selected = currentObra();
    return `<section class="mpro118-filterbar">
      <div class="mpro118-filterbar-grid">
        <div>
          <span class="mpro118-label">Filtro operacional</span>
          <h4 class="mpro118-title">${esc(label)}</h4>
          <p class="mpro118-muted mt-1">${esc(help)}</p>
        </div>
        <label>
          <span class="mpro118-label">Obra</span>
          <select class="mpro118-select" onchange="MobiPro118.setObra(this.value)">
            <option value="">Todas as obras</option>
            ${obras().map(o => `<option value="${esc(o)}" ${selected === o.toUpperCase() ? 'selected' : ''}>${esc(o)}</option>`).join('')}
          </select>
        </label>
        <button class="mpro118-btn" onclick="MobiPro118.setObra('')"><span class="material-symbols-outlined text-sm">filter_alt_off</span>Limpar</button>
      </div>
    </section>`;
  }

  function kpi({ title, value, subtitle, icon, tone = 'blue', page = '' }) {
    const attrs = page ? ` onclick="MobiPro118.go('${esc(page)}')" role="button" tabindex="0"` : '';
    return `<article class="mpro118-kpi" style="${toneStyle(tone)}"${attrs}>
      <div class="mpro118-kpi-top">
        <div class="mpro118-kpi-icon"><span class="material-symbols-outlined">${esc(icon)}</span></div>
        ${page ? '<span class="material-symbols-outlined text-muted text-base">north_east</span>' : ''}
      </div>
      <div class="mpro118-kpi-value">${esc(value)}</div>
      <div class="mpro118-kpi-title">${esc(title)}</div>
      <p class="mpro118-kpi-subtitle">${esc(subtitle)}</p>
    </article>`;
  }

  function curveRows() {
    const obra = currentObra();
    const events = new Map();
    const today = parseDate(isoToday()) || new Date();
    function key(date) { return date.toISOString().slice(0, 10); }
    function add(dateValue, field, amount) {
      const d = parseDate(dateValue) || today;
      const k = key(d);
      if (!events.has(k)) events.set(k, { date: d, solicitadas: 0, recrutados: 0, mobilizados: 0 });
      events.get(k)[field] += amount;
    }
    solicitations().filter(s => !canceled(s) && matches(s, obra)).forEach(s => add(s.date, 'solicitadas', Math.max(0, n(s.qty || 0))));
    candidates(true).filter(c => !c.declined_date && matches(c, obra)).forEach(c => {
      if (c.recruited) add(c.recruited, 'recrutados', 1);
      if (c.admitted) add(c.admitted, 'mobilizados', 1);
    });
    add(today, 'solicitadas', 0);
    const rows = Array.from(events.values()).sort((a, b) => a.date - b.date);
    let solicitadas = 0; let recrutados = 0; let mobilizados = 0;
    return rows.map(row => {
      solicitadas += row.solicitadas;
      recrutados += row.recrutados;
      mobilizados += row.mobilizados;
      return { date: row.date, solicitadas, recrutados, mobilizados };
    });
  }

  function linePath(rows, field, minTime, maxTime, maxValue, width, height, pad) {
    const safeRange = Math.max(maxTime - minTime, 86400000);
    return rows.map((row, index) => {
      const x = pad.left + ((row.date.getTime() - minTime) / safeRange) * (width - pad.left - pad.right);
      const y = pad.top + (height - pad.top - pad.bottom) - ((row[field] || 0) / maxValue) * (height - pad.top - pad.bottom);
      return `${index ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  }

  function scurveCard() {
    const rows = curveRows();
    const m = metrics();
    const width = 1040; const height = 330; const pad = { left: 56, right: 28, top: 28, bottom: 46 };
    const maxValue = Math.max(...rows.flatMap(r => [r.solicitadas, r.recrutados, r.mobilizados]), 1);
    const times = rows.map(r => r.date.getTime());
    const minTime = Math.min(...times); const maxTime = Math.max(...times);
    const labels = rows.filter((_, i) => i === 0 || i === rows.length - 1 || i % Math.ceil(Math.max(rows.length, 1) / 5) === 0).slice(0, 7);
    return `<section class="mpro118-card">
      <div class="mpro118-card-head">
        <div><h4 class="mpro118-title">Curva S executiva</h4><p class="mpro118-muted">Solicitações, recrutados e mobilizados acumulados no filtro selecionado.</p></div>
        <span class="mpro118-chip"><span class="material-symbols-outlined text-sm">domain</span>${esc(m.obra || 'Todas as obras')}</span>
      </div>
      <div class="mpro118-mini-metrics">
        <div class="mpro118-mini"><span>Solicitações</span><b>${m.requested}</b></div>
        <div class="mpro118-mini"><span>Recrutados</span><b>${m.recruited}</b></div>
        <div class="mpro118-mini"><span>Mobilizados</span><b>${m.mobilized}</b></div>
      </div>
      ${rows.length ? `<div class="mpro118-scurve-wrap"><svg class="mpro118-scurve" viewBox="0 0 ${width} ${height}" role="img" aria-label="Curva S executiva">
        <defs><linearGradient id="mpro118Bg" x1="0" x2="1"><stop offset="0" stop-color="rgba(15,23,42,.28)"/><stop offset="1" stop-color="rgba(30,41,59,.20)"/></linearGradient></defs>
        <rect x="0" y="0" width="${width}" height="${height}" rx="24" fill="url(#mpro118Bg)" stroke="rgba(148,163,184,.14)"/>
        ${[0,.25,.5,.75,1].map(r => {
          const y = pad.top + (height - pad.top - pad.bottom) - r * (height - pad.top - pad.bottom);
          return `<line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" class="mpro118-gridline"/><text x="${pad.left - 12}" y="${y + 4}" text-anchor="end" class="mpro118-axis-text">${Math.round(r * maxValue)}</text>`;
        }).join('')}
        <line x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}" class="mpro118-axis"/>
        ${labels.map(row => {
          const safe = Math.max(maxTime - minTime, 86400000);
          const x = pad.left + ((row.date.getTime() - minTime) / safe) * (width - pad.left - pad.right);
          return `<text x="${x.toFixed(1)}" y="${height - 20}" text-anchor="middle" class="mpro118-axis-text">${esc(fmtDate(row.date))}</text>`;
        }).join('')}
        <path d="${linePath(rows, 'solicitadas', minTime, maxTime, maxValue, width, height, pad)}" class="mpro118-line req"/>
        <path d="${linePath(rows, 'recrutados', minTime, maxTime, maxValue, width, height, pad)}" class="mpro118-line rec"/>
        <path d="${linePath(rows, 'mobilizados', minTime, maxTime, maxValue, width, height, pad)}" class="mpro118-line mob"/>
      </svg></div>` : `<div class="empty-state rounded-2xl p-8 text-center text-muted">Sem dados para montar a Curva S.</div>`}
    </section>`;
  }

  function coverageCard() {
    const obraRows = obras().map(obra => {
      const requested = solicitations().filter(s => !canceled(s) && obraOf(s) === obra.toUpperCase()).reduce((sum, s) => sum + Math.max(0, n(s.qty || 0)), 0);
      const active = candidates(true).filter(c => !c.declined_date && obraOf(c) === obra.toUpperCase()).length;
      const mob = candidates(true).filter(c => !c.declined_date && c.admitted && obraOf(c) === obra.toUpperCase()).length;
      const pct = requested ? Math.min(100, Math.round((mob / requested) * 100)) : 0;
      return { obra, requested, active, mob, pct };
    });
    return `<section class="mpro118-card">
      <div class="mpro118-card-head"><div><h4 class="mpro118-title">Cobertura por obra</h4><p class="mpro118-muted">Clique em uma obra para filtrar todo o painel.</p></div><span class="mpro118-chip">${obraRows.length} obra(s)</span></div>
      <div class="overflow-x-auto"><table class="mpro118-table min-w-[620px]"><thead><tr><th>Obra</th><th>Solicitadas</th><th>Recrutados</th><th>Mobilizados</th><th>Cobertura</th></tr></thead><tbody>
        ${obraRows.map(row => `<tr onclick="MobiPro118.setObra('${esc(row.obra)}')" style="cursor:pointer"><td><b>${esc(row.obra)}</b></td><td>${row.requested}</td><td>${row.active}</td><td>${row.mob}</td><td><div class="flex items-center gap-3"><div class="mpro118-progress flex-1"><span style="width:${row.pct}%"></span></div><b class="font-mono text-primary">${row.pct}%</b></div></td></tr>`).join('')}
      </tbody></table></div>
    </section>`;
  }

  function actionCenter() {
    const list = metrics().active
      .filter(c => !badgeDone(c) || !c.aso || !c.admitted || (c.alojado && (String(c.alojamento_realizado || 'NAO').toUpperCase() !== 'SIM' || !clean(c.alojamento_responsavel || '', 120))))
      .sort((a, b) => stageOf(a).localeCompare(stageOf(b), 'pt-BR') || clean(a.name).localeCompare(clean(b.name), 'pt-BR'))
      .slice(0, 7);
    return `<section class="mpro118-card">
      <div class="mpro118-card-head"><div><h4 class="mpro118-title">Central de ação</h4><p class="mpro118-muted">Pendências priorizadas no filtro ativo.</p></div><span class="mpro118-chip"><span class="material-symbols-outlined text-sm">priority_high</span>${list.length} item(ns)</span></div>
      <div class="mpro118-queue">${list.length ? list.map(c => `<button class="mpro118-person-card text-left" onclick="MobiPro118.go('${stageOf(c).includes('crachá') ? 'cracha' : stageOf(c).includes('treinamento') ? 'mobilizacao' : 'recrutamento'}')">
        <div class="mpro118-avatar">${esc(initials(c.name))}</div>
        <div class="min-w-0 flex-1"><div class="flex justify-between gap-3"><div><b class="text-on-surface">${esc(c.name || '-')}</b><p class="mpro118-muted truncate">${esc(c.func || '-')} • ${esc(displayObra(c))}</p></div><span class="mpro118-status ${statusClass(stageOf(c))}">${esc(stageOf(c))}</span></div></div>
      </button>`).join('') : `<div class="empty-state rounded-2xl p-8 text-center text-muted">Nenhuma pendência para o filtro selecionado.</div>`}</div>
    </section>`;
  }

  function funnelCard() {
    const m = metrics();
    const rows = [
      ['Solicitadas', m.requested, 'assignment_add', 'blue'],
      ['Recrutados', m.recruited, 'person_search', 'green'],
      ['ASO concluído', m.active.filter(c => c.aso).length, 'medical_services', 'cyan'],
      ['Admitidos', m.mobilized, 'how_to_reg', 'violet'],
      ['Crachá emitido', m.badgeCompleted, 'badge', 'green']
    ];
    const max = Math.max(...rows.map(r => r[1]), 1);
    return `<section class="mpro118-card">
      <div class="mpro118-card-head"><div><h4 class="mpro118-title">Funil operacional</h4><p class="mpro118-muted">Conversão do pedido até liberação final.</p></div><span class="mpro118-chip">${m.coverage}% mobilizado</span></div>
      <div class="space-y-3">${rows.map(([label, value, icon, tone]) => `<div class="mpro118-person-card">
        <div class="mpro118-avatar" style="color:var(--mobi118-${tone});border-color:color-mix(in srgb,var(--mobi118-${tone}) 32%,transparent);background:color-mix(in srgb,var(--mobi118-${tone}) 10%,transparent)"><span class="material-symbols-outlined text-base">${icon}</span></div>
        <div class="flex-1 min-w-0"><div class="flex items-center justify-between gap-3"><b>${esc(label)}</b><span class="font-mono font-black text-primary">${value}</span></div><div class="mpro118-progress mt-2"><span style="width:${Math.min(100, Math.round((value / max) * 100))}%"></span></div></div>
      </div>`).join('')}</div>
    </section>`;
  }

  function renderDashboard118() {
    injectStyle();
    const el = document.getElementById('page-dashboard');
    if (!el) return;
    const m = metrics();
    el.innerHTML = `<div class="mpro118-page animate-up">
      ${hero({
        eyebrow: 'Command Center', icon: 'monitoring', title: 'Painel executivo MobilizaPRO',
        subtitle: 'Visão de controle para acompanhar solicitações, gargalos, Curva S e avanço da mobilização em um único painel.',
        chips: [
          { icon: 'domain', label: m.obra || 'Todas as obras' },
          { icon: 'sync', label: 'Filtros vivos' },
          { icon: 'database', label: location.hostname.includes('github.io') ? 'Dados demo' : 'MySQL' }
        ]
      })}
      ${obraFilter('Painel por obra', 'O mesmo filtro alimenta os KPIs, Curva S, funil e cobertura.')}
      <section class="mpro118-grid-kpi">
        ${kpi({ title: 'Solicitadas', value: m.requested, subtitle: 'Total de vagas abertas por RM.', icon: 'assignment_add', tone: 'blue', page: 'solicitacao' })}
        ${kpi({ title: 'Recrutados', value: m.recruited, subtitle: `${m.recruitmentCoverage}% das vagas solicitadas.`, icon: 'person_search', tone: 'green', page: 'recrutamento' })}
        ${kpi({ title: 'Mobilizados', value: m.mobilized, subtitle: `${m.coverage}% de cobertura operacional.`, icon: 'how_to_reg', tone: 'violet', page: 'mobilizacao' })}
        ${kpi({ title: 'Atenções', value: m.asoLate + m.alojPending + m.badgePending, subtitle: 'ASO, alojamento ou crachá com pendência.', icon: 'release_alert', tone: (m.asoLate + m.alojPending + m.badgePending) ? 'amber' : 'green', page: 'pipeline' })}
      </section>
      <div class="mpro118-layout">
        <div class="mpro118-stack">${scurveCard()}${coverageCard()}</div>
        <div class="mpro118-stack">${funnelCard()}${actionCenter()}</div>
      </div>
    </div>`;
    try { updateAlertIcon?.(); applyPermissionLock?.(); } catch (error) {}
  }

  function pipelineGradient(m) {
    if (!m.requested) return 'conic-gradient(#334155 0 100%)';
    const declinedPct = Math.min(100, Math.round((m.declined / m.requested) * 100));
    const greenPct = Math.max(0, 100 - declinedPct);
    return `conic-gradient(from -96deg, #22c55e 0 ${greenPct}%, #ef4444 ${greenPct}% 100%)`;
  }

  function pipelineChart(m) {
    const pct = m.requested ? Math.min(100, Math.round((m.declined / m.requested) * 100)) : 0;
    const activeRequested = Math.max(0, m.requested - m.declined);
    return `<section class="mpro118-card mpro118-donut-card">
      <div class="mpro118-card-head"><div><h4 class="mpro118-title">Vagas Solicitadas x Declinadas</h4><p class="mpro118-muted">Rosca 3D com cálculo vivo pelo filtro ativo.</p></div><span class="mpro118-chip">${m.requested} vaga(s)</span></div>
      <div class="mpro118-donut-stage">
        <div class="mpro118-donut-wrap">
          <div class="mpro118-donut-shadow"></div>
          <div class="mpro118-donut" style="--mobi118-gradient:${pipelineGradient(m)}"></div>
          <div class="mpro118-donut-gloss"></div>
          <div class="mpro118-donut-center"><div><strong>${pct}%</strong><span>Declinadas</span></div></div>
        </div>
      </div>
      <div class="mpro118-donut-legend"><span><i style="background:#22c55e;color:#22c55e"></i>Vagas sem declínio</span><span><i style="background:#ef4444;color:#ef4444"></i>Vagas declinadas</span></div>
      <div class="mpro118-mini-metrics mt-5">
        <div class="mpro118-mini"><span>Solicitadas</span><b class="text-green-400">${m.requested}</b><p class="mpro118-muted mt-2">${activeRequested} sem declínio</p></div>
        <div class="mpro118-mini"><span>Declinadas</span><b class="text-red-400">${m.declined}</b><p class="mpro118-muted mt-2">${pct}% das solicitadas</p></div>
        <div class="mpro118-mini"><span>Filtro</span><b style="font-size:20px">${esc(m.obra || 'Todas')}</b><p class="mpro118-muted mt-2">Atualização automática</p></div>
      </div>
    </section>`;
  }

  function recruiterCards() {
    const rows = metrics().all.slice().sort((a, b) => clean(b.recruited || '').localeCompare(clean(a.recruited || ''))).slice(0, 6);
    return `<section class="mpro118-card">
      <div class="mpro118-card-head"><div><h4 class="mpro118-title">Cards de recrutamento</h4><p class="mpro118-muted">Responsável, status e RM no filtro selecionado.</p></div><span class="mpro118-chip">${rows.length} registros</span></div>
      <div class="mpro118-queue">${rows.map(c => { const stage = stageOf(c); return `<div class="mpro118-person-card">
        <div class="mpro118-avatar">${esc(initials(c.name))}</div>
        <div class="min-w-0 flex-1">
          <div class="flex justify-between gap-3"><div><b>${esc(c.name || '-')}</b><p class="mpro118-muted truncate">${esc(c.func || '-')} • RM-${esc(c.rm || '-')}</p></div><span class="mpro118-status ${statusClass(stage)}">${esc(stage)}</span></div>
          <p class="text-xs mt-2 text-primary font-bold">Recrutador: ${esc(clean(c.recruiter_name || c.recruited_by_name || 'NÃO REGISTRADO', 120).toUpperCase())}</p>
        </div>
      </div>`; }).join('') || `<div class="empty-state rounded-2xl p-8 text-center text-muted">Sem candidatos no filtro selecionado.</div>`}</div>
    </section>`;
  }

  function leadtimeRows() {
    let stats = [];
    try { if (typeof proLeadtimeStatsFiltered === 'function') stats = proLeadtimeStatsFiltered(); } catch (error) {}
    if (!Array.isArray(stats) || !stats.length) return '';
    const max = Math.max(...stats.map(s => n(s.avg)), 1);
    return `<section class="mpro118-card">
      <div class="mpro118-card-head"><div><h4 class="mpro118-title">Leadtime por etapa</h4><p class="mpro118-muted">Média, mínimo e máximo do ciclo operacional.</p></div><span class="mpro118-chip">dias</span></div>
      <div class="space-y-3">${stats.map(s => `<div>
        <div class="flex justify-between gap-3 text-sm"><b>${esc(s.label)}</b><span class="font-mono text-primary font-black">${esc(s.avg)}d</span></div>
        <div class="mpro118-progress mt-2"><span style="width:${Math.min(100, Math.round((n(s.avg) / max) * 100))}%"></span></div>
        <p class="mpro118-muted mt-1">${esc((s.samples || []).length)} registro(s) • mín. ${esc(s.min)}d • máx. ${esc(s.max)}d</p>
      </div>`).join('')}</div>
    </section>`;
  }

  function renderPipeline118() {
    injectStyle();
    const el = document.getElementById('page-pipeline');
    if (!el) return;
    const m = metrics();
    el.innerHTML = `<div class="mpro118-page animate-up">
      ${hero({
        eyebrow: 'Pipeline premium', icon: 'account_tree', title: 'Pipeline de mobilização',
        subtitle: 'Análise visual de vagas solicitadas, declínios, conversão por etapa, leadtime e responsáveis pelo recrutamento.',
        chips: [
          { icon: 'domain', label: m.obra || 'Todas as obras' },
          { icon: 'check_circle', label: `${m.mobilized} mobilizado(s)` },
          { icon: 'block', label: `${m.declined} declinado(s)` }
        ]
      })}
      ${obraFilter('Pipeline por obra', 'Altere a obra para recalcular gráfico 3D, responsáveis, leadtime e funil.')}
      <section class="mpro118-grid-kpi">
        ${kpi({ title: 'Vagas abertas', value: m.open, subtitle: 'Solicitadas menos recrutados ativos.', icon: 'inventory_2', tone: m.open ? 'amber' : 'green', page: 'vagas' })}
        ${kpi({ title: 'ASO pendente', value: m.asoPending, subtitle: `${m.asoLate} com alerta de prazo.`, icon: 'medical_services', tone: m.asoLate ? 'red' : 'cyan', page: 'medicina' })}
        ${kpi({ title: 'Treinamento', value: m.trainingPending, subtitle: 'Admitidos sem todos os requisitos.', icon: 'school', tone: m.trainingPending ? 'amber' : 'green', page: 'mobilizacao' })}
        ${kpi({ title: 'Crachá pendente', value: m.badgePending, subtitle: 'Liberáveis aguardando conclusão.', icon: 'badge', tone: m.badgePending ? 'amber' : 'green', page: 'cracha' })}
      </section>
      <div class="mpro118-pipeline-grid">${pipelineChart(m)}<div class="mpro118-stack">${recruiterCards()}${funnelCard()}</div></div>
      ${leadtimeRows()}
    </div>`;
    try { updateAlertIcon?.(); applyPermissionLock?.(); } catch (error) {}
  }

  function setAsoField(id, field, value) {
    const c = candidates(true).find(x => Number(x.id) === Number(id));
    if (!c) return;
    c[field] = clean(value || '', field === 'aso_delay_reason' ? 500 : 40);
    if (field === 'aso_marcado_em') { c.aso_marcado = true; c.aso_status = 'PENDENTE'; }
    if (field === 'aso') { c.aso_status = c.aso ? 'CONCLUIDO' : 'PENDENTE'; c.aso_alerta = !c.aso; }
    try { if (typeof saveData === 'function') saveData(); } catch (error) {}
  }

  function asoRows() {
    const obra = currentObra();
    let rows = candidates(false).filter(c => matches(c, obra) && (c.aso_marcado || c.aso_alerta || c.aso_marcado_em || c.aso_planned || c.aso || !c.admitted));
    if (STATE.statusFilter === 'PENDENTES') rows = rows.filter(c => !c.aso);
    if (STATE.statusFilter === 'ATRASADOS') rows = rows.filter(c => asoDelayed(c));
    if (STATE.statusFilter === 'CONCLUIDOS') rows = rows.filter(c => Boolean(c.aso));
    return rows.sort((a, b) => Number(asoDelayed(b)) - Number(asoDelayed(a)) || clean(a.name).localeCompare(clean(b.name), 'pt-BR'));
  }

  function setAsoStatusFilter(value) {
    STATE.statusFilter = clean(value || 'TODOS', 40).toUpperCase();
    renderMedicina118();
  }

  function renderMedicina118() {
    injectStyle();
    const el = document.getElementById('page-medicina');
    if (!el) return;
    const allRows = candidates(false).filter(c => matches(c, currentObra()) && (c.aso_marcado || c.aso_alerta || c.aso_marcado_em || c.aso_planned || c.aso || !c.admitted));
    const rows = asoRows();
    const pending = allRows.filter(c => !c.aso).length;
    const late = allRows.filter(c => asoDelayed(c)).length;
    const done = allRows.filter(c => c.aso).length;
    el.innerHTML = `<div class="mpro118-page animate-up">
      ${hero({ eyebrow: 'Saúde ocupacional', icon: 'medical_services', title: 'Medicina / ASO', subtitle: 'Controle profissional de marcação, prazo matriz, emissão e justificativa de atraso.', chips: [{ icon: 'domain', label: currentObra() || 'Todas as obras' }, { icon: 'schedule', label: `${pending} pendente(s)` }, { icon: 'warning', label: `${late} atrasado(s)` }] })}
      <section class="mpro118-filterbar"><div class="mpro118-filterbar-grid">
        <div><span class="mpro118-label">Controle ASO</span><h4 class="mpro118-title">Filtro de atendimento</h4><p class="mpro118-muted mt-1">A lista respeita obra e status. A justificativa permanece dentro do card.</p></div>
        <label><span class="mpro118-label">Obra</span><select class="mpro118-select" onchange="MobiPro118.setObra(this.value)"><option value="">Todas as obras</option>${obras().map(o => `<option value="${esc(o)}" ${currentObra() === o.toUpperCase() ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></label>
        <label><span class="mpro118-label">Status</span><select class="mpro118-select" onchange="MobiPro118.setAsoStatusFilter(this.value)">${['TODOS','PENDENTES','ATRASADOS','CONCLUIDOS'].map(s => `<option value="${s}" ${STATE.statusFilter === s ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
      </div></section>
      <section class="mpro118-grid-kpi">
        ${kpi({ title: 'Pendentes', value: pending, subtitle: 'ASO ainda sem emissão.', icon: 'pending_actions', tone: pending ? 'amber' : 'green' })}
        ${kpi({ title: 'Atrasados', value: late, subtitle: 'Prazo matriz vencido.', icon: 'release_alert', tone: late ? 'red' : 'green' })}
        ${kpi({ title: 'Concluídos', value: done, subtitle: 'ASO emitido no fluxo.', icon: 'task_alt', tone: 'green' })}
        ${kpi({ title: 'Registros', value: rows.length, subtitle: 'Itens exibidos no filtro.', icon: 'list_alt', tone: 'blue' })}
      </section>
      <section class="mpro118-aso-grid">
        ${rows.map(c => { const delayed = asoDelayed(c); const reason = clean(c.aso_delay_reason || '', 500); return `<article class="mpro118-aso-card ${delayed ? 'is-late' : ''}">
          <div class="flex justify-between gap-3"><div class="min-w-0"><h4 class="font-display font-black text-lg text-on-surface truncate">${esc(c.name || '-')}</h4><p class="mpro118-muted">${esc(c.func || '-')} • RM-${esc(c.rm || '-')} • ${esc(displayObra(c))}</p></div><span class="mpro118-status ${c.aso ? 'green' : delayed ? 'red' : 'amber'}">${c.aso ? 'Concluído' : delayed ? 'Atrasado' : 'Pendente'}</span></div>
          <div class="mpro118-aso-fields">
            <label><span class="mpro118-label">Marcação ASO</span><input type="date" class="mpro118-input" value="${esc(c.aso_marcado_em || '')}" onchange="MobiPro118.setAsoField(${Number(c.id)}, 'aso_marcado_em', this.value)"></label>
            <label><span class="mpro118-label">Prazo matriz</span><input class="mpro118-input" value="${esc(dateLabel(asoDeadline(c)))}" readonly></label>
            <label><span class="mpro118-label">Emissão ASO</span><input type="date" class="mpro118-input" value="${esc(c.aso || '')}" onchange="MobiPro118.setAsoField(${Number(c.id)}, 'aso', this.value); MobiPro118.refreshMedicina();"></label>
            <label><span class="mpro118-label">Recrutador</span><input class="mpro118-input" value="${esc(clean(c.recruiter_name || c.recruited_by_name || 'NÃO REGISTRADO', 120).toUpperCase())}" readonly></label>
          </div>
          <label class="mpro118-aso-justificativa"><span class="mpro118-label">Justificativa ${delayed && !reason ? 'obrigatória' : ''}</span><textarea class="mpro118-textarea ${delayed && !reason ? 'border-error' : ''}" placeholder="${delayed ? 'Informe a justificativa do atraso' : 'Sem atraso'}" onchange="MobiPro118.setAsoField(${Number(c.id)}, 'aso_delay_reason', this.value)">${esc(reason)}</textarea></label>
          ${delayed && !reason ? '<p class="text-[10px] text-red-300 font-black uppercase tracking-widest mt-2">Atrasado conforme prazo da matriz: justificativa obrigatória.</p>' : ''}
        </article>`; }).join('') || `<div class="mpro118-card text-center text-muted">Nenhum ASO encontrado no filtro selecionado.</div>`}
      </section>
    </div>`;
  }

  function go(page) {
    try { if (typeof selectPage === 'function') selectPage(page); return; } catch (error) {}
  }

  function install() {
    injectStyle();
    window.MobiPro118 = Object.assign(window.MobiPro118 || {}, {
      version: VERSION,
      setObra,
      go,
      setAsoField,
      setAsoStatusFilter,
      refreshMedicina: renderMedicina118,
      metrics,
      renderDashboard: renderDashboard118,
      renderPipeline: renderPipeline118,
      renderMedicina: renderMedicina118
    });

    window.renderDashboard = renderDashboard118;
    window.renderPipeline = renderPipeline118;
    window.renderMedicina = renderMedicina118;
    try { renderDashboard = window.renderDashboard; } catch (error) {}
    try { renderPipeline = window.renderPipeline; } catch (error) {}
    try { renderMedicina = window.renderMedicina; } catch (error) {}

    const previousRenderCurrentPage = window.renderCurrentPage;
    if (typeof previousRenderCurrentPage === 'function' && !window.__mobi118RenderWrapDone) {
      window.__mobi118RenderWrapDone = true;
      window.renderCurrentPage = function () {
        try {
          if (typeof currentPage !== 'undefined') {
            if (currentPage === 'dashboard') return renderDashboard118();
            if (currentPage === 'pipeline') return renderPipeline118();
            if (currentPage === 'medicina') return renderMedicina118();
          }
        } catch (error) {}
        return previousRenderCurrentPage.apply(this, arguments);
      };
      try { renderCurrentPage = window.renderCurrentPage; } catch (error) {}
    }

    setTimeout(function () {
      try {
        if (typeof currentPage !== 'undefined') {
          if (currentPage === 'dashboard') renderDashboard118();
          if (currentPage === 'pipeline') renderPipeline118();
          if (currentPage === 'medicina') renderMedicina118();
        }
      } catch (error) {}
    }, 0);
  }

  install();
})();
