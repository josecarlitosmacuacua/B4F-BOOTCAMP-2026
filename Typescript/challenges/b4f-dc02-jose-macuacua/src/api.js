import { FONTES, TEMPO_LIMITE_MS } from "./config.js";
import { ErroDados, ErroHttp, ErroMoeda, ErroRede } from "./erros.js";

function validarCodigoMoeda(codigo) {
  if (typeof codigo !== "string" || !/^[a-zA-Z]{3}$/.test(codigo.trim())) {
    throw new ErroMoeda(String(codigo));
  }
  return codigo.trim().toUpperCase();
}

export async function obterTaxas(
  base,
  {
    fetch = globalThis.fetch,
    fontes = FONTES,
    tempoLimite = TEMPO_LIMITE_MS,
  } = {},
) {
  const moedaBase = validarCodigoMoeda(base);
  const baseMinusculas = moedaBase.toLowerCase();
  const erros = [];

  for (const fonte of fontes) {
    const url = `${fonte}/${baseMinusculas}.json`;

    try {
      const resposta = await fetch(url, {
        signal: AbortSignal.timeout(tempoLimite),
      });

      if (!resposta.ok) {
        throw new ErroHttp(resposta.status, url);
      }

      let corpo;
      try {
        corpo = await resposta.json();
      } catch (erroJson) {
        throw new ErroDados(`JSON inválido recebido de ${url}`, erroJson);
      }

      const mapaBruto = corpo?.[baseMinusculas];
      if (
        typeof corpo?.date !== "string" ||
        typeof mapaBruto !== "object" ||
        mapaBruto === null
      ) {
        throw new ErroDados(`Formato de dados inesperado em ${url}`);
      }

      const taxas = new Map();
      for (const [codigo, valor] of Object.entries(mapaBruto)) {
        if (/^[a-z]{3}$/.test(codigo) && typeof valor === "number" && Number.isFinite(valor)) {
          taxas.set(codigo.toUpperCase(), valor);
        }
      }

      return {
        base: moedaBase,
        data: corpo.date,
        taxas,
      };
    } catch (erro) {
      if (erro?.name === "TimeoutError") {
        erros.push(new ErroRede(`Tempo limite de ${tempoLimite} ms excedido`, erro));
      } else if (erro instanceof ErroHttp || erro instanceof ErroDados) {
        erros.push(erro);
      } else {
        erros.push(new ErroRede(`Falha de rede ao aceder a ${url}`, erro));
      }
    }
  }

  const todos404 =
    erros.length > 0 &&
    erros.every((e) => e instanceof ErroHttp && e.status === 404);

  if (todos404) {
    throw new ErroMoeda(moedaBase);
  }

  throw new ErroRede(
    `Não foi possível obter taxas para ${moedaBase} a partir de nenhuma fonte`,
    erros,
  );
}
