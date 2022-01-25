import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import * as mongoose from 'mongoose';
import { PostQueueType } from '../type/post-queue.type';
import { PostRoleType } from '../type/post-role.type';

const Types = mongoose.Schema.Types;

@Schema({
  collection: 'posts',
  timestamps: { currentTime: () => new Date().getTime() },
})
export class Post {
  @Prop({ type: Types.String })
  queueType: PostQueueType;

  @Prop({ type: Types.String })
  role: PostRoleType;

  @Prop({ type: Types.String })
  name: string;

  @Prop({ type: Types.String })
  tier: string;

  @Prop({ type: Types.String })
  text: string;

  @Prop({ type: Types.Number })
  createdAt: number;

  @Prop({ type: Types.Number })
  updatedAt: number;
}

export type PostDocument = Post & mongoose.Document;
export const PostSchema = SchemaFactory.createForClass(Post);
