import { Router } from "express";
import { loginController } from "../controllers/login/login.controller";

export const loginRouter = Router();

loginRouter.post("", loginController);
