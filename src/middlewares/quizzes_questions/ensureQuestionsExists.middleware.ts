import * as yup from "yup";
import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { Request, Response, NextFunction } from "express";
import { Questions } from "../../entities/questions.entity";

export const ensureQuestionsExistsInQuizzes_QuestionsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const questionId = req.body.questionsId;

	const uuid = yup.string().uuid();
	await uuid
		.validate(questionId)
		.then(res => res)
		.catch(error => {
			if (error instanceof yup.ValidationError) {
				throw new AppError("Question id is not a valid uuid", 404);
			}
		});

	const questionsRep = dataSourceConfig.getRepository(Questions);

	const questionFound = await questionsRep.findOneBy({
		id: questionId
	});

	if (!questionFound) {
		throw new AppError("Question not found!", 404);
	}

	next();
};
