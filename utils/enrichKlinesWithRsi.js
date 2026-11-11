import { RSI } from "trading-signals";

const RSI_PERIOD = 14;

function enrichKlinesWithRsi(rawCandles) {
  const closes = rawCandles.map((c) => Number(c.close));
  const rsiCalculator = new RSI(RSI_PERIOD);
  const rsiValues = rsiCalculator.updates(closes);

  return rawCandles
    .map((candle, index) => ({
      ...candle,
      rsi: rsiValues[index] ?? null,
    }))
    .filter((candle) => candle.rsi !== null);
}

export default enrichKlinesWithRsi;