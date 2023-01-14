import { Request, Response } from "express";
import { listAstrosService } from "../../services/astros/listAstros.service";

export const listAstrosController = async (req: Request, res: Response) => {
	const astros = await listAstrosService();

	return res.status(200).json(astros);
};
