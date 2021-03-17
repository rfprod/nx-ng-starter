import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxsModule } from '@ngxs/store';

import { AppGlobalProgressBarComponent } from './components/global-progress-bar/global-progress-bar.component';
import { httpProgressServiceProvider } from './http-progress.service';
import { AppHttpProgressState } from './http-progress.store';

export const httpProgressModuleProviders: Provider[] = [httpProgressServiceProvider];

@NgModule({
  imports: [NgxsModule.forFeature([AppHttpProgressState]), MatProgressBarModule],
  declarations: [AppGlobalProgressBarComponent],
})
export class AppHttpProgressStoreModule {
  public static forRoot(): ModuleWithProviders<AppHttpProgressStoreModule> {
    return {
      ngModule: AppHttpProgressStoreModule,
      providers: [...httpProgressModuleProviders],
    };
  }
}
