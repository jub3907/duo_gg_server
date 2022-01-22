import { Module } from '@nestjs/common';
import { MasteryService } from './mastery.service';
import { MasteryResolver } from './mastery.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Summoner, SummonerSchema } from './schema/summoner.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Summoner.name, useFactory: () => SummonerSchema },
    ]),
  ],
  providers: [MasteryService, MasteryResolver],
})
export class MasteryModule {}
