import { ITypes } from "../../interfaces/types";
import { createTypesService } from "../../services/types/createTypes.service";
import { Request, Response } from "express";
import { listTypesService } from "../../services/types/listTypes.service";
import deleteTypesService from "../../services/types/deleteTypes.service";
import { updateTypesService } from "../../services/types/updateTypes.service";

export const createTypesController = async (req: Request, res: Response) => {
  const types: ITypes = req.body;
  const data = await createTypesService(types);
  return res.status(201).json(data);
};

export const listTypesController = async (req: Request, res: Response) => {
  const types = await listTypesService();
  return res.status(200).json(types);
};

export const updateTypesController = async (req: Request, res: Response) => {
  const updateId: string = req.params.id;
  const newData: ITypes = req.body;
  const extras = await updateTypesService(newData, updateId);

  return res.status(200).json(extras);
};

export const deleteTypesController = async (req: Request, res: Response) => {
  const extrasData = await deleteTypesService(req.params.id);

  return res.status(204).json(extrasData);
};
