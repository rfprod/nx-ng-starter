import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { setUpLocalStorageMock } from '../local-storage/local-storage.mock';

declare const beforeAll;
declare const beforeEach;
declare const afterEach;
declare const afterAll;

/**
 * Reconfigures current test suite to prevent angular components compilation after every test run.
 * Forces angular test bed to re-create zone and all injectable services by directly
 * changing _instantiated to false after every test run.
 * Cleanups all the changes and reverts test bed configuration after suite is finished.
 * Also, this patch sets up global mocks.
 *
 * What it does briefly:
 * - prevents recompilation within a single spec file;
 * - sets up global mocks.
 *
 * Usage notes (check example - app.component.spec.ts):
 * - TestBed should not be cleared afterEach in unit tests;
 * - component should be compiled once in beforeAll;
 * - some values may not be automatically initialized from 'it' to 'it' function.
 */
export const configureTestSuite = () => {
  const cleanupTestBed = () => {
    const testBedApi: TestBed = getTestBed();
    testBedApi['_activeFixtures'].forEach((fixture: ComponentFixture<any>) => {
      try {
        fixture.destroy();
      } catch (e) {
        console.error('Error during cleanup of component', {
          component: fixture.componentInstance,
          stacktrace: e,
        });
      }
    });
    testBedApi['_instantiated'] = false;
  };

  let originReset;
  (() => {
    originReset = TestBed.resetTestingModule;
  })();

  beforeAll(() => {
    TestBed.resetTestingModule();
    TestBed.resetTestingModule = () => TestBed;
  });

  beforeEach(() => {
    setUpLocalStorageMock();
  });

  afterEach(() => {
    cleanupTestBed();
  });

  afterAll(() => {
    TestBed.resetTestingModule = originReset;
    TestBed.resetTestingModule();
  });
};
