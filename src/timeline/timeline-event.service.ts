import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/api.service';
import { TimelineEventDto } from './dto/timeline-event.dto';
import { TimelineEventType } from './type/timeline-event.type';
import { TimelineDto } from './dto/timeline.dto';
import { Timeline, TimelineDocument } from './schema/timeline.schema';

@Injectable()
export class TimelineEventService {
  filterByParticipantId(dtos: TimelineEventDto[], participantId: number) {
    return dtos.filter((event) => event.participantId === participantId);
  }
}
