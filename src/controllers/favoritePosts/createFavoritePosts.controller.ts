import { Request, Response } from "express";
import { IFavoritePosts } from "../../interfaces/favoritePosts";
import { createFavoritePostService } from "../../services/favoritePosts/createFavoritePosts.service";

export const createFavoritePostController = async (
  req: Request,
  res: Response
) => {
  const favoriteData: IFavoritePosts = req.body;
  const newFavoriteData = await createFavoritePostService(favoriteData);
  return res.status(201).json(newFavoriteData);
};
