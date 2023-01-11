import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Questions } from "./questions.entity";

@Entity("options")
export class Options {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 250 })
  answer: string;

  @Column({ type: "integer", default: 0 })
  point: number;

  @Column({ type: "boolean", default: false })
  isCorrect: boolean;

  @ManyToOne(() => Questions, (questions) => questions.options)
  questions: Questions;
}
