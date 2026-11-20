// Mercearia Xiluva — tipos do domínio (única fonte de verdade)

// ---------- Tipos base ----------

// A lista existe só aqui; o tipo Categoria sai dela
export const CATEGORIAS = [
  "Mercearia",
  "Bebidas",
  "Higiene",
  "Limpeza",
  "Casa",
] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export type IdProduto = `P${string}`;
export type IdVenda = `V${string}`;

// 1 = segunda-feira … 6 = sábado (não há vendas ao domingo)
export type DiaSemana = 1 | 2 | 3 | 4 | 5 | 6;

export interface Produto {
  readonly id: IdProduto;
  readonly nome: string;
  readonly categoria: Categoria;
  readonly precoBase: number;
  readonly stock: number;
  readonly stockMinimo: number;
  readonly activo: boolean;
}

export interface Venda {
  readonly id: IdVenda;
  readonly produtoId: IdProduto;
  readonly quantidade: number;
  readonly dia: DiaSemana;
}

// ---------- Tarefa 4: funções do nível Essencial ----------

export interface ValorStock {
  semIva: number;
  iva: number;
  comIva: number;
}

export interface AlertaStock extends Pick<Produto, "id" | "nome" | "stock"> {
  emFalta: number;
}

export type CriterioOrdenacao = "nome" | "preco" | "stock";

// ---------- Tarefa 5: funções do nível Intermédio ----------

export interface ResultadoValidacao {
  valido: boolean;
  erros: string[];
}

// Cada regra: [função que detecta o problema, mensagem]
export type Regra = [(produto: Partial<Produto>) => boolean, string];

export interface LinhaResumo extends Pick<Produto, "id" | "nome"> {
  quantidade: number;
  receita: number;
}

export interface ResumoVendas {
  porProduto: LinhaResumo[];
  receitaTotal: number;
  ignoradas: IdVenda[];
}

export type ReceitaPorCategoria = Partial<Record<Categoria, number>>;

// ---------- Tarefa 6: genéricos ----------

export interface Pagina<T> {
  itens: T[];
  pagina: number;
  totalPaginas: number;
  temSeguinte: boolean;
}

export interface LinhaEncomenda extends Pick<Produto, "id" | "nome"> {
  quantidade: number;
  custo: number;
}

export interface Encomenda {
  linhas: LinhaEncomenda[];
  custoTotal: number;
}

// ---------- Tarefa 7: vendas sem excepções ----------

export type MotivoRecusa = "inexistente" | "inactivo" | "quantidade" | "stock";

export type ResultadoVenda =
  | { ok: true; produtos: readonly Produto[] }
  | { ok: false; motivo: MotivoRecusa; mensagem: string };

// ---------- Tarefa 10 (bónus) ----------

// Pode mudar-se qualquer campo, menos o id
export type AlteracoesProduto = Partial<Omit<Produto, "id">>;
