import { Request, Response } from "express";
import { createQuizService } from "../../services/quiz/createQuiz.service";

export const createQuizController = async (req: Request, res: Response) => {
  const quizData = await createQuizService(req.body);
  return res.status(201).json(quizData);
};
