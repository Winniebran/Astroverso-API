export interface IAstrosRequest {
	name: string;
	image: string;
}

export interface IAstrosResponse extends IAstrosRequest {
	id: string;
}

export interface IAstrosUpdate {
	name?: string;
	image?: string;
}
