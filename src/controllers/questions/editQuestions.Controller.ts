import { Request, Response } from "express";
import { IQuestionsEdit } from "../../interfaces/questions";
import editQuestionsService from "../../services/questions/editQuestions.service";

const editQuestionsController = async(req: Request, res: Response) =>{
    const isAdm = req.body.isAdm
    const newData : IQuestionsEdit = req.body
    const id = req.params.id

    const editQuestion = await editQuestionsService(newData, id, isAdm)
    return res.json(editQuestion)
}

export default editQuestionsController;