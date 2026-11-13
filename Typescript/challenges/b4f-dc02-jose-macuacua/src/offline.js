import { readFile } from "node:fs/promises";

// fetch «falso» para trabalhar sem Internet: responde a partir de dados/mzn.json
// e calcula as taxas cruzadas para outras moedas de origem (ex.: USD → MZN)
export async function fetchOffline(url) {
  const base = url.match(/\/([a-z]{3})\.json$/)?.[1];
  const ficheiro = new URL("../dados/mzn.json", import.meta.url);
  const { date, mzn } = JSON.parse(await readFile(ficheiro, "utf8"));
  if (!base || !(base in mzn)) return new Response("", { status: 404 });
  const taxas = Object.fromEntries(
    Object.entries(mzn).map(([codigo, taxa]) => [codigo, taxa / mzn[base]]),
  );
  return Response.json({ date, [base]: taxas });
}
