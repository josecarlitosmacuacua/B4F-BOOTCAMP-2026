const loja = {nome: "beira shop",
    contacto:87776767 ,
    email:null
}
// 2. Criação do objeto original
const encomendaOriginal = {
  id: 1042,
  cliente: "Carlos Silva",
  total: 150.00
};
// 1. Definição da função que cria a cópia independente
function copiarEncomenda(encomenda) {
  // O operador spread (...) espalha as propriedades num novo objeto
  return { ...encomenda };
}

// 3. Criação da cópia usando a função
const encomendaCopia = copiarEncomenda(encomendaOriginal);
/*const copiaEncomenda = (enco)=>{
    return {...enco}
    }
const copia = copiaEncomenda(encomendas)

*/

// 4. Alteração do total APENAS na cópia
encomendaCopia.total = 299.90;

// 5. Prova com console.log
console.log("--- PROVA DE INDEPENDÊNCIA ---");
console.log("Original:", encomendaOriginal);
console.log("Cópia:", encomendaCopia);
