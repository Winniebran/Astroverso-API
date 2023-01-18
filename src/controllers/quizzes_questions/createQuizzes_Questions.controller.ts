import { Request, Response } from "express";
import { IQuizzes_QuestionsRequest } from "../../interfaces/quizzes_questions";
import { createQuizzes_QuestionsService } from "../../services/quizzes_questions/createQuizzes_Questions.service";

export const createQuizzes_QuestionsController = async (
  req: Request,
  res: Response
) => {
  const quizzes_QuestionsData: IQuizzes_QuestionsRequest = req.body;
  const newQuizzes_Questions = await createQuizzes_QuestionsService(
    quizzes_QuestionsData
  );
  return res.status(201).json(newQuizzes_Questions);
};
