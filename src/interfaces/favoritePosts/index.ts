import { IPostsResponse } from "../posts";
import { IUserResponse } from "../user";

export interface IFavoritePosts {
  usersId: string;
  postsId: string;
}

export interface IFavoritePostsResponse {
  id: string
  posts: IPostsResponse
  users: IUserResponse
}