import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppErrors";

export const isValidToUpdateMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (
		req.body.isAdm !== undefined ||
		req.body.isActive !== undefined ||
		req.body.id !== undefined ||
		req.body.score !== undefined
	) {
		throw new AppError("Change not allowed", 401);
	}

	if (Object.values(req.body).includes("")) {
		throw new AppError("Invalid field(s)");
	}

	return next();
};
