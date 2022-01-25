import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class CommentCreateInput {
  @Field((type) => String)
  @IsString()
  nickname: string;

  @Field((type) => String)
  @IsString()
  password: string;

  @Field((type) => String)
  @IsString()
  @MaxLength(200)
  text: string;
}
