import { Router } from "express";
import { createFavoritePostController } from "../controllers/favoritePosts/listFavoritePosts.controller";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { likedPostsSchema } from "../schemas/favoritePosts.schema";

export const favoritePostsRouter = Router();

favoritePostsRouter.post(
  "",
  AuthMiddleware,
  dataIsValidMiddleware(likedPostsSchema),
  createFavoritePostController
);
