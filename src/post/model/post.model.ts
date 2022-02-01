import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class PostModel {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  title: string;

  @Field((type) => String)
  text: string;

  @Field((type) => Number)
  createdAt;
}
