import { Request, Response } from "express";
import { IQuizzesUpdate } from "../../interfaces/quizzes";
import { updateQuizService } from "../../services/quiz/updateQuiz.service";

export const updateQuizController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const quizData: IQuizzesUpdate = req.body;
  const updatedQuiz = await updateQuizService(id, quizData);
  return res.status(201).json(updatedQuiz);
};
