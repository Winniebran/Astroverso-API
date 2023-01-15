import dataSourceConfig from "../../data-source";
import { Quizzes } from "../../entities/quizzes.entity";

export const listQuestionQuizService = async (id: string): Promise<any> => {
  const quizRepository = dataSourceConfig.getRepository(Quizzes);

  const questions = await quizRepository
    .createQueryBuilder("quizzes")
    .innerJoinAndSelect("quizzes.quizzes_questions", "quizzes_questions")
    .innerJoinAndSelect("quizzes_questions.questions", "questions")
    .where("quizzes_id = :id_quiz", { id_quiz: id })
    .select(["quizzes_id as id_quiz", "quizzes_questions", "questions"])
    .getRawMany();

  return questions;
};
