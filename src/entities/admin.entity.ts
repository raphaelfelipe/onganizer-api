import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";

import { User } from "./user.entity";

@Entity()
export class Admin {
  @PrimaryColumn("uuid")
  readonly id: string;

  @OneToOne((type) => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @Column("uuid")
  user_id: string;
}
