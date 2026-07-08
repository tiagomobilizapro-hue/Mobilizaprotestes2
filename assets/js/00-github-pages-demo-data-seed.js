/* MobilizaPRO - dados demonstrativos para GitHub Pages.
   Carrega uma massa de teste somente no github.io, antes da camada de armazenamento.
   Não roda na Hostinger e não altera MySQL real. */
(function () {
  'use strict';

  var isGithubPages = /(^|\.)github\.io$/i.test(location.hostname || '');
  if (!isGithubPages) return;

  var STATE_KEY = 'mobilizaprp-state-v3';
  var VERSION_KEY = 'mobilizapro-github-pages-demo-data-version';
  var DEMO_VERSION = '20260708-demo-graficos-v2-filtros';

  function parseState() {
    try { return JSON.parse(localStorage.getItem(STATE_KEY) || '{}') || {}; }
    catch (e) { return {}; }
  }

  function hasOperationalRecords(state) {
    return Boolean(
      state &&
      ((Array.isArray(state.candidates) && state.candidates.length) ||
       (Array.isArray(state.solicitations) && state.solicitations.length))
    );
  }

  function demoState() {
    return {
      candidates: [
        {
          id: 1,
          name: 'CARLOS MENDES',
          cpf: '11122233344',
          phone: '31999990001',
          city: 'BELO HORIZONTE',
          state: 'MG',
          func: 'AJUDANTE DE CIVIL',
          rm: '1024',
          digital_obra: 'M.400',
          recruited: '2026-07-01',
          aso_planned: '2026-07-03',
          aso: '2026-07-03',
          admission_planned: '2026-07-05',
          admitted: '2026-07-05',
          training_start_real: '2026-07-06',
          training_end_real: '2026-07-07',
          badge_posted_date: '2026-07-08',
          badge_real_date: '2026-07-09',
          alojado: true,
          alojamento_realizado: 'SIM',
          alojamento_responsavel: 'EQUIPE ALOJAMENTO',
          trainings: [
            { name: 'Treinamento Inicial - Básico em Segurança do trabalho - CAR', date: '2026-07-06' },
            { name: 'NR 6 - EPI', date: '2026-07-07' }
          ]
        },
        {
          id: 2,
          name: 'PATRÍCIA LIMA',
          cpf: '22233344455',
          phone: '31999990002',
          city: 'CONTAGEM',
          state: 'MG',
          func: 'ELETRICISTA',
          rm: '1027',
          digital_obra: 'M.400',
          recruited: '2026-07-02',
          aso_planned: '2026-07-05',
          admission_planned: '2026-07-08',
          admitted: '',
          trainings: []
        },
        {
          id: 3,
          name: 'JOÃO PEREIRA',
          cpf: '33344455566',
          phone: '31999990003',
          city: 'SABARÁ',
          state: 'MG',
          func: 'SOLDADOR',
          rm: '1031',
          digital_obra: 'M.401',
          recruited: '2026-07-03',
          aso_planned: '2026-07-04',
          aso: '2026-07-04',
          admission_planned: '2026-07-06',
          admitted: '2026-07-06',
          training_start_real: '2026-07-07',
          training_end_real: '',
          badge_posted_date: '',
          badge_real_date: '',
          alojado: false,
          trainings: [
            { name: 'NR-35 Trabalho em Altura', date: '2026-07-07' }
          ]
        },
        {
          id: 4,
          name: 'ANA ROCHA',
          cpf: '44455566677',
          phone: '31999990004',
          city: 'NOVA LIMA',
          state: 'MG',
          func: 'TÉCNICO DE SEGURANÇA',
          rm: '1028',
          digital_obra: 'M.400',
          recruited: '2026-07-04',
          aso_planned: '2026-07-06',
          aso: '2026-07-06',
          admission_planned: '2026-07-08',
          admitted: '2026-07-08',
          training_start_real: '2026-07-08',
          training_end_real: '',
          badge_posted_date: '',
          badge_real_date: '',
          trainings: []
        },
        {
          id: 5,
          name: 'BRUNO ALVES',
          cpf: '55566677788',
          phone: '31999990005',
          city: 'BETIM',
          state: 'MG',
          func: 'AJUDANTE DE CIVIL',
          rm: '1030',
          digital_obra: 'M.400',
          recruited: '2026-07-05',
          aso_planned: '2026-07-07',
          aso: '2026-07-07',
          admission_planned: '2026-07-09',
          admitted: '',
          training_start_real: '',
          training_end_real: '',
          badge_posted_date: '',
          badge_real_date: '',
          alojado: true,
          alojamento_realizado: 'NAO',
          trainings: []
        },
        {
          id: 6,
          name: 'MARCOS SILVA',
          cpf: '66677788899',
          phone: '31999990006',
          city: 'ITABIRITO',
          state: 'MG',
          func: 'ELETRICISTA',
          rm: '1027',
          digital_obra: 'M.400',
          recruited: '2026-07-03',
          aso_planned: '2026-07-05',
          admitted: '',
          declined_date: '2026-07-06',
          declined_reason: 'Não compareceu ao ASO dentro do prazo.',
          trainings: []
        },
        {
          id: 7,
          name: 'FERNANDA COSTA',
          cpf: '77788899900',
          phone: '31999990007',
          city: 'BELO HORIZONTE',
          state: 'MG',
          func: 'ALMOXARIFE',
          rm: '1032',
          digital_obra: 'M.401',
          recruited: '2026-07-06',
          aso_planned: '2026-07-08',
          aso: '',
          admitted: '',
          trainings: []
        },
        {
          id: 8,
          name: 'RAFAEL GOMES',
          cpf: '88899900011',
          phone: '31999990008',
          city: 'CONGONHAS',
          state: 'MG',
          func: 'OPERADOR DE ESCAVADEIRA',
          rm: '1034',
          digital_obra: 'M.402',
          recruited: '2026-07-06',
          aso_planned: '2026-07-08',
          admitted: '',
          declined_date: '2026-07-07',
          declined_reason: 'Documentação incompleta.',
          trainings: []
        },
        {
          id: 9,
          name: 'LUCAS MARTINS',
          cpf: '99900011122',
          phone: '31999990009',
          city: 'OURO PRETO',
          state: 'MG',
          func: 'MOTORISTA DE VAN',
          rm: '1035',
          digital_obra: 'M.402',
          recruited: '2026-07-07',
          aso_planned: '2026-07-09',
          aso: '2026-07-09',
          admission_planned: '2026-07-10',
          admitted: '',
          trainings: []
        },
        {
          id: 10,
          name: 'MARIA EDUARDA',
          cpf: '12345678901',
          phone: '31999990010',
          city: 'BELO HORIZONTE',
          state: 'MG',
          func: 'ASSISTENTE ADMINISTRATIVO',
          rm: '1036',
          digital_obra: 'M.403',
          recruited: '2026-07-08',
          aso_planned: '2026-07-10',
          admitted: '',
          trainings: []
        },
        {
          id: 11,
          name: 'PAULO NOGUEIRA',
          cpf: '32165498700',
          phone: '31999990011',
          city: 'BELO HORIZONTE',
          state: 'MG',
          func: 'AJUDANTE DE CIVIL',
          rm: '1024',
          digital_obra: 'M.400',
          recruited: '2026-07-02',
          aso_planned: '2026-07-04',
          admitted: '',
          declined_date: '2026-07-04',
          declined_reason: 'Candidato recusou a proposta antes da mobilização.',
          trainings: []
        },
        {
          id: 12,
          name: 'SANDRA DIAS',
          cpf: '45678912300',
          phone: '31999990012',
          city: 'CONTAGEM',
          state: 'MG',
          func: 'AJUDANTE DE CIVIL',
          rm: '1030',
          digital_obra: 'M.400',
          recruited: '2026-07-05',
          aso_planned: '2026-07-07',
          admitted: '',
          declined_date: '2026-07-07',
          declined_reason: 'Não apresentou documentação no prazo.',
          trainings: []
        },
        {
          id: 13,
          name: 'EDSON FREITAS',
          cpf: '74185296300',
          phone: '31999990013',
          city: 'NOVA LIMA',
          state: 'MG',
          func: 'TÉCNICO DE SEGURANÇA',
          rm: '1028',
          digital_obra: 'M.400',
          recruited: '2026-07-06',
          aso_planned: '2026-07-08',
          admitted: '',
          declined_date: '2026-07-08',
          declined_reason: 'Reprovado em etapa documental de pré-mobilização.',
          trainings: []
        },
        {
          id: 14,
          name: 'VITOR HUGO',
          cpf: '85296374100',
          phone: '31999990014',
          city: 'SABARÁ',
          state: 'MG',
          func: 'ALMOXARIFE',
          rm: '1032',
          digital_obra: 'M.401',
          recruited: '2026-07-07',
          aso_planned: '2026-07-09',
          admitted: '',
          declined_date: '2026-07-09',
          declined_reason: 'Desistência registrada após convocação.',
          trainings: []
        }
      ],
      solicitations: [
        { rm: '1024', digital_obra: 'M.400', date: '01/07/2026', func: 'AJUDANTE DE CIVIL', qty: 5, status: 'ABERTA', canceled: false },
        { rm: '1027', digital_obra: 'M.400', date: '02/07/2026', func: 'ELETRICISTA', qty: 4, status: 'ABERTA', canceled: false },
        { rm: '1028', digital_obra: 'M.400', date: '03/07/2026', func: 'TÉCNICO DE SEGURANÇA', qty: 3, status: 'ABERTA', canceled: false },
        { rm: '1030', digital_obra: 'M.400', date: '04/07/2026', func: 'AJUDANTE DE CIVIL', qty: 6, status: 'ABERTA', canceled: false },
        { rm: '1031', digital_obra: 'M.401', date: '05/07/2026', func: 'SOLDADOR', qty: 3, status: 'ABERTA', canceled: false },
        { rm: '1032', digital_obra: 'M.401', date: '06/07/2026', func: 'ALMOXARIFE', qty: 2, status: 'ABERTA', canceled: false },
        { rm: '1034', digital_obra: 'M.402', date: '06/07/2026', func: 'OPERADOR DE ESCAVADEIRA', qty: 2, status: 'ABERTA', canceled: false },
        { rm: '1035', digital_obra: 'M.402', date: '07/07/2026', func: 'MOTORISTA DE VAN', qty: 2, status: 'ABERTA', canceled: false },
        { rm: '1036', digital_obra: 'M.403', date: '08/07/2026', func: 'ASSISTENTE ADMINISTRATIVO', qty: 1, status: 'ABERTA', canceled: false },
        { rm: '1099', digital_obra: 'M.400', date: '08/07/2026', func: 'ENCANADOR', qty: 2, status: 'CANCELADA', canceled: true, cancel_reason: 'Solicitação cancelada para testar exclusão dos gráficos.', canceled_at: '08/07/2026' }
      ]
    };
  }

  function seed(force) {
    var current = parseState();
    var currentVersion = '';
    try { currentVersion = localStorage.getItem(VERSION_KEY) || ''; } catch (e) {}
    if (!force && hasOperationalRecords(current) && currentVersion === DEMO_VERSION) return false;
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(demoState()));
      localStorage.setItem(VERSION_KEY, DEMO_VERSION);
      return true;
    } catch (e) {
      console.warn('MobilizaPRO: não foi possível carregar dados demonstrativos.', e);
      return false;
    }
  }

  var didSeed = seed(false);
  window.MobilizaProDemoSeed = {
    version: DEMO_VERSION,
    loaded: didSeed,
    reload: function () {
      seed(true);
      location.reload();
    },
    clear: function () {
      try {
        localStorage.removeItem(STATE_KEY);
        localStorage.removeItem(VERSION_KEY);
      } catch (e) {}
      location.reload();
    }
  };
})();
