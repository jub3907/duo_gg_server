import { Module } from '@nestjs/common';
import { MatchResolver } from './match.resolver';
import { MatchService } from './match.service';
import { ParticipantItemSpellService } from './participant-item-spell.service';
import { ParticipantPerkService } from './participant-perk.service';
import { ParticipantService } from './participant.service';
import { TimelineService } from './timeline.service';

@Module({
  providers: [
    MatchResolver,
    MatchService,
    ParticipantService,
    ParticipantItemSpellService,
    ParticipantPerkService,
    TimelineService,
  ],
})
export class MatchModule {}
