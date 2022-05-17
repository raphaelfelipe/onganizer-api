import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Project {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    length: 200,
    nullable: false,
  })
  description: string;

  @Column({
    length: 1000,
    nullable: false,
  })
  objective: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({
    default: true,
  })
  active: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
