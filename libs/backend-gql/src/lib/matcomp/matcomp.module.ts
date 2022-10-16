import { AppDateScalar } from '@app/backend-interfaces';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { AppMatcompGuard } from './guards/matcomp.guard';
import { AppMatcompResolver } from './resolvers/matcomp.resolver';
import { AppMatcompService, MATCOMP_SERVICE_TOKEN } from './services/matcomp.service';

const apiGqlMatcompModuleProviders: Provider[] = [
  AppMatcompService,
  {
    provide: MATCOMP_SERVICE_TOKEN,
    useExisting: AppMatcompService,
  },
  AppMatcompResolver,
  AppMatcompGuard,
  AppDateScalar,
  {
    provide: 'PUB_SUB',
    useFactory: () => new PubSub(),
  },
];

@Module({
  providers: [...apiGqlMatcompModuleProviders],
})
export class AppGqlMatcompModule {
  public static forRoot(): DynamicModule {
    return {
      module: AppGqlMatcompModule,
      providers: [...apiGqlMatcompModuleProviders],
    };
  }
}
