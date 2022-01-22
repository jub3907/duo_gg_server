import { ParticipantDto } from './participant.dto';

export class MatchDto {
  matchId: string;
  queueId: number;
  gameCreation: number;
  gameDuration: number;
  participants: ParticipantDto[];
}
