import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@ArgsType()
export class CountArgs {
  @Field((type) => Number)
  @IsInt()
  count: number;
}
