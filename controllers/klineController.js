import getKlinesBinance from "../utils/getKlinesBinance.js";

const klineGet = (req, res) => {
  res.status(200).json({ message: "Hello Kline" });
};

const klinePost = async (req, res) => {
  const { symbol, interval, startDate, limit } = req.body;

  const klines = await getKlinesBinance({ symbol, interval, startDate, limit });

  res.status(200).json(klines);
};

export { klineGet, klinePost };
