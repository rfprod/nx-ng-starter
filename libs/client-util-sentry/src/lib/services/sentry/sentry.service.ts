import { EnvironmentProviders, ErrorHandler, inject, Injectable, provideAppInitializer, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { IWebClientAppEnvironment, TSentryEnvironment } from '@app/client-util';
import { BrowserTracing, createErrorHandler, init, routingInstrumentation, TraceService } from '@sentry/angular-ivy';

/**
 * Sentry is disabled for the environments defined in this array.
 */
const sentryDisabledEnvironments: TSentryEnvironment[] = ['unit-testing', 'development'];

/**
 * Initializes Sentry.
 * @param env web client environment
 * @param release release identifier
 */
export const initializeSentry = (env: IWebClientAppEnvironment, release: string) => {
  if (!sentryDisabledEnvironments.includes(env.sentry.env)) {
    init({
      environment: env.sentry.env,
      release,
      dsn: env.sentry.dsn,
      integrations: [
        /**
         * Registers and configures the Tracing integration,
         * which automatically instruments your application to monitor its
         * performance, including custom Angular routing instrumentation.
         */
        new BrowserTracing({
          tracingOrigins: ['localhost', /^\//, ...env.sentry.tracingOrigins],
          routingInstrumentation: routingInstrumentation,
        }),
      ],

      /**
       * Set tracesSampleRate to 1.0 to capture 100%
       * of transactions for performance monitoring.
       * We recommend adjusting this value in production.
       */
      tracesSampleRate: env.sentry.tracesSampleRate,
    });
  }
};

/**
 * Sentry providers configuration.
 * @param env web client environment
 * @returns Sentry providers
 */
export const sentryProviders: (env: IWebClientAppEnvironment) => Array<Provider | EnvironmentProviders> = env => {
  return sentryDisabledEnvironments.includes(env.sentry.env)
    ? []
    : [
        {
          provide: ErrorHandler,
          useValue: createErrorHandler({
            showDialog: true,
          }),
        },
        {
          provide: TraceService,
          deps: [Router],
        },
        provideAppInitializer(() => {
          inject(TraceService);
        }),
      ];
};

/**
 * The Sentry tracing service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppSentryService {
  constructor(public readonly trace: TraceService) {}
}
