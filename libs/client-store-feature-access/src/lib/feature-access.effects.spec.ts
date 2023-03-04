import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs';

import { featureAccessActions } from './feature-access.actions';
import { AppFeatureAccessEffects } from './feature-access.effects';
import { featureAccessReducerConfig, IFeatureAccessState } from './feature-access.interface';
import { featureAccessReducerProvider } from './feature-access.reducer';
import { featureAccessSelectors } from './feature-access.selectors';

describe('AppFeatureAccessEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      StoreModule.forFeature<IFeatureAccessState>(featureAccessReducerConfig.featureName, featureAccessReducerConfig.token),
      EffectsModule.forFeature([AppFeatureAccessEffects]),
    ],
    providers: [featureAccessReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IFeatureAccessState>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
      });
  }));

  it('should dispatch the setEnvironment action when the initialize action is dispatched', waitForAsync(() => {
    const payload = { production: true };
    store.dispatch(featureAccessActions.setEnvironment({ payload }));
    const setEnvironmentSpy = jest.spyOn(featureAccessActions, 'setEnvironment');
    void store
      .select(featureAccessSelectors.enable)
      .pipe(
        first(),
        tap(enable => {
          expect(enable).toBeFalsy();
          store.dispatch(featureAccessActions.initialize());
        }),
        switchMap(() => store.select(featureAccessSelectors.enable)),
        first(),
        tap(enable => {
          expect(setEnvironmentSpy).toHaveBeenCalledTimes(1);
          expect(enable).toBeTruthy();
        }),
      )
      .subscribe();
  }));
});
