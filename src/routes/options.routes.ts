import { getOptionsController } from "./../controllers/options/getOptions.controller";
import { Router } from "express";
import { createOptionsController } from "../controllers/options/createOptions.controller";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import verifyCorrectOptionsMiddleware from "../middlewares/verifyIsCorrectOptions.middleware";
import {
  postOptionsSchema,
  updateOptionsSchema,
} from "../schemas/options.schema";
import { verifyOptionsExistsMiddleware } from "../middlewares/verifyOptinIdExists.middleware";
import { deleteOptionController } from "../controllers/options/deleteOptions.controller";
import { updateOptionsController } from "../controllers/options/updateOptions.controller";

const optionsRouter = Router();

optionsRouter.post(
  "",
  dataIsValidMiddleware(postOptionsSchema),
  verifyCorrectOptionsMiddleware,
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
