// Mercearia Xiluva — módulo de gestão de stock (migrado para TypeScript no DC-03)
// Regras: só métodos de array (sem for/while) e sem alterar os dados recebidos.
import { TAXA_IVA } from "../dados/produtos.ts";
import { CATEGORIAS } from "./tipos.ts";
import type {
  AlertaStock,
  AlteracoesProduto,
  Encomenda,
  CriterioOrdenacao,
  IdProduto,
  LinhaResumo,
  MotivoRecusa,
  Pagina,
  Produto,
  ReceitaPorCategoria,
  Regra,
  ResultadoValidacao,
  ResultadoVenda,
  ResumoVendas,
  ValorStock,
  Venda,
} from "./tipos.ts";

// ---------- Auxiliares (não exportadas) ----------

// Arredonda a 2 casas decimais: 985.9999999999999 → 986
const arredondar = (valor: number): number => Math.round(valor * 100) / 100;

// "Água Mineral" → "agua mineral" (usada na pesquisa sem acentos)
const normalizar = (texto: string): string =>
  texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

// Comparação de nomes com a ordem alfabética portuguesa (Á, Ç, Ó no sítio certo)
// Pick: serve para qualquer objecto que tenha um nome (Produto, alertas, linhas...)
const porNome = (a: Pick<Produto, "nome">, b: Pick<Produto, "nome">): number =>
  a.nome.localeCompare(b.nome, "pt");

// =====================================================================
// Nível 1 · Essencial
// =====================================================================

// Tarefa 1 — preço unitário com IVA
export const precoComIva = (produto: Produto, taxa: number = TAXA_IVA): number =>
  arredondar(produto.precoBase * (1 + taxa));

// Tarefa 2 — só os produtos activos
export const listarActivos = (produtos: readonly Produto[]): Produto[] =>
  produtos.filter((p) => p.activo);

// Tarefa 3 — valor do stock dos produtos activos
export function valorDoStock(produtos: readonly Produto[]): ValorStock {
  const semIva = arredondar(
    listarActivos(produtos).reduce((soma, p) => soma + p.precoBase * p.stock, 0),
  );
  const iva = arredondar(semIva * TAXA_IVA);
  return { semIva, iva, comIva: arredondar(semIva + iva) };
}

// Tarefa 4 — activos abaixo do stock mínimo, do mais urgente ao menos urgente
export const abaixoDoMinimo = (produtos: readonly Produto[]): AlertaStock[] =>
  listarActivos(produtos)
    .filter((p) => p.stock < p.stockMinimo)
    .map(({ id, nome, stock, stockMinimo }) => ({
      id,
      nome,
      stock,
      emFalta: stockMinimo - stock,
    }))
    .toSorted((a, b) => b.emFalta - a.emFalta || porNome(a, b));

// Tarefa 5 — um produto pelo id (ou undefined)
export const obterPorId = (
  produtos: readonly Produto[],
  id: IdProduto,
): Produto | undefined => produtos.find((p) => p.id === id);

// Tarefa 6 — pesquisa sem distinguir maiúsculas nem acentos
export function pesquisar(
  produtos: readonly Produto[],
  termo: string,
): Produto[] {
  const procurado = normalizar(termo.trim());
  return listarActivos(produtos).filter((p) =>
    normalizar(p.nome).includes(procurado),
  );
}

// Tarefa 7 — cópia ordenada por nome, preço ou stock
// satisfies obriga a ter um comparador para cada critério
const COMPARADORES = {
  nome: porNome,
  preco: (a, b) => a.precoBase - b.precoBase,
  stock: (a, b) => b.stock - a.stock,
} satisfies Record<CriterioOrdenacao, (a: Produto, b: Produto) => number>;

export function ordenar(
  produtos: readonly Produto[],
  criterio: CriterioOrdenacao,
): Produto[] {
  // toSorted devolve uma cópia; sort alteraria o array original
  return produtos.toSorted(COMPARADORES[criterio]);
}

// =====================================================================
// Nível 2 · Intermédio
// =====================================================================

const inteiroNaoNegativo = (n: unknown): boolean =>
  typeof n === "number" && Number.isInteger(n) && n >= 0;

const REGRAS: Regra[] = [
  [(p) => !/^P\d{3}$/.test(p.id ?? ""), "id inválido"],
  [(p) => typeof p.nome !== "string" || p.nome.trim() === "", "nome em falta"],
  [
    (p) =>
      typeof p.precoBase !== "number" ||
      !Number.isFinite(p.precoBase) ||
      p.precoBase <= 0,
    "preço inválido",
  ],
  [(p) => !inteiroNaoNegativo(p.stock), "stock inválido"],
  [(p) => !inteiroNaoNegativo(p.stockMinimo), "stock mínimo inválido"],
];

