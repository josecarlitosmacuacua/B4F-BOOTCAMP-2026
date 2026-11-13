// API pública e gratuita, sem chave: github.com/fawazahmed0/exchange-api
// Pedido: <fonte>/<moeda em minúsculas>.json → ex.: .../currencies/mzn.json
export const FONTES = [
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies",
"https://latest.currency-api.pages.dev/v1/currencies",
];
export const TEMPO_LIMITE_MS = 5000;
export const VALIDADE_CACHE_MS = 10 * 60 * 1000; // 10