import { Request, Response } from "express";
import { deleteQuestionsService } from "../../services/questions/deleteQuestions.service";

export const deleteQuestionsController = async (
  req: Request,
  res: Response
) => {
  const deleteQuestion = await deleteQuestionsService(req.params.id);
  return res.status(204).json(deleteQuestion);
};
