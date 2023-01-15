import { IQuestions } from "../questions";

export interface IQuizzes {
  name: string;
  questions: IQuestions;
}

export interface IQuizzesUpdate {
  name?: string;
  questions?: IQuestions;
}

export interface IQuizzesResponse {
  name: string;
  questions?: IQuestions;
}

export interface IQuizzesQuestions {
  quizzesId: string;
  questionsId: string;
}
