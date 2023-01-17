import { Request, Response } from "express";
import { listAllQuizzes_QuestionsService } from "../../services/quizzes_questions/listAllQuizzes_Questions.service";

export const listAllQuizzes_QuestionsController = async (
	req: Request,
	res: Response
) => {
	const quizzes_questionsList = await listAllQuizzes_QuestionsService();
	return res.status(200).json(quizzes_questionsList);
};
