import { Router } from "express";
import { createExtrasController } from "../controllers/extras/createExtras.controller";
import { deleteExtrasController } from "../controllers/extras/deleteExtras.controller";
import { listExtrasController } from "../controllers/extras/listExtras.controller";
import { updateExtrasController } from "../controllers/extras/updateExtras.controller";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { ensureIdExistsMiddleware } from "../middlewares/extras/ensureIdExists.middleware";
import { typeIdIsValidMiddleware } from "../middlewares/extras/typeIdIsValid.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { isValidToUpdateMiddleware } from "../middlewares/isValidToUpdate.middleware";
import {
  extrasRequestSchema,
  extrasUpdateSchema,
} from "../schemas/extras.schema";

export const extrasRouter = Router();

extrasRouter.post(
  "",
  AuthMiddleware,
  isAdmMiddleware,
  dataIsValidMiddleware(extrasRequestSchema),
  typeIdIsValidMiddleware,
  createExtrasController
);

extrasRouter.get("", listExtrasController);

extrasRouter.patch(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  typeIdIsValidMiddleware,
  idIsValidMiddleware,
  isValidToUpdateMiddleware,
  dataIsValidMiddleware(extrasUpdateSchema),
  updateExtrasController
);

extrasRouter.delete(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
  ensureIdExistsMiddleware,
  deleteExtrasController
);
