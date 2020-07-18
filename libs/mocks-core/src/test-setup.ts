import 'jest-preset-angular';
import { setupJestJsdomGlobalMocks } from './lib/jest/jest-jsdom-globals.patch';

setupJestJsdomGlobalMocks();
