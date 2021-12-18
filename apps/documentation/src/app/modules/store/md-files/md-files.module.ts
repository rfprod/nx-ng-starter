import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppMdFilesState } from './md-files.state';

@NgModule({
  imports: [NgxsModule.forFeature([AppMdFilesState])],
})
export class AppMdFilesModule {}
