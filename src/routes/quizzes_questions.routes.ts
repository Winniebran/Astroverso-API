import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { createQuizzes_QuestionsController } from "../controllers/quizzes_questions/createQuizzes_Questions.controller";
import { updateQuizzes_QuestionsController } from "../controllers/quizzes_questions/updateQuizzes_Questions.controller";
import { deleteQuizzes_QuestionsController } from "../controllers/quizzes_questions/deleteQuizzes_Questions.controller";
import { ensureQuizzesExistsInQuizzes_QuestionsMiddleware } from "../middlewares/quizzes_questions/ensureQuizzesExists.middleware";
import { ensureQuestionsExistsInQuizzes_QuestionsMiddleware } from "../middlewares/quizzes_questions/ensureQuestionsExists.middleware";
import { quizzes_questionsRequestSchema } from "../schemas/quizzes_questions.schema";
import { listAllQuizzes_QuestionsController } from "../controllers/quizzes_questions/listAllQuizzes_Questions.controller";
import { listQuizzes_QuestionsByQuizzesIdController } from "../controllers/quizzes_questions/listQuizzes_QuestionsByQuizzesId.controller";

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
  isAdmMiddleware,
  listAllQuizzes_QuestionsController
);

quizzes_questionsRouter.get(
  "/quizzes/:id",
  AuthMiddleware,
  isAdmMiddleware,
  listQuizzes_QuestionsByQuizzesIdController
);

quizzes_questionsRouter.patch(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
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
