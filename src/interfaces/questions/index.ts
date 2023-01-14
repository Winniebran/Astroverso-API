import { IOptions } from "../options";

export interface IQuestions {
  question: string;
  answer: IOptions;
}
export interface IQuestionsEdit {
  question: string
  answer?: IOptions;
}