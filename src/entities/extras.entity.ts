import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Types } from "./type.entity";

@Entity("extras")
export class Extras {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 400 })
  image: string;

  @Column({ length: 100 })
  author: string;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 2000 })
  description: string;

  @Column({ length: 400 })
  link: string;

  @ManyToOne(() => Types, (types) => types.extras)
  types: Types;
}
