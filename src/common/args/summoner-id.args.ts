import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class SummonerIdArgs {
  @Field((type) => String)
  @IsString()
  summonerId: string;
}
