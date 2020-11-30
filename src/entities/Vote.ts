import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Post } from './Post';
import { User } from "./User";

@Entity({ name: 'votes'})
export class Vote extends BaseEntity {
  @PrimaryColumn({ name: 'post_id' })
  postId!: number;

  @ManyToOne(() => Post, post => post.votes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @PrimaryColumn({ name: 'user_id' })
  userId!: number;

  @ManyToOne(() => User, user => user.votes)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'int' })
  value!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}