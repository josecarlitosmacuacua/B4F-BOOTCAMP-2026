 
 export const TAXA_IVA = 0.16;
export const produtos = [
{
id: "P001", 
nome: "Arroz agulha 10 kg",
categoria: "Mercearia",
precoBase: 850, 
stock: 42, 
stockMinimo: 15, 
activo: true, 
},
{
id: "P002", 
nome: "Farinha de milho 25 kg ",
categoria: "Mercearia",
precoBase: 1250 ,
stock: 8, 
stockMinimo: 10, 
activo: true, 
},
{
id: "P003",
nome: "Óleo de cozinha 5 L ",
categoria: "Mercearia",
precoBase: 690 , 
stock: 25, 
stockMinimo: 12, 
activo: true, 
},
{
id: "P004", 
nome: "Açúcar castanho 2 kg ",
categoria: "Mercearia",
precoBase: 155 , 
stock: 60, 
stockMinimo: 20, 
activo: true, 
},

{
id: "P005", 
nome: "Feijão manteiga 1 kg ",
categoria: "Mercearia",
precoBase: 120 , 
stock: 0, 
stockMinimo: 10, 
activo: true, 
},
{
id: "P006", 
nome: "Castanha de caju 500 g ",
categoria: "Mercearia",
precoBase: 480 , 
stock: 18, 
stockMinimo: 5, 
activo: true, 
},
{
id: "P007", 
nome: "Piri-piri moído 100 g ",
categoria: "Mercearia",
precoBase: 65 , 
stock: 30, 
stockMinimo: 10, 
activo: true,
},
{
id: "P008", 
nome: "Água mineral 1,5 L (pack 6)  ",
categoria: "Bebidas",
precoBase: 210 , 
stock: 35,
stockMinimo: 12, 
activo: true, 
},
{
id: "P009", 
nome: "Refrigerante 2 L ",
categoria: "Bebidas",
precoBase: 95 , 
stock: 4, 
stockMinimo: 24, 
activo: true, 
},
{
id: "P010", 
nome: "Sumo de maçanica 1 L ",
categoria: "Bebidas",
precoBase: 140 , 
stock: 20, 
stockMinimo: 10, 
activo: true, 
},
{
id: "P011", 
nome: "Sabão em barra 800 g",
categoria: "Higiene",
precoBase: 75 , 
stock: 50,
stockMinimo: 20, 
activo: true, 
},
{
id: "P012", 
nome: "Pasta de dentes 100 ml",
categoria: "Higiene",
precoBase: 110 , 
stock: 9, 
stockMinimo: 10, 
activo: true, 
},
{
id: "P013", 
nome: "Lixívia 2 L",
categoria: "Limpeza",
precoBase: 130 , 
stock: 15, 
stockMinimo: 8,
activo: true, 
},
{
id: "P014", 
categoria: "Limpeza",
precoBase: 185 , 
stock: 0,
stockMinimo: 6, 
activo: false, 
},
{
id: "P015",
nome: "Velas (pack 10)L",
categoria: "Casa",
precoBase: 60 ,
stock: 40, 
stockMinimo: 10, 
activo: true, 
},
];

 const vendas = [
{ id: "V001", produtoId: "P001", quantidade: 3, dia: 1 },
{ id: "V002", produtoId: "P004", quantidade: 10, dia: 1 },
{ id: "V003", produtoId: "P009", quantidade: 12, dia: 1 },
{ id: "V004", produtoId: "P003", quantidade: 2, dia: 2 },
{ id: "V005", produtoId: "P011", quantidade: 8, dia: 2 },
{ id: "V006", produtoId: "P099", quantidade: 1, dia: 2 },
{ id: "V007", produtoId: "P002", quantidade: 4, dia: 3 },
{ id: "V008", produtoId: "P008", quantidade: 6, dia: 3 },
{ id: "V009", produtoId: "P001", quantidade: 5, dia: 4 },
{ id: "V010", produtoId: "P010", quantidade: 7, dia: 4 },
{ id: "V011", produtoId: "P006", quantidade: 2, dia: 4 },
{ id: "V012", produtoId: "P004", quantidade: 6, dia: 5 },
{ id: "V013", produtoId: "P009", quantidade: 9, dia: 5 },
{ id: "V014", produtoId: "P013", quantidade: 3, dia: 5 },
{ id: "V015", produtoId: "P001", quantidade: 4, dia: 6 },
{ id: "V016", produtoId: "P015", quantidade: 5, dia: 6 },
{ id: "V017", produtoId: "P012", quantidade: 1, dia: 6 },
{ id: "V018", produtoId: "P011", quantidade: 4, dia: 6 },
];









