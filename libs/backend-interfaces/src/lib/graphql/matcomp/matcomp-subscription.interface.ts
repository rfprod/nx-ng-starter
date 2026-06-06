import { Field, ObjectType } from '@nestjs/graphql';

import { initializeClassProperties } from '../../utils/class.util';
import { AppMatcomp } from './matcomp.interface';

@ObjectType()
export class AppMatcompSubscription {
  @Field(() => AppMatcomp, { nullable: true })
  public matcomp?: AppMatcomp;

  constructor(input?: AppMatcompSubscription) {
    initializeClassProperties<AppMatcompSubscription>(this, input);
  }
}
