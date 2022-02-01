import { Field, ObjectType } from '@nestjs/graphql';
import { SummonerEntryModel } from './summoner-entry.model';

@ObjectType()
export class MasteryModel {
  @Field((type) => Number)
  championId: number;

  @Field((type) => String)
  iconPath: string;

  @Field((type) => Number)
  championLevel: number;

  @Field((type) => Number)
  championPoints: number;

  @Field((type) => Number)
  lastPlayTime: number;
}
