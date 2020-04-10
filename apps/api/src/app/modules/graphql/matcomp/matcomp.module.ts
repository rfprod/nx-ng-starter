import { DynamicModule, Module } from '@nestjs/common';
import { DateScalar } from '@nx-ng-starter/api-interface';
import { MatcompResolver } from './matcomp.resolver';
import { MatcompService } from './matcomp.service';

@Module({
  providers: [MatcompService, MatcompResolver, DateScalar],
})
export class GqlMatcompModule {
  public static forRoot(): DynamicModule {
    return {
      module: GqlMatcompModule,
      providers: [MatcompService, MatcompResolver, DateScalar],
    };
  }
}
