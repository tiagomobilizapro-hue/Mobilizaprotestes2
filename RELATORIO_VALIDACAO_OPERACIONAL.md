# Relatorio de validacao operacional - MobilizaPro 1.10

Data da validacao local: 2026-07-01

## Resultado executivo

O pacote passou na validacao automatizada local e no smoke test de interface em navegador.

Nao foi possivel declarar garantia completa de ausencia de falhas operacionais porque este computador nao possui runtime PHP/MySQL local disponivel para executar o backend real, o login real, o upgrade real e a persistencia real.

## Testes aprovados

- Suite automatizada local: 103/103 checks aprovados.
- Sintaxe JavaScript validada: 21 arquivos.
- Arquivos obrigatorios presentes.
- Configuracao sem senha real exposta.
- Protecoes .htaccess presentes para config, database, bootstrap, SQL, logs, backups e ZIPs.
- CSRF presente e validado com hash_equals.
- Sessao configurada com HttpOnly e SameSite=Lax.
- Login usa password_verify e regenera sessao.
- Backend nao contem DROP TABLE, TRUNCATE ou DELETE FROM nos arquivos operacionais.
- Exclusao operacional usa inativacao logica.
- Rotas principais de auth presentes.
- Ordem dos scripts principais conferida.
- Interface renderizada em navegador via servidor local.
- Formulario de login encontrado e botao clicavel.
- Console do navegador sem erros; apenas warning do Tailwind CDN.

## Artefatos gerados

- tests/artifacts/validation-report.md
- tests/artifacts/validation-report.json
- tests/artifacts/browser-smoke-report.json

## Pendencias para garantia operacional completa

Estes testes precisam rodar na Hostinger ou em homologacao com PHP 8.1/8.2 e MySQL/MariaDB:

- php -l em todos os arquivos PHP.
- Acesso a /preflight.php com banco configurado.
- Execucao de /database/upgrade.php contra backup ou banco de homologacao.
- Login real com administrador inicial.
- Troca da senha inicial do administrador.
- Criacao, edicao, inativacao e listagem de usuarios.
- Criacao e edicao de candidatos.
- Criacao, cancelamento e sincronizacao de solicitacoes M.O.
- Edicao de matriz de treinamentos.
- Validacao de alojamento.
- Persistencia entre dois navegadores ou dispositivos.
- Teste de permissoes por perfil.

## Observacoes

O warning do Tailwind CDN nao quebra a aplicacao, mas e um aviso de producao: para uma release mais robusta, o CSS do Tailwind deveria ser compilado e servido localmente.

Se a senha real do banco esteve em ZIPs ou mensagens anteriores, ela deve ser trocada no Hostinger antes da liberacao.

## Validacao local adicional - 2026-07-07

Versao avaliada: `mobilizapro_112_governanca_atualizacoes_compartilhadas`.

### Ajustes aplicados na copia validada

- Removida senha real que estava em `config/config.php`.
- `config/config.php` passou a usar `colocar_senha_no_config`.
- `app_version` ajustado para `1.12 Governanca Atualizacoes Compartilhadas`.

### Testes executados

- Suite automatizada local: 112/112 checks aprovados.
- Sintaxe JavaScript validada: 27 arquivos.
- Smoke test em navegador via `http://127.0.0.1:8892/index.html`.
- Interface carregou com titulo `MobilizaPRO - Sistema de Mobilizacao`.
- Menu principal renderizou 14 entradas.
- Scripts finais 20 a 25 carregaram na ordem esperada.
- Formulario de login foi encontrado e o botao Entrar respondeu ao clique.
- Console do navegador: 0 erros; 1 aviso do Tailwind CDN.

### Limite da validacao

O login real e as rotas PHP/MySQL ainda dependem de teste em Hostinger ou homologacao com PHP 8.1/8.2, PDO MySQL e banco configurado.

## Complemento de validação - 2026-07-02
- PHP lint executado em 12/12 arquivos PHP: OK.
- JS operacional 21-operational-corrections.js validado com node --check: OK.
- Upgrade preserva dados existentes e adiciona colunas necessárias quando ausentes.
- Observação: por solicitação expressa, a ação "Excluir definitivo" em Solicitação M.O. executa DELETE apenas na tabela solicitacoes_mo para a RM/Obra/Função selecionada.

## Validação adicional - Logo e botões
- Logo de alta qualidade adicionada aos assets locais.
- Botão superior duplicado ocultado por CSS e JS defensivo.
- Botões “Nova RM” padronizados em Solicitação M.O. e Controle de Vagas.
- Nenhuma alteração de banco executada.
