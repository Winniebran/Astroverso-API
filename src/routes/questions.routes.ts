import { Router } from "express";

import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { ensureQuestionsExistsMiddleware } from "../middlewares/questions/ensureQuestionExistis.middleware";
import { isValidToUpdateMiddleware } from "../middlewares/isValidToUpdate.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";

import { createQuestionsController } from "../controllers/questions/createQuestions.controller";
import { listQuestionsController } from "../controllers/questions/listQuestions.controller";
import { editQuestionsController } from "../controllers/questions/editQuestions.Controller";
import { deleteQuestionsController } from "../controllers/questions/deleteQuestions.controller";
import { getQuestionOptionsController } from "../controllers/questions/getQuestionOptions.controller";

import {
  QuestionSchema,
  QuestionEditSchema,
} from "../schemas/questions.schema";

export const questionsRouter = Router();

// CRIAR PERGUNTA
questionsRouter.post(
  "",
  AuthMiddleware,
  isAdmMiddleware,
  dataIsValidMiddleware(QuestionSchema),
  createQuestionsController
);

// LISTAR PERGUNTAS
questionsRouter.get("", AuthMiddleware, listQuestionsController);

// LISTAR OPÇÕES DE UMA PERGUNTA
questionsRouter.get(
  "/:id/options",
  AuthMiddleware,
  idIsValidMiddleware,
  getQuestionOptionsController
);

// ALTERAR PERGUNTA
questionsRouter.patch(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  isValidToUpdateMiddleware,
  idIsValidMiddleware,
  dataIsValidMiddleware(QuestionEditSchema),
  ensureQuestionsExistsMiddleware,
  editQuestionsController
);

// DELETAR PERGUNTA
questionsRouter.delete(
  "/:id",
  AuthMiddleware,
  isAdmMiddleware,
  idIsValidMiddleware,
  ensureQuestionsExistsMiddleware,
  deleteQuestionsController
);
