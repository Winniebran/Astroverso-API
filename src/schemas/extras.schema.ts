import * as yup from "yup";
import { SchemaOf } from "yup";
import { IExtrasRequest, IExtrasUpdate } from "../interfaces/extras";

export const extrasRequestSchema: SchemaOf<IExtrasRequest> = yup
	.object()
	.shape({
		image: yup.string().url().required(),
		author: yup.string().required(),
		title: yup.string().required(),
		description: yup.string().required(),
		link: yup.string().url().required(),
		typesId: yup.string().required(),
	});

export const extrasUpdateSchema: SchemaOf<IExtrasUpdate> = yup.object().shape({
        image: yup.string().url().notRequired(),
        author: yup.string().notRequired(),
        title: yup.string().notRequired(),
        description: yup.string().notRequired(),
        link: yup.string().url().notRequired(),
    });