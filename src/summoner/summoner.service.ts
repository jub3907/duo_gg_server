import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/api.service';
import { SummonerDto } from './dto/summoner.dto';
import { Summoner, SummonerDocument } from './schema/summoner.schema';

@Injectable()
export class SummonerService {
  constructor(
    @InjectModel(Summoner.name)
    private readonly SummonerModel: Model<SummonerDocument>,
  ) {}

  async create(data: SummonerDto) {
    await this.SummonerModel.create(data);
  }

  async findByName(name: string, fields: string = 'name') {
    return await this.SummonerModel.findOne({ name }, fields);
  }

  async isExistName(name: string) {
    return await this.SummonerModel.exists({ name });
  }

  async updateSummoner(dto: SummonerDto) {
    return await this.SummonerModel.findOneAndUpdate(
      {
        accountId: dto.accountId,
      },
      { ...dto },
      { upsert: true },
    );
  }

  async updateSummoners(dtos: SummonerDto[]) {
    return await Promise.all(
      dtos.map(async (dto) => await this.updateSummoner(dto)),
    );
  }

  async update(summoner: SummonerDocument) {
    return await summoner.save();
  }
}
