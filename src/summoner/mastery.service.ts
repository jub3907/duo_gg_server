import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/api/api.service';
import { MasteryDto } from './dto/mastery.dto';
import { Summoner, SummonerDocument } from './schema/summoner.schema';

@Injectable()
export class MasteryService {
  constructor(
    @InjectModel(Summoner.name)
    private readonly SummonerModel: Model<SummonerDocument>,
    private readonly api: ApiService,
  ) {}

  async getMastery(summonerId: string) {
    return await this.api.getApiResult('masteryById', summonerId);
  }

  async update(data: MasteryDto[], summonerId: string) {
    await this.SummonerModel.findOneAndUpdate(
      {
        id: summonerId,
      },
      {
        masteries: data,
      },
      { new: true },
    );
  }
}