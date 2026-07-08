# MobilizaPro 1.10 — Hostinger

Esta release usa o banco existente e mantém o visual original do MobilizaPro 1.0.

## Instalação ou atualização

1. Faça backup dos arquivos e do banco.
2. Envie o conteúdo do ZIP diretamente para public_html.
3. Edite config/config.php.
4. Informe a senha do banco no campo pass.
5. Mantenha host localhost e charset utf8mb4.
6. Acesse https://seu-dominio.com/preflight.php.
7. Se os itens essenciais estiverem OK, acesse https://seu-dominio.com/database/upgrade.php.
8. Leia o relatório exibido.
9. Acesse https://seu-dominio.com/login.php.
10. Depois dos testes, apague database/upgrade.php, database/install.php e preflight.php.

## Login inicial

- CPF: 000.000.000-00
- Senha inicial: 123456

A senha inicial só é redefinida pelo upgrade se o hash existente estiver vazio ou inválido. Um hash válido já existente é preservado.

## Banco real

A coluna oficial de autenticação é usuarios.senha_hash. O sistema usa password_hash para gravação e password_verify no login.

O upgrade não remove tabelas, não executa exclusões físicas e não recria o banco. Registros removidos pela interface são inativados para preservar o histórico.

## Requisitos

- PHP 8.1 ou 8.2
- MySQL/MariaDB
- PDO MySQL
- Sem Composer obrigatório
- Sem Node.js obrigatório
- Usuário MySQL diferente de root

## Solução de problemas

- Banco não configurado: substitua colocar_senha_no_config em config/config.php.
- Falha de conexão: confirme no hPanel se o usuário está associado ao banco.
- Login não funciona: execute database/upgrade.php e confira o relatório de usuarios.senha_hash.
- Página sem estilo: envie a pasta assets integralmente, sem renomear arquivos.
- Erro 500: confirme PHP 8.1/8.2 e consulte o detalhe seguro mostrado pelo upgrade.

Nunca publique a senha real do banco em README, log, print ou chamado.

## Checklist de liberação

- Trocar a senha inicial do administrador após o primeiro login.
- Confirmar que usuários, candidatos, solicitações, alojamento e matriz carregam em outro navegador.
- Remover scripts de instalação/verificação após validar produção.
- Guardar backup do banco e dos arquivos publicados.
