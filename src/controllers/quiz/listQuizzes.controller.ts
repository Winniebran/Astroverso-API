import { Request, Response } from "express";
import { listQuizzesService } from "../../services/quiz/listQuizzes.service";

export const listQuizzesController = async (req: Request, res: Response) => {
  const listQuizzes = await listQuizzesService();
  return res.status(201).json(listQuizzes);
};
