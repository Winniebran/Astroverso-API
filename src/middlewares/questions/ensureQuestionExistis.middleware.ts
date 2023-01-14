import dataSourceConfig from "../../data-source";
import { AppError } from "../../errors/AppErrors";
import { NextFunction, Request, Response } from "express";
import { Questions } from "../../entities/questions.entity";

const ensureQuestionsExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const repository = dataSourceConfig.getRepository(Questions);

	const foundQuestion = await repository.findOneBy({
		id: req.params.id
	});

	if (!foundQuestion) {
		throw new AppError("Questions not found", 404);
	}

	req.params.id = foundQuestion.id;

	return next();
};

export { ensureQuestionsExistsMiddleware };
