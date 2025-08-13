import '@analogjs/vitest-angular/setup-zone';

import '@angular/compiler'; // Required for JIT compiler
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { vi } from 'vitest';

vi.mock('@sentry/angular-ivy', () => ({
  ['TraceService']: vi.fn().mockReturnValue({}),
  ['BrowserTracing']: vi.fn().mockReturnValue({}),
  init: vi.fn().mockReturnValue({}),
  createErrorHandler: vi.fn().mockReturnValue({}),
  routingInstrumentation: vi.fn().mockReturnValue({}),
}));

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
