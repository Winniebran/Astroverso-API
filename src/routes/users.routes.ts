import { Router } from "express";
import { createUsersController } from "../controllers/user/createUsers.controller";

export const usersRouter = Router();

usersRouter.post(
  "",
  createUsersController
);
