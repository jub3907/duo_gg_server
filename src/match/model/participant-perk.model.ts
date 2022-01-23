import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParticipantPerkModel {
  @Field((type) => Number)
  flex: number;

  @Field((type) => Number)
  defense: number;

  @Field((type) => Number)
  offense: number;

  @Field((type) => Number)
  primaryStyle: number;

  @Field((type) => [Number])
  primarySelections: number[];

  @Field((type) => Number)
  subStyle: number;

  @Field((type) => [Number])
  subSelections: number[];
}
