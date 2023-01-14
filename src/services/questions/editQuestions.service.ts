import  DataSource  from "../../data-source";
import { Questions } from "../../entities/questions.entity";
import { IQuestionsEdit } from "../../interfaces/questions";


const editQuestionsService = async (data: IQuestionsEdit, QuestionID: string, isAdm: boolean) => {

    const {question} = data

    const repository = DataSource.getRepository(Questions)
    const findQuestion = await repository.findOneBy({id: QuestionID})

    if(!findQuestion){
        throw new Error('Pergunta não encontrada')
    }

    if(!isAdm){
        throw new Error('Permission adm is necessary')
    }

    const editQuestion = repository.create({
        ...findQuestion,
        question: question || findQuestion.question,
    })

    await repository.save(editQuestion)

    return editQuestion
};

export default editQuestionsService;