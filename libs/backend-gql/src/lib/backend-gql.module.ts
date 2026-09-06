import { AppApiEnvironment, AppDateScalar } from '@app/backend-interfaces';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { existsSync } from 'fs';
import { join } from 'path';

import { AppGqlMatcompModule } from './matcomp/matcomp.module';

export const backendGqlModuleProviders: Provider[] = [AppDateScalar];

@Module({
  imports: [AppGqlMatcompModule.forRoot()],
})
export class AppGqlModule {
  public static forRoot(environment: AppApiEnvironment): DynamicModule {
    const docker = existsSync('/.dockerenv');

    const gqlOptions: ApolloDriverConfig = {
      driver: ApolloDriver,
      useGlobalPrefix: true,
      path: '/graphql',
      include: [AppGqlMatcompModule],
      playground: environment.production ? false : true,
      installSubscriptionHandlers: true,
      // Schema-first mode (read from prebuilt file)
      ...(environment.firebase || docker
        ? {
            autoSchemaFile: false,
            typePaths: [join(process.cwd(), environment.production ? 'schema.gql' : 'libs/backend-gql/schema.gql')],
          }
        : {
            // Code-first mode (generate from decorators)
            autoSchemaFile: true,
            typePaths: [join(process.cwd(), environment.production ? 'schema.gql' : 'libs/backend-gql/schema.gql')],
          }),
      //
      sortSchema: true,
      subscriptions: {
        'graphql-ws': {
          path: '/api/graphql',
        },
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
