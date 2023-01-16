import { IPosts, IPostsResponse } from "./../../interfaces/posts/index";
import { Posts } from "./../../entities/posts.entity";
import dataSourceConfig from "../../data-source";

export const listAllPostsService = async (): Promise<IPostsResponse[]> => {
  const postsRep = dataSourceConfig.getRepository(Posts);
  const postsList = await postsRep.find({
    relations: {
      astros: true,
      categories: true,
    },
  });

  return postsList;
};
