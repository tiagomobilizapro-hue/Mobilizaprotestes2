
// ============================================================
// 📦 DATA STORE & INITIALIZATION
// ============================================================

let TRAINING_MATRIX = [
  {
    "function": "AJUDANTE DE CIVIL",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 53,
    "days": 7.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AJUDANTE DE ELÉTRICA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Sinais de Trânsito",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AJUDANTE DE ESTRUTURAS",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 53,
    "days": 7.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AJUDANTE DE MECÂNICA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 52,
    "days": 7.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AJUDANTE DE TUBULAÇÃO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 52,
    "days": 7.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ALMOXARIFE",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ANALISTA DE CONTROLE E CUSTO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ANALISTA DE MEIO AMBIENTE",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ANALISTA DE QUALIDADE",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ANALISTA DE SEGURANÇA DO TRABALHO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ANALISTA DE RH",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ANALISTA DE QUALIDADE E CONTROLE  III",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ANALISTA DE PLANEJAMENTO III",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ANALISTA DE TI",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "APONTADOR",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "APROPRIADOR",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ARMADOR",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 64,
    "days": 9.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ARQUIVISTA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ASSISTENTE TÉCNICO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ASSISTENTE ADMINISTRATIVO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ASSISTENTE FINANCEIRO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ASSISTENTE SOCIAL / COMUNICAÇÃO (EMPREGADOS E COMUNIDADE)",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR DE ALMOXARIFE",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR DE DEPARTAMENTO PESSOAL",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR DE ENFERMAGEM",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR DE LABORATÓRIO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 49,
    "days": 7.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR DE MEDIÇÃO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR DE MEIO AMBIENTE",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR DE PLANEJAMENTO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR DE QUALIDADE",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR DE SEGURANÇA DO TRABALHO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR DE SERVIÇOS GERAIS",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 53,
    "days": 7.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "AUXILIAR TOPOGRAFIA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 48,
    "days": 6.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "BORRACHEIRO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 69,
    "days": 9.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "CADISTA / DESENHISTA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "CALDEIREIRO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 64,
    "days": 9.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 10 Içamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "CARPINTEIRO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 62,
    "days": 8.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "COMPRADOR",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "CONTROLLER",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "COORDENADOR DE SALA TÉCNICA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "COORDENADOR DE PLANEJAMENTO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "CURVADOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 63,
    "days": 9.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ELETRICISTA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 106,
    "days": 15.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-10 - Curso Básico",
        "hours": 40,
        "required": "O"
      },
      {
        "name": "NR-10 - Curso Complementar",
        "hours": 40,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ELETRICISTA F/C",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 106,
    "days": 15.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-10 - Curso Básico",
        "hours": 40,
        "required": "O"
      },
      {
        "name": "NR-10 - Curso Complementar",
        "hours": 40,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ELETRICISTA MONTADOR",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 108,
    "days": 15.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-10 - Curso Básico",
        "hours": 40,
        "required": "O"
      },
      {
        "name": "NR-10 - Curso Complementar",
        "hours": 40,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCANADOR",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 60,
    "days": 8.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE ALMOXARIFADO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE ALOJAMENTO E TRANSPORTE",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE ANDAIME E ESCORAMENTOS",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 52,
    "days": 7.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE CONTROLE DE MANUTENÇÃO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 42,
    "days": 6.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE LABORATÓRIO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 41,
    "days": 5.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE MATERIAIS",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE MEDIÇÃO / SALA TÉCNICA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE MONTAGEM DE ELÉTRICA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 94,
    "days": 13.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-10 - Curso Básico",
        "hours": 40,
        "required": "O"
      },
      {
        "name": "NR-10 - Curso Complementar",
        "hours": 40,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE MONTAGEM DE ESTRUTURAS",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 40,
    "days": 5.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE MONTAGEM DE TUBULAÇÃO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE MONTAGEM ELETRICA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 94,
    "days": 13.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-10 - Curso Básico",
        "hours": 40,
        "required": "O"
      },
      {
        "name": "NR-10 - Curso Complementar",
        "hours": 40,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE MONTAGEM MECÂNICA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 42,
    "days": 6.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE MONTAGEM TUBULAÇÃO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 40,
    "days": 5.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE PESSOAL",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE SERVIÇOS GERAIS (PREFEITO)",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 35,
    "days": 5.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE SOLDA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE TERRAPLANAGEM",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE TRANSPORTE",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE TURMA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 48,
    "days": 6.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO GERAL",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 48,
    "days": 6.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO GERAL DE TERRAPLENAGEM",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENFERMEIRO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRO DE MATERIAIS",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRO DE MEIO AMBIENTE",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRO DE PLANEJAMENTO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRO DE PLANEJAMENTO (AWP/BIM)",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRO DE PRODUÇÃO (CIVIL)",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 44,
    "days": 6.3,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRO DE PRODUÇÃO (ELÉTRICA)",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 42,
    "days": 6.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRO DE PRODUÇÃO (MECÂNICA)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 42,
    "days": 6.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRO DE QUALIDADE",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRA SEGURANÇA TRABALHO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 42,
    "days": 6.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRO MECÂNICO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENGENHEIRO SEÇÃO TÉCNICA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "EQUIPE DE CONTENÇÕES EM SOLO GRAMPEADO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 70,
    "days": 10.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "EQUIPE DE EXECUÇÃO DE JET GROUTING",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 70,
    "days": 10.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ENCARREGADO DE PINTURA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 51,
    "days": 7.3,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 33 - Espaço Confinado - Executantes",
        "hours": 16,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "FERRAMENTEIRO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 38,
    "days": 5.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "GERENTE ADMINISTRATIVO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "GERENTE DE CONTRATOS",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "GERENTE DE PLANEJAMENTO E MEDIÇÃO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "GERENTE DE PRODUÇÃO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "GERENTE DE QUALIDADE",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "GERENTE DE SAÚDE, SEGURANÇA E MEIO AMBIENTE",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "GREIDISTA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 48,
    "days": 6.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE DUTOS TERRESTRES",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE LP",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE MATERIAIS",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 42,
    "days": 6.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE PINTURA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE QUALIDADE CIVIL",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE QUALIDADE ELÉTRICA / INSTRUMENTAÇÃO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE QUALIDADE MECANICO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE SOLDA N1",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE SOLDA N2 (CONSULTOR)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE ULTRASSOM",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DE ULTRASSOM N3 (CONSULTOR)",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSPETOR DIMENSIONAL",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 36,
    "days": 5.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "INSTRUMENTISTA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 46,
    "days": 6.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "JATISTA",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 70,
    "days": 10.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "LABORATORISTA DE CONCRETO",
    "recruitment_days": 2,
    "aso_days": 2,
    "admission_days": 2,
    "total_hours": 49,
    "days": 7.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "LABORATORISTA DE SOLOS",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 49,
    "days": 7.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "LAVADOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 70,
    "days": 10.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "LIXADOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 60,
    "days": 8.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "LUBRIFICADOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 59,
    "days": 8.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MARTELETEIRO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 56,
    "days": 8.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MASTER DRIVE (INSTRUTOR EQUIPAMENTOS)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MECANICO AJUSTADOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 68,
    "days": 9.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MECANICO DE EQUIPAMENTOS PESADOS",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 71,
    "days": 10.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MECANICO SOCORRISTA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 71,
    "days": 10.1,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MECANICO MONTADOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 68,
    "days": 9.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MÉDICO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MONTADOR DE ANDAIMES",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MONTADOR DE TUBULAÇÃO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 60,
    "days": 8.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTA CAMINHÃO CARROCERIA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 38,
    "days": 5.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTA DE CAMINHÃO BASCULANTE",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 38,
    "days": 5.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTA DE CAMINHÃO LIMPA FOSSA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 38,
    "days": 5.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTA DE CAMINHÃO PIPA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 38,
    "days": 5.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTA DE CAMINHÃO PIPA (ÁGUA POTÁVEL)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 38,
    "days": 5.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTA DE CAMINHÃO TANQUE",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 38,
    "days": 5.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTA DE CARRETA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 38,
    "days": 5.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTA DE CARRETA MUNCK",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 38,
    "days": 5.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTA DE COMBOIO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 61,
    "days": 8.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "MOPE",
        "hours": 16,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTA DE VAN",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 86,
    "days": 12.3,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Transporte Coletivo",
        "hours": 50,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "MOTORISTAS VEÍCULOS LEVES",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 38,
    "days": 5.4,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OFICIAL DE SINALIZAÇÃO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 35,
    "days": 5.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Sinais de Trânsito",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE ESCAVADEIRA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE ESCAVADEIRA COM ROMPEDOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE GUINDASTE (ACIMA DE 100T)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE GUINDASTE (ATÉ 100T)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE MANIPULADOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 60,
    "days": 8.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 10 Içamento",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE MOTONIVELADORA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE MUNCK",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE RETROESCAVADEIRA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE ROLO COMPACTADOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE TRATOR AGRÍCOLA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR DE TRATOR DE ESTEIRAS",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "OPERADOR SIDE BOOM",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "PEDREIRO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 61,
    "days": 8.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "PEDREIRO DE DRENAGEM",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 61,
    "days": 8.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "PINTOR INDUSTRIAL",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 51,
    "days": 7.3,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 33 - Espaço Confinado - Executantes",
        "hours": 16,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "PLANEJADOR DE FRENTE DE TRABALHO (WORKFACE PLANNER)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "PROJETISTA RIGGER",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "REVESTIDOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 70,
    "days": 10.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "RIGGER",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 88,
    "days": 12.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 10 Içamento",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "Rigger",
        "hours": 16,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Amarração de Cargas",
        "hours": 16,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SERVENTE",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 53,
    "days": 7.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SINALEIRO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 70,
    "days": 10.0,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 10 Içamento",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Amarração de Cargas",
        "hours": 16,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SINALEIRO DE CARGA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SOLDADOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 65,
    "days": 9.3,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SOLDADOR DE PEAD",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 65,
    "days": 9.3,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SOLDADOR INDUSTRIAL",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 65,
    "days": 9.3,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 07 Proteção Partes Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SUPERVISOR ADMINISTRATIVO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 05 Materiais Perigosos",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SUPERVISOR DE ELÉTRICA (ENC. GERAL)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 86,
    "days": 12.3,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-10 - Curso Básico",
        "hours": 40,
        "required": "O"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SUPERVISOR DE ESTRUTURAS METÁLICAS (ENC. GERAL)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 46,
    "days": 6.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SUPERVISOR DE MONTAGEM MECÂNICA  (ENC. GERAL)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 46,
    "days": 6.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SUPERVISOR DE MONTAGEM MECÂNICA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 46,
    "days": 6.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SUPERVISOR DE MATERIAIS",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 46,
    "days": 6.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SUPERVISOR DE PLANEJAMENTO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 46,
    "days": 6.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SUPERVISOR DE TOPOGRAFIA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 46,
    "days": 6.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SUPERVISOR DE TUBULAÇÃO (ENC. GERAL)",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 46,
    "days": 6.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 12 Colapso de Estruturas",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 14 Projeção de Materiais",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 16 Explosão de Comp./Equip. MECANICOs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 17 Explosão de Comp./Equip. Elétricos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção de Máquinas",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "SUPERVISOR DE SEGURANÇA DO TRABALHO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "TÉCNICO DE ELÉTRICA SALA TÉCNICA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 34,
    "days": 4.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "TÉCNICO DE ENFERMAGEM",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "TÉCNICO DE MEDIÇÃO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "TÉCNICO DE MEIO AMBIENTE",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Riscos Químicos",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "TÉCNICO DE PLANEJAMENTO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "TÉCNICO DE QUALIDADE",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "TÉCNICO DE SEGURANÇA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "TOPOGRÁFO",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 48,
    "days": 6.9,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 06 Ferramentas e Instrumentos",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 09 Trabalho em Altura",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "4 x 4",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "NR-35 Trabalho em Altura",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "TRATOR AGRÍCOLA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 54,
    "days": 7.7,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 02 Equipamentos Móveis",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 08 Isolamento e Bloqueio",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 11 Queda de Objetos",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "PCRC 18 Contato com Redes ELETRICAs",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Direção Defensiva",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR- 12 Segurança no Trabalho em Máquinas e Equipamentos.",
        "hours": 8,
        "required": "O"
      },
      {
        "name": "NR-11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais.",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "VIGIA",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  },
  {
    "function": "ZELADOR",
    "recruitment_days": 2,
    "aso_days": 5,
    "admission_days": 2,
    "total_hours": 32,
    "days": 4.6,
    "trainings": [
      {
        "name": "Treinamento introdutório Samarco",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "Treinamento Inicial  - Básico em Segurança do trabalho - CAR",
        "hours": 6,
        "required": "O"
      },
      {
        "name": "PCRC 01 VEÍCULOS Rodoviários",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 04 Controle de Solo",
        "hours": 2,
        "required": "O"
      },
      {
        "name": "PCRC 15 - Afogamento",
        "hours": 2,
        "required": "E"
      },
      {
        "name": "Proteção Respiratória",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Proteção Auditiva",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "Ergonomia básica",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "APR/PTP",
        "hours": 1,
        "required": "O"
      },
      {
        "name": "PAEBM",
        "hours": 1,
        "required": "E"
      },
      {
        "name": "POTS",
        "hours": 4,
        "required": "E"
      },
      {
        "name": "NR 6 - EPI",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "NPS Primeiros Socorros",
        "hours": 4,
        "required": "O"
      },
      {
        "name": "Noções básicas de Combate à Incêndios",
        "hours": 4,
        "required": "O"
      }
    ]
  }
];

const DEFAULT_CANDIDATES = [];

const DEFAULT_SOLICITATIONS = [];

let CANDIDATES = DEFAULT_CANDIDATES.map(item => ({ ...item }));

let SOLICITATIONS = DEFAULT_SOLICITATIONS.map(item => ({ ...item }));

let selectedFunction = TRAINING_MATRIX[0]?.function || "";
let currentPage = 'treinamentos';
let recruitmentMatrixSearch = '';

const STORAGE_KEY = 'mobilizaprp-state-v3';
const DATABASE_CLEAN_KEY = 'mobilizaprp-operational-db-clean-version';
const DATABASE_CLEAN_VERSION = 'database-reset-modelo-recente-2026-06-29-v2';
const BADGE_RELEASE_DAYS_DEFAULT = 2;

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

function jsArg(value) {
    return escapeHtml(JSON.stringify(String(value ?? '')));
}

function normalizeText(value) {
    return String(value ?? '').trim().replace(/\s+/g, ' ');
}

function clampNumber(value, min = 0, max = 9999, fallback = 0) {
    const num = Number(value);
    if (!Number.isFinite(num)) return fallback;
    return Math.min(max, Math.max(min, num));
}

function cleanDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? '')) ? String(value) : null;
}

function cleanString(value, max = 120) {
    return normalizeText(value).slice(0, max);
}

