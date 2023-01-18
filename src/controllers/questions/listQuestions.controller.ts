import { Request, Response } from "express";
import { listQuestionsService } from "../../services/questions/listQuestions.service";

export const listQuestionsController = async (req: Request, res: Response) => {
  const listQuestions = await listQuestionsService();
  return res.json(listQuestions);
};
