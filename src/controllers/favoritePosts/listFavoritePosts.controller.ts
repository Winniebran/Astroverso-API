import { Request, Response } from "express";
import { createFavoritePostService } from "../../services/favoritePosts/listFavoritePosts.service";


export const createFavoritePostController = async (req: Request, res: Response) => {
    const favoriteData = req.body;
    const data = await createFavoritePostService(favoriteData);
    return res.status(201).json(data);
  };