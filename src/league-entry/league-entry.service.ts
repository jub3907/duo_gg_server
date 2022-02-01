import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/api.service';
import { LeagueEntryDto } from './dto/league-entry.dto';
import { LeagueEntry, LeagueEntryDocument } from './schema/league-entry.schema';

@Injectable()
export class LeagueEntryService {
  constructor(
    @InjectModel(LeagueEntry.name)
    private readonly leagueEntryModel: Model<LeagueEntryDocument>,
  ) {}

  async findEntryByType(
    id: string,
    queueType: 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR',
  ) {
    return await this.leagueEntryModel.findOne(
      {
        id,
        queueType,
      },
      `
      id
      name
      queueType
      tier
      rank
      leaguePoints
      wins
      losses`,
    );
  }

  sliceEntries(data: LeagueEntryDto[]): LeagueEntryDto[] {
    return data
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

  filterId(data: LeagueEntryDto[]): string[] {
    return data.map((data) => data.id);
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

  async updateEntries(dtos: LeagueEntryDto[]) {
    await Promise.all(dtos.map(async (dto) => await this.update(dto)));
  }

  async update(dto: LeagueEntryDto) {
    await this.leagueEntryModel.findOneAndUpdate(
      {
        id: dto.id,
        queueType: dto.queueType,
      },
      {
        ...dto,
      },
      { upsert: true },
    );
  }
}
