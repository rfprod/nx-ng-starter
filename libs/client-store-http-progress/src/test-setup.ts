import '@analogjs/vitest-angular/setup-zone';

import '@angular/compiler'; // Required for JIT compiler
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { apolloMockFunctions, setupJsdomGlobalMocks } from '@app/client-testing-unit';

import { vi } from 'vitest';

vi.mock('apollo-angular', () => apolloMockFunctions['apollo-angular']());

vi.mock('apollo-angular/http', () => apolloMockFunctions['apollo-angular/http']());

vi.mock('@apollo/client/utilities', () => apolloMockFunctions['@apollo/client/utilities']());

setupJsdomGlobalMocks();

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
