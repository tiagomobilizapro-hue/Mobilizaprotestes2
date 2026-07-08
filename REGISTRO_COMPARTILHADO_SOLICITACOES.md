# Registro Compartilhado de Solicitações — MobilizaPro

Este arquivo é o ponto de controle compartilhado do projeto MobilizaPro.

Objetivo: garantir que as solicitações feitas por Ricardo e Tiago fiquem visíveis para ambos em cada pacote entregue.

## Regra operacional do projeto compartilhado

- Toda nova versão entregue deve registrar quem solicitou a alteração.
- Solicitações de Ricardo devem ser registradas para ciência de Tiago.
- Solicitações de Tiago devem ser registradas para ciência de Ricardo.
- O pacote entregue deve conter este registro atualizado e um relatório da alteração executada.
- Alterações devem continuar sendo incrementais, sem apagar arquivos, correções ou relatórios anteriores.

## Solicitações registradas

### 2026-07-07 - Operacional

**Solicitação:** certificar que, com várias pessoas logadas lançando dados ao mesmo tempo, nenhum lançamento fique sem processar, pois esse erro já foi identificado em algumas oportunidades.

**Status:** executado nesta versão validada com fila persistente de salvamento, reenvio automático, tratamento de conflito multiusuário e aviso de pendência antes de sair da tela.

**Arquivos relacionados:**

- `assets/js/27-salvamento-multiusuario-garantido.js`
- `index.html`
- `CHANGELOG.md`
- `RELATORIO_SALVAMENTO_MULTIUSUARIO_GARANTIDO_20260707.md`

### 2026-07-07 - Ricardo

**Solicitação:** registrar o nome do recrutador conforme a pessoa logada que lançou o cadastro, alterar o gráfico para vagas solicitadas x vagas declinadas e ajustar Medicina/ASO para marcação, emissão, status e justificativa de atraso.

**Status:** executado nesta versão validada.

**Arquivos relacionados:**

- `assets/js/26-regras-operacionais-20260707.js`
- `index.html`
- `CHANGELOG.md`
- `RELATORIO_REGRAS_OPERACIONAIS_20260707.md`

### 2026-07-06 — Tiago Marques

**Solicitação:** enviar o pacote do projeto para Ricardo.

**Status:** registrado como contexto compartilhado do projeto.

### 2026-07-06 — Ricardo

**Solicitação:** adicionar ao Dashboard uma Curva S de acompanhamento das solicitações, comparando solicitações, recrutados e mobilizados.

**Status:** executado na versão `mobilizapro_111_dashboard_curva_s.zip`.

**Arquivos relacionados:**

- `assets/js/25-dashboard-curva-s.js`
- `RELATORIO_DASHBOARD_CURVA_S.md`

### 2026-07-06 — Ricardo

**Solicitação:** tratar o MobilizaPro como projeto compartilhado, garantindo que Tiago receba as atualizações solicitadas por Ricardo e que Ricardo veja as atualizações solicitadas por Tiago.

**Status:** executado nesta versão por meio da criação deste registro compartilhado e atualização do changelog.

**Arquivos relacionados:**

- `REGISTRO_COMPARTILHADO_SOLICITACOES.md`
- `RELATORIO_GOVERNANCA_ATUALIZACOES_COMPARTILHADAS.md`
- `CHANGELOG.md`


### 2026-07-08 — Ricardo

**Solicitação:** corrigir o estouro do campo de justificativa na tela Medicina / ASO, transformar o gráfico do Pipeline em um gráfico 3D mais bonito mantendo as cores verde e vermelho, e evitar sobreposição de informações antes de subir para a Hostinger.

**Status:** executado nesta versão para Hostinger.

**Arquivos relacionados:**

- `assets/js/28-ajuste-visual-hostinger-20260708.js`
- `index.html`
- `CHANGELOG.md`
- `RELATORIO_AJUSTE_VISUAL_HOSTINGER_20260708.md`

## Como usar este registro

Antes de instalar ou repassar uma nova versão:

1. Abrir este arquivo.
2. Conferir as solicitações registradas por Ricardo e Tiago.
3. Validar se o pacote contém os relatórios correspondentes.
4. Repassar o ZIP atualizado para os envolvidos.

## Observação importante

Este arquivo não envia mensagens automaticamente. Ele garante rastreabilidade dentro do pacote do projeto. O envio externo para Ricardo ou Tiago deve ser feito pelo canal combinado entre vocês, anexando o ZIP mais recente.
