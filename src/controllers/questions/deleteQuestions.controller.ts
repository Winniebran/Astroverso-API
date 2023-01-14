import { Request, Response } from "express";
import deleteQuestionsService from "../../services/questions/deleteQuestions.service";


const deleteQuestionsController = async(req: Request, res: Response) =>{
    const isAdm = req.body
    const deleteQuestion = await deleteQuestionsService(req.params.id)
    return res.status(204).json(deleteQuestion)
}

export default deleteQuestionsController;