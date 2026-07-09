-- MobilizaPro 1.19 - Migração anti-conflito multiusuário
-- Execute após importar o dump do banco e antes dos testes com múltiplos usuários.
-- Não apaga dados.

ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS client_uid VARCHAR(64) NULL AFTER legacy_id;
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS payload_hash CHAR(40) NULL AFTER payload;

UPDATE candidatos
   SET client_uid = CONCAT('legacy-', COALESCE(legacy_id, id))
 WHERE client_uid IS NULL OR client_uid = '';

ALTER TABLE candidatos ADD UNIQUE KEY IF NOT EXISTS uk_candidatos_client_uid (client_uid);
ALTER TABLE candidatos ADD INDEX IF NOT EXISTS idx_candidatos_cpf_ativo (cpf, ativo);
