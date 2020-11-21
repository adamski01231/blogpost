import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from 'type-graphql';
import { User } from "./User";

@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  label!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
