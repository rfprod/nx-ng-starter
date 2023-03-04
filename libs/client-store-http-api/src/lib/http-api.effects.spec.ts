import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { first, of, tap } from 'rxjs';

import { httpApiActions } from './http-api.actions';
import { AppHttpApiEffects } from './http-api.effects';
import { httpApiReducerConfig, IHttpApiState, IPingResponse } from './http-api.interface';
import { httpApiReducerProvider } from './http-api.reducer';
import { httpApiSelectors } from './http-api.selectors';
import { AppHttpApiService } from './services/http-api/http-api.service';

describe('AppHttpApiEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      StoreModule.forFeature<IHttpApiState>(httpApiReducerConfig.featureName, httpApiReducerConfig.token),
      EffectsModule.forFeature([AppHttpApiEffects]),
    ],
    providers: [
      httpApiReducerProvider,
      {
        provide: AppHttpApiService,
        useValue: {
          ping: () => of(<IPingResponse>{ message: 'test' }),
        },
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IHttpApiState>;
  let service: AppHttpApiService;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        service = TestBed.inject(AppHttpApiService);
      });
  }));

  it('should call http api service when the ping action is dispatched', waitForAsync(() => {
    const response: IPingResponse = { message: 'test' };
    const pingSpy = jest.spyOn(service, 'ping').mockReturnValue(of(response));
    store.dispatch(httpApiActions.ping());
    void store
      .select(httpApiSelectors.ping)
      .pipe(
        first(),
        tap(ping => {
          expect(pingSpy).toHaveBeenCalledTimes(1);
          expect(ping).toEqual(response.message);
        }),
      )
      .subscribe();
  }));
});
