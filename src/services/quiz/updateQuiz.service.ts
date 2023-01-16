import { IQuizzesResponse, IQuizzesUpdate } from "../../interfaces/quizzes";
import dataSourceConfig from "../../data-source";
import { Quizzes } from "../../entities/quizzes.entity";
import { AppError } from "../../errors/AppErrors";

export const updateQuizService = async (
  id: string,
  quizDataUpdate: IQuizzesUpdate
): Promise<IQuizzesResponse> => {
  const quizRepository = dataSourceConfig.getRepository(Quizzes);

  const existQuiz = await quizRepository.findOneBy({ id: id });

  if (!existQuiz) {
    throw new AppError("Quiz not found", 409);
  }

  const updatedQuiz = quizRepository.create({
    ...existQuiz,
    ...quizDataUpdate,
  });
  await quizRepository.save(updatedQuiz);
  return updatedQuiz;
};
