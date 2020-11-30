import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from 'type-graphql';
import { User } from './User';
import { Vote } from "./Vote";

@ObjectType()
@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ name: 'author_id'})
  authorId!: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author_id' })
  author!: User;

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.post)
  @JoinColumn({ name: 'post_id' })
  votes!: Vote[];

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
