import { Router } from "express";
import {
  createOptionsController,
  getOptionsController,
} from "../controllers/options/createOptions.controller";
import verifyCorrectOptionsMiddleware from "../middlewares/verifyIsCorrectOptions.middleware";
import {
  postOptionsSchema,
  updateOptionsSchema,
} from "../schemas/options.schema";
import { verifyOptionsExistsMiddleware } from "../middlewares/verifyOptinIdExists.middleware";
import { deleteOptionController } from "../controllers/options/deleteOptions.controller";
import { updateOptionsController } from "../controllers/options/updateOptions.controller";
import { verifyOptionsLimitMiddleware } from "../middlewares/verifyOptionsLimit.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";

const optionsRouter = Router();

optionsRouter.post("", verifyCorrectOptionsMiddleware, createOptionsController);
optionsRouter.post(
  "",
  dataIsValidMiddleware(postOptionsSchema),
  verifyCorrectOptionsMiddleware,
  verifyOptionsLimitMiddleware,
  createOptionsController
);

optionsRouter.get("", getOptionsController);

optionsRouter.delete(
  "/:id",
  verifyOptionsExistsMiddleware,
  deleteOptionController
);

optionsRouter.patch(
  "/:id",
  verifyOptionsExistsMiddleware,
  dataIsValidMiddleware(updateOptionsSchema),
  verifyCorrectOptionsMiddleware,
  updateOptionsController
);

export default optionsRouter;
