import { IPosts } from "../posts";

export interface IFavoritePosts {
  usersId: string;
  posts: IPosts[];
}
