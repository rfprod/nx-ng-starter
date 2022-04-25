import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

export const minInputLength = 3;
export const maxInputLength = 30;

@InputType()
export class AppMatcompInputDto {
  @Field(() => String)
  @MinLength(minInputLength)
  @MaxLength(maxInputLength)
  public name = '';

  @Field(() => String)
  @MinLength(minInputLength)
  @MaxLength(maxInputLength)
  public description = '';
}