function cleanAlphanumeric(value, max = 40) {
    const cleaned = String(value ?? '')
        .toUpperCase()
        .replace(/[^A-Z0-9À-ÚÇ\-\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    return cleaned.slice(0, max);
}

function maskAlphanumericInput(input, max = 40) {
    input.value = cleanAlphanumeric(input.value, max);
}

function maskUppercaseInput(input, max = 120) {
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    input.value = String(input.value ?? '').toUpperCase().slice(0, max);
    try {
        input.setSelectionRange(start, end);
    } catch (error) {
        // Alguns tipos de input nao suportam selecao; nestes casos basta manter o valor em maiusculo.
    }
}

function sortTrainingMatrixByFunction() {
    TRAINING_MATRIX.sort((a, b) => String(a.function || '').localeCompare(String(b.function || ''), 'pt-BR', { sensitivity: 'base' }));
    return TRAINING_MATRIX;
}

function todayInputDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function onlyDigits(value) {
    return String(value ?? '').replace(/\D/g, '');
}

function formatCpf(value) {
    const digits = onlyDigits(value).slice(0, 11);
    return digits
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
}

function maskCpfInput(input) {
    input.value = formatCpf(input.value);
}

function formatPhone(value) {
    const digits = onlyDigits(value).slice(0, 11);
    if (!digits) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function maskPhoneInput(input) {
    input.value = formatPhone(input.value);
}

function validatePersonFlow(recruited, asoReal, admittedReal) {
    if (!recruited) return 'Informe a data de recrutamento.';
    if (asoReal && asoReal < recruited) return 'A data real do ASO nao pode ser anterior ao recrutamento.';
    if (admittedReal && !asoReal) return 'Informe a data real do ASO antes da data real de admissao.';
    if (admittedReal && admittedReal < asoReal) return 'A data real de admissao nao pode ser anterior ao ASO real.';
    return '';
}

function sanitizeTraining(training) {
    return {
        name: cleanString(training?.name || 'TREINAMENTO SEM NOME', 140),
        hours: clampNumber(training?.hours, 0, 200, 0),
        required: training?.required === 'E' ? 'E' : 'O'
    };
}

function sanitizeFunctionMatrix(item) {
    const trainings = Array.isArray(item?.trainings) ? item.trainings.map(sanitizeTraining) : [];
    const total = trainings.reduce((sum, t) => sum + (t.required === 'E' ? 0 : t.hours), 0);
    return {
        function: cleanString(item?.function || 'FUNCAO SEM NOME', 80).toUpperCase(),
        recruitment_days: clampNumber(item?.recruitment_days, 0, 365, 2),
        aso_days: clampNumber(item?.aso_days, 0, 365, 2),
        admission_days: clampNumber(item?.admission_days, 0, 365, 2),
        total_hours: total,
        days: parseFloat((total / 7).toFixed(1)),
        trainings
    };
}

function sanitizeCandidate(item, index) {
    const recruited = cleanDate(item?.recruited) || new Date().toISOString().split('T')[0];
    const asoReal = cleanDate(item?.aso_real || item?.aso);
    const admittedReal = cleanDate(item?.activation_real || item?.admitted);
    const asoPlanned = cleanDate(item?.aso_planned || item?.asoPrevista || item?.aso_prevista) || asoReal;
    const admissionPlanned = cleanDate(item?.admission_planned || item?.activation_planned || item?.admissao_prevista || item?.admitted_planned) || admittedReal;

    return {
        id: clampNumber(item?.id, 1, 999999, index + 1),
        name: cleanString(item?.name || 'PESSOA SEM NOME', 100).toUpperCase(),
        cpf: cleanString(item?.cpf, 14).replace(/\D/g, '').slice(0, 11),
        phone: onlyDigits(item?.phone).slice(0, 11),
        city: cleanString(item?.city, 80).toUpperCase(),
        state: cleanString(item?.state, 2).toUpperCase(),
        func: cleanString(item?.func || TRAINING_MATRIX[0]?.function || 'SEM FUNCAO', 80).toUpperCase(),
        rm: cleanString(item?.rm || item?.solicitation_rm || item?.rm_vinculada || '', 24).replace(/\D/g, ''),
        digital_obra: cleanAlphanumeric(item?.digital_obra || item?.digitalObra || item?.obra_digital || item?.digital_vinculada || '', 40),
        recruited,
        aso_planned: asoPlanned,
        admission_planned: admissionPlanned,
        aso: asoReal,
        admitted: admittedReal,
        training_start_planned: cleanDate(item?.training_start_planned),
        training_start_real: cleanDate(item?.training_start_real),
        training_end_planned: cleanDate(item?.training_end_planned),
        training_end_real: cleanDate(item?.training_end_real),
        badge_ok: Boolean(item?.badge_ok) || Boolean(cleanDate(item?.badge_real_date || item?.badge_emission_real || item?.cracha_real_date)),
        badge_posted_date: cleanDate(item?.badge_posted_date),
        badge_release_days: clampNumber(item?.badge_release_days, 0, 60, BADGE_RELEASE_DAYS_DEFAULT),
        badge_real_date: cleanDate(item?.badge_real_date || item?.badge_emission_real || item?.cracha_real_date),
        badge_delay_reason: cleanString(item?.badge_delay_reason || item?.badgeDelayReason || item?.justificativa_cracha || '', 500),
        alojado: Boolean(item?.alojado) || Boolean(item?.housed) || Boolean(item?.is_housed) || cleanString(item?.alojado_status || '', 10).toUpperCase() === 'SIM',
        alojamento_lancado_em: cleanDate(item?.alojamento_lancado_em || item?.housing_created_at || item?.alojamentoLancadoEm),
        alojamento_realizado: cleanString(item?.alojamento_realizado || item?.housing_completed || item?.foi_alojado || 'NAO', 3).toUpperCase() === 'SIM' ? 'SIM' : 'NAO',
        alojamento_responsavel: cleanString(item?.alojamento_responsavel || item?.housing_responsible || item?.responsavel_tratamento || '', 100).toUpperCase(),
        declined_date: cleanDate(item?.declined_date),
        declined_reason: cleanString(item?.declined_reason, 240),
        trainings: Array.isArray(item?.trainings) ? item.trainings.map(t => ({ name: cleanString(t?.name, 140), date: cleanDate(t?.date) || '' })).filter(t => t.name) : [],
        source_chapa: cleanString(item?.source_chapa || item?.chapa || '', 20),
        source_secao: cleanString(item?.source_secao || item?.secao || '', 220).toUpperCase(),
        source_cod_secao: cleanString(item?.source_cod_secao || item?.cod_secao || '', 20),
        source_funcao_rh: cleanString(item?.source_funcao_rh || item?.funcao_rh || '', 100).toUpperCase(),
        source_relatorio_funcionarios: cleanString(item?.source_relatorio_funcionarios || '', 80).toUpperCase(),
        source_status: cleanString(item?.source_status || '', 80).toUpperCase(),
        lastStageUpdate: cleanDate(item?.lastStageUpdate) || admittedReal || asoReal || recruited
    };
}

function sanitizeSolicitation(item) {
    const canceled = Boolean(item?.canceled) || cleanString(item?.status, 20).toUpperCase() === 'CANCELADA';
    return {
        rm: cleanString(item?.rm, 24).replace(/\D/g, ''),
        digital_obra: cleanAlphanumeric(item?.digital_obra || item?.digitalObra || item?.obra_digital || '', 40),
        date: cleanString(item?.date || new Date().toLocaleDateString('pt-BR'), 20),
        func: cleanString(item?.func || TRAINING_MATRIX[0]?.function || 'SEM FUNCAO', 80).toUpperCase(),
        qty: clampNumber(item?.qty, 1, 999, 1),
        canceled: canceled,
        status: canceled ? 'CANCELADA' : 'ABERTA',
        cancel_reason: cleanString(item?.cancel_reason || item?.cancelReason || item?.justificativa_cancelamento || '', 500),
        canceled_at: cleanString(item?.canceled_at || item?.canceledAt || '', 20)
    };
}

function isSolicitationCanceled(solicitation) {
    return Boolean(solicitation?.canceled) || cleanString(solicitation?.status, 20).toUpperCase() === 'CANCELADA';
}

function loadPersistedState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            CANDIDATES = DEFAULT_CANDIDATES.map(sanitizeCandidate);
            SOLICITATIONS = DEFAULT_SOLICITATIONS.map(sanitizeSolicitation).filter(s => s.rm);
            sortTrainingMatrixByFunction();
            syncBadgeQueue();
            return;
        }

        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.trainingMatrix)) TRAINING_MATRIX = parsed.trainingMatrix.map(sanitizeFunctionMatrix).filter(f => f.function);
        sortTrainingMatrixByFunction();

        CANDIDATES = Array.isArray(parsed.candidates) ? parsed.candidates.map(sanitizeCandidate) : DEFAULT_CANDIDATES.map(sanitizeCandidate);
        SOLICITATIONS = Array.isArray(parsed.solicitations) ? parsed.solicitations.map(sanitizeSolicitation).filter(s => s.rm) : DEFAULT_SOLICITATIONS.map(sanitizeSolicitation).filter(s => s.rm);

        selectedFunction = TRAINING_MATRIX[0]?.function || '';
        syncBadgeQueue();
    } catch (error) {
        console.warn('Nao foi possivel carregar os dados do MySQL/cache local. A tela sera aberta vazia ate nova sincronizacao.', error);
        CANDIDATES = DEFAULT_CANDIDATES.map(sanitizeCandidate);
        SOLICITATIONS = DEFAULT_SOLICITATIONS.map(sanitizeSolicitation).filter(s => s.rm);
        sortTrainingMatrixByFunction();
        syncBadgeQueue();
    }
}

function currentOperationalState() {
    return {
        trainingMatrix: TRAINING_MATRIX,
        candidates: CANDIDATES,
        solicitations: SOLICITATIONS
    };
}

function saveData() {
    const state = currentOperationalState();

    // MySQL é a fonte oficial. O localStorage é apenas espelho/cache local.
    if (window.MobilizaProCloudStorage && typeof window.MobilizaProCloudStorage.saveStateDirect === 'function') {
        window.MobilizaProCloudStorage.saveStateDirect(state);
    } else {
        console.error('MobilizaPro: camada MySQL indisponível. Alteração não será gravada no banco.');
        alert('MobilizaPro: não foi possível acessar o salvamento MySQL. Atualize a página antes de continuar.');
    }

    // Não grava estado operacional diretamente no localStorage.
    // O espelho local é atualizado somente pela camada MySQL após resposta OK do servidor.

    if (typeof updateVacancyBadge === 'function') {
        setTimeout(updateVacancyBadge, 0);
    }
}

function nextCandidateId() {
    return CANDIDATES.reduce((max, c) => Math.max(max, Number(c.id) || 0), 0) + 1;
}



function getVacancyKey(rm, digitalObra, func) {
    const rmClean = cleanString(rm, 24).replace(/\D/g, '');
    const digitalClean = cleanAlphanumeric(digitalObra, 40);
    const funcClean = cleanString(func, 80).toUpperCase();
    return `${rmClean}|${digitalClean}|${funcClean}`;
}

function createVacancyRow(func, rm = '', digitalObra = '', requested = 0, date = '') {
    return {
        key: getVacancyKey(rm, digitalObra, func),
        func: cleanString(func, 80).toUpperCase(),
        rm: cleanString(rm, 24).replace(/\D/g, ''),
        digital_obra: cleanAlphanumeric(digitalObra, 40),
        requested: clampNumber(requested, 0, 9999, 0),
        recruited: 0,
        declined: 0,
        open: 0,
        over: 0,
        date: cleanString(date, 20),
        sem_rm: false
    };
}

function getVacancyRows() {
    const rows = new Map();

    SOLICITATIONS.forEach(s => {
        if (isSolicitationCanceled(s)) return;
        const func = cleanString(s.func, 80).toUpperCase();
        const rm = cleanString(s.rm, 24).replace(/\D/g, '');
        const digital = cleanAlphanumeric(s.digital_obra || s.digitalObra || '', 40);
        if (!func || !rm || !digital) return;
        const key = getVacancyKey(rm, digital, func);
        if (!rows.has(key)) rows.set(key, createVacancyRow(func, rm, digital, 0, s.date));
        const row = rows.get(key);
        row.requested += clampNumber(s.qty, 0, 9999, 0);
        row.date = cleanString(s.date || row.date, 20);
    });

    CANDIDATES.forEach(c => {
        const func = cleanString(c.func, 80).toUpperCase();
        if (!func) return;
        const rm = cleanString(c.rm || c.solicitation_rm || '', 24).replace(/\D/g, '');
        const digital = cleanAlphanumeric(c.digital_obra || c.digitalObra || '', 40);
        let key = rm && digital ? getVacancyKey(rm, digital, func) : `SEM_RM|SEM_DIGITAL|${func}`;
        if (!rows.has(key)) {
            const row = createVacancyRow(func, rm, digital, 0, '');
            row.sem_rm = !(rm && digital);
            row.key = key;
            rows.set(key, row);
        }
        const row = rows.get(key);
        if (c.declined_date) row.declined += 1;
        else row.recruited += 1;
    });

    return Array.from(rows.values())
        .map(row => ({
            ...row,
            open: Math.max(0, row.requested - row.recruited),
            over: Math.max(0, row.recruited - row.requested)
        }))
        .filter(row => row.requested > 0 || row.recruited > 0 || row.declined > 0)
        .sort((a, b) =>
            a.func.localeCompare(b.func, 'pt-BR', { sensitivity: 'base' }) ||
            String(a.rm || '').localeCompare(String(b.rm || ''), 'pt-BR', { numeric: true }) ||
            String(a.digital_obra || '').localeCompare(String(b.digital_obra || ''), 'pt-BR', { sensitivity: 'base' })
        );
}

function getVacancySummary() {
    const rows = getVacancyRows();
    const requested = rows.reduce((sum, row) => sum + row.requested, 0);
    const recruited = rows.reduce((sum, row) => sum + row.recruited, 0);
    const declined = rows.reduce((sum, row) => sum + row.declined, 0);
    const open = rows.reduce((sum, row) => sum + row.open, 0);
    const over = rows.reduce((sum, row) => sum + row.over, 0);
    return { requested, recruited, declined, open, over, rows };
}

function updateVacancyBadge() {
    const badge = document.getElementById('vacancies-nav-badge');
    if (!badge) return;
    const open = getVacancySummary().open;
    badge.textContent = open;
    badge.title = `${open} vaga(s) em aberto`;
    badge.classList.toggle('bg-green-500', open === 0);
    badge.classList.toggle('bg-primary', open !== 0);
}

function getVacancyRowByLink(funcName, rm = '', digitalObra = '') {
    const func = cleanString(funcName, 80).toUpperCase();
    const rmClean = cleanString(rm, 24).replace(/\D/g, '');
    const digitalClean = cleanAlphanumeric(digitalObra, 40);
    if (!func || !rmClean || !digitalClean) return null;
    const key = getVacancyKey(rmClean, digitalClean, func);
    return getVacancyRows().find(row => row.key === key) || null;
}

function openRecruitmentFromVacancy(funcName, rm = '', digitalObra = '') {
    const func = cleanString(funcName, 80).toUpperCase();
    const rmClean = cleanString(rm, 24).replace(/\D/g, '');
    const digitalClean = cleanAlphanumeric(digitalObra, 40);
    const row = getVacancyRowByLink(func, rmClean, digitalClean);
    if (row && row.open <= 0 && row.requested > 0) {
        return alert(`Nao ha saldo disponivel para RM ${row.rm} / ${row.digital_obra} / ${row.func}.`);
    }
    selectPage('recrutamento');
    openAddPersonModal(func, rmClean, digitalClean);
}
// ============================================================
// 📋 LOGIC: STATUS: STATUS CALCULATION & ALERTS
// ============================================================

function getCandidateStatus(c) {
    const today = new Date();
    const lastUpdate = new Date(c.lastStageUpdate);
    const diffDays = Math.floor((today - lastUpdate) / (1000 * 60 * 60 * 24));
    const isStagnant = diffDays > 5;

    if (c.declined_date) {
        return { label: "DECLINADO", color: "bg-error/10 text-error border-error/20", stagnant: false };
    }

    let status = "RECRUTADO";
    let colorClass = "bg-primary/10 text-primary border-primary/20";

    if (c.aso) {
        status = "ASO";
        colorClass = "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
    if (c.admitted) {
        status = "TREINAMENTO";
        colorClass = "bg-purple-500/10 text-purple-400 border-purple-500/20";
    }

    const funcMatrix = TRAINING_MATRIX.find(f => f.function === c.func);
    if (funcMatrix && c.admitted) {
        const requiredTrainings = funcMatrix.trainings.filter(t => t.required !== 'E');
        const completedRequired = requiredTrainings.every(rt => c.trainings.some(ct => ct.name === rt.name));
        if (completedRequired) {
            status = "MOBILIZADO";
            colorClass = "bg-green-500/10 text-green-400 border-green-500/20";
        }
    }

    return { label: status, color: colorClass, stagnant: isStagnant };
}

function getRequiredTrainingsForCandidate(c) {
    const matrix = TRAINING_MATRIX.find(f => f.function === c.func);
    return matrix ? matrix.trainings.filter(t => t.required !== 'E') : [];
}

function hasCompletedRequiredTrainings(c) {
    if (cleanDate(c?.training_end_real)) return true;
    const required = getRequiredTrainingsForCandidate(c);
    return required.length > 0 && required.every(rt => c.trainings.some(ct => ct.name === rt.name && ct.date));
}

function syncBadgeQueueForCandidate(c) {
    if (!c || c.declined_date) return;
    if (c.admitted && hasCompletedRequiredTrainings(c)) {
        c.badge_posted_date = c.badge_posted_date || todayInputDate();
        c.badge_release_days = clampNumber(c.badge_release_days, 0, 60, BADGE_RELEASE_DAYS_DEFAULT);
    }
    refreshBadgeConclusion(c);
}

function syncBadgeQueue() {
    CANDIDATES.forEach(syncBadgeQueueForCandidate);
}

function getBadgeReleaseDate(c) {
    if (!c.badge_posted_date) return '';
    return addDaysToInputDate(c.badge_posted_date, c.badge_release_days ?? BADGE_RELEASE_DAYS_DEFAULT);
}

function isBadgeDelayed(c) {
    const planned = getBadgeReleaseDate(c);
    const real = cleanDate(c?.badge_real_date);
    return Boolean(planned && real && real > planned);
}

function isBadgeCompleted(c) {
    const real = cleanDate(c?.badge_real_date);
    if (!real) return false;
    if (isBadgeDelayed(c) && !cleanString(c?.badge_delay_reason || '', 500)) return false;
    return true;
}

function refreshBadgeConclusion(c) {
    if (!c) return false;
    c.badge_ok = isBadgeCompleted(c);
    return c.badge_ok;
}

// ============================================================
// TRAINING MATRIX PAGE
// ============================================================

function filterFuncSidebar(query) {
    const q = query.toUpperCase().trim();
    document.querySelectorAll('#func-sidebar-list .func-sidebar-item').forEach(el => {
        const name = el.getAttribute('data-func') || '';
        el.style.display = (!q || name.includes(q)) ? '' : 'none';
    });
}

function renderTreinamentos() {
    const container = document.getElementById('page-treinamentos');

    // Sort functions alphabetically (case-insensitive)
    const sortedFuncs = [...TRAINING_MATRIX].sort((a, b) =>
        a.function.localeCompare(b.function, 'pt-BR', { sensitivity: 'base' })
    );

    container.innerHTML = `
        <div class="flex flex-col gap-6 animate-up">
            <!-- Header with prominent Nova Função button -->
            <div class="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h3 class="font-display font-bold text-xl text-primary">Matriz de Qualificação M.400</h3>
                    <p class="text-xs text-muted">Gestão de carga horária e requisitos por função</p>
                </div>
                <div class="flex items-center gap-3">
                    <span class="badge bg-primary/10 text-primary border-primary/20 text-[11px]">
                        <span class="material-symbols-outlined text-xs">work</span> ${TRAINING_MATRIX.length} Funções
                    </span>
                    <button class="btn-new-func" onclick="openNewFunctionModal()">
                        <span class="material-symbols-outlined">add_circle</span>
                        Nova Função
                    </button>
                </div>
            </div>

            <!-- Two-column layout: functions sidebar + detail -->
            <div class="flex flex-col lg:flex-row gap-6">
                <!-- LEFT: Function list -->
                <div class="func-sidebar lg:w-72 lg:flex-shrink-0">
                    <div class="func-sidebar-header">
                        <input
                            type="text"
                            id="func-search-input"
                            class="func-search-input"
                            placeholder="Buscar função..."
                            oninput="filterFuncSidebar(this.value)"
                        />
                    </div>
                    <div class="func-sidebar-list" id="func-sidebar-list">
                        ${sortedFuncs.map(f => `
                            <div
                                class="func-sidebar-item ${f.function === selectedFunction ? 'active' : ''}"
                                onclick='selectTrainingFunc(${jsArg(f.function)})'
                                data-func="${escapeHtml(f.function.toUpperCase())}"
                            >
                                <span class="material-symbols-outlined text-sm" style="opacity:0.7">badge</span>
                                <span class="truncate">${escapeHtml(f.function)}</span>
                                <span class="func-sidebar-count">${f.trainings.length}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- RIGHT: Training detail -->
                <div class="flex-1 min-w-0" id="training-detail-container"></div>
            </div>
        </div>
    `;
    renderTrainingFunctionDetail(selectedFunction);
}

function renderTrainingFunctionDetail(funcName) {
    const f = TRAINING_MATRIX.find(x => x.function === funcName);
    if (!f) return;
    const detailContainer = document.getElementById('training-detail-container');

    detailContainer.innerHTML = `
        <div class="space-y-4">
            <!-- Summary strip -->
            <div class="card rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-primary">
                <div>
                    <h4 class="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">Função selecionada</h4>
                    <div class="font-display font-black text-lg text-on-surface leading-tight">${escapeHtml(f.function)}</div>
                </div>
                <div class="flex items-center gap-5">
                    <div class="text-center">
                        <div class="text-3xl font-display font-black text-primary leading-none">${f.total_hours}h</div>
                        <div class="text-[10px] text-muted font-bold uppercase mt-1">Total</div>
                    </div>
                    <div class="w-px h-10 bg-outline-variant"></div>
                    <div class="text-center">
                        <div class="text-3xl font-display font-black text-on-surface leading-none">${f.days}</div>
                        <div class="text-[10px] text-muted font-bold uppercase mt-1">Dias úteis</div>
                    </div>
                    <div class="w-px h-10 bg-outline-variant"></div>
                    <div class="text-center">
                        <div class="text-3xl font-display font-black text-on-surface leading-none">${f.trainings.length}</div>
                        <div class="text-[10px] text-muted font-bold uppercase mt-1">Treinamentos</div>
                    </div>
                </div>
                <button onclick='deleteFunction(${jsArg(f.function)})' class="btn btn-danger-ghost text-xs sm:self-start flex-shrink-0">
                    <span class="material-symbols-outlined text-sm">delete_sweep</span> Excluir
                </button>
            </div>

            <!-- Training list -->
            <div class="card rounded-2xl overflow-hidden">
                <div class="px-6 py-2.5 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase text-muted tracking-widest">Treinamento</span>
                    <div class="flex items-center gap-3">
                        <span class="text-[10px] font-bold uppercase text-muted tracking-widest w-32 text-center">Obrigatório</span>
                        <span class="text-[10px] font-bold uppercase text-muted tracking-widest w-16 text-center">Horas</span>
                        <span class="w-10"></span>
                    </div>
                </div>
                <div class="divide-y divide-outline-variant max-h-[520px] overflow-y-auto" id="training-list">
                    ${f.trainings.length ? f.trainings.map((t, idx) => `
                        <div class="px-6 py-4 flex items-center justify-between hover:bg-surface-container-highest group">
                            <div class="flex items-center gap-4 min-w-0 flex-1">
                                <span class="material-symbols-outlined text-xl ${t.required === 'E' ? 'text-amber-400' : 'text-primary'} flex-shrink-0">
                                    ${t.required === 'E' ? 'assignment_late' : 'verified_user'}
                                </span>
                                <div class="text-sm font-semibold text-on-surface truncate">${escapeHtml(t.name)}</div>
                            </div>
                            <div class="flex items-center gap-3 flex-shrink-0">
                                <select class="bg-surface-container-high border border-outline-variant rounded-lg px-2 py-1.5 text-[11px] font-bold cursor-pointer focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all w-32" onchange='updateTrainingRequired(${jsArg(f.function)}, ${idx}, this.value)'>
                                    <option value="O" ${t.required === 'O' ? 'selected' : ''}>Obrigatório</option>
                                    <option value="E" ${t.required === 'E' ? 'selected' : ''}>Não Obrigatório</option>
                                </select>
                                <input type="number" value="${t.hours}" class="hour-input w-16 h-8 rounded-md text-xs" onchange='updateTrainingHours(${jsArg(f.function)}, ${idx}, this.value)'>
                                <button onclick='deleteTrainingFromFunc(${jsArg(f.function)}, ${idx})' class="p-2 rounded-lg text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span class="material-symbols-outlined text-xl">delete</span>
                                </button>
                            </div>
                        </div>
                    `).join('') : '<div class="empty-state rounded-xl p-8 text-center text-muted">Nenhum treinamento vinculado.</div>'}
                </div>
                <div class="p-4 bg-surface-container-low border-t border-outline-variant">
                    <button onclick='openAddTrainingModal(${jsArg(f.function)})' class="w-full btn btn-ghost text-xs border border-dashed border-outline">
                        <span class="material-symbols-outlined text-sm">add</span> Adicionar Treinamento
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================================
// 👥 RECRUITMENT & MOBILIZATION PAGES
// ============================================================

function renderRecrutamento() {
    const container = document.getElementById('page-recrutamento');
    const declined = CANDIDATES.filter(c => c.declined_date);
    const recs = CANDIDATES.filter(c => !c.declined_date)
        .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity: 'base' }));
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h3 class="text-xl font-display font-bold">Gestão de Pessoas (Recrutamento)</h3>
                    <p class="text-xs text-muted">Cadastre, acompanhe candidatos e mantenha o histórico mesmo após envio para mobilização.</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3">
                    <button onclick="toggleDeclinedRecruitmentList()" class="inline-flex items-center justify-center gap-2 rounded-lg bg-error-container px-5 py-3 text-sm font-black text-on-error-container border border-error/40 shadow-lg shadow-red-950/20 transition-all hover:brightness-110 active:scale-95">
                        <span class="material-symbols-outlined text-xl">block</span>
                        Declinados (${declined.length})
                    </button>
                    <button onclick="openAddPersonModal()" class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-on-primary shadow-lg shadow-blue-500/10 transition-all hover:brightness-110 active:scale-95">
                        <span class="material-symbols-outlined text-lg">person_add</span>
                        Novo Colaborador
                    </button>
                </div>
            </div>
            <div id="recruitment-declined-list" class="hidden">
                <div class="card rounded-2xl overflow-hidden border-error/30">
                    <div class="px-5 py-4 bg-error/10 border-b border-error/20 flex items-center justify-between">
                        <h4 class="text-sm font-bold text-error">Candidatos Declinados</h4>
                        <span class="badge bg-error/10 text-error border-error/20">${declined.length} registros</span>
                    </div>
                    <div class="divide-y divide-outline-variant">
                        ${declined.length ? declined.map(c => `
                            <div class="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container-highest">
                                <div>
                                    <p class="text-sm font-bold text-on-surface">${escapeHtml(c.name)}</p>
                                    <p class="text-[10px] text-muted uppercase font-bold">${escapeHtml(c.func)} - ${escapeHtml(c.declined_date || '')}</p>
                                    <p class="text-xs text-muted mt-1">${escapeHtml(c.declined_reason || 'Sem motivo informado')}</p>
                                </div>
                                <button onclick="openEditPersonModal(${c.id})" class="btn btn-danger-ghost text-xs border border-error/20">Abrir Cadastro</button>
                            </div>
                        `).join('') : '<div class="p-6 text-center text-muted">Nenhum candidato declinado.</div>'}
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${recs.map(c => renderCandidateCard(c)).join('')}
                ${recs.length === 0 ? '<div class="col-span-full empty-state rounded-2xl p-10 text-center text-muted">Nenhuma pessoa cadastrada.</div>' : ''}
            </div>
        </div>
    `;
}

function toggleDeclinedRecruitmentList() {
    const list = document.getElementById('recruitment-declined-list');
    if (list) list.classList.toggle('hidden');
}

function updateRecruitmentMatrixField(funcName, field, value) {
    const allowed = ['recruitment_days', 'aso_days', 'admission_days'];
    if (!allowed.includes(field)) return;
    const item = TRAINING_MATRIX.find(f => f.function === funcName);
    if (!item) return;
    item[field] = clampNumber(value, 0, 365, 0);
    saveData();
}

function filterRecruitmentMatrix(query) {
    recruitmentMatrixSearch = String(query || '').toUpperCase().trim();
    let visibleRows = 0;
    document.querySelectorAll('#recruitment-matrix-body tr[data-function]').forEach(row => {
        const name = row.getAttribute('data-function') || '';
        const visible = !recruitmentMatrixSearch || name.includes(recruitmentMatrixSearch);
        row.style.display = visible ? '' : 'none';
        if (visible) visibleRows += 1;
    });
    const emptyState = document.getElementById('recruitment-matrix-empty');
    if (emptyState) emptyState.classList.toggle('hidden', visibleRows !== 0);
}

function renderMatrizRecrutamento() {
    const container = document.getElementById('page-matriz-recrutamento');
    const rows = [...TRAINING_MATRIX]
        .sort((a, b) => String(a.function || '').localeCompare(String(b.function || ''), 'pt-BR', { sensitivity: 'base' }))
        .map(f => ({
            function: f.function,
            recruitmentDays: clampNumber(f.recruitment_days, 0, 365, 2),
            asoDays: clampNumber(f.aso_days, 0, 365, 2),
            admissionDays: clampNumber(f.admission_days, 0, 365, 2),
            hours: clampNumber(f.total_hours, 0, 9999, 0),
            days: clampNumber(f.days, 0, 9999, 0)
        }));

    const normalizedSearch = recruitmentMatrixSearch || '';

    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h3 class="font-display font-bold text-xl text-primary">Matriz de Recrutamento</h3>
                    <p class="text-xs text-muted">Edite os prazos em dias por função para recrutamento, ASO e admissão.</p>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span class="badge bg-primary/10 text-primary border-primary/20">${TRAINING_MATRIX.length} Funções</span>
                    <button class="btn btn-primary text-xs" onclick="openNewFunctionModal()">
                        <span class="material-symbols-outlined text-sm">add_circle</span> Nova Função
                    </button>
                </div>
            </div>

            <div class="card rounded-2xl p-4">
                <label class="text-[10px] font-bold uppercase text-muted tracking-widest block mb-2">Buscar função</label>
                <div class="relative">
                    <span class="material-symbols-outlined text-muted absolute left-3 top-1/2 -translate-y-1/2 text-lg">search</span>
                    <input
                        type="text"
                        id="recruitment-matrix-search"
                        class="modal-input pl-10"
                        placeholder="Digite parte do nome da função..."
                        value="${escapeHtml(normalizedSearch)}"
                        oninput="filterRecruitmentMatrix(this.value)"
                    />
                </div>
            </div>

            <div class="card rounded-2xl overflow-hidden table-scroll">
                <table class="w-full min-w-[820px] text-left text-sm">
                    <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                        <tr>
                            <th class="px-5 py-4">Função</th>
                            <th class="px-5 py-4">Recrutamento (dias)</th>
                            <th class="px-5 py-4">ASO (dias)</th>
                            <th class="px-5 py-4">Admissão (dias)</th>
                            <th class="px-5 py-4">Horas Obrig.</th>
                            <th class="px-5 py-4">Dias Trein.</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-outline-variant" id="recruitment-matrix-body">
                        ${rows.map(row => `
                            <tr class="hover:bg-surface-container-highest transition-colors" data-function="${escapeHtml(row.function.toUpperCase())}">
                                <td class="px-5 py-3 font-bold text-on-surface">${escapeHtml(row.function)}</td>
                                <td class="px-5 py-3">
                                    <input type="number" min="0" max="365" class="modal-input w-24 text-center font-mono" value="${row.recruitmentDays}" onchange='updateRecruitmentMatrixField(${jsArg(row.function)}, "recruitment_days", this.value)'>
                                </td>
                                <td class="px-5 py-3">
                                    <input type="number" min="0" max="365" class="modal-input w-24 text-center font-mono" value="${row.asoDays}" onchange='updateRecruitmentMatrixField(${jsArg(row.function)}, "aso_days", this.value)'>
                                </td>
                                <td class="px-5 py-3">
                                    <input type="number" min="0" max="365" class="modal-input w-24 text-center font-mono" value="${row.admissionDays}" onchange='updateRecruitmentMatrixField(${jsArg(row.function)}, "admission_days", this.value)'>
                                </td>
                                <td class="px-5 py-3 font-mono">${row.hours}h</td>
                                <td class="px-5 py-3 font-mono">${row.days}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div id="recruitment-matrix-empty" class="hidden empty-state rounded-xl p-8 m-4 text-center text-muted">Nenhuma função encontrada para a busca informada.</div>
            </div>
        </div>
    `;

    filterRecruitmentMatrix(normalizedSearch);
    const searchInput = document.getElementById('recruitment-matrix-search');
    if (searchInput) searchInput.focus();
}

function renderMobilização() {
    const container = document.getElementById('page-mobilizacao');
    const mobs = CANDIDATES.filter(c => c.admitted && !c.declined_date);
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 class="text-xl font-display font-bold">Mobilização e Treinamentos</h3>
                    <p class="text-xs text-muted">Clique no colaborador para abrir os treinamentos da funcao e editar as datas realizadas.</p>
                </div>
                <span class="badge bg-primary/10 text-primary border-primary/20">${mobs.length} admitidos</span>
            </div>
            <div class="card rounded-2xl overflow-hidden">
                <div class="divide-y divide-outline-variant">
                    ${mobs.length ? mobs.map(c => renderMobilizationPersonRow(c)).join('') : '<div class="empty-state rounded-2xl p-10 text-center text-muted">Nenhum colaborador admitido para mobilizacao.</div>'}
                </div>
            </div>
        </div>
    `;
    updateAlertIcon();
}

function renderMobilizationPersonRow(c) {
    const matrix = TRAINING_MATRIX.find(m => m.function === c.func);
    const trainings = matrix?.trainings || [];
    const done = trainings.filter(t => c.trainings.some(ct => ct.name === t.name)).length;
    const status = getCandidateStatus(c);
    return `
        <button type="button" onclick="openCandidateTrainingsModal(${c.id})" class="w-full text-left p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-surface-container-highest transition-colors">
            <div class="flex items-start gap-3 min-w-0">
                <span class="material-symbols-outlined text-primary mt-1">school</span>
                <div class="min-w-0">
                    <p class="font-bold text-on-surface">${escapeHtml(c.name)}</p>
                    <p class="text-[10px] text-muted uppercase font-bold tracking-widest">${escapeHtml(c.func)}</p>
                    <p class="text-[10px] text-muted mt-1">Admissao: ${escapeHtml(c.admitted || '-')} - CPF ${escapeHtml(formatCpf(c.cpf) || '-')}</p>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-2 md:justify-end">
                <span class="badge ${status.color}">${status.label}</span>
                <span class="badge ${done === trainings.length && trainings.length ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">
                    ${done} / ${trainings.length} treinamentos
                </span>
                <span class="material-symbols-outlined text-muted">chevron_right</span>
            </div>
        </button>
    `;
}

