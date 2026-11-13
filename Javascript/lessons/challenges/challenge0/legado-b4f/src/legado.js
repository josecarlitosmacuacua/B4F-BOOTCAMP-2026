// ============================================================
//  legado.js — Relatório de encomendas da "Loja do Bairro"
//  Script antigo: NÃO alterar o resultado, apenas o código.
// ============================================================

var NOME_LOJA = "Loja do Bairro";
var TAXA_IVA = 0.17;
var MOEDA = "MT";

var produtos = [
  { codigo: "P01", nome: "Arroz 5kg", preco: 450, categoria: "Mercearia" },
  { codigo: "P02", nome: "Óleo 1L", preco: 180, categoria: "Mercearia" },
  { codigo: "P03", nome: "Sabão em barra", preco: 60, categoria: "Limpeza" },
  { codigo: "P04", nome: "Caderno A4", preco: 95, categoria: "Papelaria" },
  { codigo: "P05", nome: "Caneta azul", preco: 25 }
];

var clientes = [
  { id: 1, nome: "Ana Macuácua", cidade: "Maputo" },
  { id: 2, nome: "Carlos Nhantumbo", cidade: "Matola" },
  { id: 3, nome: "Fátima Sitoe" }
];

var encomendas = [
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
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].codigo == codigo) {
      return produtos[i];
    }
  }
  return null;
}

function procurarCliente(id) {
  for (var i = 0; i < clientes.length; i++) {
    if (clientes[i].id == id) {
      return clientes[i];
    }
  }
  return null;
}

function formatarValor(valor) {
  return valor.toFixed(2) + " " + MOEDA;
}

function calcularIVA(valor) {
  return valor * TAXA_IVA;
}

function imprimirRelatorio() {
  var totalGeral = 0;
  var totalIVA = 0;

  console.log("========================================");
  console.log("  " + NOME_LOJA + " — Relatório de Encomendas");
  console.log("========================================");

  for (var i = 0; i < encomendas.length; i++) {
    var encomenda = encomendas[i];
    var cliente = procurarCliente(encomenda.clienteId);
    var cidade = cliente.cidade || "Cidade não indicada";
    var desconto = encomenda.desconto || 0;
    var subtotal = 0;

    console.log("");
    console.log("Encomenda nº " + encomenda.numero + " — " + cliente.nome + " (" + cidade + ")");

    for (var j = 0; j < encomenda.itens.length; j++) {
      var item = encomenda.itens[j];
      var produto = procurarProduto(item.codigo);
      var quantidade = item.quantidade || 1;
      var categoria = produto.categoria || "Diversos";
      var totalLinha = produto.preco * quantidade;
      subtotal = subtotal + totalLinha;
      console.log("  - " + quantidade + " x " + produto.nome + " [" + categoria + "] = " + formatarValor(totalLinha));
    }

    var base = subtotal - desconto;
    var iva = calcularIVA(base);
    var total = base + iva;

    console.log("  Subtotal: " + formatarValor(subtotal));
    console.log("  Desconto: " + formatarValor(desconto));
    console.log("  IVA (" + TAXA_IVA * 100 + "%): " + formatarValor(iva));
    console.log("  TOTAL: " + formatarValor(total));

    totalGeral = totalGeral + total;
    totalIVA = totalIVA + iva;
  }

  console.log("");
  console.log("----------------------------------------");
  console.log("Encomendas processadas: " + encomendas.length);
  console.log("IVA total cobrado: " + formatarValor(totalIVA));
  console.log("Facturação total: " + formatarValor(totalGeral));
  console.log("----------------------------------------");
}

imprimirRelatorio();