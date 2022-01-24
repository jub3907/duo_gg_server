import { Field, ObjectType } from '@nestjs/graphql';
import { ParticipantModel } from './participant.model';

@ObjectType()
export class MatchModel {
  @Field((type) => String)
  matchId: string;

  @Field((type) => String)
  queueId: number;

  @Field((type) => Number)
  gameCreation: number;

  @Field((type) => Number)
  gameDuration: number;

  @Field((type) => [ParticipantModel])
  participants: ParticipantModel[];

  @Field((type) => String)
  matchType: string;
}
