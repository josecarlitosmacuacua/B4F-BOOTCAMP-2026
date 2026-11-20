# Desafio de Código III · Gestão de Stock em TypeScript

Bytes4Future · Bootcamp · Módulo TypeScript — DC-03

**Formando(a):** José Macuacua

Ponto de partida: a solução de referência do Desafio de Código I (gestão de stock da Mercearia Xiluva), em JavaScript. O objectivo é migrá-la para TypeScript com `strict` activo e zero `any`, sem mudar o comportamento.

## Como executar e verificar

Requer Node.js 22.18 ou superior.

```bash
npm install -D typescript @types/node   # tarefa 1
npm start                               # relatório semanal
npm run typecheck                       # verificação dos tipos (tsc --noEmit)
```

## Tarefas concluídas

| Tarefa | Nível | Estado |
|---|---|---|
| 1 · Preparar o projecto TypeScript | Essencial | ✅ |
| 2 · Tipos do domínio em src/tipos.ts | Essencial | ✅ |
| 3 · Converter os dados | Essencial | ✅ |
| 4 · Funções do nível Essencial em src/stock.ts | Essencial | ✅ |
| 5 · Funções do nível Intermédio | Intermédio | ✅ |
| 6 · Genéricos: paginar, somarPor e sugerirEncomenda | Intermédio | ✅ |
| 7 · Vendas sem excepções: tentarVenda | Intermédio | ✅ |
| 8 · Relatório em src/index.ts e verificação final | Intermédio | ✅ |
| 9 · Overloads em obterProduto | Bónus | ✅ |
| 10 · actualizarProduto com tipos utilitários | Bónus | ✅ |
| 11 · Dados desconhecidos: eProduto e carregarProdutos | Bónus | ✅ |

## Decisões sobre os tipos

- **Categorias:** a lista `CATEGORIAS` está só uma vez, em `src/tipos.ts` (`as const`), e o tipo `Categoria` sai dela. Assim uma categoria mal escrita, como «Bebida», dá erro.
- **Ids e dias:** usei `P${string}` e `V${string}` para os ids e a união `1 | 2 | 3 | 4 | 5 | 6` para o dia, por isso uma venda ao domingo (dia 7) não compila.
- **readonly:** `Produto` e `Venda` têm todas as propriedades `readonly`, e os arrays dos dados são `readonly Produto[]` e `readonly Venda[]`, porque as funções não alteram os dados.
- **Tipos derivados:** `AlertaStock` usa `Pick`, `registarVenda` recebe `Pick<Venda, "produtoId" | "quantidade">`, `receitaPorCategoria` devolve `Partial<Record<Categoria, number>>` e as alterações de `actualizarProduto` são `Partial<Omit<Produto, "id">>`. Não repeti nenhum tipo à mão.
- **Ordenar:** o objecto `COMPARADORES` usa `satisfies Record<CriterioOrdenacao, ...>`, por isso o compilador obriga a ter um comparador para cada critério. Por esse motivo tirei o `if` que lançava erro com um critério inválido, porque o compilador já não deixa chamar `ordenar` com um critério que não existe.
- **tentarVenda:** devolve uma união discriminada pelo campo `ok`. Só depois de verificar `r.ok` é que se pode usar `r.produtos`. `descreverMotivo` usa um `switch` que termina em `never`.
- **Dados desconhecidos:** `carregarProdutos` guarda o resultado do `JSON.parse` em `unknown` e só devolve `Produto[]` depois de `eProduto` verificar cada campo.
- **undefined:** `obterPorId` e `lista[i]` podem dar `undefined`, e trato sempre com `if`, `?.` ou `??`.

## Dificuldades encontradas

_Escrever aqui, por palavras minhas, o que foi mais difícil (por exemplo: o `satisfies`, o `never` no switch, o `unknown` no `eProduto`)._
