import * as yup from "yup";
import { SchemaOf } from "yup";
import { IExtrasRequest, IExtrasUpdate } from "../interfaces/extras";

export const extrasRequestSchema: SchemaOf<IExtrasRequest> = yup
  .object()
  .shape({
    image: yup.string().url().required("Image is required"),
    author: yup.string().required("Author is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    link: yup.string().url().required("Link is required"),
    typesId: yup.string().required("Type is required"),
  });

export const extrasUpdateSchema: SchemaOf<IExtrasUpdate> = yup.object().shape({
  image: yup.string().url().notRequired(),
  author: yup.string().notRequired(),
  title: yup.string().notRequired(),
  description: yup.string().notRequired(),
  link: yup.string().url().notRequired(),
});
