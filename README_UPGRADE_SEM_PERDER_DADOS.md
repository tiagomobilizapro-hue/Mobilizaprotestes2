# Upgrade sem perder dados

## Regra principal

Nunca apague o banco e nunca execute DROP TABLE. Esta release foi preparada para modificar somente o necessário.

## Procedimento seguro

1. Exporte um backup completo no hPanel/phpMyAdmin.
2. Guarde também uma cópia dos arquivos atuais de public_html.
3. Edite config/config.php localmente e informe os dados do banco.
4. Envie os arquivos do ZIP diretamente para public_html.
5. Acesse /preflight.php e confira requisitos, configuração e conexão.
6. Acesse /database/upgrade.php.
7. Confira no relatório quais tabelas já existiam, quais foram criadas e quais colunas foram adicionadas.
8. Teste o login.
9. Navegue por Dashboard, Usuários, Obras, Colaboradores, Candidatos, Solicitações e Status.
10. Crie e edite um registro de teste.
11. Apague database/upgrade.php, database/install.php e preflight.php após confirmar o funcionamento.

## O que o upgrade faz

- preserva usuarios, colaboradores, obras, candidatos, status_mobilizacao, app_store e training_matrix_store;
- usa usuarios.senha_hash;
- cria somente tabelas ausentes;
- adiciona somente colunas ausentes;
- migra uma coluna senha legada para senha_hash apenas quando o hash está ausente ou inválido;
- não substitui um senha_hash válido;
- cria o administrador inicial somente se ele não existir;
- corrige perfil, ativação ou hash do administrador somente quando necessário;
- converte remoções operacionais em inativação lógica.

## O que o upgrade não faz

- não executa DROP TABLE;
- não executa TRUNCATE;
- não executa DELETE;
- não recria o banco;
- não esvazia tabelas;
- não sobrescreve hashes válidos;
- não altera o design.

Se o relatório apresentar aviso sobre CPF duplicado, não remova registros às cegas. Analise o backup e corrija os duplicados manualmente.

## Atualização v124 — Banca Técnica Aplicada

Após enviar os arquivos da v124 ao servidor, execute uma vez:

```text
/database/upgrade.php
```

A atualização é incremental e não apaga registros existentes. Ela reforça a matriz `permissoes_perfil`, adiciona o módulo `banca_tecnica`, prepara a tabela `homologacao_tecnica` e mantém exclusões operacionais como inativação lógica.

Depois de testar, remova ou bloqueie os arquivos de instalação/upgrade do ambiente público.
