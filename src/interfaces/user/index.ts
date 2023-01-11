import { IFavoritePosts } from "../favoritePosts";

export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  score: number;
  isActive: boolean;
  favorite_posts: IFavoritePosts;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
}
