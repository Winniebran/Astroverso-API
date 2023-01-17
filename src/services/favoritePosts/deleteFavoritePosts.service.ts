import { AppError } from "../../errors/AppErrors";
import setDataSourceConfig from "../../data-source";
import { Favorite_Posts } from "../../entities/favorite_posts.entity";

export const deleteFavoritePostsService = async (
  favoritePostId: string
): Promise<void> => {
  const favoritePostsRepository =
    setDataSourceConfig.getRepository(Favorite_Posts);

  const unlikedPost = await favoritePostsRepository.findOne({
    where: {
      id: favoritePostId,
    },
    relations: {
      posts: true,
      users: true,
    },
  });

  if (!unlikedPost) {
    throw new AppError("Like not found!", 404);
  }

  await favoritePostsRepository.delete(unlikedPost.id);
};
