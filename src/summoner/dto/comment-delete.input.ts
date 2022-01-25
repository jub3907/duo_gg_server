import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CommentDeleteInput {
  @Field((type) => String)
  @IsString()
  id: string;

  @Field((type) => String)
  @IsString()
  password: string;

  @Field((type) => String)
  @IsString()
  name: string;
}
