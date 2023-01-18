import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { AppError } from "../../errors/AppErrors";
import { Types } from "../../entities/type.entity";
import dataSource from "../../data-source";

export const typeIdIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const typeId: string = req.body.typesId;

  const uuid = yup.string().uuid();
  const validUuid = await uuid
    .validate(typeId)
    .then((res) => res)
    .catch((error) => {
      if (error instanceof yup.ValidationError) {
        throw new AppError(error.message, 404);
      }
    });

  const typeRepository = dataSource.getRepository(Types);
  const typeFound = await typeRepository.findOneBy({
    id: typeId,
  });

  if (!typeFound) {
    throw new AppError("Type not found", 404);
  }
  next();
};
