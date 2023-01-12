import { Router } from "express";
import { createOptionsController } from "../controllers/options/createOptions.controller";
import verifyCorrectOptionsMiddleware from "../middlewares/verifyIsCorrectOptions.middleware";

const optionsRouter = Router();

optionsRouter.post("", verifyCorrectOptionsMiddleware, createOptionsController);

export default optionsRouter;
