import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('AppMatcompModel', { isAbstract: true })
export class AppMatcompModel {
  @Field(() => ID)
  public id = '';

  @Field(() => String, {
    defaultValue: '',
  })
  public name = '';

  @Field(() => String, {
    defaultValue: '',
  })
  public description = '';

  @Field(() => Date, {
    defaultValue: new Date().getTime(),
  })
  public creationDate?: number;
}
