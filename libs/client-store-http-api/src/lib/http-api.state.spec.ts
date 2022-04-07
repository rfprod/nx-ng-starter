import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of, switchMap, tap } from 'rxjs';

import { httpApiActions } from './http-api.actions';
import { httpApiInitialState } from './http-api.interface';
import { AppHttpApiService } from './http-api.service';
import { AppHttpApiState } from './http-api.state';

describe('AppHttpApiState', () => {
  const pingResult = { message: 'test' };

  const testBedConfig: TestModuleMetadata = {
    imports: [NgxsModule.forRoot([AppHttpApiState], { developmentMode: true })],
    providers: [
      {
        provide: AppHttpApiService,
        useValue: {
          ping: () => of({ ...pingResult }),
        },
      },
    ],
  };

  let store: Store;
  let service: AppHttpApiService;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        service = TestBed.inject(AppHttpApiService);
      });
  }));

  it('state selector should return the whole state', waitForAsync(() => {
    void store
      .selectOnce(AppHttpApiState.state)
      .pipe(
        tap(state => {
          expect(state).toEqual(httpApiInitialState);
        }),
      )
      .subscribe();
  }));

  it('ping selector should return partial state', waitForAsync(() => {
    void store
      .selectOnce(AppHttpApiState.ping)
      .pipe(
        tap(state => {
          expect(state).toEqual(httpApiInitialState.ping);
        }),
      )
      .subscribe();
  }));

  it('ping action should call the ping method of the api service', waitForAsync(() => {
    const spy = jest.spyOn(service, 'ping');
    void store
      .dispatch(new httpApiActions.ping())
      .pipe(
        switchMap(() => store.selectOnce(AppHttpApiState.ping)),
        tap(result => {
          expect(spy).toHaveBeenCalled();
          expect(result).toEqual(pingResult.message);
        }),
      )
      .subscribe();
  }));
});
