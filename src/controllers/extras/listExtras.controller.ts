import { Request, Response } from "express";
import { listExtrasService } from "../../services/extras/listExtras.service";

export const listExtrasController = async (req: Request, res: Response) => {
    const extras = await listExtrasService();
    return res.status(200).json(extras);
};
  