import { Controller, Get } from '@nestjs/common';

import { AppDiagnosticsService } from '../service/diagnostics.service';

@Controller()
export class AppDiagnosticsController {
  constructor(private readonly diagnosticsService: AppDiagnosticsService) {}

  @Get('')
  public ping() {
    return this.diagnosticsService.ping();
  }

  @Get('static')
  public static() {
    return this.diagnosticsService.static();
  }
}
