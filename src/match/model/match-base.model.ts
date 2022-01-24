import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MatchBaseModel {
  @Field((type) => String)
  matchId: string;

  @Field((type) => Number)
  gameCreation: number;

  @Field((type) => Number)
  gameDuration: number;

  @Field((type) => String)
  matchType: string;
}
