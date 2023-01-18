import { Request, Response } from "express";
import { deleteExtrasService } from "../../services/extras/deleteExtras.service";

export const deleteExtrasController = async (req: Request, res: Response) => {
  const extrasId: string = req.params.id;
  const extrasData = await deleteExtrasService(extrasId);
  return res.status(204).json(extrasData);
};
