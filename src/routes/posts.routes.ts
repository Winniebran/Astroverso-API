import { ensureAstrosExistsMiddleware } from './../middlewares/astros/ensureAstrosExists.middleware';
import { ensureCategoriesExistsMiddleware } from './../middlewares/categories/ensureCategoriesExists.middleware';
import { updatePostController } from './../controllers/posts/updatePost.controller';
import { isAdmMiddleware } from './../middlewares/isAdm.middleware';
import { AuthMiddleware } from './../middlewares/authentication.middleware';
import { listPostsFromAstroController } from './../controllers/posts/listPostsFromAstro.controller';
import { createPostController } from './../controllers/posts/createPosts.controller';
import { postsRequestSchema } from './../schemas/posts.schema';
import { dataIsValidMiddleware } from './../middlewares/dataIsValid.middleware';
import { listPostsFromCategoryController } from './../controllers/posts/listPostsFromCategory.controller';
import { listAllPostsController } from './../controllers/posts/listAllPosts.controller';
import { Router } from 'express';
import { deletePostController } from '../controllers/posts/deletePost.controller';

export const postsRouter = Router();

postsRouter.post(
  '',
  AuthMiddleware,
  isAdmMiddleware,
  dataIsValidMiddleware(postsRequestSchema),
  createPostController
);
postsRouter.get('', listAllPostsController);
postsRouter.get(
  '/category/:id',
  ensureCategoriesExistsMiddleware,
  listPostsFromCategoryController
);
postsRouter.get(
  '/astro/:id',
  ensureAstrosExistsMiddleware,
  listPostsFromAstroController
);
postsRouter.patch(
  '/:id',
  AuthMiddleware,
  isAdmMiddleware,
  updatePostController
);
postsRouter.delete(
  '/:id',
  AuthMiddleware,
  isAdmMiddleware,
  deletePostController
);
// postsRouter.get('/users/:id');
