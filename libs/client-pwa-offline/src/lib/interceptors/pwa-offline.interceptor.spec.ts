import { HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NavigationBehaviorOptions, Router, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { WINDOW } from '@app/client-util';
import { NEVER, of, tap } from 'rxjs';

import { AppPwaOfflineInterceptor } from './pwa-offline.interceptor';

describe('AppPwaOfflineInterceptor', () => {
  let interceptor: AppPwaOfflineInterceptor;
  let router: Router;
  let routerSpy: jest.SpyInstance;

  const configureTestBed = (
    windowMock = {
      navigator: {
        onLine: true,
      },
    },
  ) => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          AppPwaOfflineInterceptor,
          {
            provide: WINDOW,
            useValue: windowMock,
          },
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
    configureTestBed({ navigator: { onLine: false } });

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
