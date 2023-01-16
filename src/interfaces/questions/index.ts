export interface IQuestions {
  question: string;
}
export interface IQuestionsResponse extends IQuestions {
  id: string;
  question: string;
}
export interface IQuestionsEdit {
  question?: string;
}