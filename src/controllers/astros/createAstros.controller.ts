import { Request, Response } from "express";
import { IAstrosRequest } from "../../interfaces/astros";
import { createAstrosService } from "../../services/astros/createAstros.service";

export const createAstrosController = async (req: Request, res: Response) => {
	const astro: IAstrosRequest = req.body;
	const newAstro = await createAstrosService(astro);
	return res.status(201).json(newAstro);
};
