import { Router } from "express";
import {
	quizzes_questionsRequestSchema,
	quizzes_questionsUpdateSchema
} from "../schemas/quizzes_questions.schema";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { listQuizzes_QuestionsByQuizzesIdController } from "../controllers/quizzes_questions/listQuizzes_QuestionsByQuizzesId.controller";
import { ensureQuizzesExistsInQuizzes_QuestionsMiddleware } from "../middlewares/quizzes_questions/ensureQuizzesExistsInQuizzes_Questions.middleware";
import { ensureQuestionsExistsInQuizzes_QuestionsMiddleware } from "../middlewares/quizzes_questions/ensureQuestionsExistsInQuizzes_Questions.middleware";
import { createQuizzes_QuestionsController } from "../controllers/quizzes_questions/createQuizzes_Questions.controller";
import { updateQuizzes_QuestionsController } from "../controllers/quizzes_questions/updateQuizzes_Questions.controller";
import { deleteQuizzes_QuestionsController } from "../controllers/quizzes_questions/deleteQuizzes_Questions.controller";
import { listAllQuizzes_QuestionsController } from "../controllers/quizzes_questions/listAllQuizzes_Questions.controller";
import { ensureQuizExistsMiddleware } from "../middlewares/quiz/ensureQuizExists.middleware";

export const quizzes_questionsRouter = Router();

quizzes_questionsRouter.post(
	"",
	AuthMiddleware,
	isAdmMiddleware,
	dataIsValidMiddleware(quizzes_questionsRequestSchema),
	ensureQuizzesExistsInQuizzes_QuestionsMiddleware,
	ensureQuestionsExistsInQuizzes_QuestionsMiddleware,
	createQuizzes_QuestionsController
);

quizzes_questionsRouter.get(
	"",
	AuthMiddleware,
	listAllQuizzes_QuestionsController
);

quizzes_questionsRouter.get(
	"/quizzes/:id",
	AuthMiddleware,
	isAdmMiddleware,
	idIsValidMiddleware,
	ensureQuizExistsMiddleware,
	listQuizzes_QuestionsByQuizzesIdController
);

quizzes_questionsRouter.patch(
	"/:id",
	AuthMiddleware,
	isAdmMiddleware,
	idIsValidMiddleware,
	dataIsValidMiddleware(quizzes_questionsUpdateSchema),
	ensureQuizzesExistsInQuizzes_QuestionsMiddleware,
	ensureQuestionsExistsInQuizzes_QuestionsMiddleware,
	updateQuizzes_QuestionsController
);

quizzes_questionsRouter.delete(
	"/:id",
	AuthMiddleware,
	isAdmMiddleware,
	idIsValidMiddleware,
	deleteQuizzes_QuestionsController
);
