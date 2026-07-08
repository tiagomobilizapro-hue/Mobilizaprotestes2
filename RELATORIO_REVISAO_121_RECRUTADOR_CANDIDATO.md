# MobilizaPro 1.21 — Recrutador gravado no candidato

## Solicitação

Verificar se o usuário logado aparece como recrutador da vaga e se o nome fica gravado no candidato.

## Verificação da versão 1.20

A versão 1.20 já continha a regra em `assets/js/26-regras-operacionais-20260707.js` para preencher:

- `candidate.recruiter_name`
- `candidate.recruiter_cpf`
- `candidate.recruited_by_name`
- `candidate.recruited_by_cpf`

Também já havia exibição no card do candidato por meio da linha `Recrutador: ...`.

## Ponto de risco encontrado

O recrutador ficava salvo no payload JSON do candidato, mas não existia coluna própria no banco `candidatos` para o nome/CPF do recrutador.

Em cenário multiusuário/cross-browser, um navegador com payload antigo poderia reenviar o candidato sem esses campos. A versão 1.20 já reduzia esse risco pela mesclagem cross-browser, mas a gravação estruturada em coluna própria é mais segura.

## Correção aplicada

Foram adicionadas as colunas:

```sql
candidatos.recrutador_nome VARCHAR(120) NULL
candidatos.recrutador_cpf VARCHAR(11) NULL
```

O backend `api/store.php` passa a:

1. Ler o recrutador vindo do payload do navegador.
2. Preservar o recrutador já gravado no banco quando o payload chegar vazio.
3. Em novo candidato sem recrutador no payload, gravar o usuário logado como recrutador.
4. Devolver o recrutador para o frontend no carregamento do estado.

## Patch frontend

Foi criado:

```text
assets/js/34-recrutador-gravado-candidato-20260708.js
```

Esse patch é carregado por último e reforça:

- captura do usuário logado via `getCurrentAccessUser()`;
- marcação do candidato novo com recrutador;
- exibição da linha `Recrutador` nos cards;
- função de auditoria no console: `MobilizaProRecruiterAudit.list()`.

## Teste recomendado

1. Entrar com usuário Ricardo.
2. Criar um candidato novo em Recrutamento.
3. Conferir se o card mostra `Recrutador: RICARDO`.
4. Entrar com Tiago em outro navegador.
5. Criar outro candidato.
6. Conferir se aparece `Recrutador: TIAGO`.
7. Recarregar os dois navegadores.
8. Confirmar que os nomes permanecem.
9. Conferir no banco:

```sql
SELECT legacy_id, nome, recrutador_nome, recrutador_cpf
FROM candidatos
ORDER BY atualizado_em DESC
LIMIT 20;
```

## Observação

Candidatos antigos sem informação de recrutador não são atribuídos automaticamente a um usuário atual, para evitar registro incorreto. Quando o dado já existia no payload, o upgrade tenta fazer backfill conservador para as novas colunas.
