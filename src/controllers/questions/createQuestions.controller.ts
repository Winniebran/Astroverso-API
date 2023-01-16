import { IQuestions } from "../../interfaces/questions";
import { Request, Response } from "express";
import createQuestionsService from "../../services/questions/createQuestions.service";

const createQuestionsController = async (req: Request, res: Response) => {
  const Questions: IQuestions = req.body;
  const [status, create] = await createQuestionsService(Questions);
  return res.status(status as number).json(create);
};

export default createQuestionsController;
