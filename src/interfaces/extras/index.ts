import { ITypes } from "../types";

export interface IExtras {
  image: string;
  author: string;
  title: string;
  description: string;
  link: string;
  types: ITypes;
}

export interface IExtrasRequest {
  image: string;
  author: string;
  title: string;
  description: string;
  link: string;
  typesId: string;
}

export interface IExtrasResponse extends IExtrasRequest{
  image: string;
  author: string;
  title: string;
  description: string;
  link: string;
  typesId: string;
}

export interface IExtrasUpdate {
	image?: string;
	author?: string;
	title?: string;
	description?: string;
  link?: string;
  typesId?: string;
}
