import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {
  Participant,
  ParticipantSchema,
} from '../../participant/schema/participant.schema';

const Types = mongoose.Schema.Types;

@Schema({
  collection: 'matches',
})
export class Match {
  @Prop({ type: Types.String })
  matchId: string;

  @Prop({ type: Types.Number })
  queueId: number;

  @Prop({ type: Types.Number })
  gameCreation: number;

  @Prop({ type: Types.Number })
  gameDuration: number;

  @Prop([{ type: ParticipantSchema }])
  participants: Participant[];
}

export type MatchDocument = Match & mongoose.Document;
export const MatchSchema = SchemaFactory.createForClass(Match);
