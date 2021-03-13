import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { defaultWsPort } from '@nx-ng-starter/backend-interfaces';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Server } from 'ws';

@WebSocketGateway(defaultWsPort, {
  path: '/api/events',
  transports: ['websocket'],
})
export class BackendEventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  /**
   * Platform-specific server instance.
   */
  @WebSocketServer()
  protected server?: Server;

  /**
   * Currently coonected users count.
   */
  private readonly users$ = new BehaviorSubject<number>(0);

  private sendClientChangeEvent(data: number): void {
    if (typeof this.server !== 'undefined') {
      const clients = this.server.clients.values();
      for (const client of clients) {
        client.send(JSON.stringify({ event: 'users', data }));
      }
    }
  }

  public async handleConnection() {
    // client disconnected
    const usersCount = this.users$.value + 1;
    this.users$.next(usersCount);

    // Notify connected clients of current users
    this.sendClientChangeEvent(usersCount);
  }

  public async handleDisconnect() {
    // client disconnected
    const usersCount = this.users$.value - 1;
    this.users$.next(usersCount);

    // Notify connected clients of current users
    this.sendClientChangeEvent(usersCount);
  }

  /**
   * Events subscription.
   * @param data
   */
  @SubscribeMessage('events')
  public handleEvents(): Observable<WsResponse<number>> {
    const timeout = 1000;
    const eventsCount = 4;
    return timer(0, timeout).pipe(
      takeWhile(item => item < eventsCount),
      map(item => {
        const wsResponse: WsResponse<number> = { event: 'timer', data: item };
        return wsResponse;
      }),
    );
  }
}
