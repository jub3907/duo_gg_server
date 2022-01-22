import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummonerResolver } from './summoner.resolver';
import { Summoner, SummonerSchema } from './schema/summoner.schema';
import { SummonerService } from './summoner.service';
import { MasteryResolver } from './mastery.resolver';
import { MasteryService } from './mastery.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Summoner.name, useFactory: () => SummonerSchema },
    ]),
    // MasteryModule,
  ],
  providers: [
    SummonerResolver,
    SummonerService,
    MasteryService,
    MasteryResolver,
  ],
  exports: [MongooseModule, SummonerService],
})
export class SummonerModule {}
