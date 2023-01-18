import { Request, Response } from "express";
import { IOptions } from "../../interfaces/options";
import { createOptionsService } from "../../services/options/createOptions.service";

export const createOptionsController = async (req: Request, res: Response) => {
  const reqData: IOptions = req.body;
  const data = await createOptionsService(reqData);
  return res.status(201).json(data);
};
