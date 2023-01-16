import { Router } from "express";

import { deleteQuizController } from "../controllers/quiz/deleteQuiz.controller";
import { listQuestionQuizController } from "../controllers/quiz/listQuestionQuiz.controller";
import { listQuizzesController } from "../controllers/quiz/listQuizzes.controller";
import { updateQuizController } from "../controllers/quiz/updateQuiz.controller";
import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";
import { createQuizSchema, updateQuizSchema } from "../schemas/quiz.schema";
import { createQuizController } from "../controllers/quiz/createQuiz.controller";

export const quizzesRouter = Router();

quizRouter.post(
  "",
  AuthMiddleware,
  isAdmMiddleware,
  dataIsValidMiddleware(createQuizSchema),
  createQuizController
);

quizRouter.get("", AuthMiddleware, isAdmMiddleware, listQuizzesController);

quizRouter.get(
  "/:id/questions",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
  listQuestionQuizController
);

quizRouter.patch(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  dataIsValidMiddleware(updateQuizSchema),
  idIsValidMiddleware,
  updateQuizController
);

quizRouter.delete(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
  deleteQuizController
);
