import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { ApiEnvironment, DateScalar } from '@nx-ng-starter/backend-interfaces';

import { BackendGqlMatcompModule } from './matcomp/matcomp.module';

export const backendGqlModuleProviders: Provider[] = [DateScalar];

@Module({
  imports: [BackendGqlMatcompModule.forRoot()],
})
export class BackendGqlModule {
  public static forRoot(environment: ApiEnvironment): DynamicModule {
    const gqlOptions: GqlModuleOptions = {
      useGlobalPrefix: true,
      path: '/graphql',
      include: [BackendGqlMatcompModule],
      debug: environment.production ? false : true,
      playground: environment.production ? false : true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'libs/backend-gql/schema.gql',
      subscriptions: {
        path: '/api/graphql',
      },
      cors: {
        credentials: true,
        origin: true,
      },
    };
    return {
      module: BackendGqlModule,
      imports: [GraphQLModule.forRoot(gqlOptions)],
      providers: [...backendGqlModuleProviders],
    };
  }
}
