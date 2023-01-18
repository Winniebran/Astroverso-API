import { IPostsUpdate } from "../../interfaces/posts/index";
import { updatePostsService } from "../../services/posts/updatePost.service";
import { Request, Response } from "express";

export const updatePostController = async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const postData: IPostsUpdate = req.body;

  const updatePost = await updatePostsService(postId, postData);

  return res.status(200).json(updatePost);
};
