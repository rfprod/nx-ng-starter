import { DynamicModule, Module, Provider } from '@nestjs/common';
import { exec } from 'child_process';

import { AppDiagnosticsController } from './controllers/diagnostics.controller';
import { AppDiagnosticsService, CHILD_PROCESS_EXEC, DIAGNOSTICS_SERVICE_TOKEN } from './services/diagnostics.service';

export const diagnosticsModuleProviders: Provider[] = [
  AppDiagnosticsService,
  {
    provide: CHILD_PROCESS_EXEC,
    useValue: exec,
  },
  {
    provide: DIAGNOSTICS_SERVICE_TOKEN,
    useExisting: AppDiagnosticsService,
  },
];

@Module({
  controllers: [AppDiagnosticsController],
})
export class AppDiagnosticsModule {
  public static forRoot(): DynamicModule {
    return {
      module: AppDiagnosticsModule,
      providers: [...diagnosticsModuleProviders],
    };
  }
}
