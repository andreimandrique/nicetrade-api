import { parseISO } from "date-fns";
import { Spot, SPOT_REST_API_PROD_URL } from "@binance/spot";

const binanceClient = new Spot({
  configurationRestAPI: {
    basePath: SPOT_REST_API_PROD_URL,
  },
});

async function getKlinesBinance({
  symbol,
  interval,
  startDate,
  endDate,
  limit,
}) {
  // Build the params object dynamically
  const params = { symbol, interval, limit };

  // date format year-month-day eg "2026-09-18"

  // If startDate is provided, add startTime
  if (startDate) {
    const start = parseISO(startDate);
    params.startTime = start.getTime();
  }

  // If endDate is provided, add endTime
  if (endDate) {
    const end = parseISO(endDate);
    params.endTime = end.getTime();
  }

  // Pass the dynamic `params` object directly into Binance SDK
  const klines = await binanceClient.restAPI
    .klines(params)
    .then((response) => response.data())
    .catch((error) => {
      throw error;
    });

  const formattedKlines = klines.map((k) => ({
    symbol,
    open: k[1],
    high: k[2],
    low: k[3],
    close: k[4],
    volume: k[5],
    openTime: k[0],
    closeTime: k[6],
    isFinal: Number(k[6]) < Date.now(),
  }));

  return formattedKlines;
}

export default getKlinesBinance;
