# MobilizaPro 1.10 - Blindagem de Salvamento

## Objetivo
Estabilizar o código sem alterar a estética atual, reduzindo risco de perda de dados e eliminando tela piscando.

## Alterações aplicadas

1. MySQL como fonte principal
- O sistema carrega o estado principal do MySQL ao abrir.
- localStorage permanece como cache operacional da tela.
- Preferências visuais ainda podem ficar no navegador.

2. Fim da sincronização agressiva
- Removido auto-refresh periódico.
- Removida sincronização ao navegar.
- Removida sincronização no beforeunload.
- Removido re-render automático que causava tela piscando.

3. Salvamento mais seguro
- O estado principal só é enviado ao banco quando a aplicação executa saveData().
- O envio ao banco usa debounce curto para evitar rajadas de gravação.
- O usuário recebe alerta se o banco não confirmar a gravação.

4. Proteção contra cache antigo
- O backend não inativa mais candidatos ou solicitações que não vierem no payload do navegador.
- Ausência em cache antigo não remove dado real do banco.
- Exclusões continuam apenas por ação explícita do usuário.

5. Concorrência básica
- O frontend envia o token da versão carregada.
- O backend recusa gravação se outro usuário alterou o banco antes.
- Nesse caso, o usuário recebe aviso para atualizar antes de salvar.

## Arquivos principais alterados
- assets/js/00-hostinger-cloud-storage.js
- assets/js/19-refresh-on-navigation.js
- assets/js/21-operational-corrections.js
- api/store.php

## O que não foi alterado
- Estética atual.
- CSS visual principal.
- Banco de dados com DROP/TRUNCATE.
- Login.
- Configuração Hostinger.

## Observação operacional
Esta versão é uma blindagem. Ela não tenta recuperar dados já perdidos. Antes de subir, faça backup do banco atual.
