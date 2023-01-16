import dataSourceConfig from "../../data-source";
import { Questions } from "../../entities/questions.entity";
import { IQuestions } from "../../interfaces/questions";
import { QuestionSchema } from "../../schemas/questions.schema";

const listQuestionsService = async (): Promise<IQuestions> => {

    const repository = dataSourceConfig.getRepository(Questions);
    const querys = await repository.find();
  
    const listQuerys = await QuestionSchema.validate( querys, { stripUnknown: true })
  
    return listQuerys;
};
  
export default listQuestionsService;
  