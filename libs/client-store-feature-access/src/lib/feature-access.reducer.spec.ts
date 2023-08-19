import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, tap } from 'rxjs';

import { featureAccessAction } from './feature-access.actions';
import { featureAccessReducerConfig, IFeatureAccessState, IFeatureAccessStateModel } from './feature-access.interface';
import { AppFeatureAccessReducer, featureAccessReducerProvider } from './feature-access.reducer';
import { featureAccessSelector } from './feature-access.selectors';

describe('AppFeatureAccessReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IFeatureAccessState>(featureAccessReducerConfig.featureName, featureAccessReducerConfig.token)],
    providers: [featureAccessReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppFeatureAccessReducer;
  let store: Store<IFeatureAccessState>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        reducer = TestBed.inject(AppFeatureAccessReducer);
        store = TestBed.inject(Store);
      });
  }));

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = featureAccessReducerConfig.initialState;
    const expectation: IFeatureAccessStateModel = { environment: { production: false }, featureFlags: {} };
    expect(initialState).toEqual(expectation);
  });

  it('should process the setEnvironment action correctly', waitForAsync(() => {
    const payload = { production: true };
    store.dispatch(featureAccessAction.setEnvironment({ payload }));
    void store
      .select(featureAccessSelector.enable)
      .pipe(
        first(),
        tap(enable => {
          expect(enable).toBeFalsy();
        }),
      )
      .subscribe();
  }));
});
