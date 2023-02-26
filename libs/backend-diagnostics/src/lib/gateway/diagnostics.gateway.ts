import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Subscription, tap, timer } from 'rxjs';
import WebSocket, { Server } from 'ws';

import { dianosticEventsGatewayPort, IUserCountEvent, TDiagData } from '../interfaces/diagnostics.interface';
import { AppDiagnosticsService } from '../services/diagnostics.service';

@WebSocketGateway(dianosticEventsGatewayPort, {
  path: '/api/events',
  transports: ['websocket'],
})
export class AppDiagnosticsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  /**
   * Platform-specific server instance.
   */
  @WebSocketServer()
  protected server?: Server;

  private dynamicDataSub?: Subscription;

  constructor(private readonly service: AppDiagnosticsService) {}

  /**
   * Sends an event to a client.
   * @param client web socket client
   * @param data stringified event data
   */
  public sendEvent(client: WebSocket.WebSocket, data: string) {
    client.send(data);
  }

  /**
   * Broadcasts an event to all connected users.
   */
  public broadcastEvent<T = Record<string, unknown>>(event: T): void {
    if (typeof this.server !== 'undefined') {
      const clients = this.server.clients.values();
      for (const client of clients) {
        const stringifiedEvent = JSON.stringify(event);
        this.sendEvent(client, stringifiedEvent);
      }
    }
  }

  private sendClientChangeEvent(): void {
    if (typeof this.server !== 'undefined') {
      const event: IUserCountEvent = {
        event: 'users',
        data: [
          {
            name: 'active',
            value: this.server.clients.size,
          },
        ],
      };
      this.broadcastEvent(event);
    }
  }

  public async handleConnection() {
    this.sendClientChangeEvent();
  }

  public async handleDisconnect() {
    this.sendClientChangeEvent();
  }

  @SubscribeMessage('start-diag')
  public startSendingDiagnosticEvents() {
    if (typeof this.dynamicDataSub === 'undefined') {
      const timeout = 5000;
      this.dynamicDataSub = timer(0, timeout)
        .pipe(
          tap(() => {
            const event: WsResponse<TDiagData> = {
              event: 'dynamic',
              data: this.service.dynamic(),
            };
            this.broadcastEvent(event);
          }),
        )
        .subscribe();
    }
  }

  @SubscribeMessage('stop-diag')
  public stopSendingDiagnosticEvents() {
    if (typeof this.dynamicDataSub !== 'undefined') {
      this.dynamicDataSub.unsubscribe();
      this.dynamicDataSub = void 0;
    }
  }
}
