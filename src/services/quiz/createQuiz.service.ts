import { IQuizzes, IQuizzesResponse } from "../../interfaces/quizzes";
import dataSourceConfig from "../../data-source";
import { Quizzes } from "../../entities/quizzes.entity";
import { AppError } from "../../errors/AppErrors";

export const createQuizService = async (
  quizData: IQuizzes
): Promise<IQuizzesResponse> => {
  const { name } = quizData;
  const quizRepository = dataSourceConfig.getRepository(Quizzes);

  const quizExist = await quizRepository.findOneBy({ name: name });

  if (!quizExist) {
    const quiz = quizRepository.create(quizData);
    await quizRepository.save(quiz);
    return quiz;
  }
  throw new AppError("Quiz already exists", 409);
};
