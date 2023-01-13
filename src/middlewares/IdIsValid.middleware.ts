import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
import { AppError } from "../errors/AppErrors";

export const idIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uuid = yup.string().uuid();
    await uuid.validate(req.params.id);

    next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new AppError(error.message, 404);
    }
  }
};
