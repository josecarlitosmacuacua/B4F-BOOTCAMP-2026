// 1. Criamos a LISTA de encomendas original (usando Arrays [ ])
const listaEncomendasOriginais = [
  { id: 101, cliente: "Jose Macuacua", total: 45.90 },
  { id: 102, cliente: "Coronel", total: 29.55 },
  { id: 103, cliente: "Shield Chivambo", total: 350.90 }
];

// 2. A função tradicional que recebe a lista e devolve uma cópia segura
function copiarEncomenda(lista) {
  // O .map() percorre a lista e o {...item} tira uma fotocópia de cada objeto
  return lista.map(item => {
    return { ...item };
  });
}

// 3. Criamos a cópia da lista completa usando a função
const listaEncomendasCopia = copiarEncomenda(listaEncomendasOriginais);

// 4. Alteramos o total APENAS do primeiro cliente (Jose Macuacua) na CÓPIA
listaEncomendasCopia[0].total = 99.99;


// === PROVA COM CONSOLE.LOG ===

console.log("=== LISTA ORIGINAL (Inalterada) ===");
console.log(listaEncomendasOriginais);
// O Jose Macuacua continua com o total original de 45.90!

console.log("\n=== LISTA CÓPIA (Alterada) ===");
console.log(listaEncomendasCopia);
// Apenas na cópia o total do Jose Macuacua mudou para 99.99!
