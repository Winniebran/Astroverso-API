import * as yup from "yup";
import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Quizzes } from "../../entities/quizzes.entity";
import { Request, Response, NextFunction } from "express";

export const ensureQuizExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const quizId = req.params.id;
	const quizzesRep = dataSourceConfig.getRepository(Quizzes);

	const quizFound = await quizzesRep.findOneBy({
		id: quizId
	});

	if (!quizFound) {
		throw new AppError("Quiz not found!", 404);
	}

	req.params.id = quizFound.id;

	next();
};
