import { Router } from "express";
import { createFavoritePostController } from "../controllers/favoritePosts/listFavoritePosts.controller";

export const favoritePostsRouter = Router();

favoritePostsRouter.post(
  "",
  createFavoritePostController
);