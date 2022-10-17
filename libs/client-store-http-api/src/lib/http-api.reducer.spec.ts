import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, tap } from 'rxjs';

import { httpApiActions } from './http-api.actions';
import { featureName, IHttpApiState, IHttpApiStateModel } from './http-api.interface';
import { AppHttpApiReducer } from './http-api.reducer';
import { httpApiSelectors } from './http-api.selectors';

describe('AppHttpApiReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IHttpApiState>(featureName, AppHttpApiReducer.token)],
    providers: [AppHttpApiReducer.provider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppHttpApiReducer;
  let store: Store<IHttpApiState>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        reducer = TestBed.inject(AppHttpApiReducer);
        store = TestBed.inject(Store);
      });
  }));

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = AppHttpApiReducer.initialState;
    const expectation: IHttpApiStateModel = { ping: '' };
    expect(initialState).toEqual(expectation);
  });

  it('should process the pingSuccess action correctly', waitForAsync(() => {
    const payload = { message: 'test' };
    store.dispatch(httpApiActions.pingSuccess({ payload }));
    void store
      .select(httpApiSelectors.ping)
      .pipe(
        first(),
        tap(ping => {
          expect(ping).toEqual(payload.message);
        }),
      )
      .subscribe();
  }));
});
