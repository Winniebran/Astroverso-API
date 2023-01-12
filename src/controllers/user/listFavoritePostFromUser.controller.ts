import { Request, Response } from "express";
import { listFavoritePostFromUserService } from "../../services/user/listFavoritePostFromUser.service";

export const listFavoritePostFromUserController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const users = await listFavoritePostFromUserService(id);
  return res.json(users);
};
