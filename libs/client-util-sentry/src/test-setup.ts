import 'jest-preset-angular/setup-jest';

const traceService = 'TraceService';
const browserTracing = 'BrowserTracing';

jest.mock('@sentry/angular-ivy', () => ({
  [traceService]: jest.fn().mockReturnValue({}),
  [browserTracing]: jest.fn().mockReturnValue({}),
  init: jest.fn().mockReturnValue({}),
  createErrorHandler: jest.fn().mockReturnValue({}),
}));
