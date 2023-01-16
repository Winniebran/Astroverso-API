import { Request, Response } from "express";
import { deletePostService } from "../../services/posts/deletePost.service";

export const deletePostController = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  await deletePostService(postId);

  return res.status(204).json();
};
