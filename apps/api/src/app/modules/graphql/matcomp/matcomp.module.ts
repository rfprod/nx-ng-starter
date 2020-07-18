import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DateScalar } from '@nx-ng-starter/api-interface';

import { ApiMatcompGuard } from './guard/matcomp.guard';
import { ApiMatcompResolver } from './matcomp.resolver';
import { ApiMatcompService } from './matcomp.service';

const apiGqlMatcompModuleProviders: Provider[] = [
  ApiMatcompService,
  ApiMatcompResolver,
  ApiMatcompGuard,
  DateScalar,
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
