import { NextFunction, Request, Response } from "express";
import DataSource from "../../data-source";
import { Questions } from "../../entities/questions.entity";
import { AppError } from "../../errors/AppErrors";
import { IOptions } from "../../interfaces/options";

export const verifyOptionsLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: IOptions = req.body;
    const myTable = DataSource.getRepository(Questions);

    const questions = await myTable.findOneBy({ id: data.questionsId });

    if (questions?.options?.length === 4) {
      throw new AppError("Maximum number of options must be equal to 4");
    }

    next();
  } catch (error) {
    throw new AppError(error as string);
  }
};
