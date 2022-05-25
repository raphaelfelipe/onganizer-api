import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./user.entity";
import { Project_Posts } from "./project_posts.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Post_Comments {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column("uuid")
  user_id: string;

  @Column("uuid")
  post_id: string;

  @Column({
    length: 250,
    nullable: false,
  })
  comment: string;

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
