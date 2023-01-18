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

    const questions = await myTable
      .createQueryBuilder("questions")
      .innerJoinAndSelect("schedule.options", "options")
      .where("questions.id = :id", { id: data.questionsId })
      .getMany();

    if (questions.length === 4) {
      throw new AppError("Maximum number of options must be equal to 4");
    }

    next();
  } catch (error) {
    throw new AppError(error as string);
  }
};
