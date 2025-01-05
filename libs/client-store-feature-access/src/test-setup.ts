import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { setupJestJsdomGlobalMocks } from '@app/client-testing-unit';

setupJestJsdomGlobalMocks();
setupZoneTestEnv();
