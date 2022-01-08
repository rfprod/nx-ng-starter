import { Controller, Get } from '@nestjs/common';

import { BackendDiagnosticsService } from '../service/diagnostics.service';

@Controller()
export class BackendDiagnosticsController {
  constructor(private readonly diagnosticsService: BackendDiagnosticsService) {}

  @Get('')
  public ping() {
    return this.diagnosticsService.ping();
  }

  @Get('static')
  public static() {
    return this.diagnosticsService.static();
  }
}
