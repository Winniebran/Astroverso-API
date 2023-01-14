import { listAllPostsService } from './../../services/posts/listAllPosts.service';
import { Request, Response } from 'express';

export const listAllPostsController = async (req: Request, res: Response) => {
  const postsList = await listAllPostsService();

  return res.status(200).json(postsList);
};
