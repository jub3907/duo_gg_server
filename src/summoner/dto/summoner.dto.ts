import { CommentDto } from './comment.dto';
import { MasteryDto } from './mastery.dto';

export class SummonerDto {
  accountId: string;
  profileIconId: number;
  id: string;
  name: string;
  puuid: string;
  summonerLevel: number;
  comment?: CommentDto[];
  masteries: MasteryDto[];
}
