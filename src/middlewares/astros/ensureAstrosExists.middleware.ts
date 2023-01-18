import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Astros } from "../../entities/astros.entity";
import { NextFunction, Request, Response } from "express";

export const ensureAstrosExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const astrosRepository = dataSourceConfig.getRepository(Astros);

  const foundAstro = await astrosRepository.findOneBy({
    id: req.params.id,
  });

  if (!foundAstro) {
    throw new AppError("Astro not found", 404);
  }

  req.params.id = foundAstro.id;

  return next();
};
