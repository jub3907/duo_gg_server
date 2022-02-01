import { ObjectType, OmitType, PickType } from '@nestjs/graphql';
import { LeagueEntryModel } from 'src/league-entry/model/league-entry.model';

@ObjectType()
export class SummonerEntryModel extends PickType(LeagueEntryModel, [
  'tier',
  'rank',
  'leaguePoints',
  'wins',
  'losses',
] as const) {}
