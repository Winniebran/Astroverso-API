import { IAstros } from "../astros";
import { ICategories } from "../categories";

export interface IPosts {
  description: string;
  astros: IAstros;
  categories: ICategories;
}
