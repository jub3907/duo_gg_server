import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { match } from 'assert';
import { DataDragonService } from 'src/data-dragon/data-dragon.service';
import { MatchService } from 'src/match/match.service';
import { ParticipantService } from 'src/participant/participant.service';
import { TimelineEventService } from './timeline-event.service';
import { TimelineItemModel } from './model/timeline-item.model';
import { TimelineModel } from './model/timeline.model';
import { TimelineDocument } from './schema/timeline.schema';
import { TimelineService } from './timeline.service';

@Resolver((of) => TimelineModel)
export class TimelineResolver {
  constructor(
    private readonly matchService: MatchService,
    private readonly participantService: ParticipantService,
    private readonly timelineService: TimelineService,
    private readonly timelineEventService: TimelineEventService,
    private readonly dataDragonService: DataDragonService,
  ) {}

  @ResolveField((returns) => [TimelineItemModel])
  items(@Parent() timeline: TimelineDocument) {
    return timeline.events.reduce((acc, val) => {
      if (val.type === 'ITEM_PURCHASED') {
        acc.push({
          timestamp: val.timestamp,
          iconPath: this.dataDragonService.getImagePath('item', val.itemId),
        });
      }
      return acc;
    }, []);
  }

  @ResolveField((returns) => [Number])
  skills(@Parent() timeline: TimelineDocument) {
    return timeline.events.reduce((acc, val) => {
      if (val.type === 'SKILL_LEVEL_UP') {
        acc.push(val.skillSlot);
      }
      return acc;
    }, []);
  }

  @Mutation((returns) => TimelineModel)
  async matchBuild(
    @Args('matchId') matchId: string,
    @Args('puuid') puuid: string,
  ) {
    const matches = await this.matchService.findByMatchId(
      matchId,
      'participants',
    );

    const participantId = this.participantService.getParticipantIdByPuuid(
      puuid,
      matches.participants,
    );

    const isExist = await this.timelineService.isExist(matchId);

    if (!isExist) {
      const apiResult = await this.timelineService.getTimeline(matchId);
      const timeline = this.timelineService.parseTimeline(apiResult.data);
      await this.timelineService.create(timeline);
    }

    const timeline = await this.timelineService.findByMatchId(matchId, null);

    timeline.events = this.timelineEventService.filterByParticipantId(
      timeline.events,
      participantId,
    );

    return timeline;
  }
}