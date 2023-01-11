import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./posts.entity";

@Entity("astros")
export class Astros {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 400 })
  image: string;

  @OneToMany(() => Posts, (posts) => posts.astros)
  posts: Posts[];
}
