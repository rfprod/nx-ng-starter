import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppMdFilesState } from './md-files.store';

@NgModule({
  imports: [NgxsModule.forFeature([AppMdFilesState])],
})
export class AppMdFilesModule {}
