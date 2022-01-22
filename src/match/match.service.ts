import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/api/api.service';
import { MatchDto } from './dto/match.dto';
import { ParticipantService } from './participant.service';
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

  async getMatchIdsByPuuid(
    puuid: string,
    count: number = 20,
    type: string = '',
  ) {
    return await this.api.getApiResult(
      'matchesByPuuid',
      puuid,
      `${type ? '&type=' + type : ''}${count ? '&count=' + count : ''} `,
    );
  }

  parseMatch(data: JSON): MatchDto {
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

  async create(dto: MatchDto) {
    this.MatchModel.create(dto);
  }

  async findByMatchId(matchId: string) {
    return await this.MatchModel.findOne({ matchId }, 'matchId');
  }
}
