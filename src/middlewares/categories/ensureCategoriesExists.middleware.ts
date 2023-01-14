import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { NextFunction, Request, Response } from "express";
import { Categories } from "../../entities/categories.entity";

export const ensureCategoriesExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const categoriesRepository = dataSourceConfig.getRepository(Categories);

	const foundCategory = await categoriesRepository.findOneBy({
		id: req.params.id
	});

	if (!foundCategory) {
		throw new AppError("Category not found", 404);
	}

	req.params.id = foundCategory.id;

	return next();
};
