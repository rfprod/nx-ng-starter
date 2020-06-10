import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { ApiEnvironment, DateScalar } from '@nx-ng-starter/api-interface';

import { GqlMatcompModule } from './matcomp/matcomp.module';

export const gqlApiModuleProviders: Provider[] = [DateScalar];

@Module({
  imports: [GqlMatcompModule.forRoot()],
  providers: [...gqlApiModuleProviders],
})
export class GqlApiModule {
  public static forRoot(environment: ApiEnvironment): DynamicModule {
    const gqlOptions: GqlModuleOptions = {
      path: '/api/graphql',
      include: [GqlMatcompModule],
      debug: environment.production ? false : true,
      playground: environment.production ? false : true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'apps/api/api-schema.gql',
      cors: {
        credentials: true,
        origin: true,
      },
    };
    return {
      module: GqlApiModule,
      imports: [GraphQLModule.forRoot(gqlOptions)],
      providers: [...gqlApiModuleProviders],
    };
  }
}
