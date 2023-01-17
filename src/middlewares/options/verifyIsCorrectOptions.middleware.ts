import { IOptions } from "../../interfaces/options";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppErrors";
import { object } from "yup";

const verifyCorrectOptionsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: IOptions = req.body;

    if (data.point === 0 && data.isCorrect === true) {
      throw new AppError("Correct answer must have a score equal to 2");
    }

    if (data.point === 2 && data.isCorrect === false) {
      throw new AppError("Incorrect answer must have a score equal to 0");
    }

    if (data.point !== 0 && data.point !== 2) {
      throw new AppError("the score must be equal to 0 or 2");
    }

    if (data.point === 0 && !data.hasOwnProperty("isCorrect")) {
      req.body.isCorrect === false;
    }

    next();
  } catch (error) {
    throw new AppError(error as string);
  }
};

export default verifyCorrectOptionsMiddleware;
