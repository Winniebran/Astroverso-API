import dataSourceConfig from "../../data-source";

import { AppError } from "../../errors/AppErrors";

import { Questions } from "../../entities/questions.entity";
import { IQuestions, IQuestionsResponse } from "../../interfaces/questions";
import { QuestionsWithoutOptions } from "../../schemas/questions.schema";

export const createQuestionsService = async (
  data: IQuestions
): Promise<IQuestionsResponse> => {
  const { question } = data;
  const repository = dataSourceConfig.getRepository(Questions);

  const questionExist = await repository.findOneBy({ question: question });

  if (!questionExist) {
    const query = repository.create(data);
    await repository.save(query);
    const newQuestion = await QuestionsWithoutOptions.validate(query, {
      stripUnknown: true,
    });

    return newQuestion;
  }

  throw new AppError("Question already exists!", 409);
};
