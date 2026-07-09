-- MobilizaPRO 1.22 Professional Core
-- Evolução não destrutiva: adiciona metadados, índices, contratos e documentos.

ALTER TABLE solicitacoes_mo
  ADD COLUMN IF NOT EXISTS prioridade VARCHAR(20) NOT NULL DEFAULT 'NORMAL' AFTER turno,
  ADD COLUMN IF NOT EXISTS responsavel_nome VARCHAR(120) NULL AFTER prioridade,
  ADD COLUMN IF NOT EXISTS contrato_codigo VARCHAR(40) NULL AFTER responsavel_nome,
  ADD COLUMN IF NOT EXISTS sla_limite_em DATE NULL AFTER contrato_codigo,
  ADD COLUMN IF NOT EXISTS payload_hash CHAR(40) NULL AFTER payload;

ALTER TABLE candidatos
  ADD COLUMN IF NOT EXISTS etapa_operacional VARCHAR(40) NULL AFTER recrutador_cpf,
  ADD COLUMN IF NOT EXISTS prioridade VARCHAR(20) NOT NULL DEFAULT 'NORMAL' AFTER etapa_operacional,
  ADD COLUMN IF NOT EXISTS responsavel_mobilizacao VARCHAR(120) NULL AFTER prioridade,
  ADD COLUMN IF NOT EXISTS contrato_codigo VARCHAR(40) NULL AFTER responsavel_mobilizacao,
  ADD COLUMN IF NOT EXISTS sla_limite_em DATE NULL AFTER contrato_codigo;

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

CREATE INDEX IF NOT EXISTS idx_solicitacoes_obra_rm ON solicitacoes_mo (digital_obra, rm, ativo);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_funcao ON solicitacoes_mo (funcao, ativo);
CREATE INDEX IF NOT EXISTS idx_candidatos_obra_rm ON candidatos (digital_obra, rm, ativo);
CREATE INDEX IF NOT EXISTS idx_candidatos_recrutador ON candidatos (recrutador_cpf, ativo);
CREATE INDEX IF NOT EXISTS idx_candidatos_atualizado ON candidatos (atualizado_em);
