import { DynamicModule, Module, OnModuleDestroy, Provider } from '@nestjs/common';
import { exec } from 'child_process';

import { AppDiagnosticsController } from './controllers/diagnostics.controller';
import { AppDiagnosticsGateway } from './gateway/diagnostics.gateway';
import { AppDiagnosticsService, CHILD_PROCESS_EXEC, DIAGNOSTICS_SERVICE_TOKEN } from './services/diagnostics.service';

/**
 * Provider definitions for the diagnostics module.
 */
export const diagnosticsModuleProviders: Provider[] = [
  AppDiagnosticsService,
  AppDiagnosticsGateway,
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
export class AppDiagnosticsModule implements OnModuleDestroy {
  public static forRoot(): DynamicModule {
    return {
      module: AppDiagnosticsModule,
      providers: [...diagnosticsModuleProviders],
    };
  }

  constructor(private readonly gateway: AppDiagnosticsGateway) {}

  public onModuleDestroy() {
    this.gateway.stopSendingDiagnosticEvents();
  }
}
