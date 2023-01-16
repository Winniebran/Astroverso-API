import { IQuizzesResponse } from "../../interfaces/quizzes";
import dataSourceConfig from "../../data-source";
import { Quizzes } from "../../entities/quizzes.entity";

export const listQuizzesService = async (): Promise<IQuizzesResponse[]> => {
  const quizRepository = dataSourceConfig.getRepository(Quizzes);
  const quizzes = await quizRepository.find({
    withDeleted: true,
  });
  return quizzes;
};
