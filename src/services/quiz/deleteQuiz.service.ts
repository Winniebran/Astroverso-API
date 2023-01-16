import dataSourceConfig from "../../data-source";
import { Quizzes } from "../../entities/quizzes.entity";
import { AppError } from "../../errors/AppErrors";

export const deleteQuizService = async (id: string) => {
  const quizRepository = dataSourceConfig.getRepository(Quizzes);
  const existQuiz = await quizRepository.findOneBy({
    id: id,
  });

  if (!existQuiz) {
    throw new AppError("Quiz not found", 409);
  }

  if (!existQuiz?.isActive) {
    throw new AppError("Quiz is already inactive", 400);
  }

  await quizRepository.softRemove(existQuiz);
  const quizDeleted = await quizRepository.save({
    ...existQuiz,
    isActive: false,
  });

  return quizDeleted;
};
