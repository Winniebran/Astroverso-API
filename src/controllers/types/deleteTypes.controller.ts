import { Request, Response } from "express";
import deleteTypesService from "../../services/types/deleteTypes.service";

export const deleteTypesController = async (req: Request, res: Response) => {
    const extrasData = await deleteTypesService(req.params.id);
    return res.status(204).json(extrasData);
};