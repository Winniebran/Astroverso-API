import { Request, Response } from "express";
import { listFavoritePostService } from "../../services/favoritePosts/listFavoritePosts.service";

export const listFavoritePostController = async (
  req: Request,
  res: Response
) => {
  const FavoritePostsData = await listFavoritePostService();
  return res.json(FavoritePostsData);
};