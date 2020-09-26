import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppClientMaterialModule } from '@nx-ng-starter/client-material';

import { AppClientComponentsRoutingModule } from './client-components-routing.module';
import { AppHomeComponent } from './home/home.component';
import { AppHomePage } from './home/page/home-page.component';
import { AppIndexComponent } from './index/index.component';
import { AppInfoComponent } from './info/info.component';
import { AppInfoPage } from './info/page/info-page.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    CommonModule,
    AppClientMaterialModule,
    AppClientComponentsRoutingModule,
  ],
  declarations: [AppIndexComponent, AppHomeComponent, AppHomePage, AppInfoComponent, AppInfoPage],
})
export class AppClientComponentsModule {}
