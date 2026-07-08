# Relatório - Dashboard Curva S

## Alteração realizada

Foi adicionada ao Dashboard Executivo uma Curva S de acompanhamento acumulado comparando:

- Solicitações: quantidade total solicitada nas RMs ativas;
- Recrutados: colaboradores ativos pela data de recrutamento;
- Mobilizados: colaboradores ativos com admissão real registrada.

## Estratégia de preservação

Para evitar perda de alterações anteriores, a camada principal do dashboard não foi reescrita. A implementação foi feita como patch incremental carregado por último:

- Novo arquivo: `assets/js/25-dashboard-curva-s.js`
- Inclusão no `index.html` após o script `24-ficha360-premium-recrutamento-delete.js`

## Comportamento

A curva respeita o filtro executivo de Obra já existente no dashboard. Quando uma obra é selecionada, o gráfico recalcula automaticamente Solicitações, Recrutados e Mobilizados somente para essa obra.

## Critérios utilizados

- Solicitações canceladas não entram na curva.
- Solicitações usam o campo `qty` e a data da RM.
- Recrutados usam o campo `recruited` dos candidatos ativos.
- Mobilizados usam o campo `admitted` dos candidatos ativos.
- Candidatos declinados não entram nos acumulados de recrutados e mobilizados.
- Registros sem data válida são posicionados na data atual para não ficarem fora do acompanhamento.

## Arquivos alterados

- `index.html`
- `assets/js/25-dashboard-curva-s.js` novo
