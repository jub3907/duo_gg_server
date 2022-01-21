import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

const Types = mongoose.Schema.Types;

@Schema({
  collection: 'posts',
  timestamps: { currentTime: () => new Date().getTime() },
})
export class Post {
  @Prop({ type: Types.String })
  queueType: string;

  @Prop({ type: Types.String })
  role: string;

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
