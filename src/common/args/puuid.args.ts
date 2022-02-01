import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class PuuidArgs {
  @Field((type) => String)
  @IsString()
  puuid: string;
}
