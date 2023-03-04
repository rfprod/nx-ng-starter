import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StoreModule } from '@ngrx/store';

import { IMdFilesState, mdFilesReducerConfig } from './md-files.interface';
import { mdFilesReducerProvider } from './md-files.reducer';

@NgModule({
  imports: [MatSidenavModule, StoreModule.forFeature<IMdFilesState>(mdFilesReducerConfig.featureName, mdFilesReducerConfig.token)],
})
export class AppMdFilesStoreModule {
  public static forRoot(): ModuleWithProviders<AppMdFilesStoreModule> {
    return {
      ngModule: AppMdFilesStoreModule,
      providers: [mdFilesReducerProvider],
    };
  }
}
