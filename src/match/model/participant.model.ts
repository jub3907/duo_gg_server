import { Field, ObjectType } from '@nestjs/graphql';
import { TeamIdType } from '../type/team-id.type';
import { ParticipantItemSpellModel } from './participant-item-spell.model';
import { ParticipantPerkModel } from './participant-perk.model';

@ObjectType()
export class ParticipantModel {
  @Field((type) => String)
  puuid: string;

  @Field((type) => Number)
  participantId: number;

  @Field((type) => String)
  summonerName: string;

  @Field((type) => Number)
  teamId: TeamIdType;

  @Field((type) => Boolean)
  win: boolean;

  @Field((type) => String)
  individualPosition: string;

  @Field((type) => Number)
  champLevel: number;

  @Field((type) => Number)
  championId: number;

  @Field((type) => String)
  championIconPath: string;

  @Field((type) => Number)
  dragonKills: number;

  @Field((type) => Number)
  baronKills: number;

  @Field((type) => Number)
  turretKills: number;

  @Field((type) => Number)
  goldEarned: number;

  @Field((type) => Number)
  kills: number;

  @Field((type) => Number)
  deaths: number;

  @Field((type) => Number)
  assists: number;

  @Field((type) => Number)
  totalMinionsKilled: number;

  @Field((type) => Number)
  wardsKilled: number;

  @Field((type) => Number)
  wardsPlaced: number;

  @Field((type) => Number)
  visionWardsBoughtInGame: number;

  @Field((type) => Number)
  totalDamageDealtToChampions: number;

  @Field((type) => Number)
  totalDamageTaken: number;

  @Field((type) => [ParticipantItemSpellModel])
  items: ParticipantItemSpellModel[];

  @Field((type) => [ParticipantItemSpellModel])
  summoners: ParticipantItemSpellModel[];

  @Field((type) => ParticipantPerkModel)
  perks: ParticipantPerkModel;
}
