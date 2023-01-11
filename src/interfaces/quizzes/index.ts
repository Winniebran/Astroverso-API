import { IQuestions } from "../questions";

export interface IQuizzes {
  name: string;
  questions: IQuestions;
}

export interface IQuizzesQuestions {
  quizzesId: string;
  questionsId: string;
}
