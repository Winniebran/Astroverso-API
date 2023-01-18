import { Request, Response } from "express";
import { ITypes } from "../../interfaces/types";
import { updateTypesService } from "../../services/types/updateTypes.service";

export const updateTypesController = async (req: Request, res: Response) => {
  const updateId: string = req.params.id;
  const newData: ITypes = req.body;
  const extras = await updateTypesService(newData, updateId);
  return res.status(200).json(extras);
};
