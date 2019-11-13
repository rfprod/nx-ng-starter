import { DynamicModule, Module } from '@nestjs/common';

import { DateScalar } from '@nx-ng-starter/api-interface';

import { MatcompResolvers } from './matcomp.resolvers';

import { MatcompService } from './matcomp.service';

@Module({
  providers: [MatcompService, MatcompResolvers, DateScalar],
})
export class GqlMatcompModule {
  public static forRoot(): DynamicModule {
    return {
      module: GqlMatcompModule,
      providers: [MatcompService, MatcompResolvers, DateScalar],
    };
  }
}
