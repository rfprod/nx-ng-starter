import type { INestApplication } from '@nestjs/common';
import { WsAdapter } from '@nestjs/platform-ws';
import { Test, type TestingModule } from '@nestjs/testing';
import type { MockInstance } from 'vitest';
import type { Server, WebSocket } from 'ws';

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
    sendEvent: MockInstance;
    broadcastEvent: MockInstance;
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
      .then(async module => {
        testingModule = module;

        app = testingModule.createNestApplication();
        app.useWebSocketAdapter(new WsAdapter(app));

        await app.listen(appPort, '0.0.0.0');

        server = {
          removeAllListeners: (eventName?: string | symbol | undefined) => void 0,
          clients: new Set(),
        } as unknown as Server;

        gateway = testingModule.get<AppDiagnosticsGateway>(AppDiagnosticsGateway);
        gatewaySpy = {
          sendEvent: vi.spyOn(gateway, 'sendEvent'),
          broadcastEvent: vi.spyOn(gateway, 'broadcastEvent'),
        };

        gateway['server'] = server;

        wsClient = {
          send: vi.fn(),
        } as unknown as WebSocket;
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
  });

  it('handleConnection should not send an event with currently connected users count if input value is not provided and here are no connected users', async () => {
    await gateway.handleConnection();
    expect(gatewaySpy.sendEvent).not.toHaveBeenCalled();
  });
});
