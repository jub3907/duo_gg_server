import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { ApiService } from 'src/common/api.service';
import { CommentCreateInput } from './dto/comment-create.input';
import { CommentDto } from './dto/comment.dto';
import { MasteryDto } from './dto/mastery.dto';
import { Comment, CommentDocument } from './schema/comment.schema';
import { Summoner, SummonerDocument } from './schema/summoner.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Summoner.name)
    private readonly summonerModel: Model<SummonerDocument>,
  ) {}

  create(commentInput: CommentCreateInput): Comment {
    return {
      ...commentInput,
      _id: new Types.ObjectId(),
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
  }

  sliceComments(comments: CommentDto[], count: number) {
    return comments.slice(0, count);
  }

  async addCommentByAccountId(accountId: string, dto: Comment) {
    return await this.summonerModel.findOneAndUpdate(
      {
        accountId,
      },
      {
        $push: { comments: dto },
      },
    );
  }

  getCommentIndex(summoner: SummonerDocument, id: string) {
    return summoner.comments.findIndex(
      (comment) => comment._id.toString() === id,
    );
  }

  popCommentByIndex(summoner: SummonerDocument, index: number) {
    summoner.comments.splice(index, 1);
    return summoner;
  }
}
