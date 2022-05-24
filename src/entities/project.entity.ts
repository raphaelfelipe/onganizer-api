import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity"
import { v4 as uuid } from "uuid";
import { Project_Posts } from "./project_posts.entity";

@Entity()
export class Project {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    length: 200,
    nullable: false,
  })
  description: string;

  @Column({
    length: 1000,
    nullable: false,
  })
  objective: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    default: true,
  })
  active: boolean;

  @ManyToMany(() => User, {
    cascade: true
  })

  @JoinTable()
  users: User[]

  @OneToMany(()=> Project_Posts, (posts) => posts.project)
  posts:Project_Posts[]
  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
