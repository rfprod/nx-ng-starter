import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

import { d3MockValue } from './lib/testing/d3.mock';

jest.mock('d3', () => d3MockValue);

setupZoneTestEnv();
