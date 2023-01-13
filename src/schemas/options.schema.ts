import { IupdateOption } from "./../interfaces/options/index";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { IOptions } from "../interfaces/options";

export const postOptionsSchema: SchemaOf<IOptions> = yup.object().shape({
  answer: yup.string().required(),
  point: yup.number().required(),
  isCorrect: yup.boolean(),
  questionsId: yup.string().required(),
});

export const updateOptionsSchema: SchemaOf<IupdateOption> = yup.object().shape({
  answer: yup.string(),
  point: yup.number(),
  isCorrect: yup.boolean(),
});
