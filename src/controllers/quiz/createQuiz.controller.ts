import { Request, Response } from "express";
import { IQuizzes } from "../../interfaces/quizzes";
import { createQuizService } from "../../services/quiz/createQuiz.service";

export const createQuizController = async (req: Request, res: Response) => {
  const quizData: IQuizzes = req.body;
  const data = await createQuizService(quizData);
  return res.status(201).json(data);
};
