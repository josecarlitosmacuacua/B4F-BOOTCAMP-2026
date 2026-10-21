export const NOME_LOJA = "Loja do Bairro";
export const MOEDA = "MT";

export const produtos = [
  { codigo: "P01", nome: "Arroz 5kg", preco: 450, categoria: "Mercearia" },
  { codigo: "P02", nome: "Óleo 1L", preco: 180, categoria: "Mercearia" },
  { codigo: "P03", nome: "Sabão em barra", preco: 60, categoria: "Limpeza" },
  { codigo: "P04", nome: "Caderno A4", preco: 95, categoria: "Papelaria" },
  { codigo: "P05", nome: "Caneta azul", preco: 25 }
];

export const clientes = [
  { id: 1, nome: "Ana Macuácua", cidade: "Maputo" },
  { id: 2, nome: "Carlos Nhantumbo", cidade: "Matola" },
  { id: 3, nome: "Fátima Sitoe" }
];

export const encomendas = [
  {
    numero: 101,
    clienteId: 1,
    itens: [
      { codigo: "P01", quantidade: 2 },
      { codigo: "P02", quantidade: 3 }
    ],
    desconto: 50
  },
  {
    numero: 102,
    clienteId: 3,
    itens: [
      { codigo: "P04", quantidade: 5 },
      { codigo: "P05" },
      { codigo: "P03", quantidade: 4 }
    ]
  },
  {
    numero: 103,
    clienteId: 2,
    itens: [
      { codigo: "P03", quantidade: 10 },
      { codigo: "P01", quantidade: 1 }
    ],
    desconto: 100
  }
];
