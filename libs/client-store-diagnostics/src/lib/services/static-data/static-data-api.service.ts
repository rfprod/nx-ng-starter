import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppHttpHandlersService } from '@app/client-store-http-progress';

import { TDiagnosticData } from '../../diagnostics.interface';

@Injectable({
  providedIn: 'root',
})
export class AppStaticDataService {
  private readonly http = inject(HttpClient);

  private readonly handlers = inject(AppHttpHandlersService);

  /**
   * Gets serverstatic diagnostic data.
   */
  public staticData() {
    const endpoint = this.handlers.getEndpoint('diagnostics/static');
    return this.handlers.pipeHttpResponse<TDiagnosticData[]>(this.http.get<TDiagnosticData[]>(endpoint));
  }
}
