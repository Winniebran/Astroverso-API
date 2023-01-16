import { Request, Response } from "express";
import { deleteExtrasService } from "../../services/extras/deleteExtras.service";

export const deleteExtrasController = async (req: Request, res: Response) => {
    const extrasData = await deleteExtrasService(req.params.id);
    return res.status(204).json(extrasData);
};