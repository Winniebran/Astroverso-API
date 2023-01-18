import { Request, Response } from "express";
import { IQuestionsEdit } from "../../interfaces/questions";
import { editQuestionsService } from "../../services/questions/editQuestions.service";

export const editQuestionsController = async (req: Request, res: Response) => {
  const data: IQuestionsEdit = req.body;
  const id: string = req.params.id;

  const editQuestion = await editQuestionsService(id, data);
  return res.status(200).json(editQuestion);
};
