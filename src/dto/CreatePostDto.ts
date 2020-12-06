import { InputType, Field } from "type-graphql";

@InputType()
export class CreatePostDto {
  @Field()
  title!: string;

  @Field()
  text!: string;

  @Field()
  authorId!: number;
}
