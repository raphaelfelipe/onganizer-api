import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";

import { User } from "./user.entity";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @OneToOne((type) => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @Column("uuid")
  user_id: string;
}
