import { Request, Response } from "express";
import { IQuizzes_QuestionsUpdate } from "../../interfaces/quizzes_questions";
import { updateQuizzes_QuestionsService } from "../../services/quizzes_questions/updateQuizzes_Questions.service";

export const updateQuizzes_QuestionsController = async (
	req: Request,
	res: Response
) => {
	const quizzes_questionsId: string = req.params.id;
	console.log(quizzes_questionsId);

	const quizzes_questionsData: IQuizzes_QuestionsUpdate = req.body;
	const updateQuizzes_Questions = await updateQuizzes_QuestionsService(
		quizzes_questionsId,
		quizzes_questionsData
	);

	return res.status(200).json(updateQuizzes_Questions);
};
