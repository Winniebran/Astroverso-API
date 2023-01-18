import { Router } from "express";

import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";

import { verifyCorrectOptionsMiddleware } from "../middlewares/options/verifyIsCorrectOptions.middleware";
import { verifyOptionIdExistsMiddleware } from "../middlewares/options/verifyOptionIdExists.middleware";
import { verifyOptionsLimitMiddleware } from "../middlewares/options/verifyOptionsLimit.middleware";
import {
  postOptionsSchema,
  updateOptionsSchema,
} from "../schemas/options.schema";

import { createOptionsController } from "../controllers/options/createOptions.controller";
import { getOptionsController } from "../controllers/options/getOptions.controller";
import { deleteOptionController } from "../controllers/options/deleteOptions.controller";
import { updateOptionsController } from "../controllers/options/updateOptions.controller";

export const optionsRouter = Router();

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
  idIsValidMiddleware,
  verifyOptionIdExistsMiddleware,
  deleteOptionController
);

optionsRouter.patch(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
  verifyOptionIdExistsMiddleware,
  dataIsValidMiddleware(updateOptionsSchema),
  updateOptionsController
);
