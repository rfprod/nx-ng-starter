import { type HttpHandler, HttpRequest, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { type NavigationBehaviorOptions, provideRouter, Router, type UrlTree } from '@angular/router';
import { NEVER, of, tap } from 'rxjs';

import { NAVIGATOR } from '../providers/navigator.provider';
import { AppPwaOfflineInterceptor } from './pwa-offline.interceptor';

describe('AppPwaOfflineInterceptor', () => {
  let interceptor: AppPwaOfflineInterceptor;
  let router: Router;
  let routerSpy: jest.SpyInstance;

  const configureTestBed = (navigatorMock = { onLine: true }) => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          AppPwaOfflineInterceptor,
          {
            provide: NAVIGATOR,
            useValue: navigatorMock,
          },
          provideHttpClientTesting(),
          provideHttpClient(),
          provideRouter([]),
        ],
      }).compileComponents();

      interceptor = TestBed.inject(AppPwaOfflineInterceptor);
      router = TestBed.inject(Router);
      const routerSpyImplementation = (url: string | UrlTree, extras?: NavigationBehaviorOptions | undefined) =>
        new Promise<boolean>(resolve => resolve(true));
      routerSpy = jest.spyOn(router, 'navigateByUrl').mockImplementationOnce(routerSpyImplementation);
    });
  };

  describe('online', () => {
    configureTestBed();

    it('should be defined', () => {
      expect(interceptor).toBeDefined();
    });

    it('intercept method should not redirect when a network connection is available', waitForAsync(() => {
      const req = new HttpRequest('GET', 'https://api.test.com');
      const handler: HttpHandler = {
        handle: (httpReq: typeof req) => {
          return of();
        },
      };
      void interceptor
        .intercept(req, handler)
        .pipe(
          tap(res => {
            expect(routerSpy).not.toHaveBeenCalled();
            expect(res).not.toEqual(NEVER);
          }),
        )
        .subscribe();
    }));
  });

  describe('offline', () => {
    configureTestBed({ onLine: false });

    it('should be defined', () => {
      expect(interceptor).toBeDefined();
    });

    it('intercept method should redirect when a network connection is available', waitForAsync(() => {
      const req = new HttpRequest('GET', 'https://api.test.com');
      const handler: HttpHandler = {
        handle: (httpReq: typeof req) => {
          return of();
        },
      };
      void interceptor
        .intercept(req, handler)
        .pipe(
          tap(res => {
            expect(routerSpy).toHaveBeenCalledTimes(1);
            expect(res).not.toEqual(NEVER);
          }),
        )
        .subscribe();
    }));
  });
});
