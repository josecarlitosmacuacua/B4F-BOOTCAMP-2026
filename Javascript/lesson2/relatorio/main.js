import vendas from "./vendas.json" with {type:"json"}
const objt = vendas;
objt.slice(0, 5);
console.table(objt.slice(0, 5));

const calcularTotal = () => { 
 
  const totalCidade = vendas.map((venda) => {
    const total = venda.produtos.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    return {
         cidade: venda.cidade, 
         total };
  });

  let agrupado = {};
  totalCidade.forEach(({ cidade, total }) => { 
    agrupado[cidade] = (agrupado[cidade] || 0) + total;
  });

  return Object.entries(agrupado).map(([cidade, total]) => ({ cidade, total }));
};

console.table(calcularTotal());
