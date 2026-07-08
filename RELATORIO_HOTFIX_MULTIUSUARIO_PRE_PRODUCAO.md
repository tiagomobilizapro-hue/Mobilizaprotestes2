# MobilizaPro 1.10 - Hotfix Pré-Produção Multiusuário

## Objetivo
Blindar a versão `mobilizapro_110_multiusuario_mysql_direto_estavel` antes da publicação em produção, mantendo visual e funcionalidades atuais.

## Correções aplicadas

1. **MySQL-first real no `saveData()`**
   - O estado operacional não é mais gravado diretamente no `localStorage` pela função `saveData()`.
   - O cache local só é atualizado pela camada de persistência após confirmação positiva do servidor.

2. **Exclusão física removida do backend operacional**
   - `delete_solicitation_definitive` agora inativa a solicitação.
   - `delete_candidate_definitive` agora inativa o candidato.
   - Não há mais `DELETE FROM` em rotas operacionais de PHP.

3. **Login local legado desativado**
   - `05-force-login-every-open.js` foi neutralizado.
   - A sessão oficial passa a ser apenas a sessão PHP/MySQL.
   - Patches legados não persistem mais usuários ou CPF em `localStorage`.

4. **Sem auto-refresh**
   - Não foram encontrados `beforeunload`, `setInterval` ou `location.reload` nos scripts ativos.

## Validações executadas

- PHP lint: OK em 12 arquivos PHP.
- JS syntax: OK em todos os arquivos JS.
- Busca por `DELETE FROM`, `DROP TABLE`, `TRUNCATE`: sem comandos executáveis no backend/JS.
- Busca por auto-refresh/reload: sem ocorrências ativas.
- ZIP gerado e testado com integridade OK.

## Observação
Este hotfix não altera banco, não executa DROP, não muda layout e não cria novas funcionalidades. O foco é reduzir risco de perda de dados antes de subir para produção.
