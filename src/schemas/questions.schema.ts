import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IQuestions, IQuestionsEdit } from '../interfaces/questions';

export const QuestionSchema: SchemaOf<IQuestions> = yup.object().shape({
    question: yup.string().required(),
});

export const QuestionEditSchema: SchemaOf<IQuestionsEdit> = yup.object().shape({
    question: yup.string().required(),
});