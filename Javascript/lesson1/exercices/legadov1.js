// ============================================================
//  legado.js — Relatório de encomendas da "Loja do Bairro"
//  Script antigo: NÃO alterar o resultado, apenas o código.
// ============================================================

 const NOME_LOJA = "Loja do Bairro";
const TAXA_IVA = 0.17;
const MOEDA = "MT";

const produtos = [
  { codigo: "P01", nome: "Arroz 5kg", preco: 450, categoria: "Mercearia" },
  { codigo: "P02", nome: "Óleo 1L", preco: 180, category: "Mercearia" },
  { codigo: "P03", nome: "Sabão em barra", preco: 60, categoria: "Limpeza" },
  { codigo: "P04", nome: "Caderno A4", preco: 95, categoria: "Papelaria" },
  { codigo: "P05", nome: "Caneta azul", preco: 25 }
];

const clientes = [
  { id: 1, nome: "Ana Macuácua", cidade: "Maputo" },
  { id: 2, nome: "Carlos Nhantumbo", cidade: "Matola" },
  { id: 3, nome: "Fátima Sitoe" }
];

const encomendas = [
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


function procurarProduto(codigo) {
  for (const produto of produtos) {
    if (produto.codigo === codigo) return produto;
  }
  return null; 
}

function procurarCliente(id) {
  for (const cliente of clientes) {
    if (cliente.id === id) return cliente;
  }
  return null;
}

function formatarValor(valor) {
  return `${valor.toFixed(2)} ${MOEDA}`; 
}

const calcularIVA = (valor) => valor * TAXA_IVA; 

function imprimirRelatorio() {
  let totalGeral = 0;
  let totalIVA = 0;

  console.log("========================================");
  console.log(`${NOME_LOJA} — Relatório de Encomendas`); 
  console.log("========================================");

  // CORREÇÃO: Mudamos também o loop de encomendas para for...of
  for (const encomenda of encomendas) {
    const cliente = procurarCliente(encomenda.clienteId);
    
    // CORREÇÃO: Usando string padrão para evitar o erro do [object Object]
    const cidade = cliente?.cidade ?? "Cidade não indicada"; 
    const desconto = encomenda.desconto ?? 0;
    let subtotal = 0;

    console.log(`\nEncomenda nº ${encomenda.numero} — ${cliente.nome} (${cidade})`);

    for (const item of encomenda.itens) {
      const produto = procurarProduto(item.codigo);
      const quantidade = item.quantidade ?? 1;
      const categoria = produto?.categoria ?? "Diversos";
      
      const totalLinha = produto.preco * quantidade;
      subtotal += totalLinha;
      
      console.log(`  - ${quantidade} x ${produto.nome} [${categoria}] = ${formatarValor(totalLinha)}`);
    }

    const base = subtotal - desconto;
    const iva = calcularIVA(base);
    const total = base + iva;

    console.log(`  Subtotal: ${formatarValor(subtotal)}`);
    console.log(`  Desconto: ${formatarValor(desconto)}`);
    console.log(`  IVA (${TAXA_IVA * 100}%): ${formatarValor(iva)}`);
    console.log(`  TOTAL: ${formatarValor(total)}`);

    totalGeral += total;
    totalIVA += iva;
  }

  
  console.log(`
----------------------------------------
Encomendas processadas: ${encomendas.length}
IVA total cobrado: ${formatarValor(totalIVA)}
Facturação total: ${formatarValor(totalGeral)}
----------------------------------------`);
}

imprimirRelatorio();
