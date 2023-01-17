import dataSourceConfig from "../../data-source";
import { Quizzes_Questions } from "../../entities/quizzes_questions.entity";
import { IQuizzes_QuestionsResponse } from "../../interfaces/quizzes_questions";

export const listAllQuizzes_QuestionsService = async (): Promise<
	IQuizzes_QuestionsResponse[]
> => {
	const quizzes_questionsRep =
		dataSourceConfig.getRepository(Quizzes_Questions);
	const quizzesCollectionsList = await quizzes_questionsRep.find({
		relations: {
			quizzes: true,
			questions: {
				options: true
			}
		}
	});

	return quizzesCollectionsList;
};
