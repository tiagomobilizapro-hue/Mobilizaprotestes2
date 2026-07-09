# MobilizaPRO v123 — Professional Core Operacional

Base oficial utilizada: `mobilizapro_122_professional_core.zip`, gerada a partir da v121.

## Objetivo

Transformar parte do escopo profissional que estava apenas preparado na v122 em operação real: contratos, documentos, permissões e relatórios executivos, preservando a lógica multiusuário, cross-browser e recrutador gravado no candidato.

## O que foi implementado

1. **Contratos / Obras com operação real**
   - Cadastro de contrato/obra por código.
   - Nome do contrato.
   - Cliente.
   - Centro de custo.
   - Gestor responsável.
   - Status: ATIVO, EM MOBILIZACAO, SUSPENSO, ENCERRADO, INATIVO.
   - Inativação lógica, sem exclusão física.
   - Auditoria ao salvar e inativar.

2. **Documentos e Mobilização com operação real**
   - Registro documental vinculado ao candidato.
   - Tipo de documento/etapa.
   - Status: PENDENTE, ENVIADO, APROVADO, REPROVADO, VENCIDO, DISPENSADO.
   - Validade.
   - Data de envio.
   - Arquivo/protocolo de referência.
   - Motivo de reprovação/observação.
   - Inativação lógica, sem exclusão física.
   - Auditoria ao salvar e inativar.

3. **Usuários e Permissões — matriz operacional**
   - Nova tela de permissões.
   - Matriz por perfil atual do sistema: GERENCIAL, OPERACIONAL_RECRUTAMENTO, MOBILIZACAO, MEDICINA, OBRA e ALOJAMENTO.
   - Mapeamento visual por módulo: dashboard, vagas, candidatos, mobilização, documentos, contratos, auditoria e usuários.
   - Tabela `permissoes_perfil` criada no upgrade seguro.

4. **Relatórios Executivos**
   - Nova tela de relatórios.
   - Resumo gerencial puxado do MySQL.
   - Produtividade por recrutador.
   - Candidatos por obra.
   - Exportação CSV simples para ranking de recrutadores e obras.

5. **API profissional ampliada**
   - `api/professional.php?action=contracts`
   - `api/professional.php?action=save_contract`
   - `api/professional.php?action=delete_contract`
   - `api/professional.php?action=documents`
   - `api/professional.php?action=save_document`
   - `api/professional.php?action=delete_document`
   - `api/professional.php?action=permissions`
   - `api/professional.php?action=dashboard`
   - `api/professional.php?action=audit`

6. **Banco de dados**
   - Nova migração incremental: `database/migrations/123_professional_core_operacional.sql`.
   - Criação segura da tabela `permissoes_perfil`.
   - Índices auxiliares para documentos e contratos.
   - Nenhum `DROP`, `TRUNCATE` ou `DELETE` foi adicionado.

## Arquivos novos

- `assets/js/36-professional-core-operacional-20260709.js`
- `database/migrations/123_professional_core_operacional.sql`
- `RELATORIO_REVISAO_123_PROFESSIONAL_CORE_OPERACIONAL.md`

## Arquivos alterados

- `index.html`
- `api/bootstrap.php`
- `api/professional.php`
- `assets/css/08-professional-core-20260708.css`
- `database/schema.sql`
- `config/config.php`
- `config/config.example.php`
- `CHANGELOG.md`

## Validação técnica executada

- `php -l api/bootstrap.php`
- `php -l api/professional.php`
- `php -l api/store.php`
- `php -l api/auth.php`
- `php -l config/config.php`
- `node --check assets/js/35-professional-core-20260708.js`
- `node --check assets/js/36-professional-core-operacional-20260709.js`

## Observação operacional

Após subir os arquivos no servidor, execute uma vez:

`/database/upgrade.php`

Isso aplica as estruturas novas sem apagar dados existentes.
