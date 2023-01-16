import { ICategoriesResponse } from "./../categories/index";
import { IAstrosResponse } from "./../astros/index";
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

export interface IPostsUpdate {
  description?: string;
  astrosId?: string;
  categoriesId?: string;
}
