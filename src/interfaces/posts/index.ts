import { ICategoriesResponse } from './../categories/index';
import { IAstrosResponse } from './../astros/index';
import { IFavoritePosts } from '../favoritePosts';
export interface IPosts {
  description: string;
  astrosId: string;
  categoriesId: string;
}

export interface IPostsResponse {
  id: string;
  description: string;
  astros: IAstrosResponse;
  categories: ICategoriesResponse;
}
