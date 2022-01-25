import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummonerModule } from 'src/summoner/summoner.module';
import { MatchBaseResolver } from './match-base.resolver';
import { MatchBasicResolver } from './match-basic.resolver';
import { MatchDetailResolver } from './match-detail.resolver';
import { MatchService } from './match.service';
import { ParticipantBasicResolver } from '../participant/participant-basic.resolver';
import { ParticipantItemSpellResolver } from '../participant/participant-item-spell.resolver';
import { ParticipantResolver } from '../participant/participant.resolver';
import { ParticipantService } from '../participant/participant.service';
import { Match, MatchSchema } from './schema/match.schema';
import { ParticipantModule } from 'src/participant/participant.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Match.name, useFactory: () => MatchSchema },
    ]),
    SummonerModule,
    ParticipantModule,
  ],
  providers: [
    MatchService,
    ParticipantService,
    ParticipantItemSpellResolver,
    ParticipantResolver,
    MatchBasicResolver,
    ParticipantBasicResolver,
    MatchDetailResolver,
  ],
  exports: [MongooseModule, MatchService],
})
export class MatchModule {}
