import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummonerModule } from 'src/summoner/summoner.module';
import { ParticipantBasicResolver } from './participant-basic.resolver';
import { ParticipantItemSpellResolver } from './participant-item-spell.resolver';
import { ParticipantItemSpellService } from './participant-item-spell.service';
import { ParticipantPerkService } from './participant-perk.service';
import { ParticipantResolver } from './participant.resolver';
import { ParticipantService } from './participant.service';
import { Participant } from './schema/participant.schema';

@Module({
  imports: [SummonerModule],
  providers: [
    ParticipantService,
    ParticipantItemSpellService,
    ParticipantPerkService,
    ParticipantItemSpellResolver,
    ParticipantResolver,
    ParticipantBasicResolver,
  ],
  exports: [
    ParticipantService,
    ParticipantPerkService,
    ParticipantItemSpellService,
  ],
})
export class ParticipantModule {}
