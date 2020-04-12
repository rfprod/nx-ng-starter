import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DateScalar } from '@nx-ng-starter/api-interface';
import { AppEnvironment } from '@nx-ng-starter/shared-core/data-access';
import { GqlMatcompModule } from './matcomp/matcomp.module';

export const gqlApiModuleProviders: Provider[] = [DateScalar];

@Module({
  imports: [GqlMatcompModule.forRoot()],
  providers: [...gqlApiModuleProviders],
})
export class GqlApiModule {
  public static forRoot(environment: Partial<AppEnvironment>): DynamicModule {
    return {
      module: GqlApiModule,
      imports: [
        GraphQLModule.forRoot({
          path: '/api/graphql',
          include: [GqlMatcompModule],
          debug: environment.production ? false : true,
          playground: environment.production ? false : true,
          installSubscriptionHandlers: true,
          autoSchemaFile: 'apps/api/api-schema.gql',
        }),
      ],
      providers: [...gqlApiModuleProviders],
    };
  }
}
