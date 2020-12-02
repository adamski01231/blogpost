import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from 'type-graphql';
import { Role } from './Role';
import { Post } from "./Post";
import { Vote } from "./Vote";

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  login!: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  firstname!: string;

  @Field()
  @Column()
  lastname!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field()
  @Column({ name: 'role_id' })
  roleId!: number;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @Field()
  @Column()
  active!: boolean;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.author)
  posts!: Post[];

  @Field(() => [Vote])
  @OneToMany(() => Vote, vote => vote.user)
  votes!: Vote[];

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
