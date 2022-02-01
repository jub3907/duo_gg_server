import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class VersionArgs {
  @Field((type) => String)
  @IsString()
  version: string;
}
