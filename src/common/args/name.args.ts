import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class NameArgs {
  @Field((type) => String)
  @IsString()
  name: string;
}
