import dataSourceConfig from "../../data-source";
import { Quizzes } from "../../entities/quizzes.entity";
import { Quizzes_Questions } from "../../entities/quizzes_questions.entity";

export const listQuizzes_QuestionsByQuizzesIdService = async (
  quizzesId: string
): Promise<Quizzes[]> => {
  const quizzesRep = dataSourceConfig.getRepository(Quizzes);
  const quizzes_questionsRep =
    dataSourceConfig.getRepository(Quizzes_Questions);

  const quizzesList = await quizzesRep.find({
    relations: {
      quizzes_questions: {
        questions: {
          options: true,
        },
      },
    },
    where: {
      quizzes_questions: {
        quizzes: {
          id: quizzesId,
        },
      },
    },
  });

  return quizzesList;
};
