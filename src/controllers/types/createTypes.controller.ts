import { Request, Response } from "express";
import { ITypes } from "../../interfaces/types";
import { createTypesService } from "../../services/types/createTypes.service";

export const createTypesController = async (req: Request, res: Response) => {
    const types: ITypes = req.body;
    const data = await createTypesService(types);
    return res.status(201).json(data);
};