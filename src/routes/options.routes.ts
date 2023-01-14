import { isAdmMiddleware } from "./../middlewares/isAdm.middleware";
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
import { verifyOptionsLimitMiddleware } from "../middlewares/verifyOptionsLimit.middleware";
import { AuthMiddleware } from "../middlewares/authentication.middleware";

const optionsRouter = Router();

optionsRouter.post(
  "",
  AuthMiddleware,
  isAdmMiddleware,
  dataIsValidMiddleware(postOptionsSchema),
  verifyCorrectOptionsMiddleware,
  verifyOptionsLimitMiddleware,
  createOptionsController
);

optionsRouter.get("", AuthMiddleware, getOptionsController);

optionsRouter.delete(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  verifyOptionsExistsMiddleware,
  deleteOptionController
);

optionsRouter.patch(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  verifyOptionsExistsMiddleware,
  dataIsValidMiddleware(updateOptionsSchema),
  verifyCorrectOptionsMiddleware,
  updateOptionsController
);

export default optionsRouter;
