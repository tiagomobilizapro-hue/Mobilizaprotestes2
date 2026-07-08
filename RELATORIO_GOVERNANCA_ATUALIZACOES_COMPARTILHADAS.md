# Relatório — Governança de Atualizações Compartilhadas

## Versão

`mobilizapro_112_governanca_atualizacoes_compartilhadas`

## Solicitação

Ricardo informou que o MobilizaPro é um projeto compartilhado e que:

- Tiago precisa receber as atualizações solicitadas por Ricardo.
- Ricardo precisa visualizar as atualizações solicitadas por Tiago.

## Solução aplicada

Foi criado um registro formal de solicitações compartilhadas dentro do pacote do projeto.

Arquivo criado:

- `REGISTRO_COMPARTILHADO_SOLICITACOES.md`

Também foi atualizado:

- `CHANGELOG.md`

## Escopo da alteração

Esta alteração é documental e de governança do pacote.

Não foram alterados:

- Banco de dados;
- APIs PHP;
- Regras de autenticação;
- Rotas de salvamento;
- Layout principal;
- Scripts operacionais existentes;
- Curva S adicionada na versão anterior.

## Resultado esperado

A partir desta versão, cada pacote entregue deve deixar claro:

- Quem solicitou cada alteração;
- O que foi solicitado;
- O status da solicitação;
- Quais arquivos foram impactados;
- O que precisa ser repassado para Ricardo e Tiago.

## Observação operacional

O pacote não realiza envio automático de mensagens. Para garantir que Tiago e Ricardo recebam a mesma informação, o ZIP atualizado deve ser compartilhado entre os dois pelo canal externo usado pela equipe.

Sugestão de procedimento:

1. Gerar uma nova versão ZIP a cada alteração aprovada.
2. Manter o `REGISTRO_COMPARTILHADO_SOLICITACOES.md` atualizado.
3. Enviar o ZIP para Ricardo e Tiago.
4. Conferir o `CHANGELOG.md` antes da instalação em produção.
