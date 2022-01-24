import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import * as mongoose from 'mongoose';

const Types = mongoose.Schema.Types;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: { currentTime: () => new Date().getTime() },
})
export class Comment {
  @Prop({ type: Types.Number })
  createdAt: number;

  @Prop({ type: Types.String })
  nickname: string;

  @Prop({ type: Types.String })
  password: string;

  @Prop({ type: Types.String })
  text: string;

  @Expose()
  id: string;
}

export type CommentDocument = Comment & mongoose.Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
