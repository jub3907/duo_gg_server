import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParticipantPerkModel {
  @Field((type) => Number)
  flex: number;

  @Field((type) => Number)
  defense: number;

  @Field((type) => Number)
  offense: number;

  @Field((type) => String)
  primaryStyle: string;

  @Field((type) => [String])
  primarySelections: string[];

  @Field((type) => String)
  subStyle: string;

  @Field((type) => [String])
  subSelections: string[];
}
