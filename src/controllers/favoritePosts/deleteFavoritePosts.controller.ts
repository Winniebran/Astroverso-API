import { Request, Response } from "express";
import { deleteFavoritePostsService } from "../../services/favoritePosts/deleteFavoritePosts.service";

export const deleteFavoritePostsController = async (
  req: Request,
  res: Response
) => {
  const favoritePostId: string = req.params.id;
  await deleteFavoritePostsService(favoritePostId);
  return res.status(204).json();
};
