import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParticipantItemSpellModel {
  @Field((type) => Number)
  index: number;

  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  type: string;

  @Field((type) => String)
  iconPath: string;
}
