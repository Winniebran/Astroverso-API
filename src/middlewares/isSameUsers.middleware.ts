import { Request, Response, NextFunction } from "express";
import dataSourceConfig from "../data-source";
import { Users } from "../entities/users.entity";
import { AppError } from "../errors/AppErrors";

export const isSameUsersMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = dataSourceConfig.getRepository(Users);

  const users = await userRepository.findOneBy({ id: req.params.id });

  if (req.users.id === users!.id || req.users.isAdm) {
    return next();
  }

  throw new AppError("You aren't authorized to complete this request", 403);
};
