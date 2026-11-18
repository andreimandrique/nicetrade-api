import { TooManyRequestsError } from "@binance/spot";
import getLatestListing from "../utils/getLatestListing.js";
import getKlinesBinance from "../utils/getKlinesBinance.js";

const INTERVAL = "1h";
const LIMIT = 30;
const DELAY_MS = 500;
const DELAY_MS_RATE_LIMIT = 60000;
const DELAY_MS_GENERAL_ERROR = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function marketWorker() {
  const latestListing = await getLatestListing();
  const latestListingCrypto = latestListing.data;

  const cryptoKlines = [];

  for (const token of latestListingCrypto) {
    const symbol = token.symbol;
    const cryptoSymbol = `${symbol}USDT`;

    // Pacing delay before every request
    await sleep(DELAY_MS);

    try {
      const klines = await getKlinesBinance({
        symbol: cryptoSymbol,
        interval: INTERVAL,
        limit: LIMIT,
      });

      cryptoKlines.push({
        symbol: cryptoSymbol,
        klines: klines,
      });
    } catch (error) {
      if (error instanceof TooManyRequestsError) {
        console.warn(
          `Binance rate limit hit on ${cryptoSymbol}. Cooling down for 60s...`,
        );
        await sleep(DELAY_MS_RATE_LIMIT);
      } else if (error.code === -1121) {
        console.warn(`Skipping invalid trading pair: ${cryptoSymbol}`);
        await sleep(DELAY_MS);
      } else {
        console.error(`General error on ${cryptoSymbol}:`, error);
        await sleep(DELAY_MS_GENERAL_ERROR);
      }
    }
  }

  console.log(cryptoKlines);
}

export default marketWorker;
