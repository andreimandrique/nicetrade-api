import "dotenv/config";
import express from "express";
import { CronJob } from "cron";

import marketWorker from "./jobs/marketWorker.js";

import indexRouter from "./routes/indexRoute.js";
import klineRouter from "./routes/klineRoute.js";

const app = express();
const port = process.env.PORT || 3000;

// const runEveryHour = new CronJob(
//   "0 * * * *",
//   async () => {
//     try {
//       await marketWorker();
//     } catch (error) {
//       console.error("Error in marketWorker:", error);
//     }
//   },
//   null,
//   true,
//   "UTC",
// );

const runOnce = async () => {
  marketWorker().catch((error) => {
    console.log(error);
  });
};
runOnce();

app.use(express.json());

app.use("/", indexRouter);
app.use("/klines", klineRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
