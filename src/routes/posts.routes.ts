import { ensureAstroExistsInPostsMiddleware } from "./../middlewares/posts/ensureAstroExists.middleware";
import { idIsValidMiddleware } from "./../middlewares/IdIsValid.middleware";
import { Router } from "express";
import { isAdmMiddleware } from "./../middlewares/isAdm.middleware";

import { listPostsFromAstroController } from "./../controllers/posts/listPostsFromAstro.controller";
import { createPostController } from "./../controllers/posts/createPosts.controller";
import { listPostsFromCategoryController } from "./../controllers/posts/listPostsFromCategory.controller";
import { listAllPostsController } from "./../controllers/posts/listAllPosts.controller";
import { deletePostController } from "../controllers/posts/deletePost.controller";

import { ensureAstrosExistsMiddleware } from "./../middlewares/astros/ensureAstrosExists.middleware";
import { ensureCategoriesExistsMiddleware } from "./../middlewares/categories/ensureCategoriesExists.middleware";
import { updatePostController } from "./../controllers/posts/updatePost.controller";
import { AuthMiddleware } from "./../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "./../middlewares/dataIsValid.middleware";
import { postsRequestSchema } from "./../schemas/posts.schema";
import { ensureCategoryExistsInPostsMiddleware } from "../middlewares/posts/ensureCategoryExists.middleware";

export const postsRouter = Router();

postsRouter.post(
  "",
  AuthMiddleware,
  isAdmMiddleware,
  dataIsValidMiddleware(postsRequestSchema),
  idIsValidMiddleware,
  ensureCategoryExistsInPostsMiddleware,
  ensureAstroExistsInPostsMiddleware,
  createPostController
);

postsRouter.get("", listAllPostsController);

postsRouter.get(
  "/category/:id",
  idIsValidMiddleware,
  ensureCategoriesExistsMiddleware,
  listPostsFromCategoryController
);

postsRouter.get(
  "/astro/:id",
  idIsValidMiddleware,
  ensureAstrosExistsMiddleware,
  listPostsFromAstroController
);

postsRouter.patch(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
  updatePostController
);

postsRouter.delete(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
  deletePostController
);
