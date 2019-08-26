import {
  Field,
  ID,
  ObjectType
} from 'type-graphql';

@ObjectType()
export class Matcomp {

  @Field(_ => ID)
  id: string;

  @Field({
    defaultValue: ''
  })
  name: string;

  @Field({
    defaultValue: ''
  })
  description: string;

  @Field({
    defaultValue: new Date().getTime()
  })
  creationDate?: Date;

}
