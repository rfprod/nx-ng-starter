import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppUserEffects } from './user.effects';
import { IUserState, userReducerConfig } from './user.interface';
import { userReducerProvider } from './user.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<IUserState>(userReducerConfig.featureName, userReducerConfig.token),
    EffectsModule.forFeature([AppUserEffects]),
  ],
})
export class AppUserStoreModule {
  public static forRoot(): ModuleWithProviders<AppUserStoreModule> {
    return {
      ngModule: AppUserStoreModule,
      providers: [userReducerProvider],
    };
  }
}
