import { IOptions } from "../../interfaces/options/index";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppErrors";

export const verifyCorrectOptionsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: IOptions = req.body;

    if (data.point === 0 && data.isCorrect === true) {
      throw new AppError("Correct answer must have a score equal to 2");
    } else {
      req.body = { ...req.body, isCorrect: false };
    }

    if (data.point === 2 && data.isCorrect === false) {
      throw new AppError("Incorrect answer must have a score equal to 0");
    }

    if (data.point !== 0 && data.point !== 2) {
      throw new AppError("the score must be equal to 0 or 2");
    }

    next();
  } catch (error) {
    throw new AppError(error as string);
  }
};
