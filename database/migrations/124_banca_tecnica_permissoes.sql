-- MobilizaPRO 1.24 - Banca Técnica Aplicada
-- Evolução não destrutiva: reforça matriz de permissões, módulo de banca técnica e trilha de homologação.

ALTER TABLE permissoes_perfil
  ADD COLUMN IF NOT EXISTS atualizado_por VARCHAR(11) NULL AFTER pode_excluir;

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

INSERT IGNORE INTO permissoes_perfil (perfil, modulo, pode_visualizar, pode_criar, pode_editar, pode_excluir) VALUES
('GERENCIAL','relatorios',1,0,0,0),
('GERENCIAL','banca_tecnica',1,0,0,0),
('OPERACIONAL_RECRUTAMENTO','relatorios',1,0,0,0),
('OPERACIONAL_RECRUTAMENTO','banca_tecnica',1,0,0,0),
('MOBILIZACAO','relatorios',1,0,0,0),
('MOBILIZACAO','banca_tecnica',1,0,0,0),
('MEDICINA','relatorios',1,0,0,0),
('MEDICINA','banca_tecnica',1,0,0,0),
('OBRA','relatorios',1,0,0,0),
('OBRA','banca_tecnica',1,0,0,0),
('ALOJAMENTO','relatorios',1,0,0,0),
('ALOJAMENTO','banca_tecnica',1,0,0,0);
