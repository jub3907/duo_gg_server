import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummonerResolver } from './summoner.resolver';
import { Summoner, SummonerSchema } from './schema/summoner.schema';
import { SummonerService } from './summoner.service';
import { MasteryModule } from './mastery.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Summoner.name, useFactory: () => SummonerSchema },
    ]),
    MasteryModule,
  ],
  providers: [SummonerResolver, SummonerService],
  exports: [MongooseModule, SummonerService],
})
export class SummonerModule {}
