import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IQuestions, IQuestionsEdit } from '../interfaces/questions';

export const QuestionSchema: SchemaOf<IQuestions> = yup.object().shape({
    question: yup.string().required(),
    answer: yup.object().shape(
        {
            answer: yup.string().required(),
            point: yup.number().required(),
            isCorrect: yup.boolean().notRequired()
        }
    ).required(),
});

export const QuestionEditSchema: SchemaOf<IQuestionsEdit> = yup.object().shape({
    question: yup.string().required(),
    answer: yup.object().shape(
        {
            answer: yup.string().notRequired(),
            point: yup.number().notRequired(),
            isCorrect: yup.boolean().notRequired()
        }
    ).required(),
});