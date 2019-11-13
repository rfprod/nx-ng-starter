import {
  Field,
  ID,
  ObjectType
} from 'type-graphql';

@ObjectType()
export class MatcompModel {

  @Field(_ => ID)
  public id: string;

  @Field(_ => String, {
    defaultValue: '',
  })
  public name: string;

  @Field(_ => String, {
    defaultValue: '',
  })
  public description: string;

  @Field(_ => Date, {
    defaultValue: new Date().getTime(),
  })
  public creationDate?: number;

}
