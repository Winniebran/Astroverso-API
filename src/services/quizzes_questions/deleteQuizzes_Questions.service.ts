import { AppError } from "../../errors/AppErrors";
import setDataSourceConfig from "../../data-source";
import { Quizzes_Questions } from "../../entities/quizzes_questions.entity";

export const deleteQuizzes_QuestionsService = async (
  quizzes_questionsId: string
): Promise<void> => {
  const quizzes_questionsRep =
    setDataSourceConfig.getRepository(Quizzes_Questions);

  const quizzes_questionsToDelete = await quizzes_questionsRep.findOne({
    where: {
      id: quizzes_questionsId,
    },
    relations: {
      questions: true,
      quizzes: true,
    },
  });

  if (!quizzes_questionsToDelete) {
    throw new AppError("Quiz collection not found!", 404);
  }

  await quizzes_questionsRep.delete(quizzes_questionsToDelete.id);
};
