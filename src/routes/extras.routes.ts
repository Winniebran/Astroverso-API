import { Router } from "express";
import {
  createExtrasController,
  deleteExtrasController,
  listExtrasController,
  updateExtrasController,
} from "../controllers/extras/createExtras.controller";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { isValidToUpdateMiddleware } from "../middlewares/isValidToUpdate.middleware";

export const extrasRouter = Router();

extrasRouter.post(
  "",
  AuthMiddleware,
  isAdmMiddleware,
  createExtrasController
);
extrasRouter.get("", listExtrasController);
extrasRouter.patch(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  isValidToUpdateMiddleware,
  updateExtrasController
);
extrasRouter.delete(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  deleteExtrasController
);
