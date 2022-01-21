import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

const Types = mongoose.Schema.Types;

@Schema({
  collection: 'LeagueEntries',
  timestamps: { currentTime: () => new Date().getTime() },
})
export class LeagueEntry {
  @Prop({ type: Types.String })
  summonerId: string;

  @Prop({ type: Types.String })
  summonerName: string;

  @Prop({ type: Types.String })
  queueType: string;

  @Prop({ type: Types.String })
  tier: string;

  @Prop({ type: Types.String })
  rank: string;

  @Prop({ type: Types.Number })
  leaguePoints: number;

  @Prop({ type: Types.Number })
  wins: number;

  @Prop({ type: Types.Number })
  loses: number;

  @Prop({ type: Types.Number })
  createdAt: number;

  @Prop({ type: Types.Number })
  updatedAt: number;
}

export type LeagueEntryDocument = LeagueEntry & mongoose.Document;
export const LeagueEntrySchema = SchemaFactory.createForClass(LeagueEntry);
