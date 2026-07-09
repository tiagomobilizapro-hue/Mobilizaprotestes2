# MobilizaPRO v122 — Professional Core

Base oficial utilizada: `mobilizapro_121_hostinger_recrutador_candidato-1.zip`.

## Objetivo

Evoluir a v121 para uma base mais profissional, funcional e preparada para operação multiusuário, governança, mobilização documental, contratos e dashboard executivo filtrável.

## O que foi implementado

1. **Dashboard executivo com filtros globais**
   - Nº Obra/Contrato.
   - Função.
   - Recrutador.
   - Status operacional.
   - Período.
   - Os cards, funil, gargalos, vagas e rankings passam a responder aos filtros.

2. **Módulos profissionais adicionados**
   - Contratos.
   - Documentos.
   - Auditoria.

3. **Produtividade por recrutador**
   - Ranking no dashboard usando o recrutador gravado no candidato.
   - Conversão por ASO, admitidos e liberados.

4. **Governança de dados**
   - Indicadores de candidatos sem recrutador, sem RM, sem obra e possíveis CPFs duplicados.

5. **Base preparada para documentos/mobilização**
   - Nova tabela `documentos_mobilizacao`.
   - Campos para status, validade, envio, aprovação, reprovação e motivo.

6. **Base preparada para contratos**
   - Nova tabela `contratos_operacionais`.
   - Código, cliente, centro de custo, gestor e status.

7. **Melhoria multiusuário v122**
   - Divergência de token deixa de bloquear salvamento somente quando o fluxo já passou pela mescla cross-browser e envia `merge_safe=true`.
   - O sistema registra o conflito como merge controlado em auditoria.
   - O modo estrito continua disponível via `strict_conflict=true`.

8. **Correção estrutural para patches JS**
   - `CANDIDATES` e `SOLICITATIONS` passam a ser expostos em `window` por getter/setter, mantendo compatibilidade com patches posteriores que usam `window.CANDIDATES`.

## Arquivos novos

- `assets/css/08-professional-core-20260708.css`
- `assets/js/35-professional-core-20260708.js`
- `api/professional.php`
- `database/migrations/122_professional_core.sql`

## Arquivos alterados

- `index.html`
- `api/bootstrap.php`
- `api/store.php`
- `database/schema.sql`
- `config/config.php`
- `config/config.example.php`

## Observação operacional

Depois de subir os arquivos, execute `database/upgrade.php` uma vez no navegador para garantir que as tabelas e colunas novas sejam criadas no banco da Hostinger sem apagar dados existentes.
