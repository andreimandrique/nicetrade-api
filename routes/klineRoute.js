import { Router } from "express";
import { klineGet, klinePost } from "../controllers/klineController.js";

const klineRouter = Router();

klineRouter.get("/", klineGet);
klineRouter.post("/", klinePost);

export default klineRouter;
