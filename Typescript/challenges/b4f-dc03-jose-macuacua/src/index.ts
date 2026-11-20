// Tarefa 14 — relatório semanal da Mercearia Xiluva (npm start)
import { produtos } from "../dados/produtos.ts";
import { vendas } from "../dados/vendas.ts";
import {
  abaixoDoMinimo,
  formatarMT,
  listarActivos,
  maisVendidos,
  receitaPorCategoria,
  resumoVendas,
  valorDoStock,
} from "./stock.ts";

const linha = (rotulo: string, valor: string): string =>
  `  ${rotulo.padEnd(28, ".")} ${valor}`;
const stock = valorDoStock(produtos);
const resumo = resumoVendas(produtos, vendas);

console.log("MERCEARIA XILUVA · RELATÓRIO SEMANAL\n");
console.log(
  linha(
    "Produtos activos",
    `${listarActivos(produtos).length} de ${produtos.length}`,
  ),
);
console.log(linha("Valor do stock (sem IVA)", formatarMT(stock.semIva)));
console.log(linha("Valor do stock (com IVA)", formatarMT(stock.comIva)));

console.log("\nALERTAS DE STOCK");
abaixoDoMinimo(produtos).forEach((p) =>
  console.log(
    linha(`${p.id} ${p.nome}`, `stock ${p.stock}, faltam ${p.emFalta}`),
  ),
);

console.log("\nVENDAS DA SEMANA");
console.log(linha("Receita total (com IVA)", formatarMT(resumo.receitaTotal)));
maisVendidos(produtos, vendas).forEach((nome, i) =>
  console.log(linha(`Top ${i + 1}`, nome)),
);

console.log("\nRECEITA POR CATEGORIA (com IVA)");
Object.entries(receitaPorCategoria(produtos, vendas))
  .toSorted(([, a], [, b]) => b - a)
  .forEach(([categoria, receita]) =>
    console.log(linha(categoria, formatarMT(receita))),
  );
console.log(`\nVendas ignoradas: ${resumo.ignoradas.join(", ") || "nenhuma"}`);
