import { TestBed } from '@angular/core/testing';
import { testingEnvironment } from '@app/client-testing-unit';
import * as sentry from '@sentry/angular-ivy';

import { AppSentryService, initializeSentry, sentryProviders } from './sentry.service';

describe('AppSentryService', () => {
  let service: AppSentryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: sentry.TraceService,
          useValue: {},
        },
        {
          provide: AppSentryService,
          useFactory: (trace: sentry.TraceService) => new AppSentryService(trace),
          deps: [sentry.TraceService],
        },
      ],
    }).compileComponents();
    service = TestBed.inject(AppSentryService);
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  describe('initializeSentry', () => {
    let env: typeof testingEnvironment;

    beforeEach(() => {
      env = { ...testingEnvironment, sentry: { ...testingEnvironment.sentry } };
    });

    it('should not initialize Sentry for unit testing and development environments', () => {
      const initSpy = jest.spyOn(sentry, 'init');
      expect(env.sentry.env).toEqual('unit-testing');
      initializeSentry(env, env.meta.version);
      expect(initSpy).not.toHaveBeenCalled();

      env.sentry.env = 'development';
      initializeSentry(env, env.meta.version);
      expect(initSpy).not.toHaveBeenCalled();
    });

    it('should initialize Sentry for the production environment', () => {
      const initSpy = jest.spyOn(sentry, 'init');
      env.sentry.env = 'production';
      initializeSentry(env, env.meta.version);
      expect(initSpy).toHaveBeenCalled();
    });
  });

  describe('sentryProviders', () => {
    let env: typeof testingEnvironment;

    beforeEach(() => {
      env = { ...testingEnvironment, sentry: { ...testingEnvironment.sentry } };
    });

    it('should return an empty array for disabled environments', () => {
      expect(env.sentry.env).toEqual('unit-testing');
      let providers = sentryProviders(env);
      expect(providers.length).toEqual(0);

      env.sentry.env = 'development';
      providers = sentryProviders(env);
      expect(providers.length).toEqual(0);
    });

    it('should return 3 providers for the production environment', () => {
      env.sentry.env = 'production';
      const providers = sentryProviders(env);
      const expectedLength = 3;
      expect(providers.length).toEqual(expectedLength);
    });
  });
});
