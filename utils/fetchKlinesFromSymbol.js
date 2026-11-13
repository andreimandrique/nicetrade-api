import getKlinesBinance from "./getKlinesBinance";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchKlinesFromSymbol(
  cryptoSymbols,
  interval,
  startDate = null,
  limit = 30,
) {
  const results = {};
  const delayMs = 350;

  for (const symbol of cryptoSymbols) {
    const response = await getKlinesBinance({
      symbol,
      interval,
      startDate,
      limit,
    });

    // Fallback just in case a 429 happens despite the delay
    if (response.rateLimitExceeded) {
      console.warn(
        `[Warning] Rate limit hit unexpectedly on ${symbol}. Skipping.`,
      );
      results[symbol] = [];
    } else {
      results[symbol] = response.klines;
    }

    // Proactive pause before moving to the next symbol
    await sleep(delayMs);
  }

  return results;
}

export default fetchKlinesFromSymbol;
