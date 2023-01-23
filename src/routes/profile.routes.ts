import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { profileUserController } from "../controllers/profile/profileUser.controller";

export const profileRouter = Router();

profileRouter.get("", AuthMiddleware, profileUserController);
