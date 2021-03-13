import { Capacitor } from '@capacitor/core';
import { IWebClientAppEnvironment } from '@nx-ng-starter/client-util';

const platform: string = Capacitor.getPlatform();

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
 * import 'zone.js/dist/zone-error';  // Included with Angular CLI.
 */
export const environment: IWebClientAppEnvironment = {
  production: false,
  platform,
  appName: 'Nx Ng Starter Elements',
  api: window.location.origin.includes('localhost')
    ? 'http://localhost:8080/api'
    : `${window.location.origin}/api`,
  envoyUrl: 'http://localhost:8082',
  sentryEnv: 'development',
};
