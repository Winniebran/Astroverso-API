import * as yup from "yup";

const postOptionsSchema = yup.object().shape({
  answer: yup.string(),
  point: yup.number(),
  isCorrect: yup.boolean(),
  questionsId: yup.number(),
});
