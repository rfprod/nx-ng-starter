import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DateScalar } from '@nx-ng-starter/api-interface';

import { MatcompGuard } from './guard/matcomp.guard';
import { MatcompResolver } from './matcomp.resolver';
import { MatcompService } from './matcomp.service';

const matcompModuleProviders: Provider[] = [
  MatcompService,
  MatcompResolver,
  MatcompGuard,
  DateScalar,
];

@Module({
  providers: [...matcompModuleProviders],
})
export class GqlMatcompModule {
  public static forRoot(): DynamicModule {
    return {
      module: GqlMatcompModule,
      providers: [...matcompModuleProviders],
    };
  }
}
