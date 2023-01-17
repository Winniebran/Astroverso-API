import * as yup from "yup";
import { SchemaOf } from "yup";
import { IOptions, IUpdateOption } from "../interfaces/options";

export const postOptionsSchema: SchemaOf<IOptions> = yup.object().shape({
	answer: yup.string().required(),
	point: yup.number().required(),
	isCorrect: yup.boolean().required(),
	questionsId: yup.string().required()
});

export const updateOptionsSchema: SchemaOf<IUpdateOption> = yup.object().shape({
	answer: yup.string(),
	point: yup.number(),
	isCorrect: yup.boolean()
});
