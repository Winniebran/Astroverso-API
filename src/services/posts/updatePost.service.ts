import { Categories } from "./../../entities/categories.entity";
import { Astros } from "./../../entities/astros.entity";
import { IPostsUpdate, IPostsResponse } from "./../../interfaces/posts/index";
import { AppError } from "./../../errors/AppErrors";
import { Posts } from "./../../entities/posts.entity";
import setDataSourceConfig from "../../data-source";

export const updatePostsService = async (
  postId: string,
  postData: IPostsUpdate
): Promise<IPostsResponse> => {
  const postRep = setDataSourceConfig.getRepository(Posts);
  const astroRep = setDataSourceConfig.getRepository(Astros);
  const categoryRep = setDataSourceConfig.getRepository(Categories);

  const categoryFound = await categoryRep.findOneBy({
    id: postData.categoriesId,
  });

  const postFound = await postRep.findOneBy({
    id: postId,
  });

  const astroFound = await astroRep.findOneBy({
    id: postData.astrosId,
  });

  if (!postFound) {
    throw new AppError("Post not found!", 404);
  }

  const updatedPost = postRep.create({
    ...postFound,
    ...postData,
    astros: astroFound ? astroFound : postFound.astros,
    categories: categoryFound ? categoryFound : postFound.categories,
  });

  await postRep.save(updatedPost);

  return updatedPost;
};
