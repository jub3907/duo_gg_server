import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

const Types = mongoose.Schema.Types;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Timeline {
  @Prop({ type: Types.String })
  type: string;

  @Prop({ type: Types.Number })
  participantId: number;

  @Prop({ type: Types.Number })
  timestamp: number;

  @Prop({ type: Types.Number })
  itemId: number;

  @Prop({ type: Types.Number })
  skillSlot: number;
}

export type TimelineDocument = Timeline & mongoose.Document;
export const TimelineSchema = SchemaFactory.createForClass(Timeline);
