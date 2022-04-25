import { AppDateScalar } from '@app/backend-interfaces';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

// import { PubSub } from 'apollo-server-express';
import { AppMatcompGuard } from './matcomp.guard';
import { AppMatcompResolver } from './matcomp.resolver';
import { AppMatcompService } from './matcomp.service';

const apiGqlMatcompModuleProviders: Provider[] = [
  AppMatcompService,
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
