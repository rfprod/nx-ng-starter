import { DynamicModule, Module, Provider } from '@nestjs/common';
import { exec } from 'child_process';

import { BackendDiagnosticsController } from './controller/diagnostics.controller';
import { BackendDiagnosticsService, CHILD_PROCESS_EXEC } from './service/diagnostics.service';

export const diagnosticsModuleProviders: Provider[] = [
  BackendDiagnosticsService,
  {
    provide: CHILD_PROCESS_EXEC,
    useValue: exec,
  },
];

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
