import { type ViteUserConfig } from 'vitest/config';

export const sharedTestConfig: ViteUserConfig['test'] = {
  globals: true,
  clearMocks: true,
  hookTimeout: 30000,
  testTimeout: 10000,
  watch: false,
  passWithNoTests: true,
  pool: 'forks',
  reporters: ['default'],
};
