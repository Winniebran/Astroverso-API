import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Options } from "./options.entity";
import { Quizzes_Questions } from "./quizzes_questions.entity";

@Entity("questions")
export class Questions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 150 })
  question: string;

  @OneToMany(
    () => Quizzes_Questions,
    (quizzes_questions) => quizzes_questions.quizzes
  )
  quizzes_questions: Quizzes_Questions[];

  @OneToMany(() => Options, (options) => options.questions)
  options: Options[];
}
