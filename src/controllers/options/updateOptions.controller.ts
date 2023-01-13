import { Request, Response } from "express";
import { IupdateOption } from "../../interfaces/options";
import { updateOptionsService } from "../../services/options/updateOptionsService";

export const updateOptionsController = async (req: Request, res: Response) => {
  const optionBody: IupdateOption = req.body;
  const id: string = req.params.id;
  const data = updateOptionsService(optionBody, id);
  return res.status(200).json(data);
};
