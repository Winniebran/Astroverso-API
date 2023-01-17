import { Router } from "express";
import { createFavoritePostController } from "../controllers/favoritePosts/createFavoritePosts.controller";
import { deleteFavoritePostsController } from "../controllers/favoritePosts/deleteFavoritePosts.controller";
import { listFavoritePostController } from "../controllers/favoritePosts/listFavoritePosts.controller";
import { listFavoritePostFromOneUserController } from "../controllers/favoritePosts/listFavoritePostsFromOneUser.controller";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";
import { likedPostsSchema } from "../schemas/favoritePosts.schema";

export const favoritePostsRouter = Router();

favoritePostsRouter.post(
  "",
  AuthMiddleware,
  dataIsValidMiddleware(likedPostsSchema),
  createFavoritePostController
);

favoritePostsRouter.get("", AuthMiddleware, listFavoritePostController);

favoritePostsRouter.get(
  "/:id",
  AuthMiddleware,
  idIsValidMiddleware,
  listFavoritePostFromOneUserController
);

favoritePostsRouter.delete(
  "/:id",
  AuthMiddleware,
  idIsValidMiddleware,
  deleteFavoritePostsController
);