function renderCracha() {
    syncBadgeQueue();
    CANDIDATES.forEach(refreshBadgeConclusion);
    const container = document.getElementById('page-cracha');
    const rows = CANDIDATES
        .filter(c => c.admitted && !c.declined_date && hasCompletedRequiredTrainings(c))
        .sort((a, b) => String(a.badge_posted_date || '').localeCompare(String(b.badge_posted_date || '')) || a.name.localeCompare(b.name));
    const completed = rows.filter(isBadgeCompleted).length;
    const pending = rows.length - completed;

    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h3 class="text-xl font-display font-bold text-primary">Crachás para Liberação</h3>
                    <p class="text-xs text-muted">Pessoas lancadas automaticamente apos concluir os treinamentos obrigatorios.</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge bg-primary/10 text-primary border-primary/20">${rows.length} em cracha</span>
                    <span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">${pending} pendentes</span>
                    <span class="badge bg-green-500/10 text-green-400 border-green-500/20">${completed} concluídos</span>
                </div>
            </div>
            <div class="card rounded-2xl overflow-hidden table-scroll">
                <table class="w-full min-w-[1220px] text-left text-sm">
                    <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                        <tr>
                            <th class="px-5 py-4">Pessoa</th>
                            <th class="px-5 py-4">Função</th>
                            <th class="px-5 py-4">Postagem</th>
                            <th class="px-5 py-4">Dias liberacao</th>
                            <th class="px-5 py-4">Previsão</th>
                            <th class="px-5 py-4">Data Real Emissão</th>
                            <th class="px-5 py-4">Justificativa</th>
                            <th class="px-5 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-outline-variant">
                        ${rows.length ? rows.map(c => {
                            const releaseDate = getBadgeReleaseDate(c);
                            const realDate = cleanDate(c.badge_real_date) || '';
                            const delayed = isBadgeDelayed(c);
                            const completed = isBadgeCompleted(c);
                            const reason = cleanString(c.badge_delay_reason || '', 500);
                            const warning = delayed && !reason;
                            return `
                                <tr class="hover:bg-surface-container-highest transition-colors ${completed ? 'opacity-85' : ''}">
                                    <td class="px-5 py-4 align-top">
                                        <button onclick="openEditPersonModal(${c.id})" class="font-bold text-on-surface hover:text-primary">${escapeHtml(c.name)}</button>
                                        <p class="text-[10px] text-muted mt-1">CPF ${escapeHtml(formatCpf(c.cpf) || '-')}</p>
                                    </td>
                                    <td class="px-5 py-4 align-top text-xs font-bold uppercase text-muted">${escapeHtml(c.func)}</td>
                                    <td class="px-5 py-4 align-top">
                                        <input type="date" class="modal-input w-40 text-xs" value="${escapeHtml(c.badge_posted_date || '')}" onchange="updateBadgeField(${c.id}, 'badge_posted_date', this.value)">
                                    </td>
                                    <td class="px-5 py-4 align-top">
                                        <input type="number" min="0" max="60" class="modal-input w-24 text-center font-mono" value="${escapeHtml(c.badge_release_days ?? BADGE_RELEASE_DAYS_DEFAULT)}" onchange="updateBadgeField(${c.id}, 'badge_release_days', this.value)">
                                    </td>
                                    <td class="px-5 py-4 align-top font-mono text-primary">${escapeHtml(releaseDate || '-')}</td>
                                    <td class="px-5 py-4 align-top">
                                        <input type="date" class="modal-input w-40 text-xs ${completed ? 'border-green-500/50' : ''}" value="${escapeHtml(realDate)}" onchange="updateBadgeField(${c.id}, 'badge_real_date', this.value)">
                                        ${delayed ? '<p class="text-[10px] text-error mt-1 font-bold uppercase">Atrasado vs. previsao</p>' : ''}
                                    </td>
                                    <td class="px-5 py-4 align-top min-w-[260px]">
                                        ${delayed ? `
                                            <textarea class="modal-input min-h-[72px] text-xs ${warning ? 'border-error' : ''}" placeholder="Obrigatorio: informe a justificativa do atraso" oninput="updateBadgeDelayReasonDraft(${c.id}, this.value)" onchange="updateBadgeField(${c.id}, 'badge_delay_reason', this.value)">${escapeHtml(reason)}</textarea>
                                            ${warning ? '<p class="text-[10px] text-error mt-1 font-bold uppercase">Justificativa obrigatoria para concluir</p>' : ''}
                                        ` : `
                                            <input type="text" class="modal-input text-xs" value="${escapeHtml(reason)}" placeholder="Sem atraso" onchange="updateBadgeField(${c.id}, 'badge_delay_reason', this.value)">
                                        `}
                                    </td>
                                    <td class="px-5 py-4 align-top">
                                        <span class="badge ${completed ? 'bg-green-500/10 text-green-400 border-green-500/20' : warning ? 'bg-error/10 text-error border-error/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">
                                            ${completed ? 'Concluido' : warning ? 'Justificar atraso' : 'Aguardando emissao'}
                                        </span>
                                    </td>
                                </tr>
                            `;
                        }).join('') : '<tr><td colspan="8" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhum colaborador com treinamentos obrigatorios concluídos.</div></td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    saveData();
}

function updateBadgeDelayReasonDraft(candidateId, value) {
    const c = CANDIDATES.find(x => x.id === candidateId);
    if (!c) return;
    c.badge_delay_reason = cleanString(value, 500);
    refreshBadgeConclusion(c);
    saveData();
}

function updateBadgeField(candidateId, field, value) {
    const c = CANDIDATES.find(x => x.id === candidateId);
    if (!c) return;
    if (field === 'badge_posted_date') c.badge_posted_date = cleanDate(value);
    if (field === 'badge_release_days') c.badge_release_days = clampNumber(value, 0, 60, BADGE_RELEASE_DAYS_DEFAULT);
    if (field === 'badge_real_date') c.badge_real_date = cleanDate(value);
    if (field === 'badge_delay_reason') c.badge_delay_reason = cleanString(value, 500);
    if (field === 'badge_posted_date' || field === 'badge_release_days') {
        const delayed = isBadgeDelayed(c);
        if (!delayed) c.badge_delay_reason = cleanString(c.badge_delay_reason || '', 500);
    }
    refreshBadgeConclusion(c);
    saveData();
    renderCracha();
}

function renderCandidateCard(c, showTrainingPanel = false) {
    const status = getCandidateStatus(c);
    const asoPlanned = cleanDate(c.aso_planned) || cleanDate(c.aso) || '-';
    const activationPlanned = cleanDate(c.admission_planned) || cleanDate(c.admitted) || '-';
    const asoReal = cleanDate(c.aso) || '-';
    const activationReal = cleanDate(c.admitted) || '-';
    return `
        <div class="card p-5 rounded-2xl relative overflow-hidden group">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="font-bold text-on-surface group-hover:text-primary transition-colors">${escapeHtml(c.name)}</h4>
                    <p class="text-[10px] text-muted font-bold uppercase tracking-widest">${escapeHtml(c.func)}</p>
                    <p class="text-[10px] text-muted mt-1">CPF <span class="font-mono text-on-surface">${escapeHtml(formatCpf(c.cpf) || '-')}</span></p>
                    <p class="text-[10px] text-muted mt-1">RM <span class="font-mono text-primary">${escapeHtml(c.rm || '-')}</span> • Digital <span class="font-mono text-on-surface">${escapeHtml(c.digital_obra || '-')}</span></p>
                </div>
                <div class="flex flex-col items-end gap-1">
                    <span class="badge ${status.color}">
                        ${status.stagnant ? '<span class="material-symbols-outlined text-[10px] alert-pulse">priority_high</span>' : ''}
                        ${status.label}
                    </span>
                    <span class="text-[9px] text-muted">Ativo há ${Math.floor((new Date() - new Date(c.recruited)) / (1000 * 60 * 60 * 24))} dias</span>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-[10px]">
                <div class="rounded-lg border border-outline-variant bg-surface-container-low p-2">
                    <p class="font-black uppercase tracking-widest text-muted">ASO</p>
                    <p class="mt-1 text-muted">Previsto: <span class="font-mono text-on-surface">${escapeHtml(asoPlanned)}</span></p>
                    <p class="text-muted">Real: <span class="font-mono ${asoReal !== '-' ? 'text-green-400' : 'text-muted'}">${escapeHtml(asoReal)}</span></p>
                </div>
                <div class="rounded-lg border border-outline-variant bg-surface-container-low p-2">
                    <p class="font-black uppercase tracking-widest text-muted">Admissão</p>
                    <p class="mt-1 text-muted">Prevista: <span class="font-mono text-on-surface">${escapeHtml(activationPlanned)}</span></p>
                    <p class="text-muted">Real: <span class="font-mono ${activationReal !== '-' ? 'text-green-400' : 'text-muted'}">${escapeHtml(activationReal)}</span></p>
                </div>
            </div>
            ${showTrainingPanel ? renderMobilizationTrainingPanel(c) : ''}
            <div class="flex gap-2">
                <button onclick="openEditPersonModal(${c.id})" class="btn btn-ghost w-full py-1.5 text-[10px] font-bold border border-outline-variant">EDITAR FLUXO</button>
                <button onclick="openCandidateTrainingsModal(${c.id})" class="btn btn-ghost p-1.5 border border-outline-variant ${!c.admitted ? 'hidden' : ''}" title="Treinamentos">
                    <span class="material-symbols-outlined text-sm">school</span>
                </button>
            </div>
        </div>
    `;
}

function renderMobilizationTrainingPanel(c) {
    const matrix = TRAINING_MATRIX.find(m => m.function === c.func);
    if (!matrix) {
        return '<div class="empty-state rounded-xl p-4 text-xs text-muted mb-4">Função sem matriz de treinamento configurada.</div>';
    }

    const trainings = Array.isArray(matrix.trainings) ? matrix.trainings : [];
    const done = trainings.filter(t => c.trainings.some(ct => ct.name === t.name)).length;

    return `
        <div class="mb-4 rounded-xl border border-outline-variant bg-surface-container-low overflow-hidden">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3 border-b border-outline-variant bg-surface-container-high">
                <div>
                    <p class="text-[10px] uppercase font-black tracking-widest text-primary">Treinamentos da Função</p>
                    <p class="text-xs text-muted">${done} de ${trainings.length} realizados</p>
                </div>
                <span class="badge ${done === trainings.length && trainings.length ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">
                    ${done === trainings.length && trainings.length ? 'Concluido' : 'Pendente'}
                </span>
            </div>
            <div class="max-h-80 overflow-y-auto divide-y divide-outline-variant">
                ${trainings.length ? trainings.map(t => {
                    const completed = c.trainings.find(ct => ct.name === t.name);
                    return `
                        <div class="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div class="flex items-start gap-3 min-w-0">
                                <span class="material-symbols-outlined mt-0.5 ${completed ? 'text-green-400' : 'text-muted'}">${completed ? 'check_circle' : 'radio_button_unchecked'}</span>
                                <div class="min-w-0">
                                    <p class="text-xs font-bold text-on-surface leading-snug">${escapeHtml(t.name)}</p>
                                    <p class="text-[10px] text-muted uppercase font-bold mt-1">${escapeHtml(t.hours)}h - ${t.required === 'E' ? 'Eletivo' : 'Obrigatorio'}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 sm:min-w-[168px]">
                                <label class="text-[10px] uppercase font-bold text-muted sm:hidden">Data</label>
                                <input type="date" value="${escapeHtml(completed?.date || '')}" class="modal-input text-xs"
                                    onchange='toggleCandidateTraining(${c.id}, ${jsArg(t.name)}, this.value)'>
                            </div>
                        </div>
                    `;
                }).join('') : '<div class="p-4 text-center text-xs text-muted">Nenhum treinamento cadastrado para esta função.</div>'}
            </div>
        </div>
    `;
}


// ============================================================
// 🏠 ALOJAMENTO MODULE
// ============================================================

function getAlojados() {
    return CANDIDATES
        .filter(c => Boolean(c.alojado))
        .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'pt-BR', { sensitivity: 'base' }));
}

function getAlojamentoPendentesTratamento() {
    return getAlojados().filter(c => {
        const foiAlojado = String(c.alojamento_realizado || 'NAO').toUpperCase() === 'SIM';
        const responsavel = cleanString(c.alojamento_responsavel || '', 100).trim();
        return !c.declined_date && (!foiAlojado || !responsavel);
    });
}

function renderAlojamento() {
    const container = document.getElementById('page-alojamento');
    const alojados = getAlojados();
    const ativos = alojados.filter(c => !c.declined_date).length;
    const declinados = alojados.filter(c => c.declined_date).length;
    const realizados = alojados.filter(c => String(c.alojamento_realizado || 'NAO').toUpperCase() === 'SIM' && cleanString(c.alojamento_responsavel || '', 100).trim()).length;
    const pendentesTratamento = alojados.filter(c => !c.declined_date && (String(c.alojamento_realizado || 'NAO').toUpperCase() !== 'SIM' || !cleanString(c.alojamento_responsavel || '', 100).trim())).length;
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h3 class="text-xl font-display font-bold text-primary">Controle de Alojamento</h3>
                    <p class="text-xs text-muted">Pessoas lançadas automaticamente a partir do campo Alojado = Sim em Editar Pessoa</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge bg-primary/10 text-primary border-primary/20">${alojados.length} necessidades</span>
                    <span class="badge bg-green-500/10 text-green-400 border-green-500/20">${realizados} tratados</span>
                    <span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20"><span class="material-symbols-outlined text-xs alert-pulse">warning</span> ${pendentesTratamento} não tratados</span>
                    <span class="badge bg-surface-container-high text-muted border-outline-variant">${ativos} ativos</span>
                    ${declinados ? `<span class="badge bg-red-500/10 text-red-400 border-red-500/20">${declinados} declinados</span>` : ''}
                </div>
            </div>

            <div class="card rounded-2xl overflow-hidden table-scroll">
                <table class="w-full min-w-[1120px] text-left text-sm">
                    <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                        <tr>
                            <th class="px-6 py-4">Pessoa</th>
                            <th class="px-6 py-4">Função</th>
                            <th class="px-6 py-4">Nº Obra</th>
                            <th class="px-6 py-4">Cidade / UF</th>
                            <th class="px-6 py-4">Lançado em</th>
                            <th class="px-6 py-4">Necessidade</th>
                            <th class="px-6 py-4">Foi Alojado?</th>
                            <th class="px-6 py-4">Responsável pelo Tratamento</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-outline-variant">
                        ${alojados.length ? alojados.map(c => {
                            const foiAlojado = String(c.alojamento_realizado || 'NAO').toUpperCase() === 'SIM' ? 'SIM' : 'NAO';
                            const responsavel = cleanString(c.alojamento_responsavel || '', 100).toUpperCase();
                            const tratamentoPendente = !c.declined_date && (foiAlojado !== 'SIM' || !responsavel.trim());
                            const necessidade = c.declined_date
                                ? '<span class="badge bg-red-500/10 text-red-400 border-red-500/20">Declinado</span>'
                                : tratamentoPendente
                                    ? '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20"><span class="material-symbols-outlined text-xs alert-pulse">warning</span> Sim - Não tratado</span>'
                                    : '<span class="badge bg-green-500/10 text-green-400 border-green-500/20"><span class="material-symbols-outlined text-xs">check_circle</span> Sim - Tratado</span>';
                            return `
                                <tr class="hover:bg-surface-container-highest transition-colors ${c.declined_date ? 'opacity-70' : tratamentoPendente ? 'bg-amber-500/5' : ''}">
                                    <td class="px-6 py-4">
                                        <div class="font-bold text-on-surface">${escapeHtml(c.name)}</div>
                                        <div class="text-[11px] text-muted font-mono">CPF ${escapeHtml(formatCpf(c.cpf))}</div>
                                    </td>
                                    <td class="px-6 py-4 font-semibold">${escapeHtml(c.func || '-')}</td>
                                    <td class="px-6 py-4 font-mono text-xs">${escapeHtml(c.digital_obra || c.rm || '-')}</td>
                                    <td class="px-6 py-4">${escapeHtml(c.city || '-')}${c.state ? ' / ' + escapeHtml(c.state) : ''}</td>
                                    <td class="px-6 py-4 font-mono text-xs">${escapeHtml(c.alojamento_lancado_em || '-')}</td>
                                    <td class="px-6 py-4">${necessidade}</td>
                                    <td class="px-6 py-4">
                                        <select class="modal-input text-xs font-bold uppercase min-w-[88px]" onchange="updateCandidateAlojamentoRealizado(${c.id}, this.value)">
                                            <option value="NAO" ${foiAlojado === 'NAO' ? 'selected' : ''}>Não</option>
                                            <option value="SIM" ${foiAlojado === 'SIM' ? 'selected' : ''}>Sim</option>
                                        </select>
                                    </td>
                                    <td class="px-6 py-4 min-w-[260px]">
                                        ${foiAlojado === 'SIM' ? `
                                            <div class="space-y-1">
                                                <input type="text" class="modal-input uppercase text-xs" maxlength="100" value="${escapeHtml(responsavel)}" placeholder="NOME DO RESPONSÁVEL" oninput="maskUppercaseInput(this, 100); updateCandidateAlojamentoResponsavel(${c.id}, this.value)" onblur="renderCurrentPage()">
                                                ${!responsavel.trim() ? '<div class="flex items-center gap-1 text-[10px] font-bold uppercase text-amber-400"><span class="material-symbols-outlined text-xs alert-pulse">warning</span> Responsável pendente</div>' : ''}
                                            </div>
                                        ` : '<div class="flex items-center gap-1 text-xs text-amber-400 font-bold uppercase"><span class="material-symbols-outlined text-sm alert-pulse">warning</span> Não tratado</div>'}
                                    </td>
                                </tr>
                            `;
                        }).join('') : '<tr><td colspan="8" class="p-12 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma pessoa marcada como alojada. Use Editar Pessoa &gt; Alojado = Sim.</div></td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function setCandidateAlojado(id, value) {
    const c = CANDIDATES.find(x => x.id === id);
    if (!c) return alert('Pessoa não encontrada.');
    if (value === false && !confirm(`Retirar ${c.name} do Alojamento?`)) return;
    c.alojado = Boolean(value);
    c.alojamento_lancado_em = c.alojado ? (cleanDate(c.alojamento_lancado_em) || todayInputDate()) : null;
    if (!c.alojado) {
        c.alojamento_realizado = 'NAO';
        c.alojamento_responsavel = '';
    }
    c.lastStageUpdate = todayInputDate();
    saveData();
    renderCurrentPage();
    updateAlertIcon();
}

function updateCandidateAlojamentoRealizado(id, value) {
    const c = CANDIDATES.find(x => x.id === id);
    if (!c) return alert('Pessoa não encontrada.');
    const status = String(value || 'NAO').toUpperCase() === 'SIM' ? 'SIM' : 'NAO';
    c.alojamento_realizado = status;
    if (status === 'SIM') {
        c.alojamento_lancado_em = cleanDate(c.alojamento_lancado_em) || todayInputDate();
    } else {
        c.alojamento_responsavel = '';
    }
    c.lastStageUpdate = todayInputDate();
    saveData();
    renderCurrentPage();
    updateAlertIcon();
}

function updateCandidateAlojamentoResponsavel(id, value) {
    const c = CANDIDATES.find(x => x.id === id);
    if (!c) return;
    c.alojamento_realizado = 'SIM';
    c.alojamento_responsavel = cleanString(value || '', 100).toUpperCase();
    c.lastStageUpdate = todayInputDate();
    saveData();
    updateAlertIcon();
}

// ============================================================
// 🧭 NAVIGATION & CORE UI
// ============================================================

function selectPage(page) {
    currentPage = page;
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.toggle('active', n.dataset.page === page);
    });
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(`page-${page}`).classList.remove('hidden');
    
    const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
    const titleNode = navItem ? navItem.cloneNode(true) : null;
    titleNode?.querySelectorAll('.material-symbols-outlined').forEach(icon => icon.remove());
    document.getElementById('topbar-title').textContent = titleNode ? titleNode.textContent.trim() : "Dashboard";
    
    const actionBtn = document.getElementById('topbar-action-btn');
    actionBtn.classList.remove('hidden');
    if (page === 'dashboard') {
        actionBtn.innerHTML = '<span class="material-symbols-outlined text-sm">assignment_add</span> Nova RM';
        actionBtn.onclick = openNewSolicitationModal;
    } else if (page === 'treinamentos') {
        actionBtn.innerHTML = '<span class="material-symbols-outlined text-sm">add_circle</span> Nova Função';
        actionBtn.onclick = openNewFunctionModal;
    } else if (page === 'solicitacao') {
        actionBtn.innerHTML = '<span class="material-symbols-outlined text-sm">add</span> Nova RM';
        actionBtn.onclick = openNewSolicitationModal;
    } else if (page === 'vagas') {
        actionBtn.innerHTML = '<span class="material-symbols-outlined text-sm">assignment_add</span> Nova RM';
        actionBtn.onclick = openNewSolicitationModal;
    } else if (page === 'mobilizacao') {
        actionBtn.innerHTML = '<span class="material-symbols-outlined text-sm">person_add</span> Nova Pessoa';
        actionBtn.onclick = openAddPersonModal;
    } else if (page === 'alojamento') {
        actionBtn.innerHTML = '<span class="material-symbols-outlined text-sm">groups</span> Gestão de Pessoas';
        actionBtn.onclick = () => selectPage('recrutamento');
    } else {
        actionBtn.classList.add('hidden');
        actionBtn.onclick = null;
    }

    renderCurrentPage();
    updateAlertIcon();
}

