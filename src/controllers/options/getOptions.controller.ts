import { getOptionsSrvice } from "./../../services/options/getOptions.service";
import { Request, Response } from "express";

export const getOptionsController = async (req: Request, res: Response) => {
  const data = await getOptionsSrvice();
  return res.status(200).json(data);
};
