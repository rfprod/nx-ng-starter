import { TestBed, waitForAsync } from '@angular/core/testing';
import * as Sentry from '@sentry/angular';

import { AppSentryService } from './sentry.service';

describe('AppSentryService', () => {
  let service: AppSentryService;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule({
        providers: [
          {
            provide: Sentry.TraceService,
            useValue: {},
          },
          {
            provide: AppSentryService,
            useFactory: (trace: Sentry.TraceService) => new AppSentryService(trace),
            deps: [Sentry.TraceService],
          },
        ],
      })
        .compileComponents()
        .then(() => {
          service = TestBed.inject(AppSentryService);
        });
    }),
  );

  it('should exist', () => {
    expect(service).toBeTruthy();
  });
});
