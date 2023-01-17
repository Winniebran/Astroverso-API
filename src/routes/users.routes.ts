import { Router } from "express";
import { createUsersController } from "../controllers/user/createUsers.controller";
import { deleteUsersController } from "../controllers/user/deleteUsers.controller";
import { listFavoritePostFromUserController } from "../controllers/user/listFavoritePostFromUser.controller";
import { listOneUserController } from "../controllers/user/listOneUser.controller";
import { listUsersController } from "../controllers/user/listUsers.controller";
import { updateUsersController } from "../controllers/user/updateUsers.controller";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { isSameUsersMiddleware } from "../middlewares/isSameUsers.middleware";
import { isValidToUpdateMiddleware } from "../middlewares/isValidToUpdate.middleware";
import { createUsersSchema, updateUsersSchema } from "../schemas/users.schema";

export const usersRouter = Router();

usersRouter.post(
  "",
  dataIsValidMiddleware(createUsersSchema),
  createUsersController
);

usersRouter.get("", AuthMiddleware, isAdmMiddleware, listUsersController);

usersRouter.get(
  "/:id",
  AuthMiddleware,
  idIsValidMiddleware,
  isSameUsersMiddleware,
  listOneUserController
);

usersRouter.patch(
  "/:id",
  AuthMiddleware,
  isValidToUpdateMiddleware,
  idIsValidMiddleware,
  isSameUsersMiddleware,
  dataIsValidMiddleware(updateUsersSchema),
  updateUsersController
);

usersRouter.delete(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
  deleteUsersController
);
