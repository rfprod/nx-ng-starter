import { DateScalar } from '@app/backend-interfaces';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

// import { PubSub } from 'apollo-server-express';
import { BackendMatcompGuard } from './matcomp.guard';
import { BackendMatcompResolver } from './matcomp.resolver';
import { BackendMatcompService } from './matcomp.service';

const apiGqlMatcompModuleProviders: Provider[] = [
  BackendMatcompService,
  BackendMatcompResolver,
  BackendMatcompGuard,
  DateScalar,
  {
    provide: 'PUB_SUB',
    useFactory: () => new PubSub(),
  },
];

@Module({
  providers: [...apiGqlMatcompModuleProviders],
})
export class BackendGqlMatcompModule {
  public static forRoot(): DynamicModule {
    return {
      module: BackendGqlMatcompModule,
      providers: [...apiGqlMatcompModuleProviders],
    };
  }
}
