import * as yup from "yup";
import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Quizzes } from "../../entities/quizzes.entity";
import { Request, Response, NextFunction } from "express";

export const ensureQuizzesExistsInQuizzes_QuestionsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const quizId = req.body.quizzesId;

	const uuid = yup.string().uuid();
	await uuid
		.validate(quizId)
		.then(res => res)
		.catch(error => {
			if (error instanceof yup.ValidationError) {
				throw new AppError("Quiz id is not a valid uuid", 404);
			}
		});

	const quizzesRep = dataSourceConfig.getRepository(Quizzes);

	const quizFound = await quizzesRep.findOneBy({
		id: quizId
	});

	if (!quizFound) {
		throw new AppError("Quiz not found!", 404);
	}

	next();
};
