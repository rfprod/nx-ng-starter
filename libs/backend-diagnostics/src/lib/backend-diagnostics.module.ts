import { DynamicModule, Module, Provider } from '@nestjs/common';

import { BackendDiagnosticsController } from './controller/diagnostics.controller';
import { BackendDiagnosticsService } from './service/diagnostics.service';

export const diagnosticsModuleProviders: Provider[] = [BackendDiagnosticsService];

@Module({
  controllers: [BackendDiagnosticsController],
})
export class BackendDiagnosticsModule {
  public static forRoot(): DynamicModule {
    return {
      module: BackendDiagnosticsModule,
      providers: [...diagnosticsModuleProviders],
    };
  }
}
