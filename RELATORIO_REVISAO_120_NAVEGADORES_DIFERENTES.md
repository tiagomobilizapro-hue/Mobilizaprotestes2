# RELATÓRIO REVISÃO 120 - NAVEGADORES DIFERENTES / CROSS-BROWSER

## Objetivo
Validar e reforçar o comportamento multiusuário quando usuários acessam o MobilizaPro em navegadores diferentes, cada um com cache/localStorage próprio.

## Problema analisado
Em navegadores diferentes, Chrome, Edge, Firefox e celular não compartilham localStorage. Um navegador pode ficar com uma versão antiga do estado enquanto outro usuário já salvou alterações no MySQL. Se o navegador antigo enviar o estado completo sem mesclar com o servidor, existe risco de sobrescrever registros recentes.

## Correção aplicada
Incluído `assets/js/33-multiusuario-cross-browser-20260708.js`, carregado por último no `index.html`.

A nova camada:
- puxa o estado atual do MySQL antes de salvar;
- mescla servidor + estado local antes do envio;
- preserva registros que só existem no servidor;
- mantém uma base local para diferenciar valor antigo de campo editado;
- mantém fila local persistente por navegador;
- avisa e preserva alteração local quando há edição simultânea do mesmo campo.

## Limite conhecido
Se dois usuários editarem exatamente o mesmo campo do mesmo candidato ao mesmo tempo, não existe uma decisão automática perfeita. A revisão preserva a alteração local do navegador que está salvando, registra alerta no console e evita apagar registros inteiros. Para eliminação completa desse cenário, a próxima etapa recomendada é backend com endpoints por registro/campo e bloqueio otimista por `payload_hash` por candidato.

## Teste recomendado
1. Abrir Chrome e Edge com usuários diferentes.
2. Criar candidato A no Chrome e candidato B no Edge sem atualizar as telas.
3. Salvar Chrome, depois Edge.
4. Recarregar ambos e confirmar que A e B aparecem.
5. Editar campos diferentes do mesmo candidato nos dois navegadores e salvar.
6. Confirmar mesclagem.
7. Editar o mesmo campo nos dois navegadores e verificar alerta de conflito no console.

## Arquivos alterados
- `index.html`
- `assets/js/33-multiusuario-cross-browser-20260708.js`
- `CHANGELOG.md`
- `REGISTRO_COMPARTILHADO_SOLICITACOES.md`
