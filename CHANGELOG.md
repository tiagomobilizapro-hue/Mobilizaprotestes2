# CHANGELOG - MobilizaPro 1.17

## 2026-07-08 - Revisão de gráficos e filtros no GitHub Pages

- Refeito o gráfico 3D do Pipeline para ficar maior, menos achatado e mais próximo da prévia aprovada.
- Mantidas as cores verde para vagas sem declínio e vermelho para vagas declinadas.
- O gráfico do Pipeline agora exibe o filtro ativo e recalcula explicitamente conforme o filtro de Obra.
- Adicionada camada `assets/js/30-graficos-filtros-3d-20260708.js`.
- Massa demonstrativa do GitHub Pages atualizada para permitir avaliação visual por obra e com percentuais mais claros.
- Sem alteração em PHP, MySQL ou configuração da Hostinger.

# CHANGELOG - MobilizaPro 1.12

## 2026-07-07 - Salvamento multiusuario garantido

- Adicionada fila local persistente para salvamentos ainda nao confirmados pelo MySQL.
- Quando houver conflito de versao entre usuarios simultaneos, o navegador busca o estado mais recente e reenvia o lancamento pendente.
- Falhas temporarias de rede ou servidor deixam o lancamento marcado como pendente, com nova tentativa automatica.
- A tela passa a mostrar status de salvamento pendente/confirmado e permite clicar para tentar reenviar.
- A saida/fechamento da pagina avisa quando ainda existir lancamento nao confirmado.
- Implementacao incremental no arquivo `assets/js/27-salvamento-multiusuario-garantido.js`.
- Sem mudanca destrutiva de banco.

## 2026-07-07 - Regras operacionais de recrutador, grafico e ASO

- Recrutamento passa a registrar o nome/CPF do usuario logado que lancou a pessoa.
- Cards de recrutamento exibem o recrutador registrado para manter rastreabilidade ate o fim do fluxo.
- Grafico do pipeline foi alterado de Crachas Emitidos x Declinados para Vagas Solicitadas x Vagas Declinadas.
- Medicina/ASO passa a usar Data Marcacao ASO, Data Emissao ASO e status Pendente/Concluido.
- ASO atrasado em relacao ao prazo da matriz de recrutamento exige justificativa antes de concluir.
- Implementacao incremental no arquivo `assets/js/26-regras-operacionais-20260707.js`.
- Sem mudanca destrutiva de banco.

## 2026-07-06 - Governança de atualizações compartilhadas

- Criado registro compartilhado de solicitações para o projeto MobilizaPro.
- Registrada regra operacional: solicitações de Ricardo devem ficar visíveis para Tiago e solicitações de Tiago devem ficar visíveis para Ricardo.
- Adicionado arquivo `REGISTRO_COMPARTILHADO_SOLICITACOES.md`.
- Adicionado relatório `RELATORIO_GOVERNANCA_ATUALIZACOES_COMPARTILHADAS.md`.
- Alteração documental, sem mudança em banco, backend, layout, APIs, autenticação ou Curva S já adicionada.

# CHANGELOG - MobilizaPro 1.10.1

## Ajuste operacional - Fluxo Mobilização > Crachá
- Colaborador com mobilização/treinamentos concluídos deixa automaticamente a lista do módulo Mobilização.
- O mesmo colaborador passa a aparecer somente no módulo Crachá enquanto a emissão estiver pendente.
- Após informar a data real de emissão do crachá, o colaborador sai da fila de Crachá e permanece no módulo Resumo Crachás Emitidos.
- Ajuste sem DROP, TRUNCATE ou DELETE no banco.
- Design original preservado.


## 1.10.1 — Dashboard com busca de colaborador

- Adicionado no Dashboard, ao lado do filtro por Obra, o campo **Colaborador**.
- Busca por **nome, função ou CPF** dos colaboradores cadastrados.
- Indicadores, fila de ação, fluxo operacional, leadtime e cobertura passam a respeitar o filtro aplicado.
- Filtro possui limpeza rápida junto ao filtro por obra.
- Busca com debounce para evitar travamento ao digitar.

# Changelog — MobilizaPro 1.10

