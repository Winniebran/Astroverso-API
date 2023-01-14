import { Request, Response, NextFunction } from "express";
import { createOptionsService } from "../../services/options/createOptions.service";

const createOptionsController = async (req: Request, res: Response) => {
	const [status, data] = await createOptionsService(req.body);
	return res.status(status).json(data);
};

const getOptionsController = async (req: Request, res: Response) => {};

const updateOptionsController = async (req: Request, res: Response) => {};

const deleteOptionsController = async (req: Request, res: Response) => {};

export {
	createOptionsController,
	getOptionsController,
	updateOptionsController,
	deleteOptionsController
};
