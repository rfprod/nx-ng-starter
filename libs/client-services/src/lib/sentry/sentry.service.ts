import { APP_INITIALIZER, ErrorHandler, Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { IWebClientAppEnvironment, TSentryEnvironment } from '@nx-ng-starter/client-util';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';

/**
 * Sentry is disabled for environments defined in this array.
 */
const sentryDisabledEnvironments: TSentryEnvironment[] = ['unit-testing', 'development'];

/**
 * This method must be used only in main.ts on client.
 */
export const initializeSentry = (env: IWebClientAppEnvironment) => {
  if (!sentryDisabledEnvironments.includes(env.sentryEnv)) {
    Sentry.init({
      environment: env.sentryEnv,
      dsn: 'https://3e5206aab4034899ab5abce655e35ff6@o551250.ingest.sentry.io/5674503',
      integrations: [
        /**
         * Registers and configures the Tracing integration,
         * which automatically instruments your application to monitor its
         * performance, including custom Angular routing instrumentation.
         */
        new Integrations.BrowserTracing({
          tracingOrigins: [
            'localhost:4200',
            'https://nx-ng-starter.web.app',
            'https://nx-ng-starter.firebaseapp.com',
          ],
          routingInstrumentation: Sentry.routingInstrumentation,
        }),
      ],

      /**
       * Set tracesSampleRate to 1.0 to capture 100%
       * of transactions for performance monitoring.
       * We recommend adjusting this value in production.
       */
      tracesSampleRate: 1.0,
    });
  }
};

export const sentryProviders: (env: IWebClientAppEnvironment) => Provider[] = env => {
  return sentryDisabledEnvironments.includes(env.sentryEnv)
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

@Injectable({
  providedIn: 'root',
})
export class AppSentryService {
  constructor(public readonly trace: Sentry.TraceService) {}
}
