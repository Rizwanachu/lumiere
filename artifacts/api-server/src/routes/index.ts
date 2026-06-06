import { Router, type IRouter } from "express";
import healthRouter from "./health";
import imgProxyRouter from "./imgProxy";

const router: IRouter = Router();

router.use(healthRouter);
router.use(imgProxyRouter);

export default router;
