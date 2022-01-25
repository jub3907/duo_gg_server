import { Field, InputType } from '@nestjs/graphql';
import { PostQueueType } from '../type/post-queue.type';
import { PostRoleType } from '../type/post-role.type';

@InputType()
export class PostType {
  @Field((type) => String)
  queueType: PostQueueType;

  @Field((type) => String)
  role: PostRoleType;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  tier: string;

  @Field((type) => String)
  text: string;
}
