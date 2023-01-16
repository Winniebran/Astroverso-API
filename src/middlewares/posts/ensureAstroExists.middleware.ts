import dataSourceConfig from "../../data-source";
import * as yup from "yup";
import { AppError } from "./../../errors/AppErrors";
import { Request, Response, NextFunction } from "express";
import { Astros } from "../../entities/astros.entity";

export const ensureAstroExistsInPostsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const astroId = req.body.astrosId;

  try {
    const uuid = yup.string().uuid();
    await uuid.validate(astroId);

    const astroRep = dataSourceConfig.getRepository(Astros);

    const astroFound = await astroRep.findOneBy({
      id: astroId,
    });

    if (!astroFound) {
      throw new AppError("Astro not found!", 404);
    }

    next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new AppError(error.message, 404);
    }
  }
};
