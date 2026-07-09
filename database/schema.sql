-- MobilizaPro 1.10 - referência compatível com o banco real.
-- Não contém comandos destrutivos nem dados da equipe.

CREATE TABLE IF NOT EXISTS usuarios (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  email VARCHAR(160) NOT NULL,
  perfil ENUM('OBRA','OPERACIONAL_RECRUTAMENTO','MOBILIZACAO','ALOJAMENTO','MEDICINA','GERENCIAL') NOT NULL DEFAULT 'OBRA',
  senha_hash VARCHAR(255) NOT NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_usuarios_cpf (cpf)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS obras (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(30) NOT NULL,
  nome VARCHAR(150) NOT NULL,
  cliente VARCHAR(150) NOT NULL,
  cidade VARCHAR(100) NULL,
  uf CHAR(2) NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'ativa',
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS status_mobilizacao (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(40) NOT NULL,
  nome VARCHAR(80) NOT NULL,
  cor VARCHAR(20) NOT NULL DEFAULT 'secondary',
  ordem SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  UNIQUE KEY uk_status_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS colaboradores (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  cpf VARCHAR(20) NULL,
  numero_pessoal VARCHAR(30) NULL,
  funcao VARCHAR(100) NULL,
  telefone VARCHAR(30) NULL,
  cidade VARCHAR(100) NULL,
  uf CHAR(2) NULL,
  obra_id INT UNSIGNED NULL,
  status_id INT UNSIGNED NULL,
  observacoes TEXT NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS solicitacoes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  obra_id INT UNSIGNED NULL,
  titulo VARCHAR(150) NOT NULL,
  funcao VARCHAR(120) NOT NULL,
  quantidade INT UNSIGNED NOT NULL DEFAULT 1,
  data_prevista DATE NULL,
  responsavel VARCHAR(120) NULL,
  status_id INT UNSIGNED NULL,
  status VARCHAR(50) NULL,
  observacoes TEXT NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS historico_mobilizacao (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  colaborador_id INT UNSIGNED NULL,
  solicitacao_id INT UNSIGNED NULL,
  status_anterior VARCHAR(80) NULL,
  status_novo VARCHAR(80) NOT NULL,
  observacao TEXT NULL,
  usuario_id INT UNSIGNED NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS solicitacoes_mo (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  rm VARCHAR(24) NOT NULL,
  digital_obra VARCHAR(40) NOT NULL DEFAULT '',
  data_solicitacao VARCHAR(20) NOT NULL DEFAULT '',
  funcao VARCHAR(120) NOT NULL,
  quantidade INT UNSIGNED NOT NULL DEFAULT 1,
  turno VARCHAR(12) NOT NULL DEFAULT 'DIURNO',
  prioridade VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
  responsavel_nome VARCHAR(120) NULL,
  contrato_codigo VARCHAR(40) NULL,
  sla_limite_em DATE NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'ABERTA',
  cancel_reason VARCHAR(500) NULL,
  canceled_at VARCHAR(30) NULL,
  payload JSON NULL,
  payload_hash CHAR(40) NULL,
  criado_por VARCHAR(11) NULL,
  atualizado_por VARCHAR(11) NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  excluido_em TIMESTAMP NULL,
  UNIQUE KEY uk_rm_obra_func (rm, digital_obra, funcao),
  INDEX idx_solicitacoes_obra_rm (digital_obra, rm, ativo),
  INDEX idx_solicitacoes_funcao (funcao, ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS candidatos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  legacy_id INT UNSIGNED NULL,
  client_uid VARCHAR(64) NULL,
  nome VARCHAR(140) NOT NULL,
  cpf VARCHAR(11) NULL,
  telefone VARCHAR(20) NULL,
  cidade VARCHAR(100) NULL,
  estado VARCHAR(2) NULL,
  funcao VARCHAR(120) NOT NULL,
  rm VARCHAR(24) NULL,
  digital_obra VARCHAR(40) NULL,
  recrutado_em DATE NULL,
  recrutador_nome VARCHAR(120) NULL,
  recrutador_cpf VARCHAR(11) NULL,
  etapa_operacional VARCHAR(40) NULL,
  prioridade VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
  responsavel_mobilizacao VARCHAR(120) NULL,
  contrato_codigo VARCHAR(40) NULL,
  sla_limite_em DATE NULL,
  aso_previsto DATE NULL,
  aso_marcado_em DATE NULL,
  aso_alerta TINYINT(1) NOT NULL DEFAULT 0,
  admissao_prevista DATE NULL,
  aso_real DATE NULL,
  admitido_em DATE NULL,
  treinamento_inicio_previsto DATE NULL,
  treinamento_inicio_real DATE NULL,
  treinamento_fim_previsto DATE NULL,
  treinamento_fim_real DATE NULL,
  cracha_ok TINYINT(1) NOT NULL DEFAULT 0,
  cracha_postado_em DATE NULL,
  cracha_liberacao_dias INT UNSIGNED NOT NULL DEFAULT 5,
  cracha_real_em DATE NULL,
  alojado TINYINT(1) NOT NULL DEFAULT 0,
  alojamento_realizado VARCHAR(3) NOT NULL DEFAULT 'NAO',
  declinado_em DATE NULL,
  motivo_declinio VARCHAR(240) NULL,
  payload JSON NULL,
  payload_hash CHAR(40) NULL,
  criado_por VARCHAR(11) NULL,
  atualizado_por VARCHAR(11) NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  excluido_em TIMESTAMP NULL,
  UNIQUE KEY uk_candidatos_legacy (legacy_id),
  UNIQUE KEY uk_candidatos_client_uid (client_uid),
  INDEX idx_candidatos_cpf_ativo (cpf, ativo),
  INDEX idx_candidatos_obra_rm (digital_obra, rm, ativo),
  INDEX idx_candidatos_recrutador (recrutador_cpf, ativo),
  INDEX idx_candidatos_atualizado (atualizado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS training_matrix_store (
  id TINYINT UNSIGNED NOT NULL PRIMARY KEY DEFAULT 1,
  payload JSON NOT NULL,
  atualizado_por VARCHAR(11) NULL,
  atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS auditoria_operacional (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tabela VARCHAR(80) NOT NULL,
  registro_chave VARCHAR(190) NULL,
  acao VARCHAR(60) NOT NULL,
  usuario_cpf VARCHAR(11) NULL,
  detalhe JSON NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_auditoria_tabela_chave (tabela, registro_chave),
  INDEX idx_auditoria_criado (criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS contratos_operacionais (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(40) NOT NULL,
  nome VARCHAR(150) NOT NULL,
  cliente VARCHAR(150) NULL,
  centro_custo VARCHAR(80) NULL,
  gestor_nome VARCHAR(120) NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'ATIVO',
  payload JSON NULL,
  criado_por VARCHAR(11) NULL,
  atualizado_por VARCHAR(11) NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  UNIQUE KEY uk_contratos_codigo (codigo),
  INDEX idx_contratos_status (status, ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS documentos_mobilizacao (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  candidato_legacy_id INT UNSIGNED NULL,
  candidato_uid VARCHAR(64) NULL,
  tipo VARCHAR(80) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'PENDENTE',
  validade_em DATE NULL,
  enviado_em DATE NULL,
  aprovado_em DATE NULL,
  reprovado_em DATE NULL,
  motivo_reprovacao VARCHAR(500) NULL,
  arquivo_nome VARCHAR(190) NULL,
  payload JSON NULL,
  criado_por VARCHAR(11) NULL,
  atualizado_por VARCHAR(11) NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  INDEX idx_documentos_candidato (candidato_uid, candidato_legacy_id, ativo),
  INDEX idx_documentos_status (status, validade_em, ativo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_store (
  store_key VARCHAR(190) NOT NULL PRIMARY KEY,
  store_value LONGTEXT NOT NULL,
  updated_by VARCHAR(11) NULL,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  excluido_em TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- v123 Professional Core Operacional
CREATE TABLE IF NOT EXISTS permissoes_perfil (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  perfil VARCHAR(40) NOT NULL,
  modulo VARCHAR(60) NOT NULL,
  pode_visualizar TINYINT(1) NOT NULL DEFAULT 1,
  pode_criar TINYINT(1) NOT NULL DEFAULT 0,
  pode_editar TINYINT(1) NOT NULL DEFAULT 0,
  pode_excluir TINYINT(1) NOT NULL DEFAULT 0,
  atualizado_por VARCHAR(11) NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_permissoes_perfil_modulo (perfil, modulo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- v124 Banca Técnica Aplicada
CREATE TABLE IF NOT EXISTS homologacao_tecnica (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  versao VARCHAR(40) NOT NULL,
  area VARCHAR(120) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'ATENÇÃO',
  evidencia TEXT NULL,
  proximo_passo TEXT NULL,
  criado_por VARCHAR(11) NULL,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_homologacao_versao_status (versao, status),
  INDEX idx_homologacao_criado (criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