// Tarefa 8 — validação do inventário (aceita objectos incompletos)
export function validar(
  produtos: readonly Partial<Produto>[],
): ResultadoValidacao {
  const erros = produtos.flatMap((p, i) => {
    const ref = p.id ?? `#${i}`;
    const problemas = REGRAS.filter(([temProblema]) => temProblema(p)).map(
      ([, mensagem]) => mensagem,
    );
    // duplicado = já existe um produto com o mesmo id numa posição anterior
    const duplicado = produtos.findIndex((q) => q.id === p.id) !== i;
    return [...problemas, ...(duplicado ? ["id duplicado"] : [])].map(
      (problema) => `${ref}: ${problema}`,
    );
  });
  return { valido: erros.length === 0, erros };
}

// Tarefa 9 — devolve um NOVO array com o stock actualizado
export function registarVenda(
  produtos: readonly Produto[],
  { produtoId, quantidade }: Pick<Venda, "produtoId" | "quantidade">,
): Produto[] {
  const indice = produtos.findIndex((p) => p.id === produtoId);
  const produto = produtos[indice];
  // com noUncheckedIndexedAccess, produtos[indice] pode ser undefined
  if (produto === undefined) throw new Error(`Produto inexistente: ${produtoId}`);
  if (!produto.activo) throw new Error(`Produto inactivo: ${produtoId}`);
  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    throw new RangeError(`Quantidade inválida: ${quantidade}`);
  }
  if (quantidade > produto.stock) {
    throw new Error(
      `Stock insuficiente para ${produto.nome}: ` +
        `pedido ${quantidade}, disponível ${produto.stock}`,
    );
  }
  // with (ES2023) devolve uma cópia do array com a posição substituída
  return produtos.with(indice, { ...produto, stock: produto.stock - quantidade });
}

// Tarefa 10 — vendas agregadas por produto, receita total e vendas ignoradas
export function resumoVendas(
  produtos: readonly Produto[],
  vendas: readonly Venda[],
): ResumoVendas {
  const existe = (venda: Venda): boolean =>
    obterPorId(produtos, venda.produtoId) !== undefined;
  const validas = vendas.filter(existe);
  const ignoradas = vendas.filter((v) => !existe(v)).map((v) => v.id);

  const porProduto: LinhaResumo[] = produtos
    .map((p) => {
      const quantidade = validas
        .filter((v) => v.produtoId === p.id)
        .reduce((soma, v) => soma + v.quantidade, 0);
      return {
        id: p.id,
        nome: p.nome,
        quantidade,
        receita: arredondar(quantidade * precoComIva(p)),
      };
    })
    .filter((linha) => linha.quantidade > 0)
    .toSorted((a, b) => b.quantidade - a.quantidade || porNome(a, b));

  const receitaTotal = arredondar(
    porProduto.reduce((soma, l) => soma + l.receita, 0),
  );
  return { porProduto, receitaTotal, ignoradas };
}

// Tarefa 11 — receita (com IVA) por categoria, só com reduce
export const receitaPorCategoria = (
  produtos: readonly Produto[],
  vendas: readonly Venda[],
): ReceitaPorCategoria =>
  vendas.reduce<ReceitaPorCategoria>((totais, venda) => {
    const produto = obterPorId(produtos, venda.produtoId);
    if (!produto) return totais; // venda de produto inexistente: ignorar
    const anterior = totais[produto.categoria] ?? 0;
    return {
      ...totais,
      [produto.categoria]: arredondar(
        anterior + venda.quantidade * precoComIva(produto),
      ),
    };
  }, {});

// Tarefa 12 — nomes dos n produtos mais vendidos
export const maisVendidos = (
  produtos: readonly Produto[],
  vendas: readonly Venda[],
  n: number = 3,
): string[] =>
  resumoVendas(produtos, vendas)
    .porProduto.slice(0, n)
    .map((linha) => linha.nome);

// Tarefa 13 — valor em meticais, no formato de Moçambique
const MT = new Intl.NumberFormat("pt-MZ", { style: "currency", currency: "MZN" });
export const formatarMT = (valor: number): string => MT.format(valor);

// =====================================================================
// Nível 3 · Bónus
// =====================================================================

// Tarefa 15 (DC-01) / Tarefa 6 (DC-03) — uma página de qualquer lista
export function paginar<T>(
  lista: readonly T[],
  pagina: number = 1,
  porPagina: number = 5,
): Pagina<T> {
  const totalPaginas = Math.max(1, Math.ceil(lista.length / porPagina));
  if (!Number.isInteger(pagina) || pagina < 1 || pagina > totalPaginas) {
    throw new RangeError(`Página inválida: ${pagina}`);
  }
  const inicio = (pagina - 1) * porPagina;
  return {
    itens: lista.slice(inicio, inicio + porPagina),
    pagina,
    totalPaginas,
    temSeguinte: pagina < totalPaginas,
  };
}

// Tarefa 6 (DC-03) — soma o número que o callback devolve para cada elemento
export const somarPor = <T>(
  lista: readonly T[],
  valor: (item: T) => number,
): number => arredondar(lista.reduce((soma, item) => soma + valor(item), 0));

