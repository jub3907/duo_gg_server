import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {
  ParticipantItemSpell,
  ParticipantItemSpellSchema,
} from './participant-item-spell.schema';
import {
  ParticipantPerk,
  ParticipantPerkSchema,
} from './participant-perk.schema';

const Types = mongoose.Schema.Types;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Participant {
  @Prop({ type: Types.String })
  puuid: string;

  @Prop({ type: Types.String })
  summonerName: string;

  @Prop({ type: Types.Number })
  participantId: number;

  @Prop({ type: Types.Number })
  teamId: number;

  @Prop({ type: Types.Boolean })
  win: boolean;

  @Prop({ type: Types.String })
  individualPosition: string;

  @Prop({ type: Types.Number })
  champLevel: number;

  @Prop({ type: Types.Number })
  championId: number;

  @Prop({ type: Types.Number })
  dragonKills: number;

  @Prop({ type: Types.Number })
  baronKills: number;

  @Prop({ type: Types.Number })
  turretKills: number;

  @Prop({ type: Types.Number })
  goldEarned: number;

  @Prop({ type: Types.Number })
  kills: number;

  @Prop({ type: Types.Number })
  deaths: number;

  @Prop({ type: Types.Number })
  assists: number;

  @Prop({ type: Types.Number })
  totalMinionsKilled: number;

  @Prop({ type: Types.Number })
  wardsKilled: number;

  @Prop({ type: Types.Number })
  wardsPlaced: number;

  @Prop({ type: Types.Number })
  visionWardsBoughtInGame: number;

  @Prop({ type: Types.Number })
  totalDamageDealtToChampions: number;

  @Prop({ type: Types.Number })
  totalDamageTaken: number;

  @Prop([{ type: ParticipantItemSpellSchema }])
  items: ParticipantItemSpell[];

  @Prop([{ type: ParticipantItemSpellSchema }])
  summoners: ParticipantItemSpell[];

  @Prop({ type: ParticipantPerkSchema })
  perks: ParticipantPerk;
}

export type ParticipantDocument = Participant & mongoose.Document;
export const ParticipantSchema = SchemaFactory.createForClass(Participant);
