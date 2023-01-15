import { Request, Response } from "express";
import { listOneUserService } from "../../services/user/listOneUser.service";

export const listOneUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const users = await listOneUserService(id);
  return res.json(users);
};
