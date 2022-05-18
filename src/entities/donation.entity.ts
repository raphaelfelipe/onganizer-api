import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity()
export class Donation {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @ManyToOne((type) => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @Column("uuid")
  user_id: string;

  @OneToOne((type) => Project, {
    eager: true,
  })
  @JoinColumn()
  project: Project;

  @Column("uuid")
  project_id: string;

  @Column({
    nullable: false,
  })
  value: number;

  @Column({
    length: 250,
  })
  message: string;

  @CreateDateColumn()
  created_at: Date;
}