## Alinhamento com o banco real

- Backup u365253722_mobilizapro analisado por estrutura.
- usuarios.senha_hash definida como coluna oficial.
- Removidas consultas que tentavam usar usuarios.senha.
- Login corrigido para password_verify com senha_hash.
- Criação e atualização de usuários usam password_hash em senha_hash.
- Hash válido do administrador existente é preservado.
- Coluna senha legada é apenas fonte de migração quando senha_hash está ausente ou inválido.

## Upgrade não destrutivo

- Criado database/upgrade.php.
- database/install.php apenas redireciona para o upgrade seguro.
- Migração detecta tabelas e colunas antes de alterar.
- CREATE é executado somente para tabelas ausentes.
- ALTER TABLE adiciona somente colunas faltantes.
- Nenhum DROP TABLE, TRUNCATE ou DELETE permanece no backend.
- Candidatos, solicitações operacionais, usuários e app_store usam inativação em vez de exclusão física.
- Tabelas reais existentes são preservadas.

## Estruturas operacionais

- Preservadas usuarios, colaboradores, obras, candidatos, status_mobilizacao, app_store e training_matrix_store.
- solicitacoes, historico_mobilizacao e solicitacoes_mo são criadas somente se ausentes.
- Campos ativo e excluido_em são adicionados às tabelas sincronizadas para permitir exclusão lógica.

## Segurança

- PDO com charset utf8mb4 e prepared statements.
- Usuário root e senha de banco vazia são recusados.
- CSRF mantido nas APIs.
- Sessão renovada no login.
- Senhas de usuário nunca são gravadas em texto puro.
- Detalhes do upgrade ocultam a senha do banco.

## Design

- index.html, CSS, logo, sidebar, topbar, cards, botões, fontes, ícones e camadas visuais foram preservados.
- Mudanças em JavaScript ficaram restritas ao transporte MySQL/CSRF e à rota do upgrade.


## Correção de backend — aridade do upgrade

- Corrigida a chamada de mobi_add_columns de usuarios para quatro argumentos.
- Revisadas todas as sete chamadas da função.
- Executada análise estática de 285 chamadas PHP sem incompatibilidades.
- Executado php -l nos 11 arquivos em PHP 8.1 e PHP 8.2.
- Executado o fluxo completo de mobi_upgrade_schema em PDO simulado, sem Fatal Error.
- Nenhum arquivo visual, JavaScript, CSS, imagem, layout ou schema foi alterado.

## 2026-07-02 - Correções operacionais CARCAMANO
- Criado módulo Medicina/ASO com alerta de exame médico a partir do Recrutamento.
- Adicionado botão "Marcar ASO" nos cards de Recrutamento.
- Solicitação M.O. recebeu campo Turno (Diurno/Noturno).
- Solicitação M.O. recebeu ação de exclusão definitiva por RM/Obra/Função, mediante confirmação do usuário.
- Filtros/campos de obra em Solicitação M.O. foram convertidos para lista suspensa.
- Crachás concluídos saem da fila de Crachá e aparecem em Resumo de Crachás Emitidos.
- Adicionada ordenação clicável em cabeçalhos de tabelas.
- Criado botão de edição da descrição da função nas matrizes.
- Ajustada logo para SVG local de alta nitidez.
- Ajustado debounce de busca para 0,5 segundo.
- Melhorada sincronização multiusuário na Hostinger com salvamento debounced e pull periódico de 15 segundos.

## 2026-07-03 - Ajuste visual de logo e botões principais
- Substituída a logo do sistema por versão em alta qualidade em `assets/img/mobilizapro-logo-hq.png`.
- Criado polimento visual para botões principais de Solicitação M.O. e Controle de Vagas.
- Removido botão duplicado do topo perto do calendário em todas as páginas.
- Alteração restrita a visual/UX; banco e regras operacionais preservados.

## 1.10 - Blindagem de Salvamento e Estabilidade
- Removida sincronização automática agressiva que podia causar tela piscando.
- Removida gravação em massa no fechamento da página.
- Removida atualização automática ao navegar.
- Backend não inativa mais registros ausentes em payload de navegador.
- Adicionado controle de conflito por token para evitar sobrescrita silenciosa em multiusuário.
- Mantida estética atual do MobilizaPro.

