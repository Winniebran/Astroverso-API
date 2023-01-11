import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Quizzes_Questions } from "./quizzes_questions.entity";
import { Users } from "./users.entity";

@Entity("quizzes")
export class Quizzes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Users, (users) => users.quizzes)
  users: Users;

  @OneToMany(
    () => Quizzes_Questions,
    (quizzes_questions) => quizzes_questions.quizzes
  )
  quizzes_questions: Quizzes_Questions[];
}
