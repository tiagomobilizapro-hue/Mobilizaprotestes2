# MobilizaPRO - pacote visual para GitHub Pages

Este pacote é para prévia visual/homologação estática no GitHub Pages.

Importante: GitHub Pages não executa PHP e não conecta MySQL. Para teste completo com login, API e banco, use subdomínio na Hostinger.

## Como publicar

1. Extraia este ZIP no computador.
2. No repositório GitHub, envie o conteúdo extraído para a raiz do repositório.
3. Confirme que existem estes caminhos no GitHub:
   - `index.html`
   - `assets/css/01-style-1.css`
   - `assets/css/08-github-pages-visual-fix.css`
   - `assets/js/01-script-1.js`
   - `assets/img/mobilizapro-logo-hq.png`
   - `.nojekyll`
4. Em Settings > Pages, publique pela branch correta.
5. Acesse com Ctrl+F5 ou aba anônima.

Não suba apenas o patch visual. Para GitHub Pages, o repositório precisa conter o `index.html` e toda a pasta `assets`.

## Login demonstrativo no GitHub Pages

O GitHub Pages não executa PHP nem MySQL. Nesta versão, o login é simulado para permitir navegação visual.

Acesso de demonstração:

```text
CPF: 000.000.000-00
Senha: 123456
```

As gravações feitas nessa prévia ficam apenas no navegador/localStorage. Para testar login real, permissões, PHP e MySQL, use a Hostinger em ambiente de homologação.

## Dados demonstrativos para avaliar gráficos

Esta versão carrega automaticamente uma massa de teste quando publicada no GitHub Pages e quando o navegador ainda não tem registros locais.

A massa inclui solicitações M.O., recrutados, mobilizados, declinados e pendências de Medicina/ASO para validar Dashboard, Curva S, Pipeline, Vagas, Recrutamento, Mobilização e Medicina/ASO.

Para recarregar os dados demo no navegador, abra o Console do navegador e execute:

```javascript
MobilizaProDemoData.reload()
```

Para limpar a massa demo local:

```javascript
MobilizaProDemoData.clear()
```

Esses dados existem somente no `github.io`; não gravam no MySQL real.

## Revisão 1.17 — gráficos e filtros

Esta revisão adiciona o arquivo:

```text
assets/js/30-graficos-filtros-3d-20260708.js
```

O Pipeline passa a usar uma rosca 3D maior e menos achatada. O gráfico também exibe o filtro ativo e recalcula quando o filtro de Obra é alterado.

A massa de dados demo foi atualizada. Se o navegador mantiver dados antigos, execute no Console:

```javascript
MobilizaProDemoData.reload()
```

Para forçar atualização visual dos gráficos filtráveis:

```javascript
MobilizaProGraphFilters.refresh()
```

## Versão 1.18 - experiência profissional

Esta versão adiciona uma camada visual avançada para avaliação estática no GitHub Pages. O login continua demonstrativo, usando CPF `000.000.000-00` e senha `123456`.

Telas destacadas para avaliação:

1. Dashboard: Painel Executivo / Command Center.
2. Pipeline: gráfico 3D, funil operacional, cards de recrutamento e leadtime.
3. Medicina / ASO: cards responsivos com justificativa contida no layout.

A versão 1.18 não executa PHP nem MySQL no GitHub Pages. O teste de banco deve ser feito no ambiente de homologação da Hostinger.
