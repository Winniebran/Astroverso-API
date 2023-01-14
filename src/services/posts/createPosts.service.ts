import { AppError } from './../../errors/AppErrors';
import { Astros } from './../../entities/astros.entity';
import { Categories } from './../../entities/categories.entity';
import { postsResponseSchema } from './../../schemas/posts.schema';
import { Posts } from './../../entities/posts.entity';
import dataSourceConfig from '../../data-source';
import { IPosts, IPostsResponse } from './../../interfaces/posts/index';

export const createPostService = async (postData: IPosts): Promise<void> => {
  const postsRep = dataSourceConfig.getRepository(Posts);
  const categoryRep = dataSourceConfig.getRepository(Categories);
  const astrosRep = dataSourceConfig.getRepository(Astros);

  const astroFound = astrosRep.findOneBy({
    id: postData.astrosId,
  });

  const categoryFound = categoryRep.findOneBy({
    id: postData.categoriesId,
  });

  if (!astroFound) {
    throw new AppError('Astro not found', 404);
  }

  if (!categoryFound) {
    throw new AppError('Category not found', 404);
  }

  // const newPost = postsRep.create([{
  //     description: postData.description,
  //     astros: astroFound,
  //     categories: categoryFound,
  //   }]
  // );

  // await postsRep.save(newPost);

  // const validatedResponse = await postsResponseSchema.validate(newPost, {
  //   stripUnknown: true,
  // });

  // return newPost;
};
