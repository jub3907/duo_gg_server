import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/api/api.service';
import { MatchIdsApiDto } from './dto/match-id.dto';
import { MatchDetailDto } from './dto/match-detail.dto';
import { ParticipantService } from '../participant/participant.service';
import { Match, MatchDocument } from './schema/match.schema';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name)
    private readonly MatchModel: Model<MatchDocument>,
    private readonly api: ApiService,
    private readonly participantService: ParticipantService,
  ) {}

  async getMatch(matchId: string) {
    return await this.api.getApiResult('matchBymatchId', matchId);
  }

  async getMatchIdsByPuuid({ puuid, count = 20, type }: MatchIdsApiDto) {
    return await this.api.getApiResult('matchesByPuuid', puuid, {
      type,
      count,
    });
  }

  parseMatch(data: JSON): MatchDetailDto {
    return {
      matchId: data['metadata']['matchId'],
      queueId: data['info']['queueId'],
      gameCreation: data['info']['gameCreation'],
      gameDuration: data['info']['gameDuration'],
      participants: this.participantService.parseParticipants(
        data['info']['participants'],
      ),
    };
  }

  async create(dto: MatchDetailDto) {
    this.MatchModel.create(dto);
  }

  async findByMatchId(matchId: string, field: string = 'matchId') {
    return await this.MatchModel.findOne({ matchId }, field);
  }

  async isExistMatch(matchId: string) {
    return await this.MatchModel.exists({ matchId });
  }

  async getMatchesByIds(matchIds: string[]) {
    return await Promise.all(
      matchIds.map(async (matchId) => {
        if (await this.isExistMatch(matchId)) {
          return await this.findByMatchId(matchId, null);
        } else {
          const apiResult = await this.getMatch(matchId);
          return this.parseMatch(apiResult.data);
        }
      }),
    );
  }

  async update(dto: MatchDetailDto) {
    await this.MatchModel.findOneAndUpdate(
      {
        matchId: dto.matchId,
      },
      dto,
      { upsert: true },
    );
  }

  async updateMatches(dtos: MatchDetailDto[]) {
    return await Promise.all(dtos.map(async (dto) => await this.update(dto)));
  }
}
