import { Request, Response } from "express";
import getQuestionOptionsService from "../../services/questions/getQuestionOptions.service";

const getQuestionOptionsController = async (req: Request, res: Response) => {
  const options = await getQuestionOptionsService(req.params.id);
  return res.json(options);
};

export default getQuestionOptionsController;