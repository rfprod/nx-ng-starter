import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { ApiEnvironment, DateScalar } from '@nx-ng-starter/api-interface';

import { ApiGqlMatcompModule } from './matcomp/matcomp.module';

export const gqlApiModuleProviders: Provider[] = [DateScalar];

@Module({
  imports: [ApiGqlMatcompModule.forRoot()],
  providers: [...gqlApiModuleProviders],
})
export class ApiGqlModule {
  public static forRoot(environment: ApiEnvironment): DynamicModule {
    const gqlOptions: GqlModuleOptions = {
      useGlobalPrefix: true,
      path: '/graphql',
      include: [ApiGqlMatcompModule],
      debug: environment.production ? false : true,
      playground: environment.production ? false : true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'apps/api/api-schema.gql',
      subscriptions: {
        path: '/api/graphql',
      },
      cors: {
        credentials: true,
        origin: true,
      },
    };
    return {
      module: ApiGqlModule,
      imports: [GraphQLModule.forRoot(gqlOptions)],
      providers: [...gqlApiModuleProviders],
    };
  }
}
