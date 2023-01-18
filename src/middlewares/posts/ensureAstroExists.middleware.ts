import dataSourceConfig from "../../data-source";
import * as yup from "yup";
import { AppError } from "../../errors/AppErrors";
import { Request, Response, NextFunction } from "express";
import { Astros } from "../../entities/astros.entity";

export const ensureAstroExistsInPostsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const astroId = req.body.astrosId;

  const uuid = yup.string().uuid();
  await uuid
    .validate(astroId)
    .then((res) => res)
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        throw new AppError("Astro id is not a valid uuid", 404);
      }
    });

  const astroRep = dataSourceConfig.getRepository(Astros);

  const astroFound = await astroRep.findOneBy({
    id: astroId,
  });

  if (!astroFound) {
    throw new AppError("Astro not found!", 404);
  }

  next();
};
