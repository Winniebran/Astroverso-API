import dataSourceConfig from "../../data-source";
import { Users } from "../../entities/users.entity";
import { AppError } from "../../errors/AppErrors";

export const listFavoritePostFromUserService = async (id: string) => {
  const userRepository = dataSourceConfig.getRepository(Users);

  const foundUser = await userRepository.findOneBy({ id: id });
  
  if (!foundUser) {
    throw new AppError("User not found", 404);
  }

  const favoritePosts = foundUser.favorite_posts; 
  if (favoritePosts !== undefined){
      await userRepository.save(foundUser.favorite_posts);
      return favoritePosts
  }

  throw new AppError("Favorite Post not found", 404);
};