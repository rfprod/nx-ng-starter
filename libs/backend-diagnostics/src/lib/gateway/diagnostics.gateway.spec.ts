import { INestApplication } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { Test, TestingModule } from '@nestjs/testing';
import { Server, WebSocket } from 'ws';

import { AppDiagnosticsService } from '../services/diagnostics.service';
import { AppDiagnosticsGateway } from './diagnostics.gateway';

const addWsClient = (server: Server, wsClient?: WebSocket) => {
  if (typeof wsClient !== 'undefined') {
    server.clients.add(wsClient);
  }
};

const removeWsClient = (server: Server, wsClient?: WebSocket) => {
  if (typeof wsClient !== 'undefined') {
    server.clients.clear();
    server.clients.delete(wsClient);
  }
};

describe('AppDiagnosticsGateway', () => {
  let testingModule: TestingModule;
  let gateway: AppDiagnosticsGateway;
  let gatewaySpy: {
    sendEvent: jest.SpyInstance;
    broadcastEvent: jest.SpyInstance;
  };
  let app: INestApplication;
  const appPort = 8082;
  let wsClient: WebSocket | undefined;
  let server: Server;

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [
        AppDiagnosticsGateway,
        {
          provide: AppDiagnosticsService,
          useValue: {
            dinamyc: () => [],
          },
        },
      ],
    })
      .compile()
      .then(module => {
        testingModule = module;
        gateway = testingModule.get<AppDiagnosticsGateway>(AppDiagnosticsGateway);
        gatewaySpy = {
          sendEvent: jest.spyOn(gateway, 'sendEvent'),
          broadcastEvent: jest.spyOn(gateway, 'broadcastEvent'),
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

  afterEach(() => {
    gatewaySpy.sendEvent.mockReset();
    gatewaySpy.broadcastEvent.mockReset();
  });

  afterAll(async () => {
    gateway.stopSendingDiagnosticEvents();
    server.removeAllListeners();
    app.getMicroservices().forEach(async service => {
      await service.close();
    });
  });

  it('test', () => {
    expect(true).toBeTruthy();
  });

  it('handleConnection should call broadcastEvent', async () => {
    expect(wsClient).toBeDefined();

    addWsClient(server, wsClient);

    await gateway.handleConnection();
    expect(gatewaySpy.broadcastEvent).toHaveBeenCalledWith({ data: [{ name: 'active', value: 1 }], event: 'users' });
    expect(gatewaySpy.sendEvent).toHaveBeenCalled();

    removeWsClient(server, wsClient);

    gatewaySpy.sendEvent.mockClear();
  });

  it('handleDisconnect should call broadcastEvent', async () => {
    await gateway.handleDisconnect();
    expect(gatewaySpy.broadcastEvent).toHaveBeenCalledWith({ data: [{ name: 'active', value: 0 }], event: 'users' });
    expect(gatewaySpy.sendEvent).not.toHaveBeenCalled();

    removeWsClient(server, wsClient);
  });

  it('handleConnection should not send an event with currently connected users count if input value is not provided and here are no connected users', async () => {
    await gateway.handleConnection();
    expect(gatewaySpy.sendEvent).not.toHaveBeenCalled();
  });

  it('handleConnection should send an event with currently connected users count if input value is not provided and here are no connected users', async () => {
    expect(wsClient).toBeDefined();

    addWsClient(server, wsClient);

    await gateway.handleConnection();
    expect(gatewaySpy.sendEvent).toHaveBeenCalled();

    removeWsClient(server, wsClient);

    gatewaySpy.sendEvent.mockClear();
  });
});
