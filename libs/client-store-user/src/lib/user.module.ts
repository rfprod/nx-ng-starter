import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppUserEffects } from './user.effects';
import { featureName, IUserState } from './user.interface';
import { AppUserReducer } from './user.reducer';

@NgModule({
  imports: [StoreModule.forFeature<IUserState>(featureName, AppUserReducer.token), EffectsModule.forFeature([AppUserEffects])],
})
export class AppUserStoreModule {
  public static forRoot(): ModuleWithProviders<AppUserStoreModule> {
    return {
      ngModule: AppUserStoreModule,
      providers: [AppUserReducer.provider],
    };
  }
}
