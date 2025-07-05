import '@analogjs/vitest-angular/setup-zone';

import '@angular/compiler'; // Required for JIT compiler
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { setupJsdomGlobalMocks } from './lib/jsdom/patch/jsdom-globals.patch';

setupJsdomGlobalMocks();

getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
