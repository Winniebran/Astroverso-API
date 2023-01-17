import { IOptions, IupdateOption } from "../../interfaces/options";

export const mockCreateOptionTrue: IOptions = {
  answer: "option 1",
  point: 2,
  questionsId: "",
  isCorrect: true,
};

export const mockCreateOptionFalse01: IOptions = {
  answer: "option 2",
  point: 0,
  questionsId: "",
  isCorrect: false,
};

export const mockCreateOptionFalse02: IOptions = {
  answer: "option 3",
  point: 0,
  questionsId: "",
  isCorrect: false,
};

export const mockCreateOptionFalse03: IOptions = {
  answer: "option 4",
  point: 0,
  questionsId: "",
  isCorrect: false,
};

export const mockCantCreateMoreOption: IOptions = {
  answer: "option 5",
  point: 0,
  questionsId: "",
  isCorrect: false,
};

export const mockCantCreateOptionTrueByPointEqual0: IOptions = {
  answer: "option 1",
  point: 0,
  questionsId: "",
  isCorrect: true,
};

export const mockCantCreateOptionFalseByPointEqual2: IOptions = {
  answer: "option 1",
  point: 2,
  questionsId: "",
  isCorrect: false,
};
