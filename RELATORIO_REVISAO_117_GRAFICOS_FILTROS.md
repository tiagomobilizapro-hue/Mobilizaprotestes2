# Relatório — MobilizaPro 1.17

## Solicitação

Ricardo solicitou a próxima revisão após validar a prévia no GitHub Pages, com dois pontos principais:

- O gráfico 3D do Pipeline ficou visualmente diferente da prévia aprovada.
- Os gráficos precisam alterar conforme os filtros realizados nas telas.

## Entrega

Foi adicionada uma nova camada incremental:

- `assets/js/30-graficos-filtros-3d-20260708.js`

## Ajustes implementados

### Pipeline — gráfico 3D

- A rosca 3D foi refeita com maior dimensão, mais profundidade visual e menor achatamento.
- Mantidas as cores operacionais:
  - Verde: vagas sem declínio.
  - Vermelho: vagas declinadas.
- O card passou a exibir o filtro ativo diretamente no cabeçalho do gráfico.
- O cálculo continua excluindo solicitações canceladas.

### Filtros

- O gráfico do Pipeline recalcula conforme o filtro de Obra.
- A Curva S já respeitava o filtro de Obra; a revisão reforça o refresh visual quando filtros são alterados.
- Foi criada a interface técnica `MobilizaProGraphFilters.refresh()` para forçar atualização manual em ambiente de demonstração, se necessário.

### Dados demonstrativos do GitHub Pages

- A massa demo foi atualizada para deixar a comparação visual mais clara por obra.
- A versão de dados demo foi incrementada para recarregar automaticamente quando o navegador ainda possuir massa anterior.
- A obra M.400 passa a ter cenário próximo da prévia aprovada, com declínios suficientes para destacar o segmento vermelho.

## Escopo

- Alteração focada em GitHub Pages / prévia visual.
- Sem alteração em PHP.
- Sem alteração em MySQL.
- Sem impacto direto na Hostinger de produção.

## Validações executadas

- Sintaxe JavaScript validada com `node --check`.
- Integridade do ZIP validada com `unzip -t`.
- Conferida presença do novo script no final do `index.html`.

## Observação

No GitHub Pages, login e dados são simulados para avaliação visual. Testes reais de PHP, MySQL, permissões e concorrência devem ser feitos no ambiente de homologação da Hostinger.
