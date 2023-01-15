import { Request, Response } from "express";
import { listQuestionQuizService } from "../../services/quiz/listQuestionQuiz.service";

export const listQuestionQuizController = async (
  req: Request,
  res: Response
) => {
  const listQuestionsQuizzes = await listQuestionQuizService(req.params.id);
  return res.status(201).json(listQuestionsQuizzes);
};
