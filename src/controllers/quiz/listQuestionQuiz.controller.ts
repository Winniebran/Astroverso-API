import { Request, Response } from "express";
import { listQuestionQuizService } from "../../services/quiz/listQuestionQuiz.service";

export const listQuestionQuizController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  const listQuestionsQuizzes = await listQuestionQuizService(id);
  return res.status(201).json(listQuestionsQuizzes);
};
