import { Router } from "express";
import { createUsersController } from "../controllers/user/createUsers.controller";
import { deleteUsersController } from "../controllers/user/deleteUsers.controller";
import { listUsersController } from "../controllers/user/listUsers.controller";
import { updateUsersController } from "../controllers/user/updateUsers.controller";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { createUsersSchema, updateUsersSchema } from "../schemas/users.schema";

export const usersRouter = Router();

usersRouter.post(
  "",
  dataIsValidMiddleware(createUsersSchema),
  createUsersController
);

usersRouter.get("", AuthMiddleware, isAdmMiddleware,  listUsersController)

usersRouter.get("/:id/score", isAdmMiddleware, AuthMiddleware) 

usersRouter.get("/:id/favoritePosts", isAdmMiddleware, AuthMiddleware) 

usersRouter.patch("/:id", AuthMiddleware, dataIsValidMiddleware(updateUsersSchema), updateUsersController) //falta middleware

usersRouter.delete("/:id", AuthMiddleware, isAdmMiddleware, deleteUsersController)
