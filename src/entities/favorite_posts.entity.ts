import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./posts.entity";
import { Users } from "./users.entity";

@Entity("favorite_posts")
export class Favorite_Posts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Users, (users) => users.favorite_posts)
  users: Users;

  @ManyToOne(() => Posts, (posts) => posts.favorite_posts)
  posts: Posts;
}
