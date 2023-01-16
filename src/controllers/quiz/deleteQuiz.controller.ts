import { Request, Response } from "express";
import { deleteQuizService } from "../../services/quiz/deleteQuiz.service";

export const deleteQuizController = async (req: Request, res: Response) => {
  await deleteQuizService(req.params.id);
  return res.status(201).json();
};
