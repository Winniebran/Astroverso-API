import { Request, Response } from "express";
import { deleteQuizService } from "../../services/quiz/deleteQuiz.service";

export const deleteQuizController = async (req: Request, res: Response) => {
  const id: string = req.params.id
  await deleteQuizService(id);
  return res.status(201).json();
};
