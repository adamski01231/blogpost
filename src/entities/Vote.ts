import { BaseEntity, Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Post } from './Post';
import { User } from "./User";

@ObjectType()
@Entity({ name: 'votes'})
export class Vote extends BaseEntity {
  @Field()
  @PrimaryColumn({ name: 'post_id' })
  postId!: number;

  @Field(() => Post)
  @ManyToOne(() => Post, post => post.votes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: Post;

  @Field()
  @PrimaryColumn({ name: 'user_id' })
  userId!: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.votes)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Field()
  @Column({ type: 'int' })
  value!: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
