import * as yup from "yup";

export const postOptionsSchema = yup.object().shape({
  answer: yup.string().required(),
  point: yup.number().required(),
  isCorrect: yup.boolean(),
  questionsId: yup.number().required(),
});

export const updateOptionsSchema = yup.object().shape({
  answer: yup.string(),
  point: yup.number(),
  isCorrect: yup.boolean(),
  questionsId: yup.number(),
});
