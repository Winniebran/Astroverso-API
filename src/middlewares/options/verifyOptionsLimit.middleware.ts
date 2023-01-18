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

    const questions = await myTable.findOne({
      where: {
        id: data.questionsId,
      },
      relations: {
        options: true,
      },
    });

    const options = questions?.options;

    if (options?.length! <= 3) {
      for (let i = 0; i < options?.length!; i++) {
        if (options![i].point === 2 && data.point === 2) {
          throw new AppError("Correct Answer already exists");
        }
        if (options![i].point >= data.point) {
          break;
        } else {
          throw new AppError(
            "Correct Answer already exists or must be submitted"
          );
        }
      }
    }

    if (options?.length === 4) {
      throw new AppError("Maximum number of options must be equal to 4");
    }

    next();
  } catch (error) {
    throw new AppError(error as string);
  }
};
