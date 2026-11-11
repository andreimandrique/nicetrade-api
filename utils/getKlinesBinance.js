import { addDays, parseISO } from "date-fns";
import { Spot } from "@binance/spot";

const binanceClient = new Spot();

async function getKlinesBinance({ symbol, interval, startDate, limit = 30 }) {

  // date format year-month-day eg "2026-09-18"
  const start = parseISO(startDate);
  const end = addDays(start, limit - 1);

  const startTime = start.getTime();
  const endTime = end.getTime();

  let klines;

  try {
    klines = await binanceClient.restAPI
      .klines({ symbol, interval, startTime, endTime, limit })
      .then((response) => response.data());
  } catch (error) {
    console.error(`Request failed: ${error.code } ${error.message}`);
    throw error;
  }

  return klines.map((k) => ({
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

}

export default getKlinesBinance;