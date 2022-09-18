import { Provider } from '@angular/core';
import {
  appBaseHrefProvider,
  documentProvider,
  environmentProvider,
  IWebClientAppEnvironment,
  pathLocationStrategyProvider,
  windowProvider,
} from '@app/client-util';
import { HttpLink } from 'apollo-angular/http';

/**
 * Client core module providers.
 */
export const appCoreModuleProviders = (environment: IWebClientAppEnvironment): Provider[] => [
  pathLocationStrategyProvider,
  appBaseHrefProvider,
  windowProvider,
  documentProvider,
  HttpLink,
  environmentProvider(environment),
];
