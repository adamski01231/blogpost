import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserDto {
  @Field()
  login!: string;

  @Field()
  password!: string;

  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  email!: string;

  @Field()
  roleId!: number;

  @Field()
  active!: boolean;
}