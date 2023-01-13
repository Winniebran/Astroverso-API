import { Router } from "express";
import { createOptionsController } from "../controllers/options/createOptions.controller";
import verifyCorrectOptionsMiddleware from "../middlewares/verifyIsCorrectOptions.middleware";
import { postOptionsSchema } from "../schemas/options.schema";
import { verifyOptionsExistsMiddleware } from "../middlewares/verifyOptinIdExists.middleware";
import { deleteOptionController } from "../controllers/options/deleteOptions.controller";

const optionsRouter = Router();

optionsRouter.post("", verifyCorrectOptionsMiddleware, createOptionsController);

optionsRouter.delete(
  "/:id",
  verifyOptionsExistsMiddleware,
  deleteOptionController
);

export default optionsRouter;
