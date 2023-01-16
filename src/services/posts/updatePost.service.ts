import { IPostsUpdate, IPostsResponse } from "./../../interfaces/posts/index";
import { AppError } from "./../../errors/AppErrors";
import { Posts } from "./../../entities/posts.entity";
import setDataSourceConfig from "../../data-source";

export const updatePostsService = async (
  postId: string,
  postData: IPostsUpdate
): Promise<IPostsResponse> => {
  const postRep = setDataSourceConfig.getRepository(Posts);

  const postFound = await postRep.findOneBy({
    id: postId,
  });

  if (!postFound) {
    throw new AppError("Post not found!", 404);
  }

  const updatedPost = postRep.create({
    ...postFound,
    ...postData,
  });

  await postRep.save(updatedPost);

  return updatedPost;
};
