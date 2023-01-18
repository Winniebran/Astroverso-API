import { Posts } from "../../entities/posts.entity";
import dataSourceConfig from "../../data-source";

export const listPostsFromCategoryService = async (categoryId: string) => {
  const postsRep = dataSourceConfig.getRepository(Posts);

  const posts = await postsRep.find({
    relations: {
      astros: true,
      categories: true,
    },
    where: {
      categories: {
        id: categoryId,
      },
    },
  });

  return posts;
};
