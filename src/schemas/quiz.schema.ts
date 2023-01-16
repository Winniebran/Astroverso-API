import * as yup from "yup";
import { SchemaOf } from "yup";
import { IQuizzes } from "../interfaces/quizzes";

export const createQuizSchema: SchemaOf<IQuizzes> = yup.object().shape({
  name: yup.string().required("Quiz is required"),
});

export const updateQuizSchema: SchemaOf<IQuizzes> = yup.object().shape({
  name: yup.string().required(),
});
