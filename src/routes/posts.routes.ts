import { listPostsFromAstroController } from './../controllers/posts/listPostsFromAstro.controller';
import { createPostController } from './../controllers/posts/createPosts.controller';
import { postsRequestSchema } from './../schemas/posts.schema';
import { dataIsValidMiddleware } from './../middlewares/dataIsValid.middleware';
import { listPostsFromCategoryController } from './../controllers/posts/listPostsFromCategory.controller';
import { listAllPostsController } from './../controllers/posts/listAllPosts.controller';
import { Router } from 'express';

export const postsRouter = Router();

postsRouter.post(
  '',
  dataIsValidMiddleware(postsRequestSchema),
  createPostController
);
postsRouter.get('', listAllPostsController);
postsRouter.get('/category/:id', listPostsFromCategoryController);
postsRouter.get('/astro/:id', listPostsFromAstroController);
// postsRouter.get('/users/:id');
