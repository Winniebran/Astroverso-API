import { listPostsFromCategoryService } from "./../../services/posts/listPostFromCategory.service";
import { Request, Response } from "express";

export const listPostsFromCategoryController = async (
  req: Request,
  res: Response
) => {
  const categoryId: string = req.params.id;
  const postsFromCategory = await listPostsFromCategoryService(categoryId);

  return res.status(200).json(postsFromCategory);
};
