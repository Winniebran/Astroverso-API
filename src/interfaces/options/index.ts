export interface IOptions {
  answer: string;
  point: number;
  isCorrect?: boolean;
  questionsId: string;
}

export interface IupdateOption {
  answer?: string;
  point?: number;
  isCorrect?: boolean;
}