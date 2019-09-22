import { MaxLength, MinLength } from 'class-validator';

import { Field, InputType } from 'type-graphql';

export const minInputLength = 3;
export const maxInputLength = 30;

@InputType()
export class NewMatcompInput {
  @Field()
  @MinLength(minInputLength)
  @MaxLength(maxInputLength)
  public name: string;

  @Field()
  @MaxLength(maxInputLength)
  public description: string;
}
