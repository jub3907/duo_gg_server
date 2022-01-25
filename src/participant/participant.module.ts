import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummonerModule } from 'src/summoner/summoner.module';
import { ParticipantBasicResolver } from './participant-basic.resolver';
import { ParticipantItemSpellResolver } from './participant-item-spell.resolver';
import { ParticipantResolver } from './participant.resolver';
import { ParticipantService } from './participant.service';
import { Participant } from './schema/participant.schema';

@Module({
  imports: [SummonerModule],
  providers: [
    ParticipantService,
    ParticipantItemSpellResolver,
    ParticipantResolver,
    ParticipantBasicResolver,
  ],
  exports: [ParticipantService],
})
export class ParticipantModule {}
