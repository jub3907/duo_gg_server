import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentDeleteInput {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  password: string;

  @Field((type) => String)
  name: string;
}
