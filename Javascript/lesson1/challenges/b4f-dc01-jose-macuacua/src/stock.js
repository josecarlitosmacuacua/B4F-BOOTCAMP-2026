//Tarefa 1
//Devolve o preço unitário com IVA, arredondado a 2 casas decimais. O segundo parâmetro tem um valor por omissão.
import {vedas} from "./vendas.js";
import { produtos,TAXA_IVA  } from "../produtos.js";



// Definição da constante global para o valor por omissão (ex: taxa normal de Moçambique de 16%)
const TAXA_IVA = 16; 

/**
 * Calcula o preço unitário de um produto incluindo o IVA.
 * @param {Object} produto - O objeto do produto (deve conter a propriedade precoBase).
 * @param {number} [taxa=TAXA_IVA] - A taxa de IVA em percentagem (ex: 16 para 16%).
 * @returns {number} O preço final com IVA arredondado a 2 casas decimais.
 */
function precoComIva(produto, taxa = TAXA_IVA) {
  // Extrai o valor numérico caso o preço base venha como string (ex: "850,00 MT")
  let precoNum = typeof produto.precoBase === "string" 
    ? parseFloat(produto.precoBase.replace(",", ".").replace(/[^\d.]/g, "")) 
    : produto.precoBase;

  // Calcula o preço com a taxa de IVA aplicada
  const precoFinal = precoNum * (1 + taxa / 100);

  // Arredonda estritamente a 2 casas decimais retornando um tipo Number
  return Math.round(precoFinal * 100) / 100;
}
