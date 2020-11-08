import { Entity, BaseEntity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Role extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  label!: string;
}
