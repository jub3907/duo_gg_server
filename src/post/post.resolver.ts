import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostCreateInput } from './dto/post-create.input';
import { PostModel } from './model/post.model';
import { PostService } from './post.service';
import { PostDocument } from './schema/post.schema';

@Resolver((of) => PostModel)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @ResolveField((type) => String)
  title(@Parent() { queueType, tier, role }: PostDocument) {
    return `${queueType} ${tier} ${role}`;
  }

  @Mutation((type) => PostModel)
  async createPost(@Args('post') post: PostCreateInput) {
    return await this.postService.create(post);
  }

  @Query((type) => [PostModel])
  async posts(
    @Args('createdAt') createdAt: number,
    @Args('limit') limit: number,
  ) {
    return await this.postService.findWithPagination(
      createdAt,
      limit,
      `id name queueType role tier text createdAt`,
    );
  }
  //   constructor() {}
}
