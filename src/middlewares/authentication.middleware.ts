import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppErrors";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Invalid token", 401);
  }

  token = token.split(" ")[1];

  return jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.users = {
      id: decoded.sub,
      isAdm: decoded.isAdm
    };

    return next();
  });
};
