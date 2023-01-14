export interface ICategories {
	name: string;
}
export interface ICategoriesRequest {
	name: string;
}

export interface ICategoriesResponse extends ICategoriesRequest {
	id: string;
}
