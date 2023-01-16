import { listPostsFromAstroService } from "./../../services/posts/listPostsFromAstro.service";
import { Request, Response } from "express";

export const listPostsFromAstroController = async (
  req: Request,
  res: Response
) => {
  const astroId: string = req.params.id;
  const postsFromAstro = await listPostsFromAstroService(astroId);

  return res.status(200).json(postsFromAstro);
};
