import { MOEDA } from './dados.js';// inmportamos  amoeda aqui pra que possamos usar 

export const TAXA_IVA = 0.17; // exportamos tava iva para que possa ser acessado pelo outro ficheiro

export function formatarValor(valor) {
  return valor.toFixed(2) + " " + MOEDA;
}

export function calcularIVA(valor) {
  return valor * TAXA_IVA;
}
