import { Module, Post } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';
import { PostSchema } from './schema/post.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Post.name, useFactory: () => PostSchema },
    ]),
  ],
  providers: [PostResolver, PostService],
  exports: [MongooseModule, PostService],
})
export class PostModule {}
