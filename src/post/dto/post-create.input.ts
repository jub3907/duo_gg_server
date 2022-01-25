import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';
import { PostQueueType } from '../type/post-queue.type';
import { PostRoleType } from '../type/post-role.type';

@InputType()
export class PostCreateInput {
  @Field((type) => String)
  @IsString()
  queueType: PostQueueType;

  @Field((type) => String)
  @IsString()
  role: PostRoleType;

  @Field((type) => String)
  @IsString()
  name: string;

  @Field((type) => String)
  @IsString()
  tier: string;

  @Field((type) => String)
  @IsString()
  @MaxLength(200)
  text: string;
}
