import dataSourceConfig from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppErrors";

export const listFavoritePostFromOneUserService = async (
  id: string
): Promise<Users | null> => {
  const usersRepository = dataSourceConfig.getRepository(Users);
  const findUser = await usersRepository.findOneBy({ id: id });
  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  const returnPostsFromUser = usersRepository.findOne({
    relations: {
      favorite_posts: {
        posts: {
          categories: true,
          astros: true,
        },
      },
    },
    where: {
      id: findUser.id,
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

  return returnPostsFromUser;
};
