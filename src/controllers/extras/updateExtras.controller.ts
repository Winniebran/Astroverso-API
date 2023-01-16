import { Request, Response } from "express";
import { IExtrasRequest } from "../../interfaces/extras";
import { updateExtrasService } from "../../services/extras/updateExtras.service";

export const updateExtrasController = async (req: Request, res: Response) => {
  const extraId: string = req.params.id;
  const extrasData: IExtrasRequest = req.body;
  const extras = await updateExtrasService(extraId, extrasData);
  return res.status(200).json(extras);
};
