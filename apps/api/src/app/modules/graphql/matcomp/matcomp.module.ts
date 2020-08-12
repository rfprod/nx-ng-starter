import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DateScalar } from '@nx-ng-starter/api-interface';
import { PubSub } from 'graphql-subscriptions';

// import { PubSub } from 'apollo-server-express';
import { ApiMatcompGuard } from './matcomp.guard';
import { ApiMatcompResolver } from './matcomp.resolver';
import { ApiMatcompService } from './matcomp.service';

const apiGqlMatcompModuleProviders: Provider[] = [
  ApiMatcompService,
  ApiMatcompResolver,
  ApiMatcompGuard,
  DateScalar,
  {
    provide: 'PUB_SUB',
    useFactory: () => new PubSub(),
  },
];

@Module({
  providers: [...apiGqlMatcompModuleProviders],
})
export class ApiGqlMatcompModule {
  public static forRoot(): DynamicModule {
    return {
      module: ApiGqlMatcompModule,
      providers: [...apiGqlMatcompModuleProviders],
    };
  }
}
