import { IExtras, IExtrasRequest } from "../../interfaces/extras"
import { createExtraService } from "../../services/extras/createExtras.service"
import { listExtrasService } from "../../services/extras/listExtras.service";
import { Request, Response } from "express";
import updateExtrasService from "../../services/extras/updateExtras.service";
import deleteExtrasService from "../../services/extras/deleteExtras.service";

export const createExtrasController = async (req: Request, res: Response) => {
    const extra: IExtras = req.body;
    const data = await createExtraService(extra);
    return res.status(201).json(data);
};

export const listExtrasController = async (req: Request, res: Response) => {
    const extras = await listExtrasService()
    return res.status(200).json(extras)
};

export const updateExtrasController = async (req: Request, res: Response) => {
    const extraId: string = req.params.id
    const extrasData: IExtrasRequest = req.body
    const extras = await updateExtrasService(extraId, extrasData)

    return res.status(200).json(extras)
};

export const deleteExtrasController = async (req: Request, res: Response) => {
    const extrasData = await deleteExtrasService(req.params.id)

    return res.status(204).json(extrasData)
};

