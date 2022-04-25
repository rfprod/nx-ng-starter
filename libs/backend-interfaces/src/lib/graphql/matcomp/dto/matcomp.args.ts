import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

export const defaultSkipValue = 0;
export const defaultTakeValue = 25;
export const minTakeValue = 1;
export const maxTakeValue = 50;

@ArgsType()
export class AppMatcompArgs {
  @Field(() => Int)
  @Min(defaultSkipValue)
  public skip = defaultSkipValue;

  @Field(() => Int)
  @Min(minTakeValue)
  @Max(maxTakeValue)
  public take = defaultTakeValue;
}
