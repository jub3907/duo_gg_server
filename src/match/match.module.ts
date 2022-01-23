import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummonerModule } from 'src/summoner/summoner.module';
import { MatchResolver } from './match.resolver';
import { MatchService } from './match.service';
import { ParticipantItemSpellResolver } from './participant-item-spell.resolver';
import { ParticipantItemSpellService } from './participant-item-spell.service';
import { ParticipantPerkService } from './participant-perk.service';
import { ParticipantResolver } from './participant.resolver';
import { ParticipantService } from './participant.service';
import { Match, MatchSchema } from './schema/match.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Match.name, useFactory: () => MatchSchema },
    ]),
    SummonerModule,
  ],
  providers: [
    MatchResolver,
    MatchService,
    ParticipantService,
    ParticipantItemSpellService,
    ParticipantPerkService,
    ParticipantItemSpellResolver,
    ParticipantResolver,
  ],
  exports: [MongooseModule, MatchService],
})
export class MatchModule {}
