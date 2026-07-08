# Relatório — Ajuste visual para Hostinger 2026-07-08

## Solicitante

Ricardo.

## Objetivo

Preparar arquivo para publicação na Hostinger com os ajustes visuais solicitados antes da subida:

- Corrigir a tela Medicina / ASO para o campo de justificativa não ultrapassar a margem do container.
- Transformar o gráfico do Pipeline em uma rosca 3D mais bonita.
- Manter as cores verde e vermelho no gráfico.
- Evitar sobreposição de informações.

## Estratégia aplicada

A alteração foi feita por patch incremental, sem reescrever os arquivos principais já existentes.

Arquivo novo criado:

- `assets/js/28-ajuste-visual-hostinger-20260708.js`

Arquivo alterado para carregar o patch:

- `index.html`

Arquivos de controle atualizados:

- `CHANGELOG.md`
- `REGISTRO_COMPARTILHADO_SOLICITACOES.md`
- `config/config.php`
- `config/config.example.php`

## Ajuste em Medicina / ASO

Foram adicionadas regras CSS específicas para `#page-medicina`:

- tabela com layout fixo e larguras controladas por coluna;
- rolagem horizontal contida dentro do card quando a tela for estreita;
- campo de justificativa com `width: 100%`, `max-width: 100%`, `box-sizing: border-box` e quebra de texto;
- badges e mensagens impedidos de ultrapassar a célula;
- inputs de data ajustados à largura da própria coluna.

Resultado esperado: o campo de justificativa permanece dentro da tabela/card, sem invadir a margem direita e sem sobrepor outros dados.

## Ajuste no Pipeline

O gráfico de vagas solicitadas x vagas declinadas foi substituído por uma rosca 3D em CSS, mantendo:

- verde para vagas sem declínio;
- vermelho para vagas declinadas;
- percentual central de declínio;
- cartões inferiores de vagas solicitadas e vagas declinadas;
- cálculo operacional já existente sobre `SOLICITATIONS.qty` e `CANDIDATES.declined_date` filtrado por obra.

Também foram aplicados:

- cabeçalho com quebra segura para não sobrepor o badge de quantidade;
- legenda separada abaixo do gráfico;
- gráfico centralizado;
- responsividade para telas menores.

## Segurança da alteração

- Nenhum arquivo de banco foi alterado.
- Nenhum `DROP TABLE`, `TRUNCATE` ou exclusão estrutural foi introduzido.
- Camadas anteriores foram preservadas:
  - Curva S no Dashboard;
  - regras operacionais de 2026-07-07;
  - salvamento multiusuário;
  - governança de solicitações Ricardo/Tiago.

## Atenção para Hostinger

O arquivo `config/config.php` continua usando placeholder de senha:

```php
'pass' => 'colocar_senha_no_config',
```

Antes de substituir o `config/config.php` em produção, confirme a senha real no ambiente da Hostinger ou preserve o `config/config.php` já configurado no servidor.

## Validação realizada

- `node --check` executado nos arquivos JavaScript.
- `php -l` executado nos arquivos PHP.
- Integridade do ZIP validada com `zip -T`.
- Conferido carregamento do novo patch após `27-salvamento-multiusuario-garantido.js`.