## 2026-07-04 - Blindagem Multiusuário MySQL Direto

- Alterada a camada de salvamento para gravar diretamente no MySQL via `api/store.php?action=save_state`.
- Removida interceptação automática de `localStorage.setItem` para evitar gravações involuntárias por cache antigo.
- `localStorage` passa a ser apenas espelho/cache local, não fonte oficial.
- Removido reset automático por chave `DATABASE_CLEAN_VERSION` na abertura do sistema.
- Abertura da tela não grava mais dados no banco.
- Salvamentos são enfileirados no navegador para evitar duas gravações simultâneas da mesma sessão.
- Adicionado token de estado para conflito multiusuário.
- Adicionada tabela incremental `auditoria_operacional` no upgrade.
- Perfil `MEDICINA` preservado no backend.
- Mantido visual atual sem redesign.

## 2026-07-04 - Hotfix pré-produção multiusuário MySQL-first

- Removido `localStorage.setItem` do `saveData()` para impedir que a tela mostre estado salvo localmente quando a gravação MySQL falhar.
- Mantido espelho local apenas após resposta OK da camada `MobilizaProCloudStorage.saveStateDirect()`.
- Convertidas rotas de exclusão de Solicitação M.O. e Candidato para inativação lógica controlada (`ativo=0`, `excluido_em`) sem `DELETE FROM`.
- Desativado o patch legado `05-force-login-every-open.js`, que podia disputar fluxo com a autenticação MySQL/PHP.
- Removida persistência local de usuários e CPF de sessão nos patches antigos de acesso.
- Mantido visual, HTML principal e fluxo operacional.

## 2026-07-08 - Ajuste visual para Hostinger: ASO sem estouro e gráfico 3D

- Adicionado patch incremental `assets/js/28-ajuste-visual-hostinger-20260708.js` carregado após os patches existentes.
- Corrigido o layout da coluna `Justificativa` na tela Medicina / ASO para impedir estouro de margem e sobreposição visual.
- Adicionadas regras CSS específicas para manter campos editáveis dentro da célula da tabela, com rolagem horizontal contida quando necessário.
- Substituído o gráfico do Pipeline por uma rosca 3D com cores verde e vermelho, mantendo o cálculo de vagas solicitadas x vagas declinadas.
- Ajustados espaçamentos, legenda e cartões de resumo para evitar sobreposição de informações.
- Atualizada a versão exibida em `config/config.php` e `config/config.example.php` para `1.13 Ajuste Visual Hostinger`.
- Mantidas as camadas anteriores de Curva S, regras operacionais e salvamento multiusuário.

## 1.14 - Correção visual GitHub Pages

- Adicionado pacote estático próprio para GitHub Pages.
- Adicionado `.nojekyll`.
- Corrigido logo remoto quebrado para logo local.
- Adicionado `assets/css/08-github-pages-visual-fix.css` para restaurar contraste escuro em ambiente estático.
- Adicionado `assets/js/29-github-pages-static-guard.js` para indicação de prévia estática.
- Removidos arquivos PHP/config do pacote de GitHub Pages para evitar exposição pública.


## 2026-07-08 - GitHub Pages login demonstrativo

- Adicionado mock estático para GitHub Pages.
- CPF demo: 000.000.000-00.
- Senha demo: 123456.
- Evita erro "Resposta inválida do servidor" em prévia estática.
- Mantém aviso de que PHP/MySQL real devem ser testados na Hostinger/homologação.

## 1.16 - GitHub Pages com dados demonstrativos para gráficos

- Adicionado carregamento automático de massa demo no GitHub Pages quando não houver registros.
- Incluídos candidatos, solicitações M.O., mobilizados, declinados, ASO pendente e obras M.400/M.401/M.402/M.403.
- Adicionados bindings para que patches visuais leiam `window.CANDIDATES` e `window.SOLICITATIONS` corretamente no ambiente estático.
- Dados são carregados apenas em domínio `github.io`; Hostinger e MySQL real não são afetados.
