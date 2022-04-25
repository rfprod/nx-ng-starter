import { defaultWsPort } from '@app/backend-interfaces';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Server, WebSocket } from 'ws';

@WebSocketGateway(defaultWsPort, {
  path: '/api/events',
  transports: ['websocket'],
})
export class AppEventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  /**
   * Platform-specific server instance.
   */
  @WebSocketServer()
  protected server?: Server;

  /**
   * Currently connected users count.
   */
  private readonly usersSubject$ = new BehaviorSubject<number>(0);

  /**
   * Sends an event to a client.
   * @param client web socket client
   * @param data stringified event data
   */
  public sendEvent(client: WebSocket, data: string) {
    client.send(data);
  }

  /**
   * Sends an event with connected users count to all connected users.
   */
  public broadcastConnectedUsersCount(usersCount?: number): void {
    if (typeof this.server !== 'undefined') {
      const clients = this.server.clients.values();
      for (const client of clients) {
        const data = usersCount ?? this.usersSubject$.value;
        const stringifiedData = JSON.stringify({ event: 'users', data });
        this.sendEvent(client, stringifiedData);
      }
    }
  }

  /**
   * User connection handler.
   */
  public async handleConnection() {
    const usersCount = this.usersSubject$.value + 1;
    this.usersSubject$.next(usersCount);
    this.broadcastConnectedUsersCount(usersCount);
  }

  /**
   * User disconnection handler.
   */
  public async handleDisconnect() {
    const usersCount = this.usersSubject$.value - 1;
    this.usersSubject$.next(usersCount);
    this.broadcastConnectedUsersCount(usersCount);
  }

  /**
   * Events handler.
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
