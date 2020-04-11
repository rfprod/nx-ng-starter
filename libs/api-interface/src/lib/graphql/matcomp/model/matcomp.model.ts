import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('MatcompModel', { isAbstract: true })
export class MatcompModel {
  @Field(() => ID)
  public id: string;

  @Field(() => String, {
    defaultValue: '',
  })
  public name: string;

  @Field(() => String, {
    defaultValue: '',
  })
  public description: string;

  @Field(() => Date, {
    defaultValue: new Date().getTime(),
  })
  public creationDate?: number;
}
