import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest, IUserResponse } from "../interfaces/user";

export const createUsersSchema: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().min(2).trim().required("Name is required"),
    password: yup
    .string()
    .trim()
    .matches(/[A-Z]/, "Must contain a capital letter")
    .matches(/([a-z])/, "Must contain a lowercase")
    .matches(/(\d)/, "Must contain a number")
    .matches(/(\W)|_/, "Must contain a special character")
    .matches(/.{8,}/, "Must contain at least 8 characters")
    .required("Password is required"),
    email: yup
      .string()
      .trim()
      .email("Invalid email format")
      .required("Mail is required"),
    isAdm: yup.boolean().required("Adm is required"),
  });

  export const userWithoutPasswordSchema: SchemaOf<IUserResponse> = yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().min(2).trim().required(),
    email: yup.string().trim().email("Invalid email format").required(),
    isAdm: yup.boolean().required(),
    score: yup.number().required(),
    isActive: yup.boolean().required(),
    favorite_posts: yup.object(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  });