import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/api/api.service';
import { LeagueEntryDto } from './dto/league-entry.dto';
import { LeagueEntry, LeagueEntryDocument } from './schema/league-entry.schema';

@Injectable()
export class LeagueEntryService {
  constructor(
    @InjectModel(LeagueEntry.name)
    private readonly leagueEntryModel: Model<LeagueEntryDocument>,
    private readonly api: ApiService,
  ) {}

  async getEntryByType(
    summonerId: string,
    queueType: 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR',
  ) {
    const entries = (await this.api.getApiResult('entriesById', summonerId))
      .data;

    return entries.find(
      ({ queueType: type }: LeagueEntryDto) => type == queueType,
    );
  }

  async getEntries(summonerId: string) {
    return await this.api.getApiResult('entriesById', summonerId);
  }

  async getChallengerEntries() {
    return await this.api.getApiResult('challengersByQueue', 'RANKED_SOLO_5x5');
  }

  parseChallengerEntries(data: JSON): LeagueEntryDto[] {
    return data['entries'].map((data) => ({
      ...data,
      tier: 'Challenger',
      queueType: 'RANKED_SOLO_5x5',
    }));
  }

  getRanking(entries: LeagueEntryDto[]) {
    return entries
      .sort(({ leaguePoints: a }, { leaguePoints: b }) => {
        if (a > b) {
          return -1;
        } else if (a < b) {
          return 1;
        } else {
          return 0;
        }
      })
      .slice(0, 10);
  }

  async delete(summonerId: string) {
    return await this.leagueEntryModel.deleteMany({
      summonerId,
    });
  }

  async create(dto: LeagueEntryDto[]) {
    return await Promise.all(
      dto.map(async (data) => await this.leagueEntryModel.create(data)),
    );
  }
}
