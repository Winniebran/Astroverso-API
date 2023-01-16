import { Request, Response } from "express";
import { IQuestions } from "../../interfaces/questions";
import createQuestionsService from "../../services/questions/createQuestions.service";

const createQuestionsController = async(req: Request, res: Response) =>{
    const Questions: IQuestions = req.body
    const createQuestion = await createQuestionsService(Questions)
    return res.status(201).json(createQuestion)
}

export default createQuestionsController;