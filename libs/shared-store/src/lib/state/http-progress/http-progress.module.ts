import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { HttpProgressService } from './http-progress.service';
import { HttpProgressState } from './http-progress.store';

export const httpProgressModuleProviders: Provider[] = [HttpProgressService];

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([HttpProgressState])],
})
export class HttpProgressModule {
  public static forRoot(): ModuleWithProviders<HttpProgressModule> {
    return {
      ngModule: HttpProgressModule,
      providers: [...httpProgressModuleProviders],
    };
  }
}
