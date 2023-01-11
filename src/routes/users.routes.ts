import { Router } from "express";
import { createUsersController } from "../controllers/user/createUsers.controller";
import { listUsersController } from "../controllers/user/listUsers.controller";
import { updateUsersController } from "../controllers/user/updateUsers.controller";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { createUsersSchema } from "../schemas/users.schema";

export const usersRouter = Router();

usersRouter.post(
  "",
  dataIsValidMiddleware(createUsersSchema),
  createUsersController
);

usersRouter.get("", listUsersController) //faltam middlewares

usersRouter.patch("/:id", updateUsersController) //faltam middlewares