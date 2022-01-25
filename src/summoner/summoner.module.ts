import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Summoner, SummonerSchema } from './schema/summoner.schema';
import { SummonerService } from './summoner.service';
import { MasteryResolver } from './mastery.resolver';
import { MasteryService } from './mastery.service';
import { SummonerBasicResolver } from './summoner-basic.resolver';
import { LeagueEntryModule } from 'src/league-entry/league-entry.module';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Summoner.name, useFactory: () => SummonerSchema },
    ]),
    // MasteryModule,
    LeagueEntryModule,
  ],
  providers: [
    SummonerService,
    MasteryService,
    MasteryResolver,
    SummonerBasicResolver,
    CommentResolver,
    CommentService,
  ],
  exports: [MongooseModule, SummonerService],
})
export class SummonerModule {}
