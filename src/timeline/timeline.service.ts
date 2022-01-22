import { Injectable } from '@nestjs/common';
import { ApiService } from 'src/common/api/api.service';

@Injectable()
export class TimelineService {
  constructor(private readonly api: ApiService) {}

  async getTimeline(matchId: string) {
    console.log(await this.api.getApiResult('timelineBymatchId', matchId));
  }
}
