import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppClientMaterialModule } from '@app/client-material';

import { AppClientSidebarRoutingModule } from './client-sidebar-routing.module';
import { AppSidebarRootComponent } from './components/sidebar-root/sidebar-root.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppClientMaterialModule, AppClientSidebarRoutingModule],
  declarations: [AppSidebarRootComponent],
})
export class AppClientSidebarModule {}
