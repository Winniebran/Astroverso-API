export interface IOptions {
	answer: string;
	point: number;
	isCorrect?: boolean;
	questionsId: string;
}

export interface IUpdateOption {
	answer?: string;
	point?: number;
	isCorrect?: boolean;
}
