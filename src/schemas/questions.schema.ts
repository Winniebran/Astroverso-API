import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IQuestions, IQuestionsResponse, IQuestionsEdit } from '../interfaces/questions';

export const QuestionSchema: SchemaOf<IQuestions> = yup.object().shape({
    question: yup.string().required(),
});

export const QuestionEditSchema: SchemaOf<IQuestionsEdit> = yup.object().shape({
    question: yup.string().min(2).trim().required(),
});

export const QuestionsWithoutOptions: SchemaOf<IQuestionsResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    question: yup.string().required(),
});

export const listQuestionsWithoutOptions = yup.array(QuestionsWithoutOptions);
