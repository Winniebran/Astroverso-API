import * as yup from "yup";
import { SchemaOf } from "yup";
import {
	IAstrosRequest,
	IAstrosResponse,
	IAstrosUpdate
} from "../interfaces/astros";

export const astrosRequestSchema: SchemaOf<IAstrosRequest> = yup
	.object()
	.shape({
		name: yup.string().required("Name is required"),
		image: yup.string().url().required("Image is required")
	});

export const astrosUpdateSchema: SchemaOf<IAstrosUpdate> = yup.object().shape({
	name: yup.string().notRequired(),
	image: yup.string().url().notRequired()
});

export const astrosResponseSchema: SchemaOf<IAstrosResponse> = yup
	.object()
	.shape({
		id: yup.string().required(),
		name: yup.string().required(),
		image: yup.string().url().required()
	});

export const listAstrossSchema = yup.array(astrosResponseSchema);
