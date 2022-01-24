import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentCreateInput {
  @Field((type) => String)
  nickname: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  text: string;
}
