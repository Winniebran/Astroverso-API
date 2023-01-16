import { Posts } from "./../../entities/posts.entity";
import dataSourceConfig from "../../data-source";

export const listPostsFromAstroService = async (astroId: string) => {
  const postsRep = dataSourceConfig.getRepository(Posts);

  const posts = await postsRep.find({
    relations: {
      astros: true,
      categories: true,
    },
    where: {
      astros: {
        id: astroId,
      },
    },
  });

  return posts;
};
