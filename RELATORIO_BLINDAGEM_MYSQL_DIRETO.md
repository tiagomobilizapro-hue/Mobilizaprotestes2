# MobilizaPro 1.10 - Relatório de Blindagem MySQL Direto

## Objetivo

Adequar o MobilizaPro para operação multiusuário, mantendo a estética atual e direcionando o salvamento operacional para o MySQL.

## Mudanças aplicadas

1. MySQL passa a ser a fonte principal dos dados operacionais.
2. `localStorage` deixou de disparar salvamento automático.
3. A camada `Storage.prototype.setItem` não é mais interceptada.
4. `saveData()` agora chama `MobilizaProCloudStorage.saveStateDirect()`.
5. O backend recebeu a rota `api/store.php?action=save_state`.
6. O carregamento inicial não salva defaults no banco.
7. O reset por `DATABASE_CLEAN_VERSION` foi neutralizado para evitar perda por cache limpo/antigo.
8. Salvamentos no mesmo navegador são enfileirados.
9. Controle de conflito usa token de estado.
10. Criada tabela incremental `auditoria_operacional`.

## O que não foi alterado

- Visual atual.
- Ficha 360.
- Fluxo operacional.
- Login.
- Dashboard.
- Banco existente não é apagado.
- Não há `DROP TABLE` nem `TRUNCATE`.

## Observação técnica

Ainda existe um espelho local do estado para permitir renderização rápida da tela após carregar do MySQL. Esse espelho não dispara salvamento automático e não deve ser considerado fonte oficial.

## Procedimento recomendado

1. Fazer backup do banco antes de subir.
2. Apagar arquivos antigos do `public_html` e subir esta versão limpa.
3. Conferir `config/config.php`.
4. Executar `database/upgrade.php` uma única vez.
5. Apagar `database/upgrade.php`, `database/install.php`, `setup.php` e `preflight.php` após validação.
6. Usuários devem executar Ctrl+F5 no primeiro acesso.

## Testes executados

- `php -l` em todos os arquivos PHP: OK.
- `node --check` em todos os JS: OK.
- ZIP testado com `unzip -t`: OK.
