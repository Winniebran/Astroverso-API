import dataSource from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Questions } from "../../entities/questions.entity";
import { IQuestionsEdit } from "../../interfaces/questions";


const editQuestionsService = async (data: IQuestionsEdit, QuestionID: string, isAdm: boolean) => {

    const {question} = data

    const repository = dataSource.getRepository(Questions)
    const findQuestion = await repository.findOneBy({id: QuestionID})

    if(!findQuestion){
        throw new AppError('Pergunta não encontrada')
    }

    if(!isAdm){
        throw new AppError('Permission adm is necessary', 409)
    }

    const editQuestion = repository.create({
        ...findQuestion,
        question: question || findQuestion.question
    })

    await repository.save(editQuestion)

    return editQuestion
};

export default editQuestionsService;