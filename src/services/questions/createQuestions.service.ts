import  DataSource  from "../../data-source";
import { Questions } from "../../entities/questions.entity";
import { IQuestions } from "../../interfaces/questions";
import { Users } from "../../entities/users.entity";

const createQuestionsService = async (data: IQuestions): Promise<Array<Questions | number | string | {}>> => {

    const repository = DataSource.getRepository(Questions);
    
    const query = repository.create(data);
  
    await repository.save(query);
  
    const {...newData} = query
  
    return [201, newData];
  };

export default createQuestionsService