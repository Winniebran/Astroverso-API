import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppErrors";
import { Extras } from "../../entities/extras.entity";
import dataSource from "../../data-source";

export const ensureIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.params.id;
  const extrasRepository = dataSource.getRepository(Extras);
  const extrasFound = await extrasRepository.findOneBy({
    id,
  });

  if (!extrasFound) {
    throw new AppError("Id not found", 404);
  }
  next();
};
