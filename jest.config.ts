import { getJestProjectsAsync } from '@nx/jest';

const config = { projects: getJestProjectsAsync() };

export default config;
