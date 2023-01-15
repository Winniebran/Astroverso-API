import  DataSource  from "../../data-source";
import { Questions } from "../../entities/questions.entity";
import { IQuestions } from "../../interfaces/questions";
import { createUsersSchema } from "../../schemas/users.schema";

const listQuestionsService = async (): Promise<any> => {

    const repository = DataSource.getRepository(Questions);
    const querys = await repository.find();
  
    const listQuerys = await createUsersSchema.validate( querys, { stripUnknown: true })
  
    return listQuerys ;
  };
  
  export default listQuestionsService;

  