-- MobilizaPRO 1.23 Professional Core Operacional
-- Evolução não destrutiva: reforça permissões, governança e operação real de contratos/documentos.

CREATE TABLE IF NOT EXISTS permissoes_perfil (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  perfil VARCHAR(40) NOT NULL,
  modulo VARCHAR(60) NOT NULL,
  pode_visualizar TINYINT(1) NOT NULL DEFAULT 1,
  pode_criar TINYINT(1) NOT NULL DEFAULT 0,
  pode_editar TINYINT(1) NOT NULL DEFAULT 0,
  pode_excluir TINYINT(1) NOT NULL DEFAULT 0,
  criado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_permissoes_perfil_modulo (perfil, modulo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE documentos_mobilizacao
  ADD COLUMN IF NOT EXISTS atualizado_por VARCHAR(11) NULL AFTER criado_por;

ALTER TABLE contratos_operacionais
  ADD COLUMN IF NOT EXISTS atualizado_por VARCHAR(11) NULL AFTER criado_por;

CREATE INDEX IF NOT EXISTS idx_documentos_tipo_status ON documentos_mobilizacao (tipo, status, ativo);
CREATE INDEX IF NOT EXISTS idx_contratos_codigo_ativo ON contratos_operacionais (codigo, ativo);
