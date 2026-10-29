const encomendas = {nome: "bom bom",
    uniprice:15,
    quantity:3,
    total:50
}
const copiaEncomenda = (enco)=>{
    return {...enco}
    }
const copia = copiaEncomenda(encomendas)





console.table(copia)