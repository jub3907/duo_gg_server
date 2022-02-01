import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TimelineEventType } from '../type/timeline-event.type';

const Types = mongoose.Schema.Types;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class TimelineEvent {
  @Prop({ type: Types.String })
  type: TimelineEventType;

  @Prop({ type: Types.Number })
  participantId: number;

  @Prop({ type: Types.Number })
  timestamp: number;

  @Prop({ type: Types.Number })
  itemId: number;

  @Prop({ type: Types.Number })
  skillSlot: number;
}

export type TimelineEventDocument = TimelineEvent & mongoose.Document;
export const TimelineEventSchema = SchemaFactory.createForClass(TimelineEvent);
