import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ArgsType()
export class MatchCountArgs {
  @Field((type) => Number)
  @IsInt()
  matchCount: number;
}
