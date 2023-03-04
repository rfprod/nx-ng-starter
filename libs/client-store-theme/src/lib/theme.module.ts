import { OverlayModule } from '@angular/cdk/overlay';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppThemeEffects } from './theme.effects';
import { IThemeState, themeReducerConfig } from './theme.interface';
import { themeReducerProvider } from './theme.reducer';

@NgModule({
  imports: [
    OverlayModule,
    StoreModule.forFeature<IThemeState>(themeReducerConfig.featureName, themeReducerConfig.token),
    EffectsModule.forFeature([AppThemeEffects]),
  ],
})
export class AppThemeStoreModule {
  public static forRoot(): ModuleWithProviders<AppThemeStoreModule> {
    return {
      ngModule: AppThemeStoreModule,
      providers: [themeReducerProvider],
    };
  }
}
