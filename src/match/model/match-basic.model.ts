import { Field, ObjectType } from '@nestjs/graphql';
import { MatchBaseModel } from './match-base.model';
import { ParticipantBasicModel } from './participant-basic.model';
import { ParticipantModel } from './participant.model';

@ObjectType()
export class MatchBasicModel extends MatchBaseModel {
  @Field((type) => String)
  puuid: string;

  @Field((type) => ParticipantModel)
  summonerInGameData: ParticipantModel;

  @Field((type) => [ParticipantBasicModel])
  participants: ParticipantBasicModel[];
}
