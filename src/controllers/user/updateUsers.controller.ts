import { Request, Response } from "express";
import { IUserUpdate } from "../../interfaces/user";
import { updateUsersService } from "../../services/user/updateUsers.service";

export const updateUsersController = async (req: Request, res: Response) => {
  const updateData: IUserUpdate = req.body;
  const id: string = req.params.id;
  const data = await updateUsersService(id, updateData);
  return res.status(200).json(data);
};