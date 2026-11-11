
import { CoinMarketCap } from "@coinmarketcap/sdk";

const cmc = new CoinMarketCap({
  apiKey: process.env.COINMARKETCAP_API_KEY,
});

async function getLatestListing() {

    const { data, error } = await cmc.api.cryptocurrency.listingsLatest({
      query: {
        start: "1",
        limit: "10",
        sort: "market_cap",
        sort_dir: "desc",
        convert: "USDT",
      },
    });

    if (error) {
      throw error;
    }else{
      return data;
    }
}

export default getLatestListing;