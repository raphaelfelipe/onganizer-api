import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { User } from "./user.entity";
import { Project } from "./project.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Follow_Projects {
  @PrimaryColumn("uuid")
  readonly id: string;

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
