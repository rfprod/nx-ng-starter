import { AppApiEnvironment, AppDateScalar } from '@app/backend-interfaces';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppGqlMatcompModule } from './matcomp/matcomp.module';

export const backendGqlModuleProviders: Provider[] = [AppDateScalar];

@Module({
  imports: [AppGqlMatcompModule.forRoot()],
})
export class AppGqlModule {
  public static forRoot(environment: AppApiEnvironment): DynamicModule {
    const gqlOptions: ApolloDriverConfig = {
      driver: ApolloDriver,
      useGlobalPrefix: true,
      path: '/graphql',
      include: [AppGqlMatcompModule],
      debug: environment.production ? false : true,
      playground: environment.production ? false : true,
      installSubscriptionHandlers: true,
      autoSchemaFile: environment.firebase
        ? false
        : environment.production
        ? join(process.cwd(), 'schema.gql')
        : join(process.cwd(), 'libs/backend-gql/schema.gql'),
      typePaths: environment.firebase ? [join(process.cwd(), 'schema.gql')] : void 0,
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
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    };
    return {
      module: AppGqlModule,
      imports: [GraphQLModule.forRoot(gqlOptions)],
      providers: [...backendGqlModuleProviders],
    };
  }
}
