import 'jest-preset-angular/setup-jest';
import { d3MockValue } from './lib/testing/d3.mock';

jest.mock('d3', () => d3MockValue);
