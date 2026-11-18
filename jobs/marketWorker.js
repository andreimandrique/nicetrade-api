import getLatestListing from "../utils/getLatestListing.js";

const INTERVAL = "1h";
const LIMIT = 30;

async function marketWorker() {
  const latestListing = await getLatestListing();
  const latestListingCrypto = latestListing.data;

  let cryptoSymbols = [];

  for (const token of latestListingCrypto) {
    const symbol = token.symbol;
    cryptoSymbols.push(`${symbol}USDT`);
  }
}

export default marketWorker;
