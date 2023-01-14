import { IFavoritePosts } from './../interfaces/favoritePosts/index';
import { IPosts, IPostsResponse } from './../interfaces/posts/index';
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import {
  categoriesRequestSchema,
  categoriesResponseSchema,
} from './categories.schema';
import { astrosRequestSchema, astrosResponseSchema } from './astros.schema';

export const postsRequestSchema: SchemaOf<IPosts> = yup.object().shape({
  description: yup.string().required(),
  astrosId: yup.string().required(),
  categoriesId: yup.string().required(),
});

export const postsResponseSchema: SchemaOf<IPostsResponse> = yup
  .object()
  .shape({
    id: yup.string().required(),
    description: yup.string().required(),
    astros: astrosResponseSchema,
    categories: categoriesResponseSchema,
  });
