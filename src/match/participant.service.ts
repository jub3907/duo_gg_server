import { Injectable } from '@nestjs/common';
import { ParticipantItemSpellService } from './participant-item-spell.service';
import { ParticipantPerkService } from './participant-perk.service';

@Injectable()
export class ParticipantService {
  constructor(
    private readonly itemSpellService: ParticipantItemSpellService,
    private readonly perkService: ParticipantPerkService,
  ) {}

  parseParticipants(data: Array<any>) {
    return data.map((participant) => this.parseParticipant(participant));
  }

  private parseParticipant(participant: JSON) {
    return {
      puuid: participant['puuid'],
      participantId: participant['participantId'],
      teamId: participant['teamId'],
      win: participant['win'],
      individualPosition: participant['individualPosition'],
      champLevel: participant['champLevel'],
      dragonKills: participant['dragonKills'],
      baronKills: participant['baronKills'],
      turretKills: participant['turretKills'],
      goldEarned: participant['goldEarned'],
      kills: participant['kills'],
      deaths: participant['deaths'],
      assists: participant['assists'],
      totalMinionsKilled: participant['totalMinionsKilled'],
      wardsKilled: participant['wardsKilled'],
      wardsPlaced: participant['wardsPlaced'],
      visionWardsBoughtInGame: participant['visionWardsBoughtInGame'],
      totalDamageDealtToChampions: participant['totalDamageDealtToChampions'],
      totalDamageTaken: participant['totalDamageTaken'],
      items: this.itemSpellService.parseItem(participant),
      summoners: this.itemSpellService.parseSpell(participant),
      perks: this.perkService.parsePerks(participant['perks']),
    };
  }
}