// Tarefa 16 — encomenda para repor o dobro do stock mínimo (custo sem IVA)
export function sugerirEncomenda(produtos: readonly Produto[]): Encomenda {
  // flatMap: [] descarta o produto e [linha] mantém-no (filtra e transforma)
  const linhas = listarActivos(produtos).flatMap((p) => {
    if (p.stock >= p.stockMinimo) return [];
    const quantidade = p.stockMinimo * 2 - p.stock;
    return [
      { id: p.id, nome: p.nome, quantidade, custo: quantidade * p.precoBase },
    ];
  });
  return { linhas, custoTotal: somarPor(linhas, (l) => l.custo) };
}

// Tarefa 7 (DC-03) — venda que devolve um resultado em vez de lançar erros
export function tentarVenda(
  produtos: readonly Produto[],
  pedido: Pick<Venda, "produtoId" | "quantidade">,
): ResultadoVenda {
  const produto = obterPorId(produtos, pedido.produtoId);

  if (produto === undefined) {
    return { ok: false, motivo: "inexistente", mensagem: "produto inexistente" };
  }
  if (!produto.activo) {
    return { ok: false, motivo: "inactivo", mensagem: "produto inactivo" };
  }
  if (!Number.isInteger(pedido.quantidade) || pedido.quantidade <= 0) {
    return { ok: false, motivo: "quantidade", mensagem: "quantidade inválida" };
  }
  if (pedido.quantidade > produto.stock) {
    return { ok: false, motivo: "stock", mensagem: "não há stock suficiente" };
  }
  return { ok: true, produtos: registarVenda(produtos, pedido) };
}

// Uma sugestão para cada motivo; o switch tem de cobrir todos
export function descreverMotivo(motivo: MotivoRecusa): string {
  switch (motivo) {
    case "inexistente":
      return "Confirme o código do produto.";
    case "inactivo":
      return "Reactive o produto antes de o vender.";
    case "quantidade":
      return "Indique um número inteiro maior que zero.";
    case "stock":
      return "Encomende ao fornecedor.";
    default: {
      // se acrescentarem um motivo novo, o compilador dá erro aqui
      const nunca: never = motivo;
      return nunca;
    }
  }
}

// Tarefa 9 (DC-03) — sem opções devolve Produto | undefined;
// com { obrigatorio: true } devolve Produto (ou lança erro)
export function obterProduto(
  produtos: readonly Produto[],
  id: IdProduto,
): Produto | undefined;
export function obterProduto(
  produtos: readonly Produto[],
  id: IdProduto,
  opcoes: { obrigatorio: true },
): Produto;
export function obterProduto(
  produtos: readonly Produto[],
  id: IdProduto,
  opcoes?: { obrigatorio: boolean },
): Produto | undefined {
  const produto = obterPorId(produtos, id);
  if (opcoes?.obrigatorio && produto === undefined) {
    throw new Error(`Produto inexistente: ${id}`);
  }
  return produto;
}

// Tarefa 10 (DC-03) — novo array com o produto alterado (o id não muda)
export function actualizarProduto(
  produtos: readonly Produto[],
  id: IdProduto,
  alteracoes: AlteracoesProduto,
): Produto[] {
  const indice = produtos.findIndex((p) => p.id === id);
  const produto = produtos[indice];
  if (produto === undefined) throw new Error(`Produto inexistente: ${id}`);
  return produtos.with(indice, { ...produto, ...alteracoes });
}

// Tarefa 11 (DC-03) — verifica se um valor desconhecido é um Produto
const eCategoria = (valor: unknown): boolean =>
  CATEGORIAS.some((categoria) => categoria === valor);

export function eProduto(valor: unknown): valor is Produto {
  if (typeof valor !== "object" || valor === null) return false;
  if (
    !("id" in valor) ||
    !("nome" in valor) ||
    !("categoria" in valor) ||
    !("precoBase" in valor) ||
    !("stock" in valor) ||
    !("stockMinimo" in valor) ||
    !("activo" in valor)
  ) {
    return false;
  }
  return (
    typeof valor.id === "string" &&
    valor.id.startsWith("P") &&
    typeof valor.nome === "string" &&
    eCategoria(valor.categoria) &&
    typeof valor.precoBase === "number" &&
    typeof valor.stock === "number" &&
    typeof valor.stockMinimo === "number" &&
    typeof valor.activo === "boolean"
  );
}

// Lê um array JSON e lança TypeError a dizer em que posições há elementos inválidos
export function carregarProdutos(json: string): Produto[] {
  const dados: unknown = JSON.parse(json);
  if (!Array.isArray(dados)) throw new TypeError("O JSON não é um array");

  const lista: unknown[] = dados;
  const invalidas = lista.flatMap((item, i) => (eProduto(item) ? [] : [i]));
  if (invalidas.length > 0) {
    throw new TypeError(
      `Produtos inválidos nas posições: ${invalidas.join(", ")}`,
    );
  }
  return lista.filter(eProduto);
}
