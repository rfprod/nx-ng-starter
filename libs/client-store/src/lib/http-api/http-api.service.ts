import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IPingResponse } from './http-api.interface';
import { AppHttpHandlersService } from './http-handlers.service';

/**
 * Http API service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppHttpApiService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly httpHandlers: AppHttpHandlersService,
  ) {}

  public ping() {
    const endpoint = this.httpHandlers.getEndpoint('ping');
    const observable = this.httpClient.get<IPingResponse>(endpoint);
    return this.httpHandlers.pipeHttpResponse<IPingResponse>(observable);
  }
}
