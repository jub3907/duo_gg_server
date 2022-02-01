import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentModel {
  @Field((type) => ID)
  _id: string;

  @Field((type) => String)
  text: string;

  @Field((type) => Number)
  createdAt: number;

  @Field((type) => String)
  nickname: string;
}
