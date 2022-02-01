import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TimelineEvent, TimelineEventSchema } from './timeline-event.schema';

const Types = mongoose.Schema.Types;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Timeline {
  @Prop({ type: Types.String })
  matchId: string;

  @Prop([{ type: TimelineEventSchema }])
  events: TimelineEvent[];
}

export type TimelineDocument = Timeline & mongoose.Document;
export const TimelineSchema = SchemaFactory.createForClass(Timeline);
