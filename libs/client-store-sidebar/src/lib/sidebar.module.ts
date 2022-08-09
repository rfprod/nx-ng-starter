import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppSidebarEffects } from './sidebar.effects';
import { featureName, ISidebarState } from './sidebar.interface';
import { AppSidebarReducer } from './sidebar.reducer';

@NgModule({
  imports: [
    MatSidenavModule,
    StoreModule.forFeature<ISidebarState>(featureName, AppSidebarReducer.token),
    EffectsModule.forFeature([AppSidebarEffects]),
  ],
})
export class AppSidebarStoreModule {
  public static forRoot(): ModuleWithProviders<AppSidebarStoreModule> {
    return {
      ngModule: AppSidebarStoreModule,
      providers: [AppSidebarReducer.provider],
    };
  }
}
