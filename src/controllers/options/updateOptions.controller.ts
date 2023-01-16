import { Request, Response } from "express";
import { IUpdateOption } from "../../interfaces/options";
import { updateOptionsService } from "../../services/options/updateOptions.service";

export const updateOptionsController = async (req: Request, res: Response) => {
	const optionBody: IUpdateOption = req.body;
	const id: string = req.params.id;
	const data = updateOptionsService(optionBody, id);
	return res.status(200).json(data);
};
