import { APP_INITIALIZER, ErrorHandler, Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { IWebClientAppEnvironment, TSentryEnvironment } from '@app/client-util';
import * as Sentry from '@sentry/angular';
import { BrowserTracing } from '@sentry/tracing';

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
    Sentry.init({
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
          routingInstrumentation: Sentry.routingInstrumentation,
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
export const sentryProviders: (env: IWebClientAppEnvironment) => Provider[] = env => {
  return sentryDisabledEnvironments.includes(env.sentry.env)
    ? []
    : [
        {
          provide: ErrorHandler,
          useValue: Sentry.createErrorHandler({
            showDialog: true,
          }),
        },
        {
          provide: Sentry.TraceService,
          deps: [Router],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: () => () => ({}),
          deps: [Sentry.TraceService],
          multi: true,
        },
      ];
};

/**
 * The Sentry tracing service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppSentryService {
  constructor(public readonly trace: Sentry.TraceService) {}
}
