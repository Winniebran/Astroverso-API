import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Quizzes } from "../../entities/quizzes.entity";
import { Questions } from "../../entities/questions.entity";
import { Quizzes_Questions } from "../../entities/quizzes_questions.entity";
import {
  IQuizzes_QuestionsRequest,
  IQuizzes_QuestionsResponse,
} from "../../interfaces/quizzes_questions";

export const createQuizzes_QuestionsService = async (
  quizzes_questionsData: IQuizzes_QuestionsRequest
): Promise<IQuizzes_QuestionsResponse[]> => {
  const quizzes_questionsRep =
    dataSourceConfig.getRepository(Quizzes_Questions);
  const quizzesRep = dataSourceConfig.getRepository(Quizzes);
  const questionsRep = dataSourceConfig.getRepository(Questions);

  const questionsFound = await questionsRep.findOne({
    relations: {
      options: true,
    },
    where: {
      id: quizzes_questionsData.questionsId,
    },
  });

  const quizzesFound = await quizzesRep.findOne({
    relations: {
      quizzes_questions: {
        questions: true,
      },
    },
    where: {
      id: quizzes_questionsData.quizzesId,
    },
  });

  const quizzes_questionsFound = await quizzes_questionsRep.findOne({
    relations: {
      questions: {
        options: true,
      },
      quizzes: true,
    },
    where: {
      questions: {
        id: questionsFound?.id,
      },
      quizzes: {
        id: quizzesFound?.id,
      },
    },
  });

  if (quizzes_questionsFound) {
    throw new AppError("Quiz collection already exists!", 409);
  }

  const newQuiz_Collection = quizzes_questionsRep.create({
    questions: questionsFound!,
    quizzes: quizzesFound!,
  });

  await quizzes_questionsRep.save(newQuiz_Collection);

  const listQuizzes = await quizzes_questionsRep.find({
    relations: {
      questions: {
        options: true,
      },
      quizzes: true,
    },
    where: {
      quizzes: {
        id: quizzesFound?.id,
      },
    },
  });

  return listQuizzes;
};
