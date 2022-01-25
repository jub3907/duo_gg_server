import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { DataDragonPathDto } from 'src/data-dragon/dto/data-dragon-path.dto';
import { DataDragonType } from 'src/data-dragon/type/data-dragon.type';
import { LeagueEntryDto } from 'src/league-entry/dto/league-entry.dto';
import { MatchDetailDto } from 'src/match/dto/match-detail.dto';
import { MatchIdsApiDto } from 'src/match/dto/match-id.dto';
import { ParticipantItemSpellDto } from 'src/participant/dto/participant-item-spell.dto';
import { ParticipantPerkDto } from 'src/participant/dto/participant-perk.dto';
import { ParticipantDto } from 'src/participant/dto/participant.dto';
import { CommentDto } from 'src/summoner/dto/comment.dto';
import { MasteryDto } from 'src/summoner/dto/mastery.dto';
import { SummonerDto } from 'src/summoner/dto/summoner.dto';
import { TimelineDto } from 'src/timeline/dto/timeline.dto';
import { TimelineEventType } from 'src/timeline/type/timeline-event.type';
import { ApiObject, ApiType } from './type/api.type';

@Injectable()
export class ApiService {
  constructor(private readonly config: ConfigService) {}

  //* getxxx : API를 호출하고 JSON데이터를 리턴
  //* parsexxx : 파라미터로 받은 JSON 데이터를 각 DTO타입에 맞게 정제해 리턴

  async getDataDragonPathList(version: string, type: DataDragonType) {
    const data = await this.getDataDragon(version, type);

    if (type === 'runesReforged') {
      return this.parseRunePath(data.data);
    } else if (type === 'item' || type === 'profileicon') {
      return this.parseItemAndIconPath(data.data.data);
    } else {
      return this.parseSpellAndChampionPath(data.data.data);
    }
  }

  async getEntries(id: string) {
    return this.parseEntries((await this.getApiResult('entriesById', id)).data);
  }

  async getChallengerEntries() {
    return this.parseChallengerEntries(
      (await this.getApiResult('challengersByQueue', 'RANKED_SOLO_5x5')).data,
    );
  }

  async getTimeline(matchId: string) {
    return this.parseTimeline(
      (await this.getApiResult('timelineBymatchId', matchId)).data,
    );
  }

  async getSummoner(name: string) {
    return this.parseSummoner(
      (await this.getApiResult('summonerByName', name)).data,
    );
  }

  async getSummoners(names: string[]) {
    return await Promise.all(
      names.map(async (name) => await this.getSummoner(name)),
    );
  }

  async getMastery(summonerId: string) {
    return this.parseMasteries(
      (await this.getApiResult('masteryById', summonerId)).data,
    );
  }

  async getMatch(matchId: string) {
    return this.parseMatch(
      (await this.getApiResult('matchBymatchId', matchId)).data,
    );
  }

  async getMatchIdsByPuuid({
    puuid,
    count = 10,
    type,
  }: MatchIdsApiDto): Promise<string[]> {
    return (
      await this.getApiResult('matchesByPuuid', puuid, {
        type,
        count,
      })
    ).data;
  }

  private parseItemAndIconPath(data: JSON): DataDragonPathDto[] {
    return Object.keys(data).map((id) => ({ id, path: data[id].image.full }));
  }

  private parseSpellAndChampionPath(data: JSON): DataDragonPathDto[] {
    return Object.keys(data).map((id) => ({
      id: data[id].key,
      path: data[id].image.full,
    }));
  }

  private parseRunePath(data: Array<any>): DataDragonPathDto[] {
    return data
      .map(({ id, icon, slots }) =>
        [{ id, path: icon }].concat(
          slots
            .map(({ runes }) =>
              runes.map(({ id, icon }) => ({ id, path: icon })).flat(),
            )
            .flat(),
        ),
      )
      .flat();
  }

  private parseSummoner(data: JSON): SummonerDto {
    return {
      accountId: data['accountId'],
      profileIconId: data['profileIconId'],
      id: data['id'],
      name: data['name'],
      puuid: data['puuid'],
      summonerLevel: data['summonerLevel'],
      comment: [],
      masteries: [],
    };
  }

