import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppClientPwaOfflineRoutingModule } from './client-pwa-offline-routing.module';
import { AppPwaOfflineComponent } from './components/pwa-offline/pwa-offline.component';
import { AppPwaOfflineInterceptor } from './interceptors/pwa-offline.interceptor';

/**
 * PWA offline module.
 * Provides an interceptor that redirects to a dedicated view when the app goes offline.
 */
@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, AppClientPwaOfflineRoutingModule],
  declarations: [AppPwaOfflineComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppPwaOfflineInterceptor,
      multi: true,
    },
  ],
})
export class AppClientPwaOfflineModule {}
