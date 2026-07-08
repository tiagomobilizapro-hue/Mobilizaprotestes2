/* MobilizaPRO - runtime dos dados demo no GitHub Pages.
   Expõe os arrays globais para patches visuais e recompõe metadados que a sanitização descarta. */
(function () {
  'use strict';

  var isGithubPages = /(^|\.)github\.io$/i.test(location.hostname || '');
  if (!isGithubPages) return;

  var extraById = {
    1: { recruiter_name: 'RICARDO', recruited_by_name: 'RICARDO', recruiter_registered_at: '2026-07-01', aso_status: 'CONCLUIDO' },
    2: { recruiter_name: 'RICARDO', recruited_by_name: 'RICARDO', recruiter_registered_at: '2026-07-02', aso_marcado: true, aso_alerta: true, aso_marcado_em: '2026-07-03', aso_status: 'PENDENTE', aso_delay_reason: '' },
    3: { recruiter_name: 'TIAGO', recruited_by_name: 'TIAGO', recruiter_registered_at: '2026-07-03', aso_status: 'CONCLUIDO' },
    4: { recruiter_name: 'RICARDO', recruited_by_name: 'RICARDO', recruiter_registered_at: '2026-07-04', aso_status: 'CONCLUIDO' },
    5: { recruiter_name: 'TIAGO', recruited_by_name: 'TIAGO', recruiter_registered_at: '2026-07-05', aso_status: 'CONCLUIDO' },
    6: { recruiter_name: '', recruited_by_name: '', recruiter_registered_at: '', aso_status: 'CANCELADO' },
    7: { recruiter_name: 'RICARDO', recruited_by_name: 'RICARDO', recruiter_registered_at: '2026-07-06', aso_marcado: true, aso_alerta: true, aso_marcado_em: '2026-07-08', aso_status: 'PENDENTE' },
    8: { recruiter_name: 'TIAGO', recruited_by_name: 'TIAGO', recruiter_registered_at: '2026-07-06', aso_status: 'DECLINADO' },
    9: { recruiter_name: 'TIAGO', recruited_by_name: 'TIAGO', recruiter_registered_at: '2026-07-07', aso_status: 'CONCLUIDO' },
    10: { recruiter_name: 'RICARDO', recruited_by_name: 'RICARDO', recruiter_registered_at: '2026-07-08', aso_marcado: true, aso_alerta: true, aso_marcado_em: '2026-07-08', aso_status: 'PENDENTE' }
  };

  function getCandidates() { try { return Array.isArray(CANDIDATES) ? CANDIDATES : []; } catch (e) { return []; } }
  function getSolicitations() { try { return Array.isArray(SOLICITATIONS) ? SOLICITATIONS : []; } catch (e) { return []; } }

  function exposeArray(name, getter, setter) {
    try {
      Object.defineProperty(window, name, {
        configurable: true,
        enumerable: false,
        get: getter,
        set: setter
      });
    } catch (e) {}
  }

  function enrich() {
    var list = getCandidates();
    list.forEach(function (candidate) {
      var id = Number(candidate && candidate.id);
      if (extraById[id]) Object.assign(candidate, extraById[id]);
    });
  }

  exposeArray('CANDIDATES', getCandidates, function (value) { try { CANDIDATES = Array.isArray(value) ? value : []; } catch (e) {} });
  exposeArray('SOLICITATIONS', getSolicitations, function (value) { try { SOLICITATIONS = Array.isArray(value) ? value : []; } catch (e) {} });

  enrich();
  setTimeout(enrich, 0);
  window.addEventListener('load', enrich);

  window.MobilizaProDemoData = {
    reload: function () {
      if (window.MobilizaProDemoSeed && typeof window.MobilizaProDemoSeed.reload === 'function') {
        window.MobilizaProDemoSeed.reload();
      }
    },
    clear: function () {
      if (window.MobilizaProDemoSeed && typeof window.MobilizaProDemoSeed.clear === 'function') {
        window.MobilizaProDemoSeed.clear();
      }
    },
    count: function () {
      return {
        candidates: getCandidates().length,
        solicitations: getSolicitations().length
      };
    }
  };
})();
