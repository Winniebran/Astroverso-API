import { Request, Response } from "express";
import { listTypesService } from "../../services/types/listTypes.service";

export const listTypesController = async (req: Request, res: Response) => {
  const types = await listTypesService();
  return res.status(200).json(types);
};
