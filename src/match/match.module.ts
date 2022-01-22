import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchResolver } from './match.resolver';
import { MatchService } from './match.service';
import { ParticipantItemSpellService } from './participant-item-spell.service';
import { ParticipantPerkService } from './participant-perk.service';
import { ParticipantService } from './participant.service';
import { Match, MatchSchema } from './schema/match.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Match.name, useFactory: () => MatchSchema },
    ]),
  ],
  providers: [
    MatchResolver,
    MatchService,
    ParticipantService,
    ParticipantItemSpellService,
    ParticipantPerkService,
  ],
  exports: [MongooseModule, MatchService],
})
export class MatchModule {}
