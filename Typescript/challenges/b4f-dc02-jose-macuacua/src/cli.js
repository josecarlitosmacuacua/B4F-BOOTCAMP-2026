import { obterTaxas } from "./api.js";
import { ConversorCambio } from "./conversor.js";
import { ErroCambio } from "./erros.js";
import { fetchOffline } from "./offline.js";

function formatarMoeda(valor, moeda) {
  return new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: moeda,
  }).format(valor);
}

function formatarTaxa(taxa) {
  return new Intl.NumberFormat("pt-MZ", {
    maximumFractionDigits: 6,
  }).format(taxa);
}

async function executar() {
  const argsBrutos = process.argv.slice(2);
  const offline = argsBrutos.includes("--offline");
  const args = argsBrutos.filter((arg) => arg !== "--offline");

  if (args.length < 3) {
    console.error("Uso: node src/cli.js <valor> <origem> <destinos...> [--offline]");
    process.exitCode = 1;
    return;
  }

  const [valorTexto, origemTexto, ...destinosTexto] = args;
  const valor = Number(valorTexto.replace(",", "."));
  const origem = origemTexto.trim().toUpperCase();

  const fetchEscolhido = offline ? fetchOffline : globalThis.fetch;
  const conversor = new ConversorCambio({
    obterTaxas: (base) => obterTaxas(base, { fetch: fetchEscolhido }),
  });

  try {
    const { sucesso, falhas } = await conversor.converterParaVarias(
      valor,
      origem,
      destinosTexto,
    );

    if (sucesso.length === 0 && falhas.length > 0) {
      // Se todas falharam, verifica se foi erro da moeda de origem/rede ou apenas destinos
      await conversor.taxa(origem, origem);
    }

    const dataCabecalho =
      sucesso[0]?.data ?? new Date().toISOString().slice(0, 10);
    const sufixoOffline = offline ? " (offline)" : "";

    console.log(`Câmbio de ${dataCabecalho}${sufixoOffline}`);
    console.log(`${formatarMoeda(valor, origem)} =`);

    for (const item of sucesso) {
      const valorDestinoFmt = formatarMoeda(item.resultado, item.para);
      const taxaFmt = formatarTaxa(item.taxa);
      console.log(`  ${valorDestinoFmt} (1 ${item.de} = ${taxaFmt} ${item.para})`);
    }

    for (const falha of falhas) {
      console.log(`  ✕ ${falha.moeda}: ${falha.motivo}`);
    }
  } catch (erro) {
    if (erro instanceof ErroCambio || erro instanceof RangeError) {
      console.error(`Erro: ${erro.message}`);
      process.exitCode = 1;
    } else {
      throw erro;
    }
  }
}

await executar();