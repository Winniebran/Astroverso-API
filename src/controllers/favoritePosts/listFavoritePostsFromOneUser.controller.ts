import { Request, Response } from "express";
import { listFavoritePostFromOneUserService } from "../../services/favoritePosts/listFavoritePostsFromOneUser.service";

export const listFavoritePostFromOneUserController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const FavoritePostsData = await listFavoritePostFromOneUserService(id);
  return res.json(FavoritePostsData);
};
