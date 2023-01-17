import { IQuestions } from "../questions";
import { IQuizzes } from "../quizzes";

export interface IQuizzes_QuestionsRequest {
	// quizzesScore?: number;
	quizzesId: string;
	questionsId: string;
}

export interface IQuizzes_QuestionsResponse {
	id: string;
	// quizzesScore?: number;
	quizzes: IQuizzes;
	questions: IQuestions;
}

export interface IQuizzes_QuestionsUpdate {
	// quizzesScore?: number;
	quizzesId?: string;
	questionsId?: string;
}
