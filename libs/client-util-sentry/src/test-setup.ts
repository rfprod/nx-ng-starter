import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

const traceService = 'TraceService';
const browserTracing = 'BrowserTracing';

jest.mock('@sentry/angular-ivy', () => ({
  [traceService]: jest.fn().mockReturnValue({}),
  [browserTracing]: jest.fn().mockReturnValue({}),
  init: jest.fn().mockReturnValue({}),
  createErrorHandler: jest.fn().mockReturnValue({}),
}));
