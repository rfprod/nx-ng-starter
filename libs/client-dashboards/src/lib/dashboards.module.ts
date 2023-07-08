import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppDirectivesModule } from '@app/client-directives';

import { AppDashboardsComponent } from './components/dashboards/dashboards.component';
import { AppTableComponent } from './components/table/table.component';
import { AppDashboardsRoutingModule } from './dashboards-routing.module';
import { AppTableControlsModule } from './modules/table-controls/table-controls.module';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AppTableControlsModule,
    AppDashboardsRoutingModule,
    AppDirectivesModule,
  ],
  declarations: [AppDashboardsComponent, AppTableComponent],
})
export class AppDashboardsModule {}
