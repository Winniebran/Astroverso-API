import dataSourceConfig from "../../data-source";
import { Questions } from "../../entities/questions.entity";

const deleteQuestionsService = async (questionId:string) => {

    const repository = dataSourceConfig.getRepository(Questions)

    const findQuestion = await repository.findOneBy({ id: questionId })
    
    if(!findQuestion){
        throw new Error('Id não encontrado')
    }

    await repository.delete(questionId);
};

export default deleteQuestionsService;