import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppClientMaterialModule } from '@app/client-material';

import { AppClientDiagnosticsRoutingModule } from './client-diagnostics-routing.module';
import { AppDiagnosticsHomeComponent } from './home/diagnostics-home.component';
import { AppDiagnosticsHomePage } from './home/page/diagnostics-home-page.component';
import { AppDiagnosticsIndexComponent } from './index/diagnostics-index.component';
import { AppDiagnosticsInfoComponent } from './info/diagnostics-info.component';
import { AppDiagnosticsInfoPage } from './info/page/diagnostics-info-page.component';

@NgModule({
  imports: [FlexLayoutModule, CommonModule, AppClientMaterialModule, AppClientDiagnosticsRoutingModule],
  declarations: [
    AppDiagnosticsIndexComponent,
    AppDiagnosticsHomeComponent,
    AppDiagnosticsHomePage,
    AppDiagnosticsInfoComponent,
    AppDiagnosticsInfoPage,
  ],
})
export class AppClientDiagnosticsModule {}
