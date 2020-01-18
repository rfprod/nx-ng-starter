import { DynamicModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DateScalar } from '@nx-ng-starter/api-interface';
import { AppEnvironment } from '@nx-ng-starter/shared-core/data-access';
import { GqlMatcompModule } from './matcomp/matcomp.module';

@Module({
  imports: [
    GqlMatcompModule.forRoot(),
  ],
  providers: [DateScalar],
})
export class GqlApiModule {
  public static forRoot(environment: Partial<AppEnvironment>): DynamicModule {
    return {
      module: GqlApiModule,
      imports: [
        GraphQLModule.forRoot({
          path: '/graphql',
          include: [
            GqlMatcompModule,
          ],
          debug: environment.production ? false : true,
          playground: environment.production ? false : true,
          installSubscriptionHandlers: true,
          autoSchemaFile: 'apps/api/api-schema.gql',
        }),
      ],
      providers: [DateScalar],
    };
  }
}
