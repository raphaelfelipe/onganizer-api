import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
} from "typeorm";

import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity()
export class Project_User {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @ManyToMany((type) => User, {
    eager: true,
  })
  @JoinColumn()
  users: User;

  @Column("uuid")
  users_id: string;

  @ManyToMany((type) => Project, {
    eager: true,
  })
  @JoinColumn()
  projects: Project;

  @Column("uuid")
  projects_id: string;
}
