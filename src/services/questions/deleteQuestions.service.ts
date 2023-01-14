import  DataSource  from "../../data-source";
import { Questions } from "../../entities/questions.entity";

const deleteQuestionsService = async (id:string) => {

    const repository = DataSource.getRepository(Questions)

    const findQuestion = await repository.findOneBy({ id: id })

    
    if(!findQuestion){
        throw new Error('Id não encontrado')
    } else if( findQuestion){
    }

   

    await repository.save(findQuestion)
  
    
};

export default deleteQuestionsService;