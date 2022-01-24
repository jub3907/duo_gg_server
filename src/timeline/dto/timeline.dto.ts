import { TimelineEventDto } from './timeline-event.dto';

export class TimelineDto {
  matchId: string;
  events: TimelineEventDto[];
}
