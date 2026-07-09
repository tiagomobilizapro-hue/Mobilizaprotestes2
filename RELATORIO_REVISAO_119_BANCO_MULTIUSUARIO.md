# MobilizaPro 1.19 — Banco + Anti-Conflito Multiusuário

## Objetivo

Preparar o projeto para receber o dump SQL enviado em 08/07/2026 e reduzir o risco de conflito entre múltiplos usuários salvando ao mesmo tempo.

## Banco recebido

O arquivo recebido é um dump do phpMyAdmin do banco `u365253722_mobilizapro`, gerado em 08/07/2026 às 20:20, com tabelas como `app_store`, `usuarios`, `solicitacoes_mo`, `candidatos` e `training_matrix_store`.

## Correções técnicas incluídas

- Adicionado `client_uid` em `candidatos` para identificar cada candidato de forma estável entre navegadores diferentes.
- Adicionado `payload_hash` em `candidatos` para rastreabilidade de payload salvo.
- Backfill automático: candidatos antigos recebem `client_uid = legacy-{id}` ou `legacy-{legacy_id}`.
- Índice único em `client_uid`.
- Índice auxiliar em `cpf, ativo`.
- `api/store.php` agora evita sobrescrever candidato quando dois navegadores criam registros diferentes com o mesmo `legacy_id` local.
- Novo patch de frontend `assets/js/32-multiusuario-anti-conflito-20260708.js`:
  - cria identificador único para novos candidatos;
  - detecta conflito 409;
  - puxa o estado atual do MySQL;
  - mescla dados locais com o estado do servidor;
  - reenvia sem apagar registros do outro usuário.

## Arquivos alterados

- `api/bootstrap.php`
- `api/store.php`
- `database/schema.sql`
- `database/migrations/119_multiusuario_anti_conflito.sql`
- `assets/js/32-multiusuario-anti-conflito-20260708.js`
- `index.html`
- `CHANGELOG.md`
- `REGISTRO_COMPARTILHADO_SOLICITACOES.md`

## Procedimento seguro

1. Fazer backup do banco atual.
2. Importar o dump SQL em banco vazio ou ambiente de homologação.
3. Subir o pacote 1.19.
4. Conferir `config/config.php`.
5. Executar `/database/upgrade.php`.
6. Testar dois usuários criando candidatos simultaneamente.

## Observação importante

Esta revisão reduz drasticamente o risco de perda por conflito de ID local ou cache antigo. Se dois usuários editarem exatamente o mesmo campo do mesmo candidato ao mesmo tempo, ainda será necessário critério operacional para decidir qual alteração prevalece. O sistema agora prioriza preservar registros e evitar apagamento/sobrescrita silenciosa.
