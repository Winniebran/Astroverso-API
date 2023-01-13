import { Request, Response } from "express";
import { deleteOptionService } from "../../services/options/deleteOptionService";

export const deleteOptionController = async (req: Request, res: Response) => {
  const optionId: string = req.params.id;
  const data = deleteOptionService(optionId);
  return res.status(201).json(data);
};
