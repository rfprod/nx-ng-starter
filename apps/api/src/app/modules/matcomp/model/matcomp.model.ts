import {
  Field,
  ID,
  ObjectType
} from 'type-graphql';

@ObjectType()
export class Matcomp {

  @Field(_ => ID)
  public id: string;

  @Field({
    defaultValue: '',
  })
  public name: string;

  @Field({
    defaultValue: '',
  })
  public description: string;

  @Field({
    defaultValue: new Date().getTime(),
  })
  public creationDate?: Date;

}
