# Relatório de revisão — MobilizaPro 1.10

## Banco real analisado

O backup contém sete tabelas em uso: app_store, candidatos, colaboradores, obras, status_mobilizacao, training_matrix_store e usuarios.

A tabela usuarios possui exatamente a coluna senha_hash e não possui senha. O código foi alinhado a essa estrutura.

Nenhum valor pessoal do backup foi copiado para o projeto ou para este relatório.

## Impacto previsto do upgrade

- usuarios, obras, colaboradores, status_mobilizacao e training_matrix_store: estruturas existentes preservadas;
- candidatos e app_store: adição de ativo e excluido_em para exclusão lógica;
- solicitacoes, historico_mobilizacao e solicitacoes_mo: criação porque não aparecem no backup;
- senha: nenhuma coluna nova será criada no banco real;
- senha_hash: mantida como coluna oficial.

## Checklist

| Verificação | Resultado |
|---|---|
| Banco real analisado por estrutura | OK |
| usuarios.senha_hash oficial | OK |
| INSERT/SELECT/UPDATE de usuários usando senha_hash | OK |
| password_hash/password_verify | OK |
| Upgrade sem DROP TABLE | OK |
| Upgrade sem TRUNCATE | OK |
| Backend sem DELETE físico | OK |
| Tabelas reais preservadas | OK |
| Configuração única | OK |
| DSN charset=utf8mb4 | OK |
| Sem conexão root | OK |
| CSRF e sessão | OK |
| Includes existentes | OK |
| Design original preservado por hash | OK — 28 ativos sem alteração |
| ZIP sem pasta externa | OK — 48 entradas na raiz correta |
| PHP lint real | OK — 11/11 em PHP 8.1 e 11/11 em PHP 8.2 |
| Upgrade sem banco real | OK — PDO simulado, exit code 0 em PHP 8.1/8.2 |
| Conexão/login na Hostinger | Pendente da senha e do servidor Hostinger |

## Teste final na Hostinger

1. Fazer backup.
2. Configurar config/config.php.
3. Executar /database/upgrade.php.
4. Confirmar que tabelas existentes aparecem como preservadas.
5. Testar login e módulos.
6. Apagar os scripts de upgrade/instalação.


## Revisão do Fatal Error de aridade

### Causa

A chamada de mobi_add_columns para a tabela usuarios passava três argumentos, mas a função exige quatro. Faltava o acumulador de relatório por referência.

### Correção

A chamada foi corrigida para passar PDO, nome da tabela, mapa de colunas e actions. Todas as sete chamadas de mobi_add_columns agora usam quatro argumentos.

### Análise estática equivalente

Foi executado um analisador de assinaturas sobre todos os arquivos PHP:

- 28 funções do projeto catalogadas;
- 285 chamadas analisadas, incluindo chamadas aninhadas;
- funções nativas catalogadas com aridade mínima e máxima;
- zero chamadas com argumentos insuficientes;
- zero chamadas com argumentos excedentes;
- zero funções duplicadas;
- zero chamadas não mapeadas.

### PHP lint real

- PHP 8.1 WebAssembly: 11 de 11 arquivos aprovados;
- PHP 8.2 WebAssembly: 11 de 11 arquivos aprovados;
- zero erros de sintaxe.

### Execução do upgrade sem banco real

mobi_upgrade_schema foi executada integralmente contra um PDO simulado com as tabelas e colunas do backup real:

- PHP 8.1: exit code 0;
- PHP 8.2: exit code 0;
- 28 ações processadas;
- zero warnings;
- zero Fatal Errors;
- nenhum banco foi alterado.

### Preservação visual

Foram comparados 28 ativos: index.html, 404.html, todas as folhas CSS e todos os JavaScript. Nenhum byte foi alterado nesta correção.
