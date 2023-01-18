import { Astros } from "../../entities/astros.entity";
import { Categories } from "../../entities/categories.entity";
import { postsResponseSchema } from "../../schemas/posts.schema";
import { Posts } from "../../entities/posts.entity";
import dataSourceConfig from "../../data-source";
import { IPosts, IPostsResponse } from "../../interfaces/posts/index";
import { AppError } from "../../errors/AppErrors";

export const createPostService = async (
  postData: IPosts
): Promise<IPostsResponse> => {
  const postsRep = dataSourceConfig.getRepository(Posts);
  const categoryRep = dataSourceConfig.getRepository(Categories);
  const astrosRep = dataSourceConfig.getRepository(Astros);

  const astroFound = await astrosRep.findOneBy({
    id: postData.astrosId,
  });

  const categoryFound = await categoryRep.findOneBy({
    id: postData.categoriesId,
  });

  if (!astroFound) {
    throw new AppError("Astro not found", 404);
  }

  if (!categoryFound) {
    throw new AppError("Category not found", 404);
  }

  const postFound = await postsRep.findOneBy({
    description: postData.description,
  });

  if (postFound) {
    throw new AppError("Post already exists!", 409);
  }

  const newPost = postsRep.create({
    description: postData.description,
    astros: astroFound,
    categories: categoryFound,
  });

  await postsRep.save(newPost);

  return newPost;
};
