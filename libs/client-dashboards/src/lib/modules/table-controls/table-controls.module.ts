import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AppTableColumnSettingsComponent } from './table-column-settings/table-column-settings.component';
import { AppTableRowMenuComponent } from './table-row-menu/table-row-menu.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, MatListModule],
  declarations: [AppTableColumnSettingsComponent, AppTableRowMenuComponent],
  exports: [AppTableColumnSettingsComponent, AppTableRowMenuComponent],
})
export class AppTableControlsModule {}
