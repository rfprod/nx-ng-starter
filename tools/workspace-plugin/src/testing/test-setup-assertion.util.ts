/**
 * The default set on includes that should be present in generated libraries.
 */
export const defaultTestSetupIncludes = () => [
  `import 'jest-preset-angular/setup-jest';`,
  `import { setupJestJsdomGlobalMocks } from '@app/client-testing-unit';`,
  `setupJestJsdomGlobalMocks();`,
];
