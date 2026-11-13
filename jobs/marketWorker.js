import getLatestListing from "../utils/getLatestListing.js";
import fetchKlinesFromSymbol from "./utils/fetchKlinesFromSymbol.js";

const INTERVAL = "1h";
const LIMIT = 30;

async function marketWorker() {
  const latestListing = await getLatestListing();
  const latestListingCrypto = latestListing.data;

  let cryptoSymbols = [];

  for (const token of latestListingCrypto) {
    const symbol = token.symbol;
    console.log(symbol);
  }
}

export default marketWorker;
