import { TooManyRequestsError } from "@binance/spot";
import getLatestListing from "../utils/getLatestListing.js";
import getKlinesBinance from "../utils/getKlinesBinance.js";

const INTERVAL = "1h";
const LIMIT = 30;
const DELAY_MS = 500;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function marketWorker() {
  const latestListing = await getLatestListing();

  const latestListingCrypto = latestListing.data;

  for (const token of latestListingCrypto) {
    const symbol = token.symbol;
    const cryptoSymbol = `${symbol}USDT`;

    try {
      const klines = await getKlinesBinance({
        symbol: cryptoSymbol,
        interval: INTERVAL,
        limit: LIMIT,
      });

      console.log({
        symbol: cryptoSymbol,
        klines: klines,
      });
    } catch (error) {
      if (error instanceof TooManyRequestsError) {
        console.warn("Binance rate limit");
      } else {
        console.error(error);
      }
    }

    await sleep(DELAY_MS);
  }
}

export default marketWorker;
