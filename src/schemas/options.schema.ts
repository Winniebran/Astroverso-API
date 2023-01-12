import * as yup from "yup";

const postOptionsSchema = yup.object().shape({
  answer: yup.string().required(),
  point: yup.number().required(),
  isCorrect: yup.boolean(),
  questionsId: yup.number().required(),
});

export { postOptionsSchema };
