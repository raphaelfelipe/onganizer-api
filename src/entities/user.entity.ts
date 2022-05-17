import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    length: 100,
  })
  description: string;

  @Column({
    length: 100,
    nullable: false,
  })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
