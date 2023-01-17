import { Request, Response } from "express";
import { deleteQuizzes_QuestionsService } from "../../services/quizzes_questions/deleteQuizzes_Questions.service";

export const deleteQuizzes_QuestionsController = async (
	req: Request,
	res: Response
) => {
	const quizzes_questionsId: string = req.params.id;
	await deleteQuizzes_QuestionsService(quizzes_questionsId);
	return res.status(204).json();
};
