import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppHttpHandlersService } from '@app/client-store-http-progress';

import { IPingResponse } from '../../http-api.interface';

/**
 * Http API service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppHttpApiService {
  private readonly httpClient = inject(HttpClient);

  private readonly httpHandlers = inject(AppHttpHandlersService);

  public ping() {
    const endpoint = this.httpHandlers.getEndpoint('auth');
    const observable = this.httpClient.get<IPingResponse>(endpoint);
    return this.httpHandlers.pipeHttpResponse<IPingResponse>(observable);
  }
}
