import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WINDOW } from '@app/client-util';
import { NEVER, Observable } from 'rxjs';

/**
 * PWA offline interceptor.
 * Redirects to a dedicated view when the app goes offline.
 */
@Injectable({
  providedIn: 'root',
})
export class AppPwaOfflineInterceptor implements HttpInterceptor {
  constructor(@Inject(WINDOW) private readonly win: Window, private readonly router: Router) {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const routeLoaded = this.router.url.includes('offline');
    if (!this.win.navigator.onLine && !routeLoaded) {
      void this.router.navigateByUrl('/offline');
      return NEVER;
    }
    return next.handle(req);
  }
}
