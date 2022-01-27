import { Field, ObjectType } from '@nestjs/graphql';
import { SummonerEntryModel } from './summoner-entry.model';

@ObjectType()
export class SummonerBasicModel {
  @Field((type) => String)
  iconPath: string;

  @Field((type) => String)
  name: string;

  @Field((type) => Number)
  summonerLevel: number;

  @Field((type) => Number)
  profileIconId: number;

  @Field((type) => String)
  id: string;

  @Field((type) => String)
  puuid: string;

  @Field((type) => Number)
  updatedAt: number;

  @Field((type) => SummonerEntryModel, { nullable: true })
  soleRank: SummonerEntryModel;

  @Field((type) => SummonerEntryModel, { nullable: true })
  freeRank: SummonerEntryModel;
}
