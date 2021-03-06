import 'jest-preset-angular/setup-jest';
import { setupJestJsdomGlobalMocks } from './lib/jest/jest-jsdom-globals.patch';

setupJestJsdomGlobalMocks();
