import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LeagueEntryModel {
  @Field((type) => String)
  summonerId: string;

  @Field((type) => String)
  summonerName: string;

  @Field((type) => String)
  queueType: string;

  @Field((type) => String)
  tier: string;

  @Field((type) => String)
  rank: string;

  @Field((type) => Number)
  leaguePoints: number;

  @Field((type) => Number)
  wins: number;

  @Field((type) => Number)
  losses: number;
}
