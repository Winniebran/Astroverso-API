import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Extras } from "./extras.entity";

@Entity("types")
export class Types {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Extras, (extras) => extras.types)
  extras: Extras[];
}
