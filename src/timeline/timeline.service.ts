import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiService } from 'src/common/api.service';
import { TimelineEventDto } from './dto/timeline-event.dto';
import { TimelineEventType } from './type/timeline-event.type';
import { TimelineDto } from './dto/timeline.dto';
import { Timeline, TimelineDocument } from './schema/timeline.schema';

@Injectable()
export class TimelineService {
  constructor(
    @InjectModel(Timeline.name)
    private readonly timelineModel: Model<TimelineDocument>,
    private readonly api: ApiService,
  ) {}

  async findByMatchId(matchId: string, field: string = 'matchId') {
    return await this.timelineModel.findOne({ matchId }, field);
  }

  async isExist(matchId) {
    return await this.timelineModel.exists({ matchId });
  }

  async create(dto: TimelineDto) {
    return await this.timelineModel.create(dto);
  }
}
