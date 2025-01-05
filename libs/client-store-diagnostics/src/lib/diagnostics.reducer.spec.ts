import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, tap } from 'rxjs';

import { diagnosticsAction } from './diagnostics.actions';
import { diagnosticsReducerConfig, type IDiagnosticsState, type IDiagnosticsStateModel } from './diagnostics.interface';
import { AppDiagnosticsReducer, diagnosticsReducerProvider } from './diagnostics.reducer';
import { diagnosticsSelector } from './diagnostics.selectors';

describe('AppDiagnosticsReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IDiagnosticsState>(diagnosticsReducerConfig.featureName, diagnosticsReducerConfig.token)],
    providers: [diagnosticsReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppDiagnosticsReducer;
  let store: Store<IDiagnosticsState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    reducer = TestBed.inject(AppDiagnosticsReducer);
    store = TestBed.inject(Store);
  });

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = diagnosticsReducerConfig.initialState;
    const expectation: IDiagnosticsStateModel = { users: 0, events: [], dynamicData: [], staticData: [] };
    expect(initialState).toEqual(expectation);
  });

  it('should process the connected action correctly (push events, "users")', waitForAsync(() => {
    const payload: IDiagnosticsStateModel = { events: [{ data: [], event: 'users' }], users: 0, dynamicData: [], staticData: [] };
    store.dispatch(diagnosticsAction.connected({ payload }));
    void store
      .select(diagnosticsSelector.events)
      .pipe(
        first(),
        tap(events => {
          expect(events.length).toEqual(payload.events.length);
          expect(events[0]).toEqual(payload.events[0]);
        }),
      )
      .subscribe();
  }));
});
