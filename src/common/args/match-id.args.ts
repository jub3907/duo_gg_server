import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class MatchIdArgs {
  @Field((type) => String)
  @IsString()
  matchId: string;
}
