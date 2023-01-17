import dataSourceConfig from "../../data-source";
import { Favorite_Posts } from "../../entities/favorite_posts.entity";

export const listFavoritePostService = async () => {
  const favoritePostsRepository =
    dataSourceConfig.getRepository(Favorite_Posts);

  const returnAllPosts = favoritePostsRepository.find({
    relations: {
      posts: {
        categories: true,
        astros: true,
      },
      users: true,
    },
  });

  return returnAllPosts;
};
