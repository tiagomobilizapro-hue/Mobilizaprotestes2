# Relatorio - Salvamento Multiusuario Garantido

Data: 2026-07-07

## Objetivo

Certificar e reforcar o comportamento do MobilizaPro quando varias pessoas estiverem logadas lancando dados ao mesmo tempo, evitando que um lancamento fique sem processamento quando ocorrer conflito de versao, oscilacao de rede ou falha temporaria do servidor.

## Problema identificado

O fluxo anterior ja possuia token de conflito no backend, mas o navegador podia depender de um salvamento em memoria. Em cenarios de concorrencia, rede instavel ou conflito 409, o usuario recebia aviso, porem ainda havia risco operacional de um lancamento nao confirmado ficar sem reenvio se a tela fosse fechada ou ignorada.

## Correcao aplicada

Foi criado o arquivo incremental `assets/js/27-salvamento-multiusuario-garantido.js`, carregado ao final do `index.html`.

Principais protecoes:

- Fila local persistente de salvamentos pendentes em `localStorage`.
- Reenvio automatico de lancamentos ainda nao confirmados.
- Tratamento de conflito multiusuario: ao receber conflito, o navegador busca o estado mais recente do servidor e reenvia o lancamento pendente.
- Indicador visual de pendencia/confirmacao no canto da tela.
- Clique no indicador para tentar reenviar imediatamente.
- Aviso antes de fechar ou trocar de pagina quando ainda existir lancamento nao confirmado.
- Funcoes tecnicas expostas para verificacao: `getPendingCount()` e `retryPending()`.

## Resultado esperado

Quando um usuario lancar dados e outro usuario salvar quase ao mesmo tempo:

1. O servidor pode recusar a primeira tentativa por conflito de versao.
2. O navegador atualiza o token buscando o estado mais recente.
3. O lancamento permanece na fila persistente.
4. O sistema tenta reenviar ate receber confirmacao do MySQL.
5. Enquanto nao confirmar, a tela mostra pendencia e avisa antes de sair.

## Validacao executada

- Validacao automatizada do pacote: `tests/validate-ready.js`.
- Checagem de sintaxe JavaScript do novo arquivo.
- Verificacao de carregamento do script 27 no `index.html`.
- Smoke test local por navegador para confirmar que o arquivo e carregado sem erro de console.

## Limite da certificacao local

O ambiente local usado para smoke test serviu arquivos estaticos e nao executou PHP/MySQL como a Hostinger. Por isso, a validacao local comprova a presenca, sintaxe e carregamento da blindagem, mas a certificacao operacional completa deve ser repetida em homologacao Hostinger ou ambiente equivalente com PHP/MySQL ativo.

## Roteiro recomendado de homologacao multiusuario

1. Abrir o sistema em dois navegadores ou duas abas anonimas com usuarios diferentes.
2. Lancar uma solicitacao ou candidato no Usuario A.
3. Antes de recarregar a tela, lancar outro registro no Usuario B.
4. Salvar quase ao mesmo tempo.
5. Confirmar que nao aparece erro silencioso.
6. Confirmar que o indicador de pendencia desaparece apos confirmacao.
7. Recarregar ambos os navegadores e validar que os dois lancamentos aparecem.
8. Repetir o teste desligando momentaneamente a rede de uma sessao e religando para validar reenvio.

## Arquivos alterados

- `assets/js/27-salvamento-multiusuario-garantido.js`
- `index.html`
- `tests/validate-ready.js`
- `CHANGELOG.md`
- `REGISTRO_COMPARTILHADO_SOLICITACOES.md`
- `RELATORIO_SALVAMENTO_MULTIUSUARIO_GARANTIDO_20260707.md`
