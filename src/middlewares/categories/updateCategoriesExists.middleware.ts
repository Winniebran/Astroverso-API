import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { NextFunction, Request, Response } from "express";
import { Categories } from "../../entities/categories.entity";

export const updateCategoriesExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoriesRepository = dataSourceConfig.getRepository(Categories);

  const foundCategory = await categoriesRepository.findOneBy({
    id: req.params.id,
  });

  if (!foundCategory) {
    throw new AppError("Category not found", 404);
  }

  const updatedCategory = categoriesRepository.create({
    ...foundCategory,
    name: req.body.name,
  });

  req.body = updatedCategory;

  return next();
};
