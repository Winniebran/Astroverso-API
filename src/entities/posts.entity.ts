import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Astros } from "./astros.entity";
import { Categories } from "./categories.entity";
import { Favorite_Posts } from "./favorite_posts.entity";

@Entity("posts")
export class Posts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 5000 })
  description: string;

  @OneToMany(() => Favorite_Posts, (favorite_posts) => favorite_posts.posts)
  favorite_posts: Favorite_Posts[];

  @ManyToOne(() => Astros, (astros) => astros.posts)
  astros: Astros;

  @ManyToOne(() => Categories, (categories) => categories.posts)
  categories: Categories;
}
