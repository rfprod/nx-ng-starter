import { INestApplication } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { Test, TestingModule } from '@nestjs/testing';
import { lastValueFrom } from 'rxjs';
import { Server, WebSocket } from 'ws';

import { AppEventsGateway } from './events.gateway';

const addWsClient = (server: Server, wsClient?: WebSocket) => {
  if (typeof wsClient !== 'undefined') {
    server.clients.add(wsClient);
  }
};

const removeWsClient = (server: Server, wsClient?: WebSocket) => {
  if (typeof wsClient !== 'undefined') {
    server.clients.delete(wsClient);
  }
};

describe('AppEventsGateway', () => {
  let testingModule: TestingModule;
  let gateway: AppEventsGateway;
  let gatewaySpy: {
    sendEvent: jest.SpyInstance;
    broadcastConnectedUsersCount: jest.SpyInstance;
  };
  let app: INestApplication;
  const appPort = 8082;
  let wsClient: WebSocket | undefined;
  let server: Server;

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [AppEventsGateway],
    })
      .compile()
      .then(module => {
        testingModule = module;
        gateway = testingModule.get<AppEventsGateway>(AppEventsGateway);
        gatewaySpy = {
          sendEvent: jest.spyOn(gateway, 'sendEvent'),
          broadcastConnectedUsersCount: jest.spyOn(gateway, 'broadcastConnectedUsersCount'),
        };

        app = testingModule.createNestApplication();
        app.useWebSocketAdapter(new WsAdapter(app));

        return app.listen(appPort, '0.0.0.0').then(() => app.getUrl());
      })
      .then(appUrl => {
        server = new Server({ server: app.getHttpServer() });
        gateway['server'] = server;

        const wsUrl = `${appUrl.replace(/http/, 'ws')}/api/events`;
        wsClient = new WebSocket(wsUrl);
        wsClient.send = () => true;
      });
  });

  afterAll(async () => {
    wsClient?.close();
    server.close();
    await app.close();
  });

  it('handleConnection should call broadcastConnectedUsersCount', async () => {
    expect(wsClient).toBeDefined();

    addWsClient(server, wsClient);

    await gateway.handleConnection();
    expect(gatewaySpy.broadcastConnectedUsersCount).toHaveBeenCalledWith(1);
    expect(gatewaySpy.sendEvent).toHaveBeenCalled();

    removeWsClient(server, wsClient);

    gatewaySpy.sendEvent.mockClear();
  });

  it('handleDisconnect should call broadcastConnectedUsersCount', async () => {
    await gateway.handleDisconnect();
    expect(gatewaySpy.broadcastConnectedUsersCount).toHaveBeenCalledWith(0);
    expect(gatewaySpy.sendEvent).not.toHaveBeenCalled();
  });

  it('broadcastConnectedUsersCount should not send an event with currently connected users count if input value is not provided and here are no connected users', () => {
    gateway.broadcastConnectedUsersCount();
    expect(gatewaySpy.sendEvent).not.toHaveBeenCalled();
  });

  it('broadcastConnectedUsersCount should send an event with currently connected users count if input value is not provided and here are no connected users', async () => {
    expect(wsClient).toBeDefined();

    addWsClient(server, wsClient);

    gateway.broadcastConnectedUsersCount();
    expect(gatewaySpy.sendEvent).toHaveBeenCalled();

    removeWsClient(server, wsClient);

    gatewaySpy.sendEvent.mockClear();
  });

  it('handleEvents should send 4 events in a row with the 1 second delay', async () => {
    const result = await lastValueFrom(gateway.handleEvents());
    expect(result).toEqual({ event: 'timer', data: 3 });
  });
});
