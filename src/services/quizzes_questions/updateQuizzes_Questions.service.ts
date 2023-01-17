import { AppError } from "../../errors/AppErrors";
import setDataSourceConfig from "../../data-source";
import { Questions } from "../../entities/questions.entity";
import { Quizzes } from "../../entities/quizzes.entity";
import { Quizzes_Questions } from "../../entities/quizzes_questions.entity";
import {
	IQuizzes_QuestionsResponse,
	IQuizzes_QuestionsUpdate
} from "../../interfaces/quizzes_questions";

export const updateQuizzes_QuestionsService = async (
	quizzes_questionsId: string,
	quizzes_questionsData: IQuizzes_QuestionsUpdate
): Promise<IQuizzes_QuestionsResponse> => {
	const quizzes_questionsRep =
		setDataSourceConfig.getRepository(Quizzes_Questions);
	const quizzesRep = setDataSourceConfig.getRepository(Quizzes);
	const questionsRep = setDataSourceConfig.getRepository(Questions);

	// const quizzes_questionsFound = await quizzes_questionsRep.findOne({
	// 	where: {
	// 		id: quizzes_questionsId
	// 	}
	// });

	const quizzes_questionsFound = await quizzes_questionsRep.findOne({
		where: {
			id: quizzes_questionsId
		},
		relations: {
			questions: true,
			quizzes: true
		}
	});

	console.log("QQ", quizzes_questionsId, quizzes_questionsFound);
	if (!quizzes_questionsFound) {
		throw new AppError("C Quiz collection not found!", 404);
	}
	const quizzesFound = await quizzesRep.findOne({
		where: {
			id: quizzes_questionsData.quizzesId
		}
	});

	const questionsFound = await questionsRep.findOne({
		where: {
			id: quizzes_questionsData.questionsId
		},
		relations: {
			options: true
		}
	});

	const updatedQuizCollection = quizzes_questionsRep.create({
		...quizzes_questionsFound,
		...quizzes_questionsData,
		questions: questionsFound
			? questionsFound
			: quizzes_questionsFound.questions,
		quizzes: quizzesFound ? quizzesFound : quizzes_questionsFound.quizzes
	});

	await quizzes_questionsRep.save(updatedQuizCollection);

	return updatedQuizCollection;
};
