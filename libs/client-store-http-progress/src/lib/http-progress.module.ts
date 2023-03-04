import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppGlobalProgressBarComponent } from './components/global-progress-bar/global-progress-bar.component';
import { AppHttpProgressEffects } from './http-progress.effects';
import { httpProgressReducerConfig, IHttpProgressState } from './http-progress.interface';
import { httpProgressReducerProvider } from './http-progress.reducer';
import { httpProgressService } from './services/http-progress/http-progress.service';

@NgModule({
  imports: [
    MatProgressBarModule,
    StoreModule.forFeature<IHttpProgressState>(httpProgressReducerConfig.featureName, httpProgressReducerConfig.token),
    EffectsModule.forFeature([AppHttpProgressEffects]),
  ],
  declarations: [AppGlobalProgressBarComponent],
})
export class AppHttpProgressStoreModule {
  public static forRoot(): ModuleWithProviders<AppHttpProgressStoreModule> {
    return {
      ngModule: AppHttpProgressStoreModule,
      providers: [httpProgressService, httpProgressReducerProvider],
    };
  }
}
