# Relatorio - Regras Operacionais 2026-07-07

## Solicitacao

Foram solicitados tres ajustes operacionais:

- Exibir o nome do recrutador conforme usuario logado que lancou a pessoa.
- Alterar o grafico de comparacao para vagas solicitadas x vagas declinadas.
- Ajustar Medicina/ASO para Data Marcacao ASO, Data Emissao ASO, status Pendente/Concluido e justificativa obrigatoria quando atrasar conforme matriz de recrutamento.

## Implementacao

Foi criado o patch incremental:

- `assets/js/26-regras-operacionais-20260707.js`

O arquivo e carregado por ultimo no `index.html`, depois da Curva S, para preservar as correcoes anteriores.

## Comportamento esperado

- Ao salvar uma nova pessoa, o sistema grava `recruiter_name`, `recruiter_cpf`, `recruited_by_name` e `recruited_by_cpf` usando o usuario logado.
- Os cards de recrutamento passam a mostrar `Recrutador`.
- O grafico do pipeline passa a exibir `Vagas Solicitadas x Vagas Declinadas`.
- Em Medicina, o fluxo fica:
  - Data Marcacao ASO: data em que o recrutamento acionou Medicina.
  - Status Pendente: enquanto nao houver Data Emissao ASO.
  - Data Emissao ASO: data que conclui o ASO.
  - Status Concluido: apos informar Data Emissao ASO.
  - Justificativa obrigatoria: quando a emissao/pendencia ultrapassar o prazo da matriz.

## Validacao local

- Suite automatizada: 117/117 checks aprovados.
- Sintaxe do novo JS: OK.
- Smoke test no navegador: script 26 carregado sem erro.

## Limite

O teste com usuario logado real e persistencia MySQL deve ser confirmado em homologacao/Hostinger, pois depende de sessao PHP e banco configurado.
