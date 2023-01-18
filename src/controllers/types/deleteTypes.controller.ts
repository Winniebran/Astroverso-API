import { Request, Response } from "express";
import deleteTypesService from "../../services/types/deleteTypes.service";

export const deleteTypesController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const extrasData = await deleteTypesService(id);
  return res.status(204).json(extrasData);
};
