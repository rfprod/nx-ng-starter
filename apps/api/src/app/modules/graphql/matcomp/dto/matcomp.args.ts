import { Max, Min } from 'class-validator';

import { ArgsType, Field, Int } from 'type-graphql';

export const defaultSkipValue = 0;

export const defaultTakeValue = 25;
export const minTakeValue = 1;
export const maxTakeValue = 50;

@ArgsType()
export class MatcompArgs {
  @Field(_ => Int)
  @Min(defaultSkipValue)
  public skip = defaultSkipValue;

  @Field(_ => Int)
  @Min(minTakeValue)
  @Max(maxTakeValue)
  public take = defaultTakeValue;
}
