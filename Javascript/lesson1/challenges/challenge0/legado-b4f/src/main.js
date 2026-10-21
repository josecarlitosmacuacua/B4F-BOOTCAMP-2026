import{ NOME_LOJA, produtos, clientes, encomendas } from './dados.js';
import{ formatarValor, calcularIVA, TAXA_IVA } from './calculo.js';

function procurarProduto(codigo) {
  for (const produto of produtos) {
    if (produto.codigo === codigo) {
      return produto;
    }
  }
  return null; 
}

function procurarCliente(id) {
  for (const cliente of clientes) {
    if (cliente.id === id) {
      return cliente;
    }
  }
  return null;
}

function imprimirRelatorio() {
  let totalGeral = 0;
  let totalIVA = 0;

  console.log("========================================");
  console.log(NOME_LOJA + " — Relatório de Encomendas");
  console.log("========================================");

  for (const encomenda of encomendas) {
    const cliente = procurarCliente(encomenda.clienteId);
    
    let cidade = "Cidade não indicada";
    if (cliente.cidade) {
      cidade = cliente.cidade;
    }

    let desconto = 0;
    if (encomenda.desconto) {
      desconto = encomenda.desconto;
    }

    let subtotal = 0;

    console.log("");
    console.log("Encomenda nº " + encomenda.numero + " — " + cliente.nome + " (" + cidade + ")");

    for (const item of encomenda.itens) {
      const produto = procurarProduto(item.codigo);
      
      let quantidade = 1;
      if (item.quantidade) {
        quantidade = item.quantidade;
      }

      let categoria = "Diversos";
      if (produto.categoria) {
        categoria = produto.categoria;
      }
      
      const totalLinha = produto.preco * quantidade;
      subtotal = subtotal + totalLinha;
      
      console.log("  - " + quantidade + " x " + produto.nome + " [" + categoria + "] = " + formatarValor(totalLinha));
    }

    const base = subtotal - desconto;
    const iva = calcularIVA(base);
    const total = base + iva;

    console.log("  Subtotal: " + formatarValor(subtotal));
    console.log("  Desconto: " + formatarValor(desconto));
    console.log("  IVA (" + (TAXA_IVA * 100) + "%): " + formatarValor(iva));
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
