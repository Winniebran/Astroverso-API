import dataSource from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Questions } from "../../entities/questions.entity";

export const deleteQuestionsService = async (questionId: string) => {
  const repository = dataSource.getRepository(Questions);

  const findQuestion = await repository.findOneBy({ id: questionId });

  if (!findQuestion) {
    throw new AppError("Id não encontrado", 409);
  }

  await repository.delete(questionId);
};
