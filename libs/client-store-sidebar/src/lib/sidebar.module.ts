import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppSidebarEffects } from './sidebar.effects';
import { ISidebarState, sidebarReducerConfig } from './sidebar.interface';
import { sidebarReducerProvider } from './sidebar.reducer';

@NgModule({
  imports: [
    MatSidenavModule,
    StoreModule.forFeature<ISidebarState>(sidebarReducerConfig.featureName, sidebarReducerConfig.token),
    EffectsModule.forFeature([AppSidebarEffects]),
  ],
})
export class AppSidebarStoreModule {
  public static forRoot(): ModuleWithProviders<AppSidebarStoreModule> {
    return {
      ngModule: AppSidebarStoreModule,
      providers: [sidebarReducerProvider],
    };
  }
}
