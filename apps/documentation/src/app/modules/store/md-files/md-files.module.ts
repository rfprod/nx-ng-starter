import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { MdFilesState } from './md-files.store';

@NgModule({
  imports: [NgxsModule.forFeature([MdFilesState])],
})
export class MdFilesModule {}
