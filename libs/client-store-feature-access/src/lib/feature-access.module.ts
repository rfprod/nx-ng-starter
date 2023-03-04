import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppFeatureAccessEffects } from './feature-access.effects';
import { featureAccessReducerConfig, IFeatureAccessState } from './feature-access.interface';
import { featureAccessReducerProvider } from './feature-access.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<IFeatureAccessState>(featureAccessReducerConfig.featureName, featureAccessReducerConfig.token),
    EffectsModule.forFeature([AppFeatureAccessEffects]),
  ],
})
export class AppFeatureAccessStoreModule {
  public static forRoot(): ModuleWithProviders<AppFeatureAccessStoreModule> {
    return {
      ngModule: AppFeatureAccessStoreModule,
      providers: [featureAccessReducerProvider],
    };
  }
}
