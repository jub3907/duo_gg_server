import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/api.service';
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

  async create(dto: MatchDetailDto) {
    this.MatchModel.create(dto);
  }

  async findByMatchId(matchId: string, field: string = 'matchId') {
    return await this.MatchModel.findOne({ matchId }, field);
  }

  async isExist(matchId: string) {
    return await this.MatchModel.exists({ matchId });
  }

  async getMatchesByIds(matchIds: string[]) {
    return await Promise.all(
      matchIds.map(async (matchId) => {
        if (await this.isExist(matchId)) {
          return await this.findByMatchId(matchId, null);
        } else {
          return await this.api.getMatch(matchId);
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
