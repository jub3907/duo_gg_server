import { ObjectType, PickType } from '@nestjs/graphql';
import { ParticipantModel } from './participant.model';

@ObjectType()
export class ParticipantBasicModel extends PickType(ParticipantModel, [
  'summonerName',
  'championIconPath',
  'participantId',
  'puuid',
] as const) {}
