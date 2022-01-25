import { PostQueueType } from '../type/post-queue.type';
import { PostRoleType } from '../type/post-role.type';

export class PostDto {
  queueType: PostQueueType;
  role: PostRoleType;
  name: string;
  tier: string;
  text: string;
}
