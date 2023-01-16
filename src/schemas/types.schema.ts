import * as yup from "yup";
import { SchemaOf } from "yup";
import { ITypes, ITypesRequest, ITypesResponse } from "../interfaces/types";

export const typesRequestSchema: SchemaOf<ITypesRequest> = yup.object().shape({
  name: yup.string().required("Name is required"),
});

export const typesResponseSchema: SchemaOf<ITypesResponse> = yup
  .object()
  .shape({
    name: yup.string().required(),
    id: yup.string().required(),
  });

export const listTypesSchema = yup.array(typesResponseSchema);
