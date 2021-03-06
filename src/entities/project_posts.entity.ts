import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { v4 as uuid } from "uuid";

import { Project } from "./project.entity";

@Entity()
export class Project_Posts {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Project, (project) => project, { onDelete: "CASCADE" })
  project: Project;

  @Column({
    length: 50,
    nullable: false,
  })
  title: string;

  @Column({
    length: 1000,
    nullable: false,
  })
  content: string;

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
