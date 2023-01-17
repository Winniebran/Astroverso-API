import dataSourceConfig from "../../data-source";
import { Users } from "../../entities/users.entity";

export const listFavoritePostService = async (): Promise<Users[]> => {
  const usersRepository = dataSourceConfig.getRepository(Users);

  const returnAllPosts = await usersRepository.find({
    relations: {
      favorite_posts: {
        posts: {
          astros: true,
          categories: true,
        },
      },
    },
  });

  return returnAllPosts;
};
