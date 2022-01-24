import { TimelineEventType } from '../type/timeline-event.type';

export class TimelineEventDto {
  type: TimelineEventType;
  participantId: number;
  timestamp: number;
  itemId: number;
  skillSlot: number;
}
