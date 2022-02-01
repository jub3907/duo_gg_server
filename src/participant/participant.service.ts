import { Injectable } from '@nestjs/common';
import { ParticipantDto } from './dto/participant.dto';

@Injectable()
export class ParticipantService {
  // constructor() {}

  getParticipantIdByPuuid(puuid: string, dtos: ParticipantDto[]) {
    return dtos.find((dto) => dto.puuid === puuid)?.participantId;
  }
}
