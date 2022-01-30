import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CountArgs } from 'src/common/args/match-count.args';
import { NameArgs } from 'src/common/args/name.args';
import { CryptService } from 'src/common/crypt.service';
import { CommentService } from './comment.service';
import { CommentCreateInput } from './dto/comment-create.input';
import { CommentDeleteInput } from './dto/comment-delete.input';
import { CommentModel } from './model/comment.model';
import { SummonerService } from './summoner.service';

@Resolver((of) => CommentModel)
export class CommentResolver {
  constructor(
    private readonly summonerService: SummonerService,
    private readonly commentService: CommentService,
    private readonly cryptService: CryptService,
  ) {}

  @Mutation((returns) => CommentModel)
  async createComment(
    @Args('input') input: CommentCreateInput,
    @Args() { name }: NameArgs,
  ) {
    const summoner = await this.summonerService.findByName(name, 'accountId');

    if (!summoner) {
      throw new Error();
    }

    input.password = await this.cryptService.hashPassword(input.password);

    const commentSchema = this.commentService.create(input);
    const data = await this.commentService.addCommentByAccountId(
      summoner.accountId,
      commentSchema,
    );

    return commentSchema;
  }

  @Query((returns) => [CommentModel])
  async comments(@Args() { name }: NameArgs, @Args() { count }: CountArgs) {
    const summoner = await this.summonerService.findByName(name, 'comments');

    if (!summoner) {
      throw new Error();
    }

    const sliced = this.commentService.sliceComments(summoner.comments, count);
    return sliced;
  }

  @Mutation((returns) => Boolean)
  async deleteComment(@Args('input') input: CommentDeleteInput) {
    const summoner = await this.summonerService.findByName(
      input.name,
      'comments',
    );

    if (!summoner) {
      throw new Error();
    }

    const commentIndex = this.commentService.getCommentIndex(
      summoner,
      input.id,
    );

    if (commentIndex === -1) {
      throw new Error();
    }

    const comment = summoner.comments[commentIndex];
    const isValid = this.cryptService.comparePassword(
      input.password,
      comment.password,
    );

    if (!isValid) {
      throw new Error();
    }

    this.commentService.popCommentByIndex(summoner, commentIndex);
    await this.summonerService.update(summoner);

    return true;
  }
}
