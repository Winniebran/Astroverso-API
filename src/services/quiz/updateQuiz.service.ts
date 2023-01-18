import { IQuizzes, IQuizzesResponse } from "../../interfaces/quizzes";
import dataSourceConfig from "../../data-source";
import { Quizzes } from "../../entities/quizzes.entity";
import { AppError } from "../../errors/AppErrors";

export const updateQuizService = async (
	id: string,
	quizDataUpdate: IQuizzes
): Promise<IQuizzesResponse> => {
	const quizRepository = dataSourceConfig.getRepository(Quizzes);

	const existQuiz = await quizRepository.findOneBy({
		id
	});

	const updatedQuiz = quizRepository.create({
		...existQuiz,
		...quizDataUpdate
	});
	await quizRepository.save(updatedQuiz);
	return updatedQuiz;
};
