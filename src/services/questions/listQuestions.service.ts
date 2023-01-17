import dataSourceConfig from "../../data-source";

import { Questions } from "../../entities/questions.entity";
import { IQuestionsResponse } from "../../interfaces/questions";
import { listQuestionsWithoutOptions } from "../../schemas/questions.schema"

const listQuestionsService = async (): Promise<IQuestionsResponse[] | undefined> => {

    const repository = dataSourceConfig.getRepository(Questions);
    const querys = await repository.find();
  
    const listQuerys = await listQuestionsWithoutOptions.validate( querys, { stripUnknown: true })
  
    return listQuerys;
};
  
export default listQuestionsService;

  