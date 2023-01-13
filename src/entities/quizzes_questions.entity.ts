import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Questions } from "./questions.entity";
import { Quizzes } from "./quizzes.entity";

@Entity("quizzes_questions")
export class Quizzes_Questions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Quizzes, (quizzes) => quizzes.quizzes_questions)
  quizzes: Quizzes;

  @ManyToOne(() => Questions, (questions) => questions.quizzes_questions)
  questions: Questions;
}
