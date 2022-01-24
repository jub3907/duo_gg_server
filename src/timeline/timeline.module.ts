import { Module } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { TimelineResolver } from './timeline.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Timeline, TimelineSchema } from './schema/timeline.schema';
import { MatchModule } from 'src/match/match.module';
import { ParticipantModel } from 'src/participant/model/participant.model';
import { ParticipantModule } from 'src/participant/participant.module';
import { TimelineEventService } from './timeline-event.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Timeline.name, useFactory: () => TimelineSchema },
    ]),
    MatchModule,
    ParticipantModule,
  ],
  providers: [TimelineService, TimelineResolver, TimelineEventService],
  exports: [MongooseModule, TimelineService],
})
export class TimelineModule {}
