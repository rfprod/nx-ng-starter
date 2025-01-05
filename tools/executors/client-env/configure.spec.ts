jest.mock('child_process');
jest.mock('./env-client');

import type { ExecutorContext } from '@nx/devkit';

import configure from './configure';
import * as envClient from './env-client';
import type { IExecutorOptions, TSupportedApp } from './schema';

describe('configure', () => {
  const setup = (app: TSupportedApp = 'client', mockEnvClient?: boolean) => {
    const envClientMock = envClient.AppClientEnvConfig as jest.Mock;
    if (mockEnvClient === true) {
      envClientMock.mockImplementation((opts: IExecutorOptions, ctx: ExecutorContext) => ({
        execute: () => new Promise<void>(resolve => resolve()),
      }));
    }

    const context: ExecutorContext = {
      cwd: process.cwd(),
      isVerbose: false,
      root: '/root',
      projectsConfigurations: {
        version: 1,
        projects: {},
      },
      nxJsonConfiguration: {},
      projectGraph: {
        nodes: {},
        dependencies: {},
      },
      configurationName: '',
      projectName: app,
      target: { executor: '' },
      targetName: '',
    };

    const options: IExecutorOptions = { app };

    return { context, options, envClientMock };
  };

  describe('errors', () => {
    afterEach(() => jest.clearAllMocks());

    it('should throw an error if context.projectName is undefined', async () => {
      const app: TSupportedApp = '';
      const { context, options } = setup(app, true);

      let error: Error | undefined;
      try {
        await configure(options, context);
      } catch (e) {
        error = e as Error;
      }
      expect((error as Error).message).toEqual(`There was an error processing the app argument.\nIts value is: ${app}`);
    });
  });

  describe('correct behavior', () => {
    afterEach(() => jest.clearAllMocks());

    it('should execute successfully', async () => {
      const { context, options } = setup('client', true);

      const result = await configure(options, context);
      expect(result).toMatchObject({ success: true });
    });
  });
});
