import { OverlayModule } from '@angular/cdk/overlay';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppThemeEffects } from './theme.effects';
import { featureName, IThemeState } from './theme.interface';
import { AppThemeReducer } from './theme.reducer';

@NgModule({
  imports: [
    OverlayModule,
    StoreModule.forFeature<IThemeState>(featureName, AppThemeReducer.token),
    EffectsModule.forFeature([AppThemeEffects]),
  ],
})
export class AppThemeStoreModule {
  public static forRoot(): ModuleWithProviders<AppThemeStoreModule> {
    return {
      ngModule: AppThemeStoreModule,
      providers: [AppThemeReducer.provider],
    };
  }
}
