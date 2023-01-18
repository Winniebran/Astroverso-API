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
    select: {
      id: true,
      name: true,
      email: true,
      score: true,
      isAdm: true,
      isActive: true,
      createdAt: true,
      deletedAt: true,
      updatedAt: true,
    },
  });

  return returnAllPosts;
};
