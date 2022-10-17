import 'jest-preset-angular/setup-jest';
import { setupJestJsdomGlobalMocks } from './lib/jest/patch/jest-jsdom-globals.patch';

setupJestJsdomGlobalMocks();
