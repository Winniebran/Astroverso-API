import dataSourceConfig from "../../data-source";
import { Quizzes } from "../../entities/quizzes.entity";

export const listQuizzes_QuestionsByQuizzesIdService = async (
	quizzesId: string
) => {
	const quizzesRep = dataSourceConfig.getRepository(Quizzes);
};
