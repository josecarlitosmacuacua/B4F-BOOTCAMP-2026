import { VALIDADE_CACHE_MS } from "./config.js";
import { ErroMoeda } from "./erros.js";

function normalizarCodigo(codigo) {
  if (typeof codigo !== "string" || !/^[a-zA-Z]{3}$/.test(codigo.trim())) {
    throw new ErroMoeda(String(codigo));
  }
  return codigo.trim().toUpperCase();
}

export class ConversorCambio {
  #obterTaxas;
  #agora;
  #validadeMs;
  #cache = new Map();
  #historico = [];

  constructor({
    obterTaxas,
    agora = Date.now,
    validadeMs = VALIDADE_CACHE_MS,
  } = {}) {
    if (typeof obterTaxas !== "function") {
      throw new TypeError("obterTaxas tem de ser uma função");
    }
    this.#obterTaxas = obterTaxas;
    this.#agora = agora;
    this.#validadeMs = validadeMs;
  }

  #obterDadosComCache(base) {
    const agoraMs = this.#agora();
    const entrada = this.#cache.get(base);

    if (entrada && agoraMs - entrada.criadoEm < this.#validadeMs) {
      return entrada.promessa;
    }

    const promessa = Promise.resolve()
      .then(() => this.#obterTaxas(base))
      .catch((erro) => {
        if (this.#cache.get(base)?.promessa === promessa) {
          this.#cache.delete(base);
        }
        throw erro;
      });

    this.#cache.set(base, { promessa, criadoEm: agoraMs });
    return promessa;
  }

  async taxa(de, para) {
    const origem = normalizarCodigo(de);
    const destino = normalizarCodigo(para);

    if (origem === destino) {
      return 1;
    }

    const { taxas } = await this.#obterDadosComCache(origem);
    if (!taxas.has(destino)) {
      throw new ErroMoeda(destino);
    }

    return taxas.get(destino);
  }

  async converter(valor, de, para) {
    if (typeof valor !== "number" || !Number.isFinite(valor) || valor <= 0) {
      throw new RangeError(`Valor inválido: ${valor}`);
    }

    const origem = normalizarCodigo(de);
    const destino = normalizarCodigo(para);

    let valorTaxa = 1;
    let data = new Date(this.#agora()).toISOString().slice(0, 10);

    if (origem !== destino) {
      const dados = await this.#obterDadosComCache(origem);
      if (!dados.taxas.has(destino)) {
        throw new ErroMoeda(destino);
      }
      valorTaxa = dados.taxas.get(destino);
      data = dados.data;
    }

    const resultado = Number((valor * valorTaxa).toFixed(2));
    const registo = {
      valor,
      de: origem,
      para: destino,
      taxa: valorTaxa,
      resultado,
      data,
    };

    this.#historico.push(registo);
    return registo;
  }

  async converterParaVarias(valor, de, destinos) {
    const promessas = destinos.map((destino) =>
      this.converter(valor, de, destino),
    );
    const resultados = await Promise.allSettled(promessas);

    const sucesso = [];
    const falhas = [];

    resultados.forEach((res, indice) => {
      if (res.status === "fulfilled") {
        sucesso.push(res.value);
      } else {
        falhas.push({
          moeda: String(destinos[indice]).trim().toUpperCase(),
          motivo: res.reason?.message ?? String(res.reason),
        });
      }
    });

    return { sucesso, falhas };
  }

  get historico() {
    return this.#historico.map((item) => ({ ...item }));
  }

  resumo() {
    const agrupado = Object.groupBy(this.#historico, (item) => item.para);
    const resultado = {};

    for (const [moeda, lista] of Object.entries(agrupado)) {
      const totalBruto = lista.reduce((soma, item) => soma + item.resultado, 0);
      resultado[moeda] = {
        conversoes: lista.length,
        total: Number(totalBruto.toFixed(2)),
      };
    }

    return resultado;
  }

  moedasUsadas() {
    const conjunto = new Set();
    for (const item of this.#historico) {
      conjunto.add(item.de);
      conjunto.add(item.para);
    }
    return [...conjunto].sort();
  }

  desfazer() {
    return this.#historico.pop();
  }
}
