import { Request, Response, NextFunction } from "express";
import dataSourceConfig from "../data-source";
import { Users } from "../entities/users.entity";
import { AppError } from "../errors/AppErrors";

export const isAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = dataSourceConfig.getRepository(Users);

  const user = await userRepository.findOneBy({ id: req.users.id });

  if (!user?.isAdm) {
    throw new AppError("Missing admin permissions.", 403);
  }

  return next();
};
