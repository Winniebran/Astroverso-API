import { IExtrasRequest } from "../../interfaces/extras";
import { createExtraService } from "../../services/extras/createExtras.service";
import { Request, Response } from "express";

export const createExtrasController = async (req: Request, res: Response) => {
  const extra: IExtrasRequest = req.body;
  const data = await createExtraService(extra);
  return res.status(201).json(data);
};