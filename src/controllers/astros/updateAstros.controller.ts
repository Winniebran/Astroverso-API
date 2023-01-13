import { Request, Response } from "express";
import { IAstrosResponse } from "../../interfaces/astros";
import { updateAstrosService } from "../../services/astros/updateAstros.service";

export const updateAstrosController = async (req: Request, res: Response) => {
	const astroData: IAstrosResponse = req.body;
	const updatedAstro = await updateAstrosService(astroData);

	return res.status(200).json(updatedAstro);
};
