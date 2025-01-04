/**
 * The default set on includes that should be present in generated libraries.
 */
export const defaultTestSetupIncludes = () => [
  `import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';`,
  `import { setupJestJsdomGlobalMocks } from '@app/client-testing-unit';`,
  `setupJestJsdomGlobalMocks();`,
  `setupZoneTestEnv();`,
];
