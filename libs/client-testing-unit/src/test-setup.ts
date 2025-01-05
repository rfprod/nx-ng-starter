import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { setupJestJsdomGlobalMocks } from './lib/jest/patch/jest-jsdom-globals.patch';

setupJestJsdomGlobalMocks();
setupZoneTestEnv();
