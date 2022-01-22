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

  async getEntries(summonerId: string) {
    return await this.api.getApiResult('entriesById', summonerId);
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
