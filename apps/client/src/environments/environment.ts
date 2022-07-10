import { IWebClientAppEnvironment, TCapacitorPlatform } from '@app/client-util';
import { Capacitor } from '@capacitor/core';

import { appEnvFactory } from './environment.config';
import { sentryEnvFactory } from './sentry.config';

const platform: TCapacitorPlatform = Capacitor.getPlatform();

/**
 * Development environment variables.
 * This file can be replaced during build by using the `fileReplacements` array.
 * `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
 * The list of file replacements can be found in `angular.json`.
 *
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown:
 *
 * import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
 */
export const environment: IWebClientAppEnvironment = {
  production: false,
  platform,
  appName: 'Nx Ng Starter Client',
  description: 'The client application based on Angular.',
  api:
    platform !== 'web'
      ? 'https://nx-ng-starter.web.app/api'
      : window.location.origin.includes('localhost')
      ? 'http://localhost:8080/api'
      : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8090',
  sentry: sentryEnvFactory({ production: false }),
  ...appEnvFactory(),
};
