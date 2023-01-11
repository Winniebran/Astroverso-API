import { hash } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { Favorite_Posts } from "./favorite_posts.entity";
import { Quizzes } from "./quizzes.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 150 })
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0, type: "integer" })
  score: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Quizzes, (quizzes) => quizzes.users)
  quizzes: Quizzes[];

  @OneToMany(() => Favorite_Posts, (favorite_posts) => favorite_posts.users)
  favorite_posts: Favorite_Posts[];
}
