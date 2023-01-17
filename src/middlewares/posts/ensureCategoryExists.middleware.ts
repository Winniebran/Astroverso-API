import dataSourceConfig from "../../data-source";
import * as yup from "yup";
import { AppError } from "./../../errors/AppErrors";
import { Request, Response, NextFunction } from "express";
import { Categories } from "./../../entities/categories.entity";

export const ensureCategoryExistsInPostsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.body.categoriesId;

  try {
    const uuid = yup.string().uuid();
    await uuid.validate(categoryId);

    const categoryRep = dataSourceConfig.getRepository(Categories);

    const categoryFound = await categoryRep.findOneBy({
      id: categoryId,
    });

    if (!categoryFound) {
      throw new AppError("Category not found!", 404);
    }

    next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new AppError(error.message, 404);
    }
  }
};
