import { MaxLength, MinLength } from 'class-validator';

import { Field, InputType } from 'type-graphql';

export const minInputLength = 3;
export const maxInputLength = 30;

@InputType()
export class NewMatcompInputDto {
  @Field(_ => String)
  @MinLength(minInputLength)
  @MaxLength(maxInputLength)
  public name: string;

  @Field(_ => String)
  @MaxLength(maxInputLength)
  public description: string;
}
