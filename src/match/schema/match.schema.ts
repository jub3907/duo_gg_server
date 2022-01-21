import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Timeline, TimelineSchema } from 'src/match/schema/timeline.schema';
import { Participant, ParticipantSchema } from './participant.schema';

const Types = mongoose.Schema.Types;

@Schema({
  collection: 'matches',
  timestamps: { currentTime: () => new Date().getTime() },
})
export class Match {
  @Prop({ type: Types.String })
  matchId: string;

  @Prop({ type: Types.Number })
  queueId: number;

  @Prop({ type: Types.Number })
  winner: number;

  @Prop({ type: Types.Number })
  gameCreation: number;

  @Prop({ type: Types.Number })
  gameDuration: number;

  @Prop([{ type: ParticipantSchema }])
  participants: Participant[];

  @Prop([{ type: TimelineSchema }])
  timelines: Timeline[];
}

export type MatchDocument = Match & mongoose.Document;
export const MatchSchema = SchemaFactory.createForClass(Match);
