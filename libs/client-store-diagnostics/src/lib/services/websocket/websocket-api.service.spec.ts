import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { flushHttpRequests, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Observable, of, tap } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

import { IWebsocketConfig, IWebsocketResponseEvent, WS_CONFIG } from '../../diagnostics.interface';
import { AppWebsocketApiService } from './websocket-api.service';

describe('AppWebsocketApiService correct connection', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [HttpClientTestingModule],
    providers: [
      AppWebsocketApiService,
      {
        provide: WS_CONFIG,
        useValue: {
          url: 'ws://localhost:8081/api/events',
        },
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppWebsocketApiService;
  let wsConfig: IWebsocketConfig;

  let httpController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AppWebsocketApiService);
        wsConfig = TestBed.inject(WS_CONFIG);
      });
  }));

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('should work as expected when the websocket url is provided correctly', waitForAsync(() => {
    expect(wsConfig.url).toEqual('ws://localhost:8081/api/events');
    void service
      .connect()
      .pipe(
        tap(result => {
          expect(result instanceof WebSocketSubject).toBeTruthy();
        }),
      )
      .subscribe();
  }));

  it('should work as expected when the websocket url is provided correctly and the websocket connection emits', waitForAsync(() => {
    const testData: IWebsocketResponseEvent = { event: 'data', data: 1 };
    (service as unknown as { wsSubject: Observable<IWebsocketResponseEvent> }).wsSubject = of(testData);
    void service
      .connect()
      .pipe(
        tap(result => {
          expect(result).toEqual(testData);
        }),
      )
      .subscribe();
  }));

  it('startDiagEvents should work as expected', () => {
    const nextEventSpy = jest.spyOn(service['wsSubject'], 'next');
    service.startDiagEvents();
    const event = { event: 'start-diag' };
    expect(nextEventSpy).toHaveBeenCalledWith(event);
  });

  it('stopDiagEvents should work as expected', () => {
    const nextEventSpy = jest.spyOn(service['wsSubject'], 'next');
    service.stopDiagEvents();
    const event = { event: 'stop-diag' };
    expect(nextEventSpy).toHaveBeenCalledWith(event);
  });
});

describe('AppWebsocketApiService incorrect connection', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [HttpClientTestingModule],
    providers: [
      AppWebsocketApiService,
      {
        provide: WS_CONFIG,
        useValue: {
          url: '',
        },
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppWebsocketApiService;
  let wsConfig: IWebsocketConfig;

  let httpController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        httpController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(AppWebsocketApiService);
        wsConfig = TestBed.inject(WS_CONFIG);
      });
  }));

  afterEach(() => {
    flushHttpRequests(httpController, true);
  });

  it('should work as expected when the websocket url is provided incorrectly', waitForAsync(() => {
    expect(wsConfig.url).toEqual('');
    const spy = jest.spyOn(console, 'error');
    void service
      .connect()
      .pipe(
        tap({
          next: void 0,
          error: error => {
            expect(spy).toHaveBeenCalledWith('error', error);
          },
        }),
      )
      .subscribe();
  }));
});
