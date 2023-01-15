import { Router } from "express";
import { createTypesController, deleteTypesController, listTypesController, updateTypesController } from "../controllers/types/listTypes.controller";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { isValidToUpdateMiddleware } from "../middlewares/isValidToUpdate.middleware";

export const typesRouter = Router();

typesRouter.post(
    "",
    AuthMiddleware,
    isAdmMiddleware,
    createTypesController
  );
  typesRouter.get("", listTypesController);
  typesRouter.patch(
    "/:id",
    AuthMiddleware,
    isAdmMiddleware,
    isValidToUpdateMiddleware,
    updateTypesController
  );
  typesRouter.delete(
    "/:id",
    AuthMiddleware,
    isAdmMiddleware,
    deleteTypesController
  );


