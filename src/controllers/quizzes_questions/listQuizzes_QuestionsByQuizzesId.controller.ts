import { Request, Response } from "express";
import { listQuizzes_QuestionsByQuizzesIdService } from "../../services/quizzes_questions/listQuizzes_QuestionsByQuizzesId.service";

export const listQuizzes_QuestionsByQuizzesIdController = async (
	req: Request,
	res: Response
) => {
	const quizzesId: string = req.params.id;
	const quizzes_questionsList = await listQuizzes_QuestionsByQuizzesIdService(
		quizzesId
	);
	return res.status(200).json(quizzes_questionsList);
};
