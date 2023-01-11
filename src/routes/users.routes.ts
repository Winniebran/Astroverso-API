import { Router } from "express";
import { createUsersController } from "../controllers/user/createUsers.controller";
import { deleteUsersController } from "../controllers/user/deleteUsers.controller";
import { listUsersController } from "../controllers/user/listUsers.controller";
import { updateUsersController } from "../controllers/user/updateUsers.controller";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { createUsersSchema, updateUsersSchema } from "../schemas/users.schema";

export const usersRouter = Router();

usersRouter.post(
  "",
  dataIsValidMiddleware(createUsersSchema),
  createUsersController
);

usersRouter.get("", listUsersController) //faltam middlewares

usersRouter.get("/:id/score") 

usersRouter.get("/:id/favoritePosts") 

usersRouter.patch("/:id", dataIsValidMiddleware(updateUsersSchema), updateUsersController) //faltam middlewares

usersRouter.delete("/:id", deleteUsersController) //faltam middlewares
