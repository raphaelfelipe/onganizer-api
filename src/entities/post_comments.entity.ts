import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { User } from "./user.entity";
import { Project_Posts } from "./project_posts.entity";

@Entity()
export class Post_Comments {
  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @ManyToOne((type) => User, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @Column("uuid")
  user_id: string;

  @ManyToOne((type) => Project_Posts, {
    eager: true,
  })
  @JoinColumn()
  post: Project_Posts;

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
}
