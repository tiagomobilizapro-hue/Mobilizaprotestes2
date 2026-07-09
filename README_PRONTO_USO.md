# MobilizaPro 1.10 - pacote revisado para uso

## O que foi ajustado

- Removida senha real do arquivo config/config.php; informe a senha somente no ambiente de hospedagem.
- Adicionada a pagina preflight.php para validar PHP, PDO, PDO MySQL, configuracao e conexao antes do upgrade.
- Reforcados bloqueios .htaccess para arquivos sensiveis, backups e ZIPs.
- Atualizada a documentacao de instalacao e upgrade com checklist de liberacao.
- Adicionado aviso pos-upgrade para trocar a senha inicial do administrador e remover scripts de instalacao.

## Fluxo recomendado

1. Fazer backup do banco e dos arquivos atuais.
2. Enviar o conteudo desta pasta para public_html.
3. Editar config/config.php e preencher a senha do banco.
4. Abrir /preflight.php.
5. Abrir /database/upgrade.php.
6. Abrir /login.php e entrar com o administrador inicial.
7. Trocar a senha do administrador.
8. Testar os modulos principais em outro navegador.
9. Remover database/upgrade.php, database/install.php e preflight.php.

## Observacao de seguranca

Se a senha real do banco apareceu em ZIPs, prints ou mensagens, troque-a no hPanel/Hostinger e atualize config/config.php com a nova senha.

## Novidade v124

A v124 adiciona o menu **Banca Técnica** e reforça o menu **Permissões**. A validação por 15 especialidades é uma matriz técnica interna do sistema; ela não substitui homologação real com usuários no servidor.


## Observação v125 — GitHub Pages

Se publicado no GitHub Pages, o MobilizaPRO entra em modo **GitHub Preview**, pois o GitHub Pages não executa PHP/MySQL. Para acessar a prévia, use CPF `000.000.000-00` e senha `123456`. Para operação real multiusuário, publique na Hostinger e execute `/database/upgrade.php`.
