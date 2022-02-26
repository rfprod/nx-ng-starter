import { ApiEnvironment, DateScalar } from '@app/backend-interfaces';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { BackendGqlMatcompModule } from './matcomp/matcomp.module';

export const backendGqlModuleProviders: Provider[] = [DateScalar];

@Module({
  imports: [BackendGqlMatcompModule.forRoot()],
})
export class BackendGqlModule {
  public static forRoot(environment: ApiEnvironment): DynamicModule {
    const gqlOptions: ApolloDriverConfig = {
      driver: ApolloDriver,
      useGlobalPrefix: true,
      path: '/graphql',
      include: [BackendGqlMatcompModule],
      debug: environment.production ? false : true,
      playground: environment.production ? false : true,
      installSubscriptionHandlers: true,
      autoSchemaFile:
        environment.firebase === true
          ? false
          : environment.production
          ? join(process.cwd(), 'schema.gql')
          : join(process.cwd(), 'libs/backend-gql/schema.gql'),
      typePaths: environment.firebase === true ? [join(process.cwd(), 'schema.gql')] : void 0,
      sortSchema: true,
      subscriptions: {
        'graphql-ws': {
          path: '/api/graphql',
        },
        'subscriptions-transport-ws': {
          path: '/api/graphql',
        },
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
