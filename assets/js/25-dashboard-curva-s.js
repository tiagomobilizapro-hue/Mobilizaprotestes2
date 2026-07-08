// ============================================================
// MobilizaPRO - Dashboard Curva S
// Adiciona acompanhamento acumulado de Solicitações x Recrutados x Mobilizados
// sem alterar a renderização principal do painel executivo.
// ============================================================
(function () {
    'use strict';

    const STYLE_ID = 'mobilizapro-dashboard-s-curve-style';
    const CARD_ID = 'dashboard-s-curve-card';
    const SVG_WIDTH = 1000;
    const SVG_HEIGHT = 330;
    const PAD = { left: 56, right: 28, top: 24, bottom: 46 };
    const ONE_DAY = 24 * 60 * 60 * 1000;

    function sCurveEscape(value) {
        if (typeof escapeHtml === 'function') return escapeHtml(value);
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function sCurveNumber(value) {
        const n = Number(value);
        return Number.isFinite(n) ? n : 0;
    }

    function sCurveStartOfDay(date) {
        if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function sCurveParseDate(value) {
        if (!value) return null;
        if (value instanceof Date) return sCurveStartOfDay(value);
        const raw = String(value).trim();
        if (!raw) return null;

        let match = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (match) return sCurveStartOfDay(new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])));

        match = raw.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{4})$/);
        if (match) return sCurveStartOfDay(new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1])));

        const fallback = new Date(raw);
        return Number.isNaN(fallback.getTime()) ? null : sCurveStartOfDay(fallback);
    }

    function sCurveDateKey(date) {
        const d = sCurveStartOfDay(date);
        if (!d) return '';
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    function sCurveFormatDate(date, withYear = false) {
        const d = sCurveStartOfDay(date);
        if (!d) return '-';
        return d.toLocaleDateString('pt-BR', withYear ? { day: '2-digit', month: '2-digit', year: 'numeric' } : { day: '2-digit', month: '2-digit' });
    }

    function sCurveToday() {
        if (typeof todayInputDate === 'function') {
            const parsed = sCurveParseDate(todayInputDate());
            if (parsed) return parsed;
        }
        return sCurveStartOfDay(new Date());
    }

    function sCurveObra(entity) {
        return String(entity?.digital_obra || entity?.digitalObra || entity?.obra_digital || entity?.obra || '').trim();
    }

    function sCurveCurrentObra() {
        try {
            if (typeof PANEL_SELECTED_OBRA !== 'undefined') return String(PANEL_SELECTED_OBRA || '').trim();
        } catch (err) {}
        try {
            if (typeof dashboardSelectedObra !== 'undefined' && typeof DASHBOARD_ALL_OBRAS !== 'undefined') {
                return dashboardSelectedObra === DASHBOARD_ALL_OBRAS ? '' : String(dashboardSelectedObra || '').trim();
            }
        } catch (err) {}
        return '';
    }

    function sCurveMatchesCurrentObra(entity, selectedObra) {
        return !selectedObra || sCurveObra(entity) === selectedObra;
    }

    function sCurveIsCanceled(solicitation) {
        if (typeof isSolicitationCanceled === 'function') return isSolicitationCanceled(solicitation);
        return Boolean(solicitation?.canceled) || String(solicitation?.status || '').trim().toUpperCase() === 'CANCELADA';
    }

    function sCurveIsDeclined(candidate) {
        return Boolean(candidate?.declined_date);
    }

    function sCurveAddEvent(map, date, field, amount) {
        const normalized = sCurveStartOfDay(date) || sCurveToday();
        const key = sCurveDateKey(normalized);
        if (!key) return;
        if (!map.has(key)) map.set(key, { key, date: normalized, solicitadas: 0, recrutados: 0, mobilizados: 0 });
        map.get(key)[field] += amount;
    }

    function sCurveBuildData() {
        const selectedObra = sCurveCurrentObra();
        const eventMap = new Map();
        const today = sCurveToday();
        let invalidDates = 0;

        const solicitations = Array.isArray(SOLICITATIONS)
            ? SOLICITATIONS.filter(s => !sCurveIsCanceled(s) && sCurveMatchesCurrentObra(s, selectedObra))
            : [];
        const candidates = Array.isArray(CANDIDATES)
            ? CANDIDATES.filter(c => !sCurveIsDeclined(c) && sCurveMatchesCurrentObra(c, selectedObra))
            : [];

        solicitations.forEach(s => {
            const parsedDate = sCurveParseDate(s.date);
            if (!parsedDate) invalidDates += 1;
            sCurveAddEvent(eventMap, parsedDate || today, 'solicitadas', sCurveNumber(s.qty || 0));
        });

        candidates.forEach(c => {
            const recruitedDate = sCurveParseDate(c.recruited);
            if (recruitedDate) sCurveAddEvent(eventMap, recruitedDate, 'recrutados', 1);
            else invalidDates += 1;

            const mobilizedDate = sCurveParseDate(c.admitted);
            if (mobilizedDate) sCurveAddEvent(eventMap, mobilizedDate, 'mobilizados', 1);
        });

        sCurveAddEvent(eventMap, today, 'solicitadas', 0);
        sCurveAddEvent(eventMap, today, 'recrutados', 0);
        sCurveAddEvent(eventMap, today, 'mobilizados', 0);

        const eventRows = Array.from(eventMap.values()).sort((a, b) => a.date - b.date);
        const rows = [];
        let solicitadas = 0;
        let recrutados = 0;
        let mobilizados = 0;

        eventRows.forEach(event => {
            solicitadas += event.solicitadas;
            recrutados += event.recrutados;
            mobilizados += event.mobilizados;
            rows.push({
                key: event.key,
                date: event.date,
                solicitadas,
                recrutados,
                mobilizados
            });
        });

        const totals = rows.length
            ? rows[rows.length - 1]
            : { solicitadas: 0, recrutados: 0, mobilizados: 0 };

        return {
            selectedObra,
            rows,
            invalidDates,
            totals: {
                solicitadas: totals.solicitadas || 0,
                recrutados: totals.recrutados || 0,
                mobilizados: totals.mobilizados || 0
            },
            coverageRecruitment: totals.solicitadas ? Math.min(100, Math.round((totals.recrutados / totals.solicitadas) * 100)) : 0,
            coverageMobilization: totals.solicitadas ? Math.min(100, Math.round((totals.mobilizados / totals.solicitadas) * 100)) : 0
        };
    }

    function sCurvePath(rows, field, minTime, maxTime, maxValue) {
        if (!rows.length) return '';
        const plotW = SVG_WIDTH - PAD.left - PAD.right;
        const plotH = SVG_HEIGHT - PAD.top - PAD.bottom;
        const safeRange = Math.max(maxTime - minTime, ONE_DAY);

        return rows.map((row, index) => {
            const x = PAD.left + ((row.date.getTime() - minTime) / safeRange) * plotW;
            const y = PAD.top + plotH - ((row[field] || 0) / maxValue) * plotH;
            return `${index ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`;
        }).join(' ');
    }

    function sCurvePoint(rows, field, minTime, maxTime, maxValue) {
        if (!rows.length) return { x: PAD.left, y: SVG_HEIGHT - PAD.bottom };
        const row = rows[rows.length - 1];
        const plotW = SVG_WIDTH - PAD.left - PAD.right;
        const plotH = SVG_HEIGHT - PAD.top - PAD.bottom;
        const safeRange = Math.max(maxTime - minTime, ONE_DAY);
        return {
            x: PAD.left + ((row.date.getTime() - minTime) / safeRange) * plotW,
            y: PAD.top + plotH - ((row[field] || 0) / maxValue) * plotH
        };
    }

    function sCurveAxisLabels(rows) {
        if (!rows.length) return [];
        const maxLabels = 6;
        const step = Math.max(1, Math.ceil(rows.length / maxLabels));
        const labels = rows.filter((_, index) => index % step === 0);
        const last = rows[rows.length - 1];
        if (!labels.some(row => row.key === last.key)) labels.push(last);
        return labels;
    }

    function sCurveRenderSvg(data) {
        const rows = data.rows;
        if (!rows.length || Math.max(data.totals.solicitadas, data.totals.recrutados, data.totals.mobilizados) === 0) {
            return `<div class="empty-state rounded-2xl p-8 text-center text-muted">Sem dados suficientes para formar a Curva S no filtro selecionado.</div>`;
        }

        const allTimes = rows.map(row => row.date.getTime());
        let minTime = Math.min(...allTimes);
        let maxTime = Math.max(...allTimes);
        if (minTime === maxTime) {
            minTime -= ONE_DAY;
            maxTime += ONE_DAY;
        }
        const maxValue = Math.max(data.totals.solicitadas, data.totals.recrutados, data.totals.mobilizados, 1);
        const gridLines = [0, 0.25, 0.5, 0.75, 1].map(ratio => {
            const plotH = SVG_HEIGHT - PAD.top - PAD.bottom;
            const y = PAD.top + plotH - ratio * plotH;
            const value = Math.round(ratio * maxValue);
            return { y, value };
        });
        const xLabels = sCurveAxisLabels(rows);
        const plotW = SVG_WIDTH - PAD.left - PAD.right;
        const plotH = SVG_HEIGHT - PAD.top - PAD.bottom;
        const safeRange = Math.max(maxTime - minTime, ONE_DAY);
        const lastSolicitadas = sCurvePoint(rows, 'solicitadas', minTime, maxTime, maxValue);
        const lastRecrutados = sCurvePoint(rows, 'recrutados', minTime, maxTime, maxValue);
        const lastMobilizados = sCurvePoint(rows, 'mobilizados', minTime, maxTime, maxValue);

        return `
            <div class="dashboard-s-curve-scroll">
                <svg class="dashboard-s-curve-svg" viewBox="0 0 ${SVG_WIDTH} ${SVG_HEIGHT}" role="img" aria-label="Curva S de acompanhamento acumulado">
                    <defs>
                        <filter id="sCurveGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
                            <feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
                        </filter>
                    </defs>
                    <rect x="0" y="0" width="${SVG_WIDTH}" height="${SVG_HEIGHT}" rx="22" class="s-curve-bg"></rect>
                    ${gridLines.map(line => `
                        <line x1="${PAD.left}" y1="${line.y.toFixed(1)}" x2="${(PAD.left + plotW).toFixed(1)}" y2="${line.y.toFixed(1)}" class="s-curve-grid"></line>
                        <text x="${PAD.left - 12}" y="${(line.y + 4).toFixed(1)}" text-anchor="end" class="s-curve-axis-text">${line.value}</text>
                    `).join('')}
                    <line x1="${PAD.left}" y1="${PAD.top}" x2="${PAD.left}" y2="${PAD.top + plotH}" class="s-curve-axis"></line>
                    <line x1="${PAD.left}" y1="${PAD.top + plotH}" x2="${PAD.left + plotW}" y2="${PAD.top + plotH}" class="s-curve-axis"></line>
                    ${xLabels.map(row => {
                        const x = PAD.left + ((row.date.getTime() - minTime) / safeRange) * plotW;
                        return `
                            <line x1="${x.toFixed(1)}" y1="${PAD.top + plotH}" x2="${x.toFixed(1)}" y2="${PAD.top + plotH + 6}" class="s-curve-axis"></line>
                            <text x="${x.toFixed(1)}" y="${PAD.top + plotH + 24}" text-anchor="middle" class="s-curve-axis-text">${sCurveEscape(sCurveFormatDate(row.date))}</text>
                        `;
                    }).join('')}
                    <path d="${sCurvePath(rows, 'solicitadas', minTime, maxTime, maxValue)}" class="s-curve-line s-curve-line-requested"></path>
                    <path d="${sCurvePath(rows, 'recrutados', minTime, maxTime, maxValue)}" class="s-curve-line s-curve-line-recruited"></path>
                    <path d="${sCurvePath(rows, 'mobilizados', minTime, maxTime, maxValue)}" class="s-curve-line s-curve-line-mobilized"></path>
                    <circle cx="${lastSolicitadas.x.toFixed(1)}" cy="${lastSolicitadas.y.toFixed(1)}" r="5" class="s-curve-dot s-curve-dot-requested"></circle>
                    <circle cx="${lastRecrutados.x.toFixed(1)}" cy="${lastRecrutados.y.toFixed(1)}" r="5" class="s-curve-dot s-curve-dot-recruited"></circle>
                    <circle cx="${lastMobilizados.x.toFixed(1)}" cy="${lastMobilizados.y.toFixed(1)}" r="5" class="s-curve-dot s-curve-dot-mobilized"></circle>
                </svg>
            </div>`;
    }

    function sCurveLegendItem(label, value, pct, cls) {
        return `<div class="rounded-xl border border-outline-variant bg-surface-container-low p-4">
            <div class="flex items-center justify-between gap-3">
                <span class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted"><i class="s-curve-legend-dot ${cls}"></i>${sCurveEscape(label)}</span>
                ${pct !== null ? `<span class="font-mono text-xs text-primary font-black">${pct}%</span>` : ''}
            </div>
            <div class="mt-2 text-3xl font-display font-black text-on-surface">${value}</div>
        </div>`;
    }

    function sCurveRenderCard() {
        const data = sCurveBuildData();
        const firstDate = data.rows.length ? sCurveFormatDate(data.rows[0].date, true) : '-';
        const lastDate = data.rows.length ? sCurveFormatDate(data.rows[data.rows.length - 1].date, true) : '-';
        const dataNote = data.invalidDates
            ? `<span class="text-[11px] text-amber-300 font-semibold">${data.invalidDates} registro(s) sem data válida foram posicionados em hoje.</span>`
            : `<span class="text-[11px] text-muted">Série acumulada por data real registrada.</span>`;

        return `
            <section id="${CARD_ID}" class="pro-glass rounded-2xl p-5 sm:p-6 dashboard-s-curve-card">
                <div class="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-5">
                    <div>
                        <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                            <span class="material-symbols-outlined text-sm">show_chart</span> Curva S
                        </div>
                        <h4 class="font-display font-black text-xl text-on-surface">Acompanhamento de Solicitações x Recrutados x Mobilizados</h4>
                        <p class="text-xs text-muted mt-1">Solicitações usam a quantidade da RM; recrutados usam a data de recrutamento; mobilizados usam a admissão real.</p>
                        <p class="mt-2">${dataNote}</p>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <span class="pro-pill"><span class="material-symbols-outlined text-sm">domain</span>${sCurveEscape(data.selectedObra || 'Todas as obras')}</span>
                        <span class="pro-pill"><span class="material-symbols-outlined text-sm">date_range</span>${firstDate} a ${lastDate}</span>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                    ${sCurveLegendItem('Solicitações', data.totals.solicitadas, null, 'requested')}
                    ${sCurveLegendItem('Recrutados', data.totals.recrutados, data.coverageRecruitment, 'recruited')}
                    ${sCurveLegendItem('Mobilizados', data.totals.mobilizados, data.coverageMobilization, 'mobilized')}
                </div>
                ${sCurveRenderSvg(data)}
            </section>`;
    }

    function sCurveInjectStyle() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            .dashboard-s-curve-card { position: relative; overflow: hidden; }
            .dashboard-s-curve-scroll { width: 100%; overflow-x: auto; padding-bottom: 0.25rem; }
            .dashboard-s-curve-svg { display: block; width: 100%; min-width: 760px; height: auto; }
            .s-curve-bg { fill: rgba(15, 23, 42, 0.28); stroke: rgba(148, 163, 184, 0.16); }
            .s-curve-grid { stroke: rgba(148, 163, 184, 0.16); stroke-width: 1; }
            .s-curve-axis { stroke: rgba(148, 163, 184, 0.26); stroke-width: 1.25; }
            .s-curve-axis-text { fill: rgba(226, 232, 240, 0.66); font-size: 12px; font-weight: 700; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
            .s-curve-line { fill: none; stroke-width: 4.25; stroke-linecap: round; stroke-linejoin: round; filter: url(#sCurveGlow); }
            .s-curve-line-requested { stroke: #38bdf8; }
            .s-curve-line-recruited { stroke: #22c55e; }
            .s-curve-line-mobilized { stroke: #a78bfa; }
            .s-curve-dot { stroke: rgba(15, 23, 42, 0.86); stroke-width: 3; }
            .s-curve-dot-requested, .s-curve-legend-dot.requested { fill: #38bdf8; background: #38bdf8; }
            .s-curve-dot-recruited, .s-curve-legend-dot.recruited { fill: #22c55e; background: #22c55e; }
            .s-curve-dot-mobilized, .s-curve-legend-dot.mobilized { fill: #a78bfa; background: #a78bfa; }
            .s-curve-legend-dot { width: 0.65rem; height: 0.65rem; border-radius: 999px; display: inline-block; box-shadow: 0 0 18px currentColor; }
        `;
        document.head.appendChild(style);
    }

    function sCurveInjectCard() {
        sCurveInjectStyle();
        const container = document.getElementById('page-dashboard');
        if (!container) return;
        const existing = document.getElementById(CARD_ID);
        if (existing) existing.remove();

        const shell = container.querySelector('.space-y-6.animate-up') || container.firstElementChild || container;
        const wrapper = document.createElement('div');
        wrapper.innerHTML = sCurveRenderCard().trim();
        const card = wrapper.firstElementChild;
        if (!card) return;

        const children = Array.from(shell.children || []);
        const filterIndex = children.findIndex(el => el.querySelector && el.querySelector('select[onchange*="proSetObra"], select#dashboard-obra-filter'));
        if (filterIndex >= 0 && children[filterIndex].nextSibling) {
            shell.insertBefore(card, children[filterIndex].nextSibling);
        } else if (children.length > 1) {
            shell.insertBefore(card, children[1]);
        } else {
            shell.appendChild(card);
        }
    }

    const originalRenderDashboard = (typeof window.renderDashboard === 'function') ? window.renderDashboard : null;
    if (!originalRenderDashboard) return;

    window.renderDashboard = function () {
        const result = originalRenderDashboard.apply(this, arguments);
        try { sCurveInjectCard(); } catch (err) { console.warn('Falha ao renderizar Curva S do dashboard:', err); }
        return result;
    };

    try {
        if (typeof renderDashboard === 'function') renderDashboard = window.renderDashboard;
    } catch (err) {}

    setTimeout(function () {
        try {
            if (typeof currentPage === 'undefined' || currentPage === 'dashboard') sCurveInjectCard();
        } catch (err) {}
    }, 0);
})();
