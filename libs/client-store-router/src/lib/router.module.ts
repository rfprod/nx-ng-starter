import { Location } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { NavigationActionTiming, routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { AppRouteSerializer } from './route.serializer';
import { AppRouterEffects } from './router.effects';
import { featureName, IRouterState } from './router.interface';

@NgModule({
  imports: [
    StoreRouterConnectingModule.forRoot({
      serializer: AppRouteSerializer,
      navigationActionTiming: NavigationActionTiming.PostActivation,
    }),
    StoreModule.forFeature<IRouterState>(featureName, { router: routerReducer }),
    EffectsModule.forFeature([AppRouterEffects]),
  ],
})
export class AppRouterStoreModule {
  public static forRoot(): ModuleWithProviders<AppRouterStoreModule> {
    return {
      ngModule: AppRouterStoreModule,
      providers: [Location],
    };
  }
}