  private parseMasteries(datas: Array<JSON>): MasteryDto[] {
    return datas.map((data) => ({
      championId: data['championId'],
      championLevel: data['championLevel'],
      championPoints: data['championPoints'],
      lastPlayTime: data['lastPlayTime'],
    }));
  }

  private parseMatch(data: JSON): MatchDetailDto {
    return {
      matchId: data['metadata']['matchId'],
      queueId: data['info']['queueId'],
      gameCreation: data['info']['gameCreation'],
      gameDuration: data['info']['gameDuration'],
      participants: this.parseParticipants(data['info']['participants']),
    };
  }

  private parseParticipants(data: Array<JSON>): ParticipantDto[] {
    return data.map((participant) => this.parseParticipant(participant));
  }

  private parseParticipant(participant: JSON): ParticipantDto {
    return {
      puuid: participant['puuid'],
      participantId: participant['participantId'],
      summonerName: participant['summonerName'],
      teamId: participant['teamId'],
      win: participant['win'],
      individualPosition: participant['individualPosition'],
      champLevel: participant['champLevel'],
      championId: participant['championId'],
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
      items: this.parseItem(participant),
      summoners: this.parseSpell(participant),
      perks: this.parsePerks(participant['perks']),
    };
  }

  private parsePerks(perks: JSON): ParticipantPerkDto {
    return {
      flex: perks['statPerks']['flex'],
      defense: perks['statPerks']['defense'],
      offense: perks['statPerks']['offense'],
      primaryStyle: perks['styles'][0]['style'],
      primarySelections: perks['styles'][0]['selections'].map(
        ({ perk }) => perk,
      ),
      subStyle: perks['styles'][1]['style'],
      subSelections: perks['styles'][1]['selections'].map(({ perk }) => perk),
    };
  }

  private parseItem(participant: JSON): ParticipantItemSpellDto[] {
    return [...Array(7).keys()].map((index) => ({
      index,
      id: participant[`item${index}`],
      type: 'item',
    }));
  }

  private parseSpell(participant: JSON): ParticipantItemSpellDto[] {
    return [...Array(2).keys()].map((index) => ({
      index,
      id: participant[`summoner${index + 1}Id`],
      type: 'summoner',
    }));
  }

  private parseEntries(data: JSON[]): LeagueEntryDto[] {
    return data.map((item) => ({
      id: item['summonerId'],
      name: item['summonerName'],
      tier: item['tier'],
      queueType: item['queueType'],
      rank: item['rank'],
      leaguePoints: item['leaguePoints'],
      wins: item['wins'],
      losses: item['losses'],
    }));
  }

  private parseChallengerEntries(data: JSON): LeagueEntryDto[] {
    return data['entries'].map((data) => ({
      id: data['summonerId'],
      name: data['summonerName'],
      tier: 'Challenger',
      queueType: 'RANKED_SOLO_5x5',
      rank: data['rank'],
      leaguePoints: data['leaguePoints'],
      wins: data['wins'],
      losses: data['losses'],
    }));
  }

  private parseTimeline(data: JSON): TimelineDto {
    const events = data['info']['frames']
      .map(({ events }) =>
        events.reduce((acc, event) => {
          if (TimelineEventType.includes(event.type)) {
            acc.push({
              ...event,
              timestamp: Math.floor(
                event.timestamp / data['info']['frameInterval'],
              ),
            });
          }
          return acc;
        }, []),
      )
      .flat();

    return { matchId: data['metadata']['matchId'], events: events };
  }

  private async getDataDragon(version: string, type: DataDragonType) {
    return await axios.get(
      `http://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/${type}.json`,
    );
  }

  private async getApiResult(
    type: ApiType,
    variable: string,
    params: any = {},
  ) {
    return await axios.get(this.getUri(type, variable), {
      params: {
        ...params,
        api_key: this.config.get('api.key'),
      },
    });
  }

  private getUri(type: ApiType, variable: string) {
    return ApiObject[type].path + encodeURI(variable) + ApiObject[type].behind;
  }
}