function renderCurrentPage() {
    if (currentPage === 'dashboard') renderDashboard();
        else if (currentPage === 'treinamentos') renderTreinamentos();
    else if (currentPage === 'recrutamento') renderRecrutamento();
    else if (currentPage === 'matriz-recrutamento') renderMatrizRecrutamento();
    else if (currentPage === 'mobilizacao') renderMobilização();
    else if (currentPage === 'cracha') renderCracha();
    else if (currentPage === 'alojamento') renderAlojamento();
    else if (currentPage === 'solicitacao') renderSolicitacoes();
    else if (currentPage === 'vagas') renderVagas();
    else {
        document.getElementById(`page-${currentPage}`).innerHTML = `<div class="empty-state rounded-2xl p-12 text-center text-muted">Modulo em desenvolvimento.</div>`;
    }
}

function updateAlertIcon() {
    const stagnantCount = CANDIDATES.filter(c => getCandidateStatus(c).stagnant).length;
    const alertIcon = document.getElementById('mob-alert-icon');
    if (alertIcon) alertIcon.classList.toggle('hidden', stagnantCount === 0);

    const alojamentoPendentes = typeof getAlojamentoPendentesTratamento === 'function' ? getAlojamentoPendentesTratamento().length : 0;
    const alojamentoIcon = document.getElementById('alojamento-alert-icon');
    const alojamentoCount = document.getElementById('alojamento-alert-count');
    if (alojamentoIcon) alojamentoIcon.classList.toggle('hidden', alojamentoPendentes === 0);
    if (alojamentoCount) {
        alojamentoCount.textContent = String(alojamentoPendentes);
        alojamentoCount.classList.toggle('hidden', alojamentoPendentes === 0);
    }

    updateVacancyBadge();
}

// ============================================================
// 🆕 MODALS
// ============================================================

function openModal(content) {
    const modal = document.getElementById('modal');
    modal.innerHTML = content;
    document.getElementById('modal-overlay').classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.remove('scale-95');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('opacity-0', 'pointer-events-none');
    document.getElementById('modal').classList.add('scale-95');
}

