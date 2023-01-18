import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  ICategoriesRequest,
  ICategoriesResponse,
} from "../interfaces/categories";

export const categoriesRequestSchema: SchemaOf<ICategoriesRequest> = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
  });

export const categoriesResponseSchema: SchemaOf<ICategoriesResponse> = yup
  .object()
  .shape({
    name: yup.string().required(),
    id: yup.string().required(),
  });

export const listCategoriesSchema = yup.array(categoriesResponseSchema);
