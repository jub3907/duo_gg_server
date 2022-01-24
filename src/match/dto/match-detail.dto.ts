import { MatchBaseDto } from './match-base.dto';
import { ParticipantDto } from '../../participant/dto/participant.dto';

export class MatchDetailDto extends MatchBaseDto {
  participants: ParticipantDto[];
}
