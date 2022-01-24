import { ParticipantItemSpellDto } from './participant-item-spell.dto';
import { ParticipantPerkDto } from './participant-perk.dto';

export class ParticipantDto {
  puuid: string;
  participantId: number;
  summonerName: string;
  teamId: number;
  win: boolean;
  individualPosition: string;
  champLevel: number;
  championId: number;
  dragonKills: number;
  baronKills: number;
  turretKills: number;
  goldEarned: number;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  wardsKilled: number;
  wardsPlaced: number;
  visionWardsBoughtInGame: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  items: ParticipantItemSpellDto[];
  summoners: ParticipantItemSpellDto[];
  perks: ParticipantPerkDto;
}
