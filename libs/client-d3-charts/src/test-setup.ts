import '@analogjs/vitest-angular/setup-zone';

import '@angular/compiler'; // Required for JIT compiler
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

import { vi } from 'vitest';

import { d3MockValue } from './lib/testing/d3.mock';

vi.mock('d3', async () => {
  const actual = await import('d3');
  return {
    ...actual,
    ...d3MockValue,
  };
});

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
