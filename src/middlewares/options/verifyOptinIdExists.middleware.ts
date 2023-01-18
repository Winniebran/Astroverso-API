import { Response, Request, NextFunction } from "express";
import DataSource from "../../data-source";
import { Options } from "../../entities/options.entity";
import { AppError } from "../../errors/AppErrors";

export const verifyOptionsExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const myTable = DataSource.getRepository(Options);

    const verify = myTable.findOneBy({
      id: req.body.id,
    });

    if (!verify) {
      throw new AppError("Option id not exists");
    }

    next();
  } catch (error) {
    throw new AppError(error as string);
  }
};
