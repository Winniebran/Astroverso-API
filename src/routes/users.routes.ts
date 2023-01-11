import { Router } from "express";
import { createUsersController } from "../controllers/user/createUsers.controller";
import { listUsersController } from "../controllers/user/listUsers.controller";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { createUsersSchema } from "../schemas/users.schema";

export const usersRouter = Router();

usersRouter.post(
  "",
  dataIsValidMiddleware(createUsersSchema),
  createUsersController
);

usersRouter.get("", listUsersController) //falta middlewares