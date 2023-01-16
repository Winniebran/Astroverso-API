import { Router } from "express";

import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";
import { dataIsValidMiddleware } from "../middlewares/dataIsValid.middleware";
import { ensureQuestionsExistsMiddleware } from "../middlewares/questions/ensureQuestionExistis.middleware";

import createQuestionsController from "../controllers/questions/createQuestions.controller";
import listQuestionsController from "../controllers/questions/listQuestions.controller";
import editQuestionsController from "../controllers/questions/editQuestions.Controller";
import deleteQuestionsController from "../controllers/questions/deleteQuestions.controller";

import { QuestionSchema } from "../schemas/questions.schema";

const questionsRouter = Router();

// CRIAR PERGUNTA
questionsRouter.post(
    "",
    //AuthMiddleware, 
    //isAdmMiddleware,
    createQuestionsController
);

// LISTAR PERGUNTAS
questionsRouter.get("", 
    //AuthMiddleware,
    listQuestionsController
);

// ALTERAR PERGUNTA
questionsRouter.patch(
    "/:id",
    /*dataIsValidMiddleware(QuestionSchema),
    ensureQuestionsExistsMiddleware,
    AuthMiddleware,
    isAdmMiddleware,*/
    editQuestionsController
);

// DELETAR PERGUNTA 
questionsRouter.delete(
    "/:id",
    /*ensureQuestionsExistsMiddleware,
    AuthMiddleware,
    isAdmMiddleware,*/
    deleteQuestionsController
);

export { questionsRouter };
