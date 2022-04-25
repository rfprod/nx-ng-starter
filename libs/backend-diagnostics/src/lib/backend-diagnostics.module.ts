import { DynamicModule, Module, Provider } from '@nestjs/common';
import { exec } from 'child_process';

import { AppDiagnosticsController } from './controller/diagnostics.controller';
import { AppDiagnosticsService, CHILD_PROCESS_EXEC } from './service/diagnostics.service';

export const diagnosticsModuleProviders: Provider[] = [
  AppDiagnosticsService,
  {
    provide: CHILD_PROCESS_EXEC,
    useValue: exec,
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
