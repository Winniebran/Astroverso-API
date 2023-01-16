import { IPosts } from "./../../interfaces/posts/index";
import { createPostService } from "./../../services/posts/createPosts.service";
import { Request, Response } from "express";

export const createPostController = async (req: Request, res: Response) => {
  const postData: IPosts = req.body;
  const newPost = await createPostService(postData);

  return res.status(201).json(newPost);
};