function precoComIva(produto, taxa = TAXA_IVA) {

  const precoFinal = produto.precoBase * (1 + taxa);
  

  return Number(precoFinal.toFixed(2));
}


/*function obterPorId(lista, id) {
  return lista.find(p => p.id === id);
*/


console.log(precoComIva(obterPorId(produtos, "P001"))); // Retorna: 986
console.log(precoComIva(obterPorId(produtos, "P009"))); // Retorna: 110.2
console.log(precoComIva({ precoBase: 100 }, 0.05));    

function listarActivos(produtos) {
  return produtos.filter(produto => produto.activo);
}
listarActivos(produtos).length; // 14


 
function valorDoStock(produtos) {
  let totalSemIva = 0;
  let totalIva = 0;
  let totalComIva = 0;

  
  produtos.forEach(produto => {
    if (produto.activo) {
     
      const valorProdutoSemIva = produto.precoBase * produto.stock;

      const valorProdutoIva = valorProdutoSemIva * TAXA_IVA;
      
    
      totalSemIva += valorProdutoSemIva;
      totalIva += valorProdutoIva;
      totalComIva += (valorProdutoSemIva + valorProdutoIva);
    }
  });


  return {
    semIva: Number(totalSemIva.toFixed(2)),
    iva: Number(totalIva.toFixed(2)),
    comIva: Number(totalComIva.toFixed(2))
  };
}
valorDoStock(produtos);






function abaixoDoMinimo(produtos) {
  return produtos
    .filter(p => p.activo && p.stock < p.minimo)
    .map(p => ({
      id: p.id,
      nome: p.nome,
      stock: p.stock,
      emFalta: p.minimo - p.stock
    }))
    .sort((a, b) => b.emFalta - a.emFalta || a.nome.localeCompare(b.nome));
}
abaixoDoMinimo(produtos);

function obterPorId(produtos, id) {
  return produtos.find(produto => produto.id === id);
}
obterPorId(produtos, "P010").nome;
obterPorId(produtos, "P100");
function pesquisar(produtos, termo) {

  const termoLimpo = termo.trim().toLowerCase();

  return produtos.filter(p => 
    p.activo && p.nome.toLowerCase().includes(termoLimpo)
  );
}
pesquisar(produtos, " SAB ").map((p) => p.id); // ["P011"]
pesquisar(produtos, "de").map((p) => p.id);



console.log(abaixoDoMinimo(produtos));


function registarVenda(produtos, venda) {
  
  if (!Number.isInteger(venda.quantidade) || venda.quantidade <= 0) {
    throw new RangeError("A quantidade deve ser um inteiro positivo.");
  }

 
  const indice = produtos.findIndex(p => p.id === venda.produtoId);

  
  if (indice === -1) {
    throw new Error(`Produto não existe: ${venda.produtoId}`);
  }

  const produto = produtos[indice];

  
  if (!produto.activo) {
    throw new Error(`Produto inactivo: ${produto.id}`);
  }

 
  if (produto.stock < venda.quantidade) {
    throw new Error(`Stock insuficiente para ${produto.nome}: pedido ${venda.quantidade}, disponível ${produto.stock}`);
  }

 
  const produtoAtualizado = {
    ...produto,
    stock: produto.stock - venda.quantidade
  };


  return produtos.with(indice, produtoAtualizado);
}
