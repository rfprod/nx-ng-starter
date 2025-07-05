/**
 * The default set on includes that should be present in generated libraries.
 */
export const defaultTestSetupIncludes = () => [
  `import '@analogjs/vitest-angular/setup-zone';`,
  `import '@angular/compiler'; // Required for JIT compiler`,
  `import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';`,
  `import { getTestBed } from '@angular/core/testing';`,
  `import { setupJsdomGlobalMocks } from '@app/client-testing-unit';`,
  `setupJsdomGlobalMocks();`,
  `getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting());`,
];
