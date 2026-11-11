import { EMA } from "trading-signals";

const EMA_PERIOD = 20;

function enrichKlinesWithEma20(rawCandles) {
  const closes = rawCandles.map((c) => Number(c.close));
  const emaCalculator = new EMA(EMA_PERIOD);
  const emaValues = emaCalculator.updates(closes);

  return rawCandles
    .map((candle, index) => ({
      ...candle,
      ema20: emaValues[index] ?? null,
    }))
    .filter((candle) => candle.ema20 !== null);
}

export default enrichKlinesWithEma20;
