-- MobilizaPro 1.21 - Recrutador gravado no candidato
-- Executar via database/upgrade.php ou phpMyAdmin.

ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS recrutador_nome VARCHAR(120) NULL AFTER recrutado_em;
ALTER TABLE candidatos ADD COLUMN IF NOT EXISTS recrutador_cpf VARCHAR(11) NULL AFTER recrutador_nome;

-- Backfill conservador: usa apenas o payload quando o dado já existia no candidato.
UPDATE candidatos
   SET recrutador_nome = COALESCE(
       NULLIF(JSON_UNQUOTE(JSON_EXTRACT(payload, '$.recruiter_name')), ''),
       NULLIF(JSON_UNQUOTE(JSON_EXTRACT(payload, '$.recruited_by_name')), '')
   )
 WHERE (recrutador_nome IS NULL OR recrutador_nome = '')
   AND payload IS NOT NULL
   AND (JSON_EXTRACT(payload, '$.recruiter_name') IS NOT NULL OR JSON_EXTRACT(payload, '$.recruited_by_name') IS NOT NULL);

UPDATE candidatos
   SET recrutador_cpf = COALESCE(
       NULLIF(JSON_UNQUOTE(JSON_EXTRACT(payload, '$.recruiter_cpf')), ''),
       NULLIF(JSON_UNQUOTE(JSON_EXTRACT(payload, '$.recruited_by_cpf')), '')
   )
 WHERE (recrutador_cpf IS NULL OR recrutador_cpf = '')
   AND payload IS NOT NULL
   AND (JSON_EXTRACT(payload, '$.recruiter_cpf') IS NOT NULL OR JSON_EXTRACT(payload, '$.recruited_by_cpf') IS NOT NULL);