function openAddPersonModal(preselectedFunc = '', preselectedRm = '', preselectedDigitalObra = '') {
    const normalizedPreselectedFunc = cleanString(preselectedFunc, 80).toUpperCase();
    const defaultFunc = TRAINING_MATRIX.some(f => f.function === normalizedPreselectedFunc) ? normalizedPreselectedFunc : (TRAINING_MATRIX[0]?.function || '');
    const linkedRm = cleanString(preselectedRm, 24).replace(/\D/g, '');
    const linkedDigitalObra = cleanAlphanumeric(preselectedDigitalObra, 40);
    openModal(`
        <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 class="font-display font-bold text-lg">Cadastrar Nova Pessoa</h3>
            <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-6 space-y-4 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Nome Completo *</label>
                    <input type="text" id="p-name" class="modal-input uppercase" placeholder="EX: JOAO DA SILVA" maxlength="100" oninput="maskUppercaseInput(this, 100)" required>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">CPF *</label>
                    <input type="text" id="p-cpf" class="modal-input" placeholder="000.000.000-00" inputmode="numeric" maxlength="14" oninput="maskCpfInput(this)" required>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Telefone *</label>
                    <input type="tel" id="p-phone" class="modal-input" placeholder="(00) 00000-0000" inputmode="numeric" maxlength="15" oninput="maskPhoneInput(this)" required>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Cidade Natal *</label>
                    <input type="text" id="p-city" class="modal-input uppercase" placeholder="EX: BELO HORIZONTE" maxlength="80" oninput="maskUppercaseInput(this, 80)" required>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Estado *</label>
                    <input type="text" id="p-state" class="modal-input uppercase" placeholder="UF" maxlength="2" oninput="maskUppercaseInput(this, 2)" required>
                </div>
                <div class="md:col-span-2">
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Função *</label>
                    <select id="p-func" class="modal-input" onchange="updateNewPersonRecruitmentDates()" required>
                        ${TRAINING_MATRIX.map(f => `<option value="${escapeHtml(f.function)}" ${f.function === defaultFunc ? 'selected' : ''}>${escapeHtml(f.function)}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">RM Vinculada</label>
                    <input type="text" id="p-rm" class="modal-input font-mono" value="${escapeHtml(linkedRm)}" placeholder="Sem RM" inputmode="numeric" maxlength="24" ${linkedRm ? 'readonly' : ''}>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Obra Vinculada</label>
                    <input type="text" id="p-digital-obra" class="modal-input font-mono" value="${escapeHtml(linkedDigitalObra)}" placeholder="Sem Obra" maxlength="40" oninput="maskAlphanumericInput(this, 40)" ${linkedDigitalObra ? 'readonly' : ''}>
                </div>
                <div class="md:col-span-2">
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data Recrutamento *</label>
                    <input type="date" id="p-recruited" class="modal-input" value="${todayInputDate()}" oninput="updateNewPersonRecruitmentDates()" onchange="updateNewPersonRecruitmentDates()" required>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data ASO Prevista</label>
                    <input type="date" id="p-aso-planned" class="modal-input auto-date-input" readonly>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data ASO Realizada</label>
                    <input type="date" id="p-aso-real" class="modal-input" title="Preencha quando o ASO for realizado">
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data de Admissão Prevista</label>
                    <input type="date" id="p-admission-planned" class="modal-input auto-date-input" readonly>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data de Admissão Real</label>
                    <input type="date" id="p-admitted-real" class="modal-input" title="Ao preencher esta data, a pessoa passa a aparecer em Mobilização">
                </div>
            </div>
            <div class="rounded-xl border border-primary/20 bg-primary/5 p-3 text-[11px] text-muted">
                ASO e Admissão prevista são calculados automaticamente pela Matriz de Recrutamento. As datas reais são digitáveis; quando ASO real e Admissão real forem preenchidos, a pessoa também aparece em Mobilização sem sair da Gestão de Pessoas.
            </div>
        </div>
        <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
            <button onclick="closeModal()" class="btn btn-ghost">Cancelar</button>
            <button onclick="saveNewPerson()" class="btn btn-primary px-8">Salvar Pessoa</button>
        </div>
    `);
    updateNewPersonRecruitmentDates();
}

function formatDateInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isBusinessDay(date) {
    const day = date.getDay();
    return day !== 0 && day !== 6;
}

function addBusinessDaysToInputDate(inputDate, days) {
    if (!inputDate) return '';
    const [year, month, day] = inputDate.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    let remaining = clampNumber(days, 0, 365, 0);
    while (remaining > 0) {
        date.setDate(date.getDate() + 1);
        if (isBusinessDay(date)) remaining -= 1;
    }
    return formatDateInput(date);
}

function addDaysToInputDate(inputDate, days) {
    return addBusinessDaysToInputDate(inputDate, days);
}

function updateNewPersonRecruitmentDates() {
    const func = document.getElementById('p-func')?.value;
    const recruited = document.getElementById('p-recruited')?.value;
    const asoInput = document.getElementById('p-aso-planned');
    const admittedInput = document.getElementById('p-admission-planned');
    const matrix = TRAINING_MATRIX.find(f => f.function === func);
    if (!recruited || !matrix || !asoInput || !admittedInput) return;

    const asoDate = addBusinessDaysToInputDate(recruited, matrix.aso_days);
    const admittedDate = addBusinessDaysToInputDate(asoDate, matrix.admission_days);
    asoInput.value = asoDate;
    admittedInput.value = admittedDate;
}

function saveNewPerson() {
    updateNewPersonRecruitmentDates();
    const name = cleanString(document.getElementById('p-name').value, 100).toUpperCase();
    const cpf = onlyDigits(document.getElementById('p-cpf').value).slice(0, 11);
    const phone = onlyDigits(document.getElementById('p-phone').value).slice(0, 11);
    const city = cleanString(document.getElementById('p-city').value, 80).toUpperCase();
    const state = cleanString(document.getElementById('p-state').value, 2).toUpperCase();
    const func = cleanString(document.getElementById('p-func').value, 80).toUpperCase();
    const rm = cleanString(document.getElementById('p-rm')?.value || '', 24).replace(/\D/g, '');
    const digitalObra = cleanAlphanumeric(document.getElementById('p-digital-obra')?.value || '', 40);
    const recruited = document.getElementById('p-recruited').value;
    const asoPlanned = document.getElementById('p-aso-planned').value;
    const admissionPlanned = document.getElementById('p-admission-planned').value;
    const asoReal = document.getElementById('p-aso-real').value || null;
    const admittedReal = document.getElementById('p-admitted-real').value || null;
    const flowError = validatePersonFlow(recruited, asoReal, admittedReal);

    if (name.length < 3) return alert("Preencha o nome completo com pelo menos 3 caracteres.");
    if (cpf.length !== 11) return alert("Informe um CPF com 11 numeros.");
    if (phone.length !== 11) return alert("Informe um celular valido com DDD e 9 digitos.");
    if (!city) return alert("Informe a cidade natal.");
    if (state.length !== 2) return alert("Informe o estado com 2 letras.");
    if (!asoPlanned || !admissionPlanned) return alert("Nao foi possivel calcular ASO previsto e Ativacao prevista para a funcao selecionada.");
    if (flowError) return alert(flowError);
    if (rm && !digitalObra) return alert("Informe a Obra Vinculada da RM.");
    if (digitalObra && !rm) return alert("Informe a RM vinculada à Obra Vinculada.");
    const linkedVacancy = getVacancyRowByLink(func, rm, digitalObra);
    if (linkedVacancy && linkedVacancy.open <= 0 && linkedVacancy.requested > 0) return alert(`Nao ha saldo disponivel para RM ${linkedVacancy.rm} / ${linkedVacancy.digital_obra}.`);
    if (CANDIDATES.some(c => onlyDigits(c.cpf) === cpf)) return alert("Ja existe uma pessoa cadastrada com este CPF.");
    
    CANDIDATES.push({
        id: nextCandidateId(),
        name,
        cpf,
        phone,
        city,
        state,
        func,
        rm,
        digital_obra: digitalObra,
        recruited,
        aso_planned: asoPlanned,
        admission_planned: admissionPlanned,
        aso: asoReal,
        admitted: admittedReal,
        training_start_planned: cleanDate(item?.training_start_planned),
        training_start_real: cleanDate(item?.training_start_real),
        training_end_planned: cleanDate(item?.training_end_planned),
        training_end_real: cleanDate(item?.training_end_real),
        badge_ok: false,
        badge_posted_date: null,
        badge_release_days: BADGE_RELEASE_DAYS_DEFAULT,
        badge_real_date: null,
        badge_delay_reason: "",
        alojado: false,
        alojamento_lancado_em: null,
        declined_date: null,
        declined_reason: "",
        trainings: [],
        lastStageUpdate: admittedReal || asoReal || recruited
    });
    saveData();
    closeModal();
    renderCurrentPage();
}

function openEditPersonModal(id) {
    const c = CANDIDATES.find(x => x.id === id);
    const asoPlanned = cleanDate(c.aso_planned) || cleanDate(c.aso) || '';
    const admissionPlanned = cleanDate(c.admission_planned) || cleanDate(c.admitted) || '';
    const asoReal = cleanDate(c.aso) || '';
    const admittedReal = cleanDate(c.admitted) || '';
    const linkedRm = cleanString(c.rm || '', 24).replace(/\D/g, '');
    const linkedDigitalObra = cleanAlphanumeric(c.digital_obra || '', 40);
    const isAlojado = Boolean(c.alojado);
    const alojamentoLancadoEm = cleanDate(c.alojamento_lancado_em) || '';
    openModal(`
        <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 class="font-display font-bold text-lg">Editar Pessoa: ${escapeHtml(c.name)}</h3>
            <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-6 space-y-5 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="md:col-span-2">
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Nome Completo *</label>
                    <input type="text" id="p-name" class="modal-input uppercase" value="${escapeHtml(c.name)}" maxlength="100" oninput="maskUppercaseInput(this, 100)" required>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">CPF *</label>
                    <input type="text" id="p-cpf" class="modal-input" value="${escapeHtml(formatCpf(c.cpf))}" inputmode="numeric" maxlength="14" oninput="maskCpfInput(this)" required>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Telefone *</label>
                    <input type="tel" id="p-phone" class="modal-input" value="${escapeHtml(formatPhone(c.phone))}" inputmode="numeric" maxlength="15" oninput="maskPhoneInput(this)" required>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Cidade Natal *</label>
                    <input type="text" id="p-city" class="modal-input uppercase" value="${escapeHtml(c.city || '')}" maxlength="80" oninput="maskUppercaseInput(this, 80)" required>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Estado *</label>
                    <input type="text" id="p-state" class="modal-input uppercase" value="${escapeHtml(c.state || '')}" maxlength="2" oninput="maskUppercaseInput(this, 2)" required>
                </div>
                <div class="md:col-span-2">
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Função *</label>
                    <select id="p-func" class="modal-input" onchange="updateNewPersonRecruitmentDates()" required>
                        ${TRAINING_MATRIX.map(f => `<option value="${escapeHtml(f.function)}" ${f.function === c.func ? 'selected' : ''}>${escapeHtml(f.function)}</option>`).join('')}
                    </select>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">RM Vinculada</label>
                    <input type="text" id="p-rm" class="modal-input font-mono" value="${escapeHtml(linkedRm)}" placeholder="Sem RM" inputmode="numeric" maxlength="24">
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Obra Vinculada</label>
                    <input type="text" id="p-digital-obra" class="modal-input font-mono" value="${escapeHtml(linkedDigitalObra)}" placeholder="Sem Obra" maxlength="40" oninput="maskAlphanumericInput(this, 40)">
                </div>
                <div class="md:col-span-2 rounded-xl border border-outline-variant bg-surface-container-low p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        <div>
                            <label class="text-[10px] font-bold uppercase text-muted block mb-1">Alojado?</label>
                            <select id="p-alojado" class="modal-input">
                                <option value="NAO" ${!isAlojado ? 'selected' : ''}>Não</option>
                                <option value="SIM" ${isAlojado ? 'selected' : ''}>Sim</option>
                            </select>
                        </div>
                        <div>
                            <p class="text-[10px] font-bold uppercase text-muted mb-1">Lançamento em Alojamento</p>
                            <div class="h-10 rounded-lg border border-outline-variant bg-surface-container-high px-4 flex items-center text-xs font-bold ${isAlojado ? 'text-green-400' : 'text-muted'}">
                                ${isAlojado ? `Lançado${alojamentoLancadoEm ? ' em ' + escapeHtml(alojamentoLancadoEm) : ''}` : 'Não lançado'}
                            </div>
                        </div>
                    </div>
                    <p class="text-[11px] text-muted mt-3">Ao marcar Sim e salvar, a pessoa passa a aparecer automaticamente no módulo Alojamento, permanecendo também na Gestão de Pessoas.</p>
                </div>
                <div class="md:col-span-2">
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data Recrutamento *</label>
                    <input type="date" id="p-recruited" class="modal-input" value="${c.recruited || ''}" oninput="updateNewPersonRecruitmentDates()" onchange="updateNewPersonRecruitmentDates()" required>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data ASO Prevista</label>
                    <input type="date" id="p-aso-planned" class="modal-input auto-date-input" value="${asoPlanned}" readonly>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data ASO Realizada</label>
                    <input type="date" id="p-aso-real" class="modal-input" value="${asoReal}">
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data de Admissão Prevista</label>
                    <input type="date" id="p-admission-planned" class="modal-input auto-date-input" value="${admissionPlanned}" readonly>
                </div>
                <div>
                    <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data de Admissão Real</label>
                    <input type="date" id="p-admitted-real" class="modal-input" value="${admittedReal}">
                </div>
            </div>
            <div class="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                 <p class="text-[10px] uppercase font-bold text-primary mb-1">Status Atual Projetado</p>
                 <div class="text-sm font-bold text-on-surface">${getCandidateStatus(c).label}</div>
                 <p class="text-[11px] text-muted mt-1">Com a Data de Admissão Real preenchida, o cadastro também aparece em Mobilização e continua nesta Gestão de Pessoas.</p>
            </div>
            <div class="p-4 bg-error/5 border border-error/25 rounded-xl">
                <button type="button" onclick="toggleDeclineFields()" class="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-error-container px-5 py-3 text-sm font-black text-on-error-container border border-error/40 shadow-lg shadow-red-950/20 transition-all hover:brightness-110 active:scale-95">
                    <span class="material-symbols-outlined text-xl">block</span>
                    DECLINADO
                </button>
                <div id="decline-fields" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ${c.declined_date ? '' : 'hidden'}">
                    <div>
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Data do Declinio</label>
                        <input type="date" id="p-declined-date" class="modal-input" value="${c.declined_date || ''}">
                    </div>
                    <div class="md:col-span-2">
                        <label class="text-[10px] font-bold uppercase text-muted block mb-1">Observacao / Motivo</label>
                        <textarea id="p-declined-reason" class="modal-input min-h-[88px] uppercase" maxlength="240" oninput="maskUppercaseInput(this, 240)" placeholder="INFORME O MOTIVO DO DECLINIO">${escapeHtml(c.declined_reason || '')}</textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
            <button onclick="closeModal()" class="btn btn-ghost">Cancelar</button>
            <button onclick="saveEditPerson(${c.id})" class="btn btn-primary px-8">Salvar Alteracoes</button>
        </div>
    `);
    updateNewPersonRecruitmentDates();
}

function toggleDeclineFields() {
    const fields = document.getElementById('decline-fields');
    if (fields) fields.classList.toggle('hidden');
}

function saveEditPerson(id) {
    updateNewPersonRecruitmentDates();
    const c = CANDIDATES.find(x => x.id === id);
    const name = cleanString(document.getElementById('p-name').value, 100).toUpperCase();
    const cpf = onlyDigits(document.getElementById('p-cpf').value).slice(0, 11);
    const phone = onlyDigits(document.getElementById('p-phone').value).slice(0, 11);
    const city = cleanString(document.getElementById('p-city').value, 80).toUpperCase();
    const state = cleanString(document.getElementById('p-state').value, 2).toUpperCase();
    const func = cleanString(document.getElementById('p-func').value, 80).toUpperCase();
    const rm = cleanString(document.getElementById('p-rm')?.value || '', 24).replace(/\D/g, '');
    const digitalObra = cleanAlphanumeric(document.getElementById('p-digital-obra')?.value || '', 40);
    const recruited = document.getElementById('p-recruited').value;
    const asoPlanned = document.getElementById('p-aso-planned').value;
    const admissionPlanned = document.getElementById('p-admission-planned').value;
    const asoReal = document.getElementById('p-aso-real').value || null;
    const admittedReal = document.getElementById('p-admitted-real').value || null;
    const alojado = document.getElementById('p-alojado')?.value === 'SIM';
    const declinedDate = document.getElementById('p-declined-date')?.value || null;
    const declinedReason = cleanString(document.getElementById('p-declined-reason')?.value || '', 240).toUpperCase();
    const flowError = validatePersonFlow(recruited, asoReal, admittedReal);

    if (name.length < 3) return alert("Preencha o nome completo com pelo menos 3 caracteres.");
    if (cpf.length !== 11) return alert("Informe um CPF com 11 numeros.");
    if (phone.length !== 11) return alert("Informe um celular valido com DDD e 9 digitos.");
    if (!city) return alert("Informe a cidade natal.");
    if (state.length !== 2) return alert("Informe o estado com 2 letras.");
    if (!asoPlanned || !admissionPlanned) return alert("Nao foi possivel calcular ASO previsto e Ativacao prevista para a funcao selecionada.");
    if (flowError) return alert(flowError);
    if (rm && !digitalObra) return alert("Informe a Obra Vinculada da RM.");
    if (digitalObra && !rm) return alert("Informe a RM vinculada à Obra Vinculada.");
    const originalVacancyKey = getVacancyKey(c.rm || '', c.digital_obra || '', c.func || '');
    const targetVacancyKey = getVacancyKey(rm, digitalObra, func);
    if (!declinedDate && rm && digitalObra && targetVacancyKey !== originalVacancyKey) {
        const linkedVacancy = getVacancyRowByLink(func, rm, digitalObra);
        if (linkedVacancy && linkedVacancy.open <= 0 && linkedVacancy.requested > 0) return alert(`Nao ha saldo disponivel para RM ${linkedVacancy.rm} / ${linkedVacancy.digital_obra}.`);
    }
    if (declinedDate && !declinedReason) return alert("Informe o motivo do declinio.");
    if (!declinedDate && declinedReason) return alert("Informe a data do declinio.");
    if (CANDIDATES.some(x => x.id !== id && onlyDigits(x.cpf) === cpf)) return alert("Ja existe outra pessoa cadastrada com este CPF.");
    
    if (recruited !== c.recruited || asoPlanned !== c.aso_planned || admissionPlanned !== c.admission_planned || asoReal !== c.aso || admittedReal !== c.admitted || func !== c.func || rm !== (c.rm || '') || digitalObra !== (c.digital_obra || '') || alojado !== Boolean(c.alojado)) {
        c.lastStageUpdate = new Date().toISOString().split('T')[0];
    }

    c.name = name;
    c.cpf = cpf;
    c.phone = phone;
    c.city = city;
    c.state = state;
    c.func = func;
    c.rm = rm;
    c.digital_obra = digitalObra;
    c.recruited = recruited;
    c.aso_planned = asoPlanned;
    c.admission_planned = admissionPlanned;
    c.aso = asoReal;
    c.admitted = admittedReal;
    c.badge_release_days = clampNumber(c.badge_release_days, 0, 60, BADGE_RELEASE_DAYS_DEFAULT);
    refreshBadgeConclusion(c);
    c.alojado = alojado;
    c.alojamento_lancado_em = alojado ? (cleanDate(c.alojamento_lancado_em) || todayInputDate()) : null;
    c.declined_date = declinedDate;
    c.declined_reason = declinedReason;
    syncBadgeQueueForCandidate(c);
    
    saveData();
    closeModal();
    renderCurrentPage();
}

function openCandidateTrainingsModal(id) {
    const c = CANDIDATES.find(x => x.id === id);
    const matrix = TRAINING_MATRIX.find(m => m.function === c.func);
    
    openModal(`
        <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <div>
                <h3 class="font-display font-bold text-lg">Matriz de Treinamento</h3>
                <p class="text-[10px] text-muted font-bold uppercase tracking-widest">${escapeHtml(c.name)} - ${escapeHtml(c.func)}</p>
            </div>
            <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-6 overflow-y-auto max-h-[614px]" data-stitch-vh="max-h-[614px]===max-h-[60vh]">
            <div class="space-y-3">
                ${matrix ? matrix.trainings.map(t => {
                    const ct = c.trainings.find(x => x.name === t.name);
                    return `
                        <div class="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined ${ct ? 'text-green-400' : 'text-muted'}">${ct ? 'check_circle' : 'circle'}</span>
                                <div>
                                    <p class="text-sm font-bold text-on-surface">${escapeHtml(t.name)}</p>
                                    <p class="text-[10px] text-muted uppercase font-bold">${t.hours} Horas • ${t.required === 'E' ? 'Eletivo' : 'Obrigatório'}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2">
                                <input type="date" value="${ct ? ct.date : ''}" class="modal-input w-auto text-xs" 
                                    onchange='toggleCandidateTraining(${c.id}, ${jsArg(t.name)}, this.value)'>
                            </div>
                        </div>
                    `;
                }).join('') : '<p class="text-center py-4 text-muted">Função não configurada na matriz.</p>'}
            </div>
        </div>
        <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end">
            <button onclick="closeModal()" class="btn btn-primary px-8">Concluir</button>
        </div>
    `);
}

function toggleCandidateTraining(candidateId, trainingName, date) {
    const c = CANDIDATES.find(x => x.id === candidateId);
    const existingIdx = c.trainings.findIndex(t => t.name === trainingName);
    
    if (date) {
        if (existingIdx > -1) {
            c.trainings[existingIdx].date = date;
        } else {
            c.trainings.push({ name: trainingName, date: date });
        }
    } else {
        if (existingIdx > -1) {
            c.trainings.splice(existingIdx, 1);
        }
    }
    c.lastStageUpdate = new Date().toISOString().split('T')[0];
    syncBadgeQueueForCandidate(c);
    saveData();
    if (currentPage === 'mobilizacao') renderMobilização();
    if (currentPage === 'cracha') renderCracha();
}

function deleteCandidate(id) {
    if(!confirm("Deseja realmente remover esta pessoa do sistema?")) return;
    CANDIDATES = CANDIDATES.filter(c => c.id !== id);
    saveData();
    closeModal();
    renderCurrentPage();
}

// ============================================================
// 💼 SOLICITATION MODULE (RM)
// ============================================================

function renderSolicitacoes() {
    const container = document.getElementById('page-solicitacao');
    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex justify-between items-center">
                <h3 class="text-xl font-display font-bold">Solicitações de Mão de Obra</h3>
            </div>
            <div class="card rounded-2xl overflow-hidden table-scroll">
                <table class="w-full min-w-[1080px] text-left text-sm">
                    <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                        <tr>
                            <th class="px-6 py-4">RM</th>
                            <th class="px-6 py-4">Obra</th>
                            <th class="px-6 py-4">Data</th>
                            <th class="px-6 py-4">Função</th>
                            <th class="px-6 py-4">Qtd</th>
                            <th class="px-6 py-4">Status / Justificativa</th>
                            <th class="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-outline-variant">
                        ${SOLICITATIONS.length ? SOLICITATIONS.map((s, idx) => {
                            const canceled = isSolicitationCanceled(s);
                            const statusBadge = canceled
                                ? '<span class="badge bg-red-500/10 text-red-400 border-red-500/20"><span class="material-symbols-outlined text-[13px]">cancel</span> Cancelada</span>'
                                : '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Aberta</span>';
                            const reason = canceled && s.cancel_reason
                                ? `<p class="mt-2 text-[11px] leading-snug text-muted max-w-[340px]">${escapeHtml(s.cancel_reason)}</p>`
                                : '';
                            const cancelAction = canceled
                                ? `<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-muted border border-outline-variant cursor-not-allowed opacity-70" disabled title="RM cancelada em ${escapeHtml(s.canceled_at || '-')}"><span class="material-symbols-outlined text-sm">cancel</span> Cancelada</button>`
                                : `<button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/20" onclick="openCancelSolicitationModal(${idx})" title="Cancelar solicitação com justificativa obrigatória"><span class="material-symbols-outlined text-sm">cancel</span> Cancelar</button>`;
                            return `
                            <tr class="hover:bg-surface-container-highest transition-colors ${canceled ? 'opacity-75' : ''}">
                                <td class="px-6 py-4 font-mono font-bold ${canceled ? 'text-muted line-through' : 'text-primary'}">${escapeHtml(s.rm)}</td>
                                <td class="px-6 py-4 font-mono font-bold text-on-surface">${escapeHtml(s.digital_obra || '-')}</td>
                                <td class="px-6 py-4">${escapeHtml(s.date)}</td>
                                <td class="px-6 py-4 font-medium">${escapeHtml(s.func)}</td>
                                <td class="px-6 py-4">${escapeHtml(s.qty)}</td>
                                <td class="px-6 py-4">${statusBadge}${reason}</td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex flex-wrap justify-end gap-2">
                                        <button class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-primary hover:bg-primary/10 transition-colors border border-primary/20" onclick="openEditSolicitationModal(${idx})">
                                            <span class="material-symbols-outlined text-sm">edit</span> Editar
                                        </button>
                                        ${cancelAction}
                                    </div>
                                </td>
                            </tr>
                            `;
                        }).join('') : '<tr><td colspan="7" class="p-12 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma solicitacao registrada.</div></td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function openNewSolicitationModal() {
    openModal(`
        <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 class="font-display font-bold text-lg">Nova Solicitação de M.O.</h3>
            <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-6 space-y-4">
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">RM (Somente Números)</label>
                <input type="number" id="s-rm" class="modal-input" placeholder="00000">
            </div>
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">Obra (Alfanumérico)</label>
                <input type="text" id="s-digital-obra" class="modal-input font-mono" placeholder="Ex.: OBRA2026A01" maxlength="40" oninput="maskAlphanumericInput(this, 40)">
            </div>
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">Função</label>
                <select id="s-func" class="modal-input">
                    ${TRAINING_MATRIX.map(f => `<option value="${escapeHtml(f.function)}">${escapeHtml(f.function)}</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">Quantidade</label>
                <input type="number" id="s-qty" class="modal-input" value="1">
            </div>
        </div>
        <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
            <button onclick="closeModal()" class="btn btn-ghost">Cancelar</button>
            <button onclick="saveSolicitation()" class="btn btn-primary px-8">Registrar RM</button>
        </div>
    `);
}

function saveSolicitation() {
    const rm = cleanString(document.getElementById('s-rm').value, 24).replace(/\D/g, '');
    const digitalObra = cleanAlphanumeric(document.getElementById('s-digital-obra').value, 40);
    const func = cleanString(document.getElementById('s-func').value, 80);
    const qty = clampNumber(document.getElementById('s-qty').value, 1, 999, 0);
    if(!rm || !digitalObra || !qty) return alert("Preencha RM numerica, Obra alfanumerico e quantidade valida.");
    
    SOLICITATIONS.push({
        rm: rm,
        digital_obra: digitalObra,
        date: new Date().toLocaleDateString('pt-BR'),
        func: func,
        qty: qty,
        canceled: false,
        status: 'ABERTA',
        cancel_reason: '',
        canceled_at: ''
    });
    
    saveData();
    
    closeModal();
    renderCurrentPage();
}

function openEditSolicitationModal(index) {
    const solicitation = SOLICITATIONS[index];
    if (!solicitation) return alert('Solicitação não encontrada para edição.');
    openModal(`
        <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 class="font-display font-bold text-lg">Editar Solicitação de M.O.</h3>
            <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-6 space-y-4">
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">RM (Somente Números)</label>
                <input type="number" id="s-edit-rm" class="modal-input" placeholder="00000" value="${escapeHtml(solicitation.rm)}">
            </div>
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">Obra (Alfanumérico)</label>
                <input type="text" id="s-edit-digital-obra" class="modal-input font-mono" placeholder="Ex.: OBRA2026A01" maxlength="40" oninput="maskAlphanumericInput(this, 40)" value="${escapeHtml(solicitation.digital_obra || '')}">
            </div>
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">Função</label>
                <select id="s-edit-func" class="modal-input">
                    ${TRAINING_MATRIX.map(f => `<option value="${escapeHtml(f.function)}" ${f.function === solicitation.func ? 'selected' : ''}>${escapeHtml(f.function)}</option>`).join('')}
                </select>
            </div>
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">Quantidade</label>
                <input type="number" id="s-edit-qty" class="modal-input" min="1" max="999" value="${escapeHtml(solicitation.qty)}">
            </div>
            <div class="rounded-xl border border-outline-variant bg-surface-container-low p-4">
                <p class="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">Data original</p>
                <p class="text-sm font-semibold text-on-surface">${escapeHtml(solicitation.date || '-')}</p>
            </div>
        </div>
        <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
            <button onclick="closeModal()" class="btn btn-ghost">Cancelar</button>
            <button onclick="updateSolicitation(${index})" class="btn btn-primary px-8">Salvar Alterações</button>
        </div>
    `);
}

function updateSolicitation(index) {
    const existing = SOLICITATIONS[index];
    if (!existing) return alert('Solicitação não encontrada para edição.');

    const rm = cleanString(document.getElementById('s-edit-rm').value, 24).replace(/\D/g, '');
    const digitalObra = cleanAlphanumeric(document.getElementById('s-edit-digital-obra').value, 40);
    const func = cleanString(document.getElementById('s-edit-func').value, 80);
    const qty = clampNumber(document.getElementById('s-edit-qty').value, 1, 999, 0);
    if(!rm || !digitalObra || !qty) return alert("Preencha RM numerica, Obra alfanumerico e quantidade valida.");

    SOLICITATIONS[index] = sanitizeSolicitation({
        ...existing,
        rm: rm,
        digital_obra: digitalObra,
        func: func,
        qty: qty,
        date: existing.date || new Date().toLocaleDateString('pt-BR')
    });

    saveData();
    closeModal();
    renderCurrentPage();
}

function openCancelSolicitationModal(index) {
    const solicitation = SOLICITATIONS[index];
    if (!solicitation) return alert('Solicitação não encontrada para cancelamento.');
    if (isSolicitationCanceled(solicitation)) return alert('Esta solicitação já está cancelada.');
    openModal(`
        <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-red-400 text-2xl">cancel</span>
                <h3 class="font-display font-bold text-lg">Cancelar Solicitação de M.O.</h3>
            </div>
            <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-6 space-y-4">
            <div class="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                <p class="text-[10px] font-bold uppercase text-red-300 tracking-widest mb-2">Atenção</p>
                <p class="text-sm text-on-surface">Ao cancelar, esta RM deixa de compor a quantidade de vagas em aberto. A justificativa é obrigatória.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div class="rounded-xl border border-outline-variant bg-surface-container-low p-4">
                    <p class="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">RM</p>
                    <p class="font-mono font-bold text-primary">${escapeHtml(solicitation.rm || '-')}</p>
                </div>
                <div class="rounded-xl border border-outline-variant bg-surface-container-low p-4">
                    <p class="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">Função</p>
                    <p class="text-sm font-bold text-on-surface">${escapeHtml(solicitation.func || '-')}</p>
                </div>
                <div class="rounded-xl border border-outline-variant bg-surface-container-low p-4">
                    <p class="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">Qtd</p>
                    <p class="font-mono font-bold text-on-surface">${escapeHtml(solicitation.qty || '0')}</p>
                </div>
            </div>
            <div>
                <label class="text-[10px] font-bold uppercase text-muted block mb-1">Justificativa do cancelamento *</label>
                <textarea id="s-cancel-reason" class="modal-input min-h-[120px] resize-y" maxlength="500" placeholder="Descreva o motivo do cancelamento da solicitação de mão de obra."></textarea>
                <p class="text-[10px] text-muted mt-1">Obrigatório. Máximo de 500 caracteres.</p>
            </div>
        </div>
        <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
            <button onclick="closeModal()" class="btn btn-ghost">Voltar</button>
            <button onclick="cancelSolicitation(${index})" class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all bg-red-500/90 hover:bg-red-500 text-white active:scale-95">
                <span class="material-symbols-outlined text-sm">cancel</span> Confirmar Cancelamento
            </button>
        </div>
    `);
}

function cancelSolicitation(index) {
    const solicitation = SOLICITATIONS[index];
    if (!solicitation) return alert('Solicitação não encontrada para cancelamento.');

    const reason = cleanString(document.getElementById('s-cancel-reason')?.value || '', 500);
    if (!reason || reason.length < 3) return alert('Informe a justificativa do cancelamento.');

    SOLICITATIONS[index] = sanitizeSolicitation({
        ...solicitation,
        canceled: true,
        status: 'CANCELADA',
        cancel_reason: reason,
        canceled_at: new Date().toLocaleDateString('pt-BR')
    });

    saveData();
    closeModal();
    renderCurrentPage();
}

// ============================================================
// 🎓 MATRIX ACTIONS
// ============================================================

function selectTrainingFunc(func) {
    selectedFunction = func;
    renderTreinamentos();
}

function updateTrainingHours(funcName, trIdx, val) {
    const f = TRAINING_MATRIX.find(x => x.function === funcName);
    if (!f || !f.trainings[trIdx]) return;
    f.trainings[trIdx].hours = Math.max(0, parseInt(val, 10) || 0);
    f.total_hours = f.trainings.reduce((s, t) => s + (t.required === 'E' ? 0 : (parseInt(t.hours) || 0)), 0);
    f.days = parseFloat((f.total_hours / 7).toFixed(1));
    saveData();
    renderTrainingFunctionDetail(funcName);
}

function updateTrainingRequired(funcName, trIdx, val) {
    const f = TRAINING_MATRIX.find(x => x.function === funcName);
    if (!f || !f.trainings[trIdx]) return;
    f.trainings[trIdx].required = val === 'E' ? 'E' : 'O';
    f.total_hours = f.trainings.reduce((s, t) => s + (t.required === 'E' ? 0 : (parseInt(t.hours) || 0)), 0);
    f.days = parseFloat((f.total_hours / 7).toFixed(1));
    saveData();
    renderTrainingFunctionDetail(funcName);
}

function deleteTrainingFromFunc(funcName, trIdx) {
    const f = TRAINING_MATRIX.find(x => x.function === funcName);
    if (!f || !f.trainings[trIdx]) return;
    f.trainings.splice(trIdx, 1);
    f.total_hours = f.trainings.reduce((s, t) => s + (t.required === 'E' ? 0 : (parseInt(t.hours) || 0)), 0);
    f.days = parseFloat((f.total_hours / 7).toFixed(1));
    saveData();
    renderTrainingFunctionDetail(funcName);
}

function openAddTrainingModal(funcName) {
    openModal(`
        <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 class="font-display font-bold text-lg">Novo Treinamento para ${escapeHtml(funcName)}</h3>
            <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-6 space-y-4">
            <input type="text" id="tr-name" class="modal-input" placeholder="Nome do Treinamento">
            <div class="grid grid-cols-2 gap-4">
                <input type="number" id="tr-hours" class="modal-input" placeholder="Carga Horária (h)" value="4">
                <select id="tr-req" class="modal-input">
                    <option value="O">Obrigatório</option>
                    <option value="E">Eletivo</option>
                </select>
            </div>
        </div>
        <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
            <button onclick='saveNewTraining(${jsArg(funcName)})' class="btn btn-primary w-full">Adicionar</button>
        </div>
    `);
}

function saveNewTraining(funcName) {
    const name = cleanString(document.getElementById('tr-name').value, 140);
    const hours = clampNumber(document.getElementById('tr-hours').value, 0, 200, 0);
    const req = document.getElementById('tr-req').value;
    if (!name) return alert("Informe o nome do treinamento.");
    const f = TRAINING_MATRIX.find(x => x.function === funcName);
    if (!f) return;
    if (f.trainings.some(t => t.name.toUpperCase() === name.toUpperCase())) return alert("Este treinamento ja existe para a função.");
    f.trainings.push({ name, hours, required: req });
    f.total_hours = f.trainings.reduce((s, t) => s + (t.required === 'E' ? 0 : (parseInt(t.hours) || 0)), 0);
    f.days = parseFloat((f.total_hours / 7).toFixed(1));
    saveData();
    closeModal();
    renderTrainingFunctionDetail(funcName);
}

function openNewFunctionModal() {
    openModal(`
        <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <h3 class="font-display font-bold text-lg">Cadastrar Nova Função</h3>
            <button onclick="closeModal()" class="p-2 hover:bg-surface-variant rounded-full text-muted"><span class="material-symbols-outlined">close</span></button>
        </div>
        <div class="p-6">
            <label class="text-[10px] font-bold uppercase text-muted block mb-1">Nome da Função</label>
            <input type="text" id="nf-name" class="modal-input" placeholder="Ex: ENCARREGADO DE OBRAS">
        </div>
        <div class="p-6 bg-surface-container-low border-t border-outline-variant flex justify-end gap-3">
            <button onclick="saveNewFunctionMatrix()" class="btn btn-primary px-8">Criar Função</button>
        </div>
    `);
}

function saveNewFunctionMatrix() {
    const name = cleanString(document.getElementById('nf-name').value, 80).toUpperCase();
    if (!name) return alert("Informe o nome da função.");
    if (TRAINING_MATRIX.some(f => f.function === name)) return alert("Esta função já existe.");
    TRAINING_MATRIX.push({ function: name, recruitment_days: 2, aso_days: 2, admission_days: 2, total_hours: 0, days: 0, trainings: [] });
    sortTrainingMatrixByFunction();
    selectedFunction = name;
    saveData();
    closeModal();
    renderCurrentPage();
}

function deleteFunction(funcName) {
    if(!confirm(`Excluir permanentemente a matriz da função ${funcName}?`)) return;
    TRAINING_MATRIX = TRAINING_MATRIX.filter(f => f.function !== funcName);
    sortTrainingMatrixByFunction();
    selectedFunction = TRAINING_MATRIX[0]?.function || "";
    saveData();
    renderCurrentPage();
}


// ============================================================
// 🧾 VACANCY CONTROL MODULE
// ============================================================

function renderVagas() {
    const container = document.getElementById('page-vagas');
    const summary = getVacancySummary();
    const coveragePct = summary.requested > 0 ? Math.min(100, Math.round((summary.recruited / summary.requested) * 100)) : 0;

    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h3 class="font-display font-bold text-xl text-primary">Controle de Vagas</h3>
                    <p class="text-xs text-muted">As vagas vêm das Solicitações de M.O. e são baixadas por RM, Obra e função vinculados ao colaborador.</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-2">
                    <button onclick="openNewSolicitationModal()" class="btn btn-primary text-xs">
                        <span class="material-symbols-outlined text-sm">assignment_add</span> Nova RM
                    </button>
                    <button onclick="selectPage('recrutamento')" class="btn btn-ghost text-xs border border-outline-variant">
                        <span class="material-symbols-outlined text-sm">person_search</span> Abrir Recrutamento
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                <div class="card p-5 rounded-2xl border-l-4 border-l-primary">
                    <div class="flex items-center justify-between mb-3">
                        <p class="text-[10px] font-bold uppercase text-muted tracking-widest">Vagas Solicitadas</p>
                        <span class="material-symbols-outlined text-primary text-2xl">assignment_add</span>
                    </div>
                    <div class="text-3xl font-display font-black text-on-surface">${summary.requested}</div>
                    <p class="text-[10px] text-muted mt-1">Total das RMs ativas</p>
                </div>
                <div class="card p-5 rounded-2xl border-l-4 border-l-blue-400">
                    <div class="flex items-center justify-between mb-3">
                        <p class="text-[10px] font-bold uppercase text-muted tracking-widest">Baixadas no Recrutamento</p>
                        <span class="material-symbols-outlined text-blue-400 text-2xl">person_check</span>
                    </div>
                    <div class="text-3xl font-display font-black text-blue-400">${summary.recruited}</div>
                    <p class="text-[10px] text-muted mt-1">Candidatos não declinados vinculados</p>
                </div>
                <div class="card p-5 rounded-2xl border-l-4 ${summary.open > 0 ? 'border-l-amber-500' : 'border-l-green-500'}">
                    <div class="flex items-center justify-between mb-3">
                        <p class="text-[10px] font-bold uppercase text-muted tracking-widest">Saldo em Aberto</p>
                        <span class="material-symbols-outlined ${summary.open > 0 ? 'text-amber-400' : 'text-green-400'} text-2xl">event_seat</span>
                    </div>
                    <div class="text-3xl font-display font-black ${summary.open > 0 ? 'text-amber-400' : 'text-green-400'}">${summary.open}</div>
                    <p class="text-[10px] text-muted mt-1">Saldo por RM/Obra/Função</p>
                </div>
                <div class="card p-5 rounded-2xl border-l-4 border-l-red-500">
                    <div class="flex items-center justify-between mb-3">
                        <p class="text-[10px] font-bold uppercase text-muted tracking-widest">Declinados</p>
                        <span class="material-symbols-outlined text-red-400 text-2xl">block</span>
                    </div>
                    <div class="text-3xl font-display font-black text-red-400">${summary.declined}</div>
                    <p class="text-[10px] text-muted mt-1">Não dão baixa nas vagas</p>
                </div>
            </div>

            <div class="card p-6 rounded-2xl">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                    <div>
                        <h4 class="text-sm font-bold">Cobertura Geral de Vagas</h4>
                        <p class="text-xs text-muted">${coveragePct}% coberto pelo recrutamento ativo.</p>
                    </div>
                    <span class="badge ${summary.open === 0 && summary.requested > 0 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}">
                        ${summary.open === 0 && summary.requested > 0 ? 'Cobertura completa' : `${summary.open} em aberto`}
                    </span>
                </div>
                <div class="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden">
                    <div class="bg-primary h-full" style="width: ${coveragePct}%"></div>
                </div>
            </div>

            <div class="card rounded-2xl overflow-hidden table-scroll">
                <table class="w-full min-w-[1120px] text-left text-sm">
                    <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                        <tr>
                            <th class="px-5 py-4">RM / Obra</th>
                            <th class="px-5 py-4">Função</th>
                            <th class="px-5 py-4 text-center">Ícone / Saldo</th>
                            <th class="px-5 py-4 text-center">Solicitadas</th>
                            <th class="px-5 py-4 text-center">Baixadas</th>
                            <th class="px-5 py-4 text-center">Em Aberto</th>
                            <th class="px-5 py-4 text-center">Excedente</th>
                            <th class="px-5 py-4 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-outline-variant">
                        ${summary.rows.length ? summary.rows.map(row => {
                            const pct = row.requested > 0 ? Math.min(100, Math.round((row.recruited / row.requested) * 100)) : 0;
                            const isClosed = row.open === 0 && row.requested > 0;
                            const isUnlinked = row.sem_rm || (!row.rm && !row.digital_obra);
                            const statusBadge = isClosed
                                ? '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Atendida</span>'
                                : isUnlinked
                                    ? '<span class="badge bg-red-500/10 text-red-400 border-red-500/20">Sem RM</span>'
                                    : '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Aberta</span>';
                            return `
                                <tr class="hover:bg-surface-container-highest transition-colors">
                                    <td class="px-5 py-4">
                                        <div class="font-mono font-bold text-primary">RM ${escapeHtml(row.rm || '-')}</div>
                                        <div class="text-[11px] text-on-surface font-mono">${escapeHtml(row.digital_obra || 'SEM DIGITAL')}</div>
                                        <div class="mt-2">${statusBadge}</div>
                                    </td>
                                    <td class="px-5 py-4">
                                        <div class="font-bold text-on-surface">${escapeHtml(row.func)}</div>
                                        <div class="mt-2 w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                                            <div class="bg-primary h-full" style="width: ${pct}%"></div>
                                        </div>
                                    </td>
                                    <td class="px-5 py-4 text-center">
                                        <div class="inline-flex items-center justify-center gap-2 rounded-full border ${row.open > 0 ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-green-500/30 bg-green-500/10 text-green-400'} px-3 py-2 font-black" title="Saldo desta RM/Digital/Função">
                                            <span class="material-symbols-outlined text-lg">event_seat</span>
                                            <span>${row.open}</span>
                                        </div>
                                    </td>
                                    <td class="px-5 py-4 text-center font-mono font-bold">${row.requested}</td>
                                    <td class="px-5 py-4 text-center font-mono font-bold text-blue-400">${row.recruited}</td>
                                    <td class="px-5 py-4 text-center font-mono font-bold ${row.open > 0 ? 'text-amber-400' : 'text-green-400'}">${row.open}</td>
                                    <td class="px-5 py-4 text-center font-mono font-bold ${row.over > 0 ? 'text-red-400' : 'text-muted'}">${row.over}</td>
                                    <td class="px-5 py-4 text-right">
                                        <button onclick='openRecruitmentFromVacancy(${jsArg(row.func)}, ${jsArg(row.rm)}, ${jsArg(row.digital_obra)})'
                                            class="inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition-colors ${row.open <= 0 && row.requested > 0 ? 'border-outline-variant text-muted opacity-60 cursor-not-allowed' : 'border-primary/20 text-primary hover:bg-primary/10'}"
                                            ${row.open <= 0 && row.requested > 0 ? 'disabled title="Todas as vagas desta RM já foram baixadas"' : ''}>
                                            <span class="material-symbols-outlined text-sm">person_add</span> Recrutar
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('') : '<tr><td colspan="8" class="p-12 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma vaga cadastrada. Registre uma Solicitação de M.O. para iniciar o controle.</div></td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>
    `;

    updateVacancyBadge();
}

function parseDashboardDate(inputDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(inputDate || ''))) return null;
    const [year, month, day] = String(inputDate).split('-').map(Number);
    return new Date(year, month - 1, day);
}

function formatDashboardDate(inputDate) {
    const date = parseDashboardDate(inputDate);
    return date ? date.toLocaleDateString('pt-BR') : '-';
}

function getDashboardLateDays(plannedDate, compareDate = todayInputDate()) {
    const planned = parseDashboardDate(plannedDate);
    const compare = parseDashboardDate(compareDate);
    if (!planned || !compare || compare <= planned) return 0;
    return Math.ceil((compare - planned) / (1000 * 60 * 60 * 24));
}

function getDashboardMetrics() {
    syncBadgeQueue();
    CANDIDATES.forEach(refreshBadgeConclusion);

    const today = todayInputDate();
    const activeCandidates = CANDIDATES.filter(c => !c.declined_date);
    const vacancy = getVacancySummary();
    const trainingDone = activeCandidates.filter(c => c.admitted && hasCompletedRequiredTrainings(c));
    const badgeQueue = trainingDone.filter(c => c.badge_posted_date || c.admitted);
    const badgeCompleted = badgeQueue.filter(isBadgeCompleted);
    const badgePending = badgeQueue.filter(c => !isBadgeCompleted(c));
    const alojamento = activeCandidates.filter(c => c.alojado);
    const canceledSolicitations = SOLICITATIONS.filter(isSolicitationCanceled);

    const asoPending = activeCandidates.filter(c => !c.aso);
    const activationPending = activeCandidates.filter(c => c.aso && !c.admitted);
    const asoLate = activeCandidates.filter(c => c.aso_planned && today > c.aso_planned && !c.aso);
    const activationLate = activeCandidates.filter(c => c.admission_planned && today > c.admission_planned && !c.admitted);
    const badgeLate = badgeQueue.filter(c => getBadgeReleaseDate(c) && today > getBadgeReleaseDate(c) && !c.badge_real_date);
    const badgeJustificationPending = badgeQueue.filter(c => isBadgeDelayed(c) && !cleanString(c.badge_delay_reason || '', 500));
    const openVacancyRows = vacancy.rows.filter(row => row.open > 0 && row.requested > 0 && !row.sem_rm);
    const orphanRecruitment = vacancy.rows.filter(row => row.sem_rm && row.recruited > 0);

    const funnel = [
        { label: 'Solicitação M.O.', value: vacancy.requested, icon: 'assignment_add' },
        { label: 'Recrutamento', value: activeCandidates.length, icon: 'person_search' },
        { label: 'ASO Real', value: activeCandidates.filter(c => c.aso).length, icon: 'health_and_safety' },
        { label: 'Admissão Real', value: activeCandidates.filter(c => c.admitted).length, icon: 'how_to_reg' },
        { label: 'Mobilização', value: activeCandidates.filter(c => c.admitted).length, icon: 'engineering' },
        { label: 'Treinamento OK', value: trainingDone.length, icon: 'school' },
        { label: 'Crachá Emitido', value: badgeCompleted.length, icon: 'badge' },
        { label: 'Liberado', value: badgeCompleted.length, icon: 'verified' }
    ];

    return {
        today,
        vacancy,
        activeCandidates,
        declined: CANDIDATES.filter(c => c.declined_date),
        asoPending,
        activationPending,
        asoLate,
        activationLate,
        badgeQueue,
        badgePending,
        badgeCompleted,
        badgeLate,
        badgeJustificationPending,
        openVacancyRows,
        orphanRecruitment,
        alojamento,
        canceledSolicitations,
        funnel,
        trainingDone
    };
}

function buildDashboardGargalos(metrics) {
    const rows = [];

    metrics.asoLate.forEach(c => rows.push({
        type: 'ASO atrasado',
        owner: c.name,
        ref: `${c.func} • RM ${c.rm || '-'} • ${c.digital_obra || 'SEM OBRA'}`,
        planned: c.aso_planned,
        real: c.aso || '',
        late: getDashboardLateDays(c.aso_planned, metrics.today),
        action: 'Agendar ou atualizar ASO real',
        open: () => `openEditPersonModal(${c.id})`
    }));

    metrics.activationLate.forEach(c => rows.push({
        type: 'Admissão atrasada',
        owner: c.name,
        ref: `${c.func} • RM ${c.rm || '-'} • ${c.digital_obra || 'SEM OBRA'}`,
        planned: c.admission_planned,
        real: c.admitted || '',
        late: getDashboardLateDays(c.admission_planned, metrics.today),
        action: 'Atualizar data real de admissão',
        open: () => `openEditPersonModal(${c.id})`
    }));

    metrics.badgeLate.forEach(c => rows.push({
        type: 'Crachá atrasado',
        owner: c.name,
        ref: `${c.func} • ${c.digital_obra || 'SEM OBRA'}`,
        planned: getBadgeReleaseDate(c),
        real: c.badge_real_date || '',
        late: getDashboardLateDays(getBadgeReleaseDate(c), metrics.today),
        action: 'Cobrar emissão real do crachá',
        open: () => `selectPage('cracha')`
    }));

    metrics.badgeJustificationPending.forEach(c => rows.push({
        type: 'Justificativa pendente',
        owner: c.name,
        ref: `${c.func} • Crachá emitido fora do prazo`,
        planned: getBadgeReleaseDate(c),
        real: c.badge_real_date || '',
        late: getDashboardLateDays(getBadgeReleaseDate(c), c.badge_real_date),
        action: 'Preencher justificativa de atraso',
        open: () => `selectPage('cracha')`
    }));

    metrics.openVacancyRows.forEach(row => rows.push({
        type: 'Vaga sem baixa',
        owner: `RM ${row.rm || '-'} • ${row.digital_obra || 'SEM OBRA'}`,
        ref: `${row.func} • Saldo ${row.open} de ${row.requested}`,
        planned: '',
        real: '',
        late: row.open,
        action: 'Recrutar para esta RM/obra',
        open: () => `openRecruitmentFromVacancy(${jsArg(row.func)}, ${jsArg(row.rm)}, ${jsArg(row.digital_obra)})`
    }));

    metrics.orphanRecruitment.forEach(row => rows.push({
        type: 'Recrutamento sem RM',
        owner: row.func,
        ref: `${row.recruited} pessoa(s) sem vínculo de RM/Digital`,
        planned: '',
        real: '',
        late: row.recruited,
        action: 'Vincular pessoa à RM correta',
        open: () => `selectPage('recrutamento')`
    }));

    return rows.sort((a, b) => Number(b.late || 0) - Number(a.late || 0)).slice(0, 10);
}

function renderDashboardCard(label, value, subtitle, icon, color = 'primary', border = 'border-l-primary') {
    const colorMap = {
        primary: 'text-primary',
        green: 'text-green-400',
        amber: 'text-amber-400',
        red: 'text-red-400',
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        cyan: 'text-cyan-400'
    };
    const textColor = colorMap[color] || colorMap.primary;
    return `
        <div class="card p-4 rounded-2xl border-l-4 ${border}">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <p class="text-[10px] font-bold uppercase text-muted tracking-widest mb-1">${escapeHtml(label)}</p>
                    <div class="text-3xl font-display font-black ${textColor}">${value}</div>
                </div>
                <span class="material-symbols-outlined ${textColor} text-2xl">${icon}</span>
            </div>
            <p class="text-[10px] text-muted mt-2 leading-snug">${escapeHtml(subtitle)}</p>
        </div>
    `;
}

function renderDashboardFunnel(metrics) {
    const max = Math.max(...metrics.funnel.map(s => s.value), 1);
    return metrics.funnel.map((stage, index) => {
        const pct = Math.round((stage.value / max) * 100);
        const prev = index > 0 ? metrics.funnel[index - 1].value : stage.value;
        const conversion = prev > 0 ? Math.round((stage.value / prev) * 100) : 0;
        return `
            <div class="relative p-4 rounded-2xl border border-outline-variant bg-surface-container-low overflow-hidden">
                <div class="absolute inset-y-0 left-0 bg-primary/10" style="width:${pct}%"></div>
                <div class="relative flex items-center justify-between gap-3">
                    <div class="flex items-center gap-3 min-w-0">
                        <span class="material-symbols-outlined text-primary text-xl">${stage.icon}</span>
                        <div class="min-w-0">
                            <p class="text-xs font-bold text-on-surface truncate">${escapeHtml(stage.label)}</p>
                            <p class="text-[10px] text-muted">${index === 0 ? 'Base solicitada' : `${conversion}% da etapa anterior`}</p>
                        </div>
                    </div>
                    <div class="text-2xl font-display font-black text-primary">${stage.value}</div>
                </div>
            </div>
        `;
    }).join('');
}

function renderDashboardMiniBar(label, value, total, colorClass = 'bg-primary') {
    const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
    return `
        <div>
            <div class="flex items-center justify-between gap-3 mb-1">
                <span class="text-xs text-muted truncate">${escapeHtml(label)}</span>
                <span class="text-xs font-mono font-black text-on-surface">${value}</span>
            </div>
            <div class="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div class="${colorClass} h-full" style="width:${pct}%"></div>
            </div>
        </div>
    `;
}

function renderDashboard() {
    const container = document.getElementById('page-dashboard');
    const metrics = getDashboardMetrics();
    const vacancy = metrics.vacancy;
    const gargalos = buildDashboardGargalos(metrics);
    const coveragePct = vacancy.requested > 0 ? Math.min(100, Math.round((vacancy.recruited / vacancy.requested) * 100)) : 0;
    const criticalCount = metrics.asoLate.length + metrics.activationLate.length + metrics.badgeLate.length + metrics.badgeJustificationPending.length + metrics.openVacancyRows.length;
    const vacancyRows = vacancy.rows.slice(0, 8);
    const alojamentoRows = metrics.alojamento
        .slice()
        .sort((a, b) => String(a.admission_planned || '').localeCompare(String(b.admission_planned || '')) || a.name.localeCompare(b.name, 'pt-BR'))
        .slice(0, 8);
    const crachaRows = metrics.badgeQueue
        .slice()
        .sort((a, b) => String(getBadgeReleaseDate(a) || '').localeCompare(String(getBadgeReleaseDate(b) || '')) || a.name.localeCompare(b.name, 'pt-BR'))
        .slice(0, 8);
    const functionsRank = [...new Set(metrics.activeCandidates.map(c => c.func))]
        .map(func => ({ func, count: metrics.activeCandidates.filter(c => c.func === func).length }))
        .sort((a, b) => b.count - a.count || a.func.localeCompare(b.func, 'pt-BR'))
        .slice(0, 8);
    const maxFunctionCount = Math.max(...functionsRank.map(f => f.count), 1);

    container.innerHTML = `
        <div class="space-y-6 animate-up">
            <div class="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                <div>
                    <div class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                        <span class="material-symbols-outlined text-sm">monitoring</span> Central de Comando
                    </div>
                    <h3 class="font-display font-black text-2xl text-on-surface">Dashboard Executivo de Mobilização</h3>
                    <p class="text-xs text-muted mt-1">Visão integrada de Solicitação M.O., Vagas, Recrutamento, Mobilização, Crachá e Alojamento.</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span class="badge bg-primary/10 text-primary border-primary/20">Atualizado: ${formatDashboardDate(metrics.today)}</span>
                    <span class="badge ${criticalCount ? 'bg-error/10 text-error border-error/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}">${criticalCount} gargalo(s)</span>
                    <button onclick="selectPage('solicitacao')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">assignment_add</span> Solicitações</button>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8 gap-4">
                ${renderDashboardCard('Vagas Solicitadas', vacancy.requested, 'Total ativo das RMs não canceladas.', 'event_seat', 'primary', 'border-l-primary')}
                ${renderDashboardCard('Vagas em Aberto', vacancy.open, 'Saldo ainda não baixado pelo recrutamento.', 'hourglass_empty', vacancy.open ? 'amber' : 'green', vacancy.open ? 'border-l-amber-500' : 'border-l-green-500')}
                ${renderDashboardCard('Recrutados', metrics.activeCandidates.length, 'Pessoas ativas cadastradas.', 'person_search', 'blue', 'border-l-blue-500')}
                ${renderDashboardCard('ASO Pendente', metrics.asoPending.length, 'Sem data real de ASO.', 'health_and_safety', metrics.asoPending.length ? 'amber' : 'green', metrics.asoPending.length ? 'border-l-amber-500' : 'border-l-green-500')}
                ${renderDashboardCard('Admissão Pendente', metrics.activationPending.length, 'Com ASO real e sem admissão real.', 'how_to_reg', metrics.activationPending.length ? 'amber' : 'green', metrics.activationPending.length ? 'border-l-amber-500' : 'border-l-green-500')}
                ${renderDashboardCard('Em Mobilização', metrics.activeCandidates.filter(c => c.admitted).length, 'Com data real de admissão.', 'engineering', 'purple', 'border-l-purple-500')}
                ${renderDashboardCard('Crachá Pendente', metrics.badgePending.length, 'Fila de crachá sem conclusão.', 'badge', metrics.badgePending.length ? 'amber' : 'green', metrics.badgePending.length ? 'border-l-amber-500' : 'border-l-green-500')}
                ${renderDashboardCard('Liberados', metrics.badgeCompleted.length, 'Crachá emitido e validado.', 'verified', 'green', 'border-l-green-500')}
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div class="card p-6 rounded-2xl xl:col-span-2">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                        <div>
                            <h4 class="text-sm font-bold">Funil de Mobilização</h4>
                            <p class="text-xs text-muted">Da demanda formal até liberação por crachá.</p>
                        </div>
                        <span class="badge ${coveragePct >= 100 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-primary/10 text-primary border-primary/20'}">${coveragePct}% cobertura de vagas</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                        ${renderDashboardFunnel(metrics)}
                    </div>
                </div>

                <div class="card p-6 rounded-2xl">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h4 class="text-sm font-bold">Alertas Críticos</h4>
                            <p class="text-xs text-muted">Pendências que travam a liberação.</p>
                        </div>
                        <span class="material-symbols-outlined ${criticalCount ? 'text-error alert-pulse' : 'text-green-400'}">${criticalCount ? 'warning' : 'check_circle'}</span>
                    </div>
                    <div class="space-y-4">
                        ${renderDashboardMiniBar('ASO atrasado', metrics.asoLate.length, Math.max(metrics.activeCandidates.length, 1), 'bg-red-500')}
                        ${renderDashboardMiniBar('Admissão atrasada', metrics.activationLate.length, Math.max(metrics.activeCandidates.length, 1), 'bg-red-500')}
                        ${renderDashboardMiniBar('Crachá atrasado', metrics.badgeLate.length, Math.max(metrics.badgeQueue.length, 1), 'bg-amber-500')}
                        ${renderDashboardMiniBar('Justificativa crachá pendente', metrics.badgeJustificationPending.length, Math.max(metrics.badgeQueue.length, 1), 'bg-amber-500')}
                        ${renderDashboardMiniBar('Vagas em aberto', vacancy.open, Math.max(vacancy.requested, 1), 'bg-primary')}
                        ${renderDashboardMiniBar('Necessidade alojamento', metrics.alojamento.length, Math.max(metrics.activeCandidates.length, 1), 'bg-cyan-500')}
                    </div>
                </div>
            </div>

            <div class="card rounded-2xl overflow-hidden">
                <div class="p-5 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-low">
                    <div>
                        <h4 class="text-sm font-bold">Gargalos Prioritários</h4>
                        <p class="text-xs text-muted">Lista acionável por atraso, saldo ou inconsistência de vínculo.</p>
                    </div>
                    <button onclick="selectPage('mobilizacao')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">account_tree</span> Ver fluxo</button>
                </div>
                <div class="table-scroll">
                    <table class="w-full min-w-[1050px] text-left text-sm">
                        <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                            <tr>
                                <th class="px-5 py-4">Tipo</th>
                                <th class="px-5 py-4">Pessoa / RM</th>
                                <th class="px-5 py-4">Referência</th>
                                <th class="px-5 py-4">Previsto</th>
                                <th class="px-5 py-4">Realizado</th>
                                <th class="px-5 py-4 text-center">Atraso/Saldo</th>
                                <th class="px-5 py-4">Ação necessária</th>
                                <th class="px-5 py-4 text-right">Abrir</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-outline-variant">
                            ${gargalos.length ? gargalos.map(g => `
                                <tr class="hover:bg-surface-container-highest transition-colors">
                                    <td class="px-5 py-4"><span class="badge bg-error/10 text-error border-error/20">${escapeHtml(g.type)}</span></td>
                                    <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(g.owner)}</td>
                                    <td class="px-5 py-4 text-xs text-muted">${escapeHtml(g.ref)}</td>
                                    <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(g.planned)}</td>
                                    <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(g.real)}</td>
                                    <td class="px-5 py-4 text-center font-mono font-black text-error">${g.late}</td>
                                    <td class="px-5 py-4 text-xs text-on-surface">${escapeHtml(g.action)}</td>
                                    <td class="px-5 py-4 text-right"><button onclick="${g.open()}" class="btn btn-ghost text-[10px] border border-outline-variant">Abrir</button></td>
                                </tr>
                            `).join('') : '<tr><td colspan="8" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhum gargalo crítico identificado no momento.</div></td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div class="card rounded-2xl overflow-hidden xl:col-span-2">
                    <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
                        <div>
                            <h4 class="text-sm font-bold">Vagas por Nº Obra / RM / Função</h4>
                            <p class="text-xs text-muted">Baixa controlada por RM + Obra + Função.</p>
                        </div>
                        <button onclick="selectPage('vagas')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">view_list</span> Ver vagas</button>
                    </div>
                    <div class="table-scroll">
                        <table class="w-full min-w-[860px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                                <tr>
                                    <th class="px-5 py-4">Nº Obra</th>
                                    <th class="px-5 py-4">RM</th>
                                    <th class="px-5 py-4">Função</th>
                                    <th class="px-5 py-4 text-center">Solicitado</th>
                                    <th class="px-5 py-4 text-center">Baixado</th>
                                    <th class="px-5 py-4 text-center">Saldo</th>
                                    <th class="px-5 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${vacancyRows.length ? vacancyRows.map(row => {
                                    const status = row.requested > 0 && row.open === 0
                                        ? '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Atendida</span>'
                                        : row.sem_rm
                                            ? '<span class="badge bg-red-500/10 text-red-400 border-red-500/20">Sem RM</span>'
                                            : '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Aberta</span>';
                                    return `
                                        <tr class="hover:bg-surface-container-highest transition-colors">
                                            <td class="px-5 py-4 font-mono font-bold text-primary">${escapeHtml(row.digital_obra || '-')}</td>
                                            <td class="px-5 py-4 font-mono">${escapeHtml(row.rm || '-')}</td>
                                            <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(row.func)}</td>
                                            <td class="px-5 py-4 text-center font-mono font-bold">${row.requested}</td>
                                            <td class="px-5 py-4 text-center font-mono font-bold text-blue-400">${row.recruited}</td>
                                            <td class="px-5 py-4 text-center font-mono font-bold ${row.open ? 'text-amber-400' : 'text-green-400'}">${row.open}</td>
                                            <td class="px-5 py-4">${status}</td>
                                        </tr>
                                    `;
                                }).join('') : '<tr><td colspan="7" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma solicitação ativa cadastrada.</div></td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card p-6 rounded-2xl">
                    <div class="flex items-center justify-between mb-5">
                        <div>
                            <h4 class="text-sm font-bold">Ranking por Função</h4>
                            <p class="text-xs text-muted">Distribuição dos cadastros ativos.</p>
                        </div>
                        <span class="badge bg-primary/10 text-primary border-primary/20">Top ${functionsRank.length}</span>
                    </div>
                    <div class="space-y-4">
                        ${functionsRank.length ? functionsRank.map(f => renderDashboardMiniBar(f.func, f.count, maxFunctionCount, 'bg-primary')).join('') : '<div class="empty-state rounded-xl p-6 text-center text-muted">Nenhuma pessoa ativa cadastrada.</div>'}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div class="card rounded-2xl overflow-hidden">
                    <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
                        <div>
                            <h4 class="text-sm font-bold">Alojamento</h4>
                            <p class="text-xs text-muted">Pessoas marcadas com necessidade de alojamento.</p>
                        </div>
                        <button onclick="selectPage('alojamento')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">home</span> Ver alojamento</button>
                    </div>
                    <div class="table-scroll">
                        <table class="w-full min-w-[720px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                                <tr>
                                    <th class="px-5 py-4">Pessoa</th>
                                    <th class="px-5 py-4">Função</th>
                                    <th class="px-5 py-4">Nº Obra</th>
                                    <th class="px-5 py-4">Admissão</th>
                                    <th class="px-5 py-4">Necessidade</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${alojamentoRows.length ? alojamentoRows.map(c => `
                                    <tr class="hover:bg-surface-container-highest transition-colors">
                                        <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(c.name)}</td>
                                        <td class="px-5 py-4 text-xs text-muted">${escapeHtml(c.func)}</td>
                                        <td class="px-5 py-4 font-mono text-primary">${escapeHtml(c.digital_obra || c.rm || '-')}</td>
                                        <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(c.admitted || c.admission_planned)}</td>
                                        <td class="px-5 py-4"><span class="badge bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Sim</span></td>
                                    </tr>
                                `).join('') : '<tr><td colspan="5" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma necessidade de alojamento informada.</div></td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card rounded-2xl overflow-hidden">
                    <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
                        <div>
                            <h4 class="text-sm font-bold">Crachá</h4>
                            <p class="text-xs text-muted">Fila após treinamentos obrigatórios concluídos.</p>
                        </div>
                        <button onclick="selectPage('cracha')" class="btn btn-ghost text-xs border border-outline-variant"><span class="material-symbols-outlined text-sm">badge</span> Ver crachá</button>
                    </div>
                    <div class="table-scroll">
                        <table class="w-full min-w-[760px] text-left text-sm">
                            <thead class="bg-surface-container-high text-[10px] font-bold uppercase text-muted tracking-widest">
                                <tr>
                                    <th class="px-5 py-4">Pessoa</th>
                                    <th class="px-5 py-4">Função</th>
                                    <th class="px-5 py-4">Previsão</th>
                                    <th class="px-5 py-4">Real</th>
                                    <th class="px-5 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant">
                                ${crachaRows.length ? crachaRows.map(c => {
                                    const delayed = isBadgeDelayed(c) && !cleanString(c.badge_delay_reason || '', 500);
                                    const completed = isBadgeCompleted(c);
                                    const status = completed
                                        ? '<span class="badge bg-green-500/10 text-green-400 border-green-500/20">Concluído</span>'
                                        : delayed
                                            ? '<span class="badge bg-error/10 text-error border-error/20">Justificar</span>'
                                            : '<span class="badge bg-amber-500/10 text-amber-400 border-amber-500/20">Pendente</span>';
                                    return `
                                        <tr class="hover:bg-surface-container-highest transition-colors">
                                            <td class="px-5 py-4 font-bold text-on-surface">${escapeHtml(c.name)}</td>
                                            <td class="px-5 py-4 text-xs text-muted">${escapeHtml(c.func)}</td>
                                            <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(getBadgeReleaseDate(c))}</td>
                                            <td class="px-5 py-4 font-mono text-xs">${formatDashboardDate(c.badge_real_date)}</td>
                                            <td class="px-5 py-4">${status}</td>
                                        </tr>
                                    `;
                                }).join('') : '<tr><td colspan="5" class="p-10 text-center text-muted"><div class="empty-state rounded-xl p-6">Nenhuma pessoa na fila de crachá.</div></td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                ${[
                    ['Planejamento', 'Controla aderência entre demanda da obra e saldo por RM.', 'event_available'],
                    ['RH', 'Mostra quem está parado em ASO ou admissão.', 'groups'],
                    ['Mobilização', 'Evidencia crachá, treinamento e bloqueios de liberação.', 'engineering'],
                    ['Alojamento', 'Centraliza a necessidade por pessoa e Nº Obra.', 'home'],
                    ['BI / QA', 'Consolida indicadores acionáveis e inconsistências.', 'analytics']
                ].map(s => `
                    <div class="card p-4 rounded-2xl">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="material-symbols-outlined text-primary text-xl">${s[2]}</span>
                            <h5 class="font-bold text-sm text-on-surface">${s[0]}</h5>
                        </div>
                        <p class="text-[11px] text-muted leading-relaxed">${s[1]}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    updateVacancyBadge();
}

// Initial Run
loadPersistedState();
sortTrainingMatrixByFunction();
document.getElementById('current-date-top').textContent = new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'long' }).toUpperCase();
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        selectPage(item.dataset.page);
    });
});

// Sidebar handling for mobile
window.toggleSidebar = () => {
    document.getElementById('sidebar').classList.toggle('-translate-x-full');
}

// Global UI consistency: Enterprise Dark
document.documentElement.classList.add('dark');

// Start on Dashboard (or Matrix as per initial code)
selectPage('dashboard');
updateVacancyBadge();
