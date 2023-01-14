import { Router } from "express";

import { AuthMiddleware } from "../middlewares/authentication.middleware";
import { idIsValidMiddleware } from "../middlewares/IdIsValid.middleware";
import { isAdmMiddleware } from "../middlewares/isAdm.middleware";

import createQuestionsController from "../controllers/questions/createQuestions.controller";
import listQuestionsController from "../controllers/questions/listQuestions.controller";
import editQuestionsController from "../controllers/questions/editQuestions.Controller";
import deleteQuestionsController from "../controllers/questions/deleteQuestions.controller";

const questionsRouter = Router();

// CRIAR PERGUNTA
questionsRouter.post(
    "",
    AuthMiddleware, 
    isAdmMiddleware,
    createQuestionsController
);

// LISTAR PERGUNTA
questionsRouter.get("", 
    AuthMiddleware, 
    isAdmMiddleware,
    listQuestionsController
);

// ALTERAR PERGUNTA
questionsRouter.patch(
    "/:id",
    AuthMiddleware,
    isAdmMiddleware,
    idIsValidMiddleware,
    editQuestionsController
);

// DELETAR PERGUNTA
questionsRouter.delete(
    "/:id",
    AuthMiddleware,
    isAdmMiddleware,
    idIsValidMiddleware,
    deleteQuestionsController
);

export { questionsRouter };
