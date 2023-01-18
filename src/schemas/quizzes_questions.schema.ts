import * as yup from "yup";
import { SchemaOf } from "yup";
import {
	IQuizzes_QuestionsRequest,
	IQuizzes_QuestionsUpdate
} from "../interfaces/quizzes_questions";

export const quizzes_questionsRequestSchema: SchemaOf<IQuizzes_QuestionsRequest> =
	yup.object().shape({
		quizzesId: yup.string().required(),
		questionsId: yup.string().required()
	});

export const quizzes_questionsUpdateSchema: SchemaOf<IQuizzes_QuestionsUpdate> =
	yup.object().shape({
		quizzesId: yup.string().notRequired(),
		questionsId: yup.string().notRequired()
	});
