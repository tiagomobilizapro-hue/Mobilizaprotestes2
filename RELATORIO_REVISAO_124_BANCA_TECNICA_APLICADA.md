# MobilizaPRO v124 — Banca Técnica Aplicada

Data da revisão: 09/07/2026  
Base utilizada: MobilizaPRO v123 Professional Core Operacional

## Nota de transparência

Esta revisão aplica uma **matriz técnica estruturada por 15 especialidades**. Ela não representa uma banca humana externa real, nem substitui homologação funcional no ambiente Hostinger com usuários reais. O objetivo foi transformar o critério de “15 especialistas” em uma lista objetiva de evidências, travas e pendências dentro do próprio MobilizaPRO.

## Principais entregas da v124

1. **Módulo Banca Técnica**
   - Nova página no menu: `Banca Técnica`.
   - Consulta ao endpoint `api/professional.php?action=technical_board`.
   - Exibe 15 áreas de validação: arquitetura, banco, segurança, UX/UI, BI, RH, mobilização, SGC Vale, ERP/TOTVS, QA, multiusuário, performance, compliance, SaaS e implantação Hostinger.
   - Mostra score, decisão e pendências.
   - Exporta CSV do parecer técnico.

2. **Permissões reais no MySQL**
   - A matriz `permissoes_perfil` deixou de ser apenas informativa.
   - A API agora consulta a matriz para permitir ou bloquear ações.
   - Nova ação `save_permission` permite ao perfil autorizado alterar permissões por módulo.
   - Alterações de permissão são registradas em auditoria.

3. **Enforcement de permissões nas APIs críticas**
   - `contracts`: exige permissão de visualização em contratos.
   - `save_contract`: exige criar ou editar em contratos.
   - `delete_contract`: exige excluir/inativar em contratos.
   - `documents`: exige visualização em documentos.
   - `save_document`: exige criar ou editar em documentos.
   - `delete_document`: exige excluir/inativar em documentos.
   - `audit`: exige permissão de auditoria.
   - `permissions`: exige permissão de usuários.

4. **Auditoria corrigida para API Professional**
   - `api/professional.php` agora possui fallback local para `mobi_audit`.
   - A API não depende mais de função declarada apenas em `api/store.php` para registrar auditoria.

5. **Upgrade não destrutivo**
   - Nova migration: `database/migrations/124_banca_tecnica_permissoes.sql`.
   - Nova tabela preparada: `homologacao_tecnica`.
   - Novas permissões sem apagar dados existentes: `relatorios` e `banca_tecnica`.

## Matriz técnica de 15 especialidades

A tela de Banca Técnica avalia as seguintes áreas:

1. Arquiteto de software
2. Especialista em banco de dados
3. Especialista em segurança
4. Especialista em UX/UI
5. Especialista em dashboard/BI
6. Especialista em RH/recrutamento
7. Especialista em mobilização
8. Especialista em SGC Vale
9. Especialista em ERP/TOTVS
10. Especialista em QA/testes
11. Especialista em multiusuário/sessão
12. Especialista em performance
13. Especialista em auditoria/compliance
14. Especialista em produto SaaS
15. Especialista em implantação Hostinger/PHP/MySQL

## Arquivos alterados/adicionados

- `api/professional.php`
- `api/bootstrap.php`
- `index.html`
- `assets/js/37-banca-tecnica-permissoes-20260709.js`
- `database/migrations/124_banca_tecnica_permissoes.sql`
- `database/schema.sql`
- `RELATORIO_REVISAO_124_BANCA_TECNICA_APLICADA.md`
- `CHANGELOG.md`

## Validações realizadas

- Sintaxe PHP validada com `php -l` nos arquivos `.php`.
- Sintaxe JavaScript validada com `node --check` nos arquivos `.js`.
- Conferido carregamento do novo JS no `index.html`.
- Conferido que chamadas antigas para `mobi_prof_permissions()` foram atualizadas para `mobi_prof_permissions($pdo)`.
- Conferido que `api/professional.php` não depende mais de `mobi_audit` externo.

## Pendências assumidas antes de produção

- Executar `/database/upgrade.php` no servidor após subir os arquivos.
- Testar login em pelo menos dois usuários reais e dois navegadores diferentes.
- Testar alteração simultânea de candidato/solicitação entre Chrome e Edge.
- Trocar senha padrão do administrador, caso ainda exista.
- Remover ou bloquear `setup.php`, `preflight.php`, `database/install.php` e `database/upgrade.php` após implantação e validação.
- Homologar com dados reais de mobilização e documentação antes de uso crítico.

## Decisão técnica

A v124 está **apta para homologação controlada**, não para promessa de produção sem testes. A evolução feita nesta revisão melhora governança, permissões, auditoria e rastreabilidade, aproximando o MobilizaPRO do escopo Professional Core descrito para produto profissional.
