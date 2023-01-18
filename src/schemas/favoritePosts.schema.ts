import * as yup from "yup";
import { SchemaOf } from "yup";
import { IFavoritePosts } from "../interfaces/favoritePosts";

export const likedPostsSchema: SchemaOf<IFavoritePosts> = yup.object().shape({
  usersId: yup.string().uuid().required(),
  postsId: yup.string().uuid().required(),
});
