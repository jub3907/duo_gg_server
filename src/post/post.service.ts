import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { ApiService } from 'src/common/api.service';
import { PostDto } from './dto/post.dto';
import { PostDocument } from './schema/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async findWithPagination(
    createdAt: number,
    limit: number,
    field: string = 'id',
  ) {
    return await this.postModel
      .find({ createdAt: { $lt: createdAt } }, field)
      .limit(limit)
      .exec();
  }

  async create(dto: PostDto) {
    return await this.postModel.create(dto);
  }
}
