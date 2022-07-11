import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppClientSidebarRoutingModule } from './client-sidebar-routing.module';
import { AppSidebarRootComponent } from './components/sidebar-root/sidebar-root.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatGridListModule,
    AppClientSidebarRoutingModule,
  ],
  declarations: [AppSidebarRootComponent],
})
export class AppClientSidebarModule {}
