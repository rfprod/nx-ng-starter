import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StoreModule } from '@ngrx/store';

import { featureName, IMdFilesState } from './md-files.interface';
import { AppMdFilesReducer } from './md-files.reducer';

export const mdFilesModuleProviders: Provider[] = [AppMdFilesReducer.provider];

@NgModule({
  imports: [MatSidenavModule, StoreModule.forFeature<IMdFilesState>(featureName, AppMdFilesReducer.token)],
  providers: [...mdFilesModuleProviders],
})
export class AppMdFilesStoreModule {
  public static forRoot(): ModuleWithProviders<AppMdFilesStoreModule> {
    return {
      ngModule: AppMdFilesStoreModule,
      providers: [...mdFilesModuleProviders],
    };
  }
}
