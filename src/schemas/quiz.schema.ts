import * as yup from "yup";
import { SchemaOf } from "yup";
import { IQuizzes, IQuizzesUpdate } from "../interfaces/quizzes";

export const createQuizSchema: SchemaOf<IQuizzes | any> = yup.object().shape({
  name: yup.string().required("Quiz is required"),
  questions: yup.array().required("Questions are required"),
});

export const updateQuizSchema: SchemaOf<IQuizzesUpdate | any> = yup
  .object()
  .shape({
    name: yup.string(),
    questions: yup.array(),
  });
