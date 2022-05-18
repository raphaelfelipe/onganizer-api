import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity()
export class Follow_Projects {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @OneToOne((type) => User, {
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

  @CreateDateColumn()
  created_at: Date;
}
