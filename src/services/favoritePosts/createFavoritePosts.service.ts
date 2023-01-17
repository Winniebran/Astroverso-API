import dataSourceConfig from "../../data-source";
import { IFavoritePosts } from "../../interfaces/favoritePosts";
import { Posts } from "../../entities/posts.entity";
import { Users } from "../../entities/users.entity";
import { Favorite_Posts } from "../../entities/favorite_posts.entity";
import { AppError } from "../../errors/AppErrors";

export const createFavoritePostService = async (
  favoriteData: IFavoritePosts
) => {
  const userRepository = dataSourceConfig.getRepository(Users);
  const postsRepository = dataSourceConfig.getRepository(Posts);
  const favoritePostsRepository =
    dataSourceConfig.getRepository(Favorite_Posts);

  const findUsers = await userRepository.findOneBy({
    id: favoriteData.usersId,
  });

  if (!findUsers) {
    throw new AppError("User not found", 404);
  }

  const findPosts = await postsRepository.findOneBy({
    id: favoriteData.postsId,
  });

  if (!findPosts) {
    throw new AppError("Posts not found", 404);
  }

  const postAlreadyLiked = await favoritePostsRepository.findOne({
    relations: {
      posts: true,
      users: true,
    },
    where: {
      posts: {
        id: findPosts.id,
      },
      users: {
        id: findUsers.id,
      },
    },
  });

  if (postAlreadyLiked) {
    throw new AppError("Post has already been liked", 409);
  }

  const likedPost = favoritePostsRepository.create({
    users: findUsers,
    posts: findPosts,
  });
  await favoritePostsRepository.save(likedPost);

  const returnAllPosts = favoritePostsRepository.find({
    relations: {
      posts: true,
      users: true,
    },
    where: {
      users: {
        id: findUsers.id,
      },
    },
    select: {
      users: {
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
    },
  });

  return returnAllPosts;
};
