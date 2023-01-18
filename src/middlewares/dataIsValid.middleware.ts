import { Request, Response, NextFunction } from "express";
import { AnySchema, ValidationError } from "yup";

export const dataIsValidMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.body = validatedData;

      return next();
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.errors });
      }
    }
  };
