import { Request, Response } from "express";

import { deleteAstrosService } from "../../services/astros/deleteAstros.service";

export const deleteAstrosController = async (req: Request, res: Response) => {
	const astroId = req.params.id;
	await deleteAstrosService(astroId);
	return res.status(204).json();
};
