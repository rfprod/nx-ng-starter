import 'jest-preset-angular/setup-jest';
import { setupJestJsdomGlobalMocks } from './lib/jest/globals/jest-jsdom-globals.patch';

setupJestJsdomGlobalMocks();
