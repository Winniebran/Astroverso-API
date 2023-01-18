import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";

import { Questions } from "../../entities/questions.entity";

const getQuestionOptionsService = async (quesionId: string): Promise<any> => {
  const repository = dataSourceConfig.getRepository(Questions);

  const verifyQuestion = await repository.findOneBy({
    id: quesionId,
  });

  if (!verifyQuestion) {
    throw new AppError('Pergunta não encontrada', 404);
  }

  const options = await repository.findOne({
    where: {id: quesionId}, relations: { options: true }
  })

  return options;
};

export default getQuestionOptionsService;