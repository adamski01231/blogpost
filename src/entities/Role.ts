import { Entity, BaseEntity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from 'type-graphql';
import { User } from "./User";

@ObjectType()
@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn()
  id!: number;

  @Field()
  @Column()
  label!: string;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.role)
  users!: User[];

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
