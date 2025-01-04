import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, tap } from 'rxjs';

import { httpApiAction } from './http-api.actions';
import { httpApiReducerConfig, type IHttpApiState, type IHttpApiStateModel } from './http-api.interface';
import { AppHttpApiReducer, httpApiReducerProvider } from './http-api.reducer';
import { httpApiSelector } from './http-api.selectors';

describe('AppHttpApiReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IHttpApiState>(httpApiReducerConfig.featureName, httpApiReducerConfig.token)],
    providers: [httpApiReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppHttpApiReducer;
  let store: Store<IHttpApiState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    reducer = TestBed.inject(AppHttpApiReducer);
    store = TestBed.inject(Store);
  });

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = httpApiReducerConfig.initialState;
    const expectation: IHttpApiStateModel = { ping: '' };
    expect(initialState).toEqual(expectation);
  });

  it('should process the pingSuccess action correctly', waitForAsync(() => {
    const payload = { message: 'test' };
    store.dispatch(httpApiAction.pingSuccess({ payload }));
    void store
      .select(httpApiSelector.ping)
      .pipe(
        first(),
        tap(ping => {
          expect(ping).toEqual(payload.message);
        }),
      )
      .subscribe();
  }));
});
