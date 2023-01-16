import { IQuestionsResponse } from "../questions";

export interface IOptions {
	answer: string;
	point: number;
	isCorrect: boolean;
	questionsId: string;
}

export interface IOptionsResponse {
	answer: string;
	point: number;
	isCorrect: boolean;
	questions: IQuestionsResponse;
}

export interface IUpdateOption {
	answer?: string;
	point?: number;
	isCorrect?: boolean;
}
