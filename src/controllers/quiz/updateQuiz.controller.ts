import { Request, Response } from "express";
import { updateQuizService } from "../../services/quiz/updateQuiz.service";

export const updateQuizController = async (req: Request, res: Response) => {
  const updatedQuiz = await updateQuizService(req.params.id, req.body);
  return res.status(201).json(updatedQuiz);
};
