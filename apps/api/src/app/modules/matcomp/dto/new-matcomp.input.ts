import {
  MinLength,
  MaxLength
} from 'class-validator';

import {
  Field,
  InputType
} from 'type-graphql';

@InputType()
export class NewMatcompInput {

  @Field()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @Field()
  @MaxLength(30)
  description: string;

}
