# MobilizaPRO v125 — Correção Login no GitHub Pages

## Diagnóstico

O login da v124 depende de `api/auth.php`, sessão PHP e MySQL. Quando o sistema é publicado no GitHub Pages, o ambiente executa apenas HTML, CSS e JavaScript estático; portanto o PHP não é processado e o login online não consegue autenticar.

## Correção aplicada

Foi criado um modo automático **GitHub Pages Preview**. Quando o sistema roda em `github.io` ou aberto por arquivo local, ele ativa autenticação local de demonstração, sem alterar a lógica de produção da Hostinger.

Credencial de prévia:

- CPF: `000.000.000-00`
- Senha: `123456`

## Arquivos alterados

- `assets/js/00-hostinger-cloud-storage.js`
- `assets/js/18-hostinger-mysql-auth.js`
- `assets/js/32-multiusuario-anti-conflito-20260708.js`
- `assets/js/33-multiusuario-cross-browser-20260708.js`
- `assets/js/35-professional-core-20260708.js`
- `assets/js/36-professional-core-operacional-20260709.js`
- `assets/js/37-banca-tecnica-permissoes-20260709.js`
- `assets/js/38-github-pages-preview-20260709.js`
- `index.html`

## Importante

O GitHub Preview é somente para demonstração visual e validação de navegação. Os dados ficam no `localStorage` do navegador. Para produção multiusuário real, usar Hostinger/PHP/MySQL e executar `/database/upgrade.php`.
