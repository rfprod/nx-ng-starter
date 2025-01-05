jest.mock('child_process');

import type { ExecutorContext } from '@nx/devkit';
import * as childProcess from 'child_process';
import path from 'path';

import check from './check';
import type { IExecutorOptions } from './schema';

describe('check', () => {
  const setup = (projestName?: string) => {
    (childProcess.execFileSync as jest.Mock).mockImplementation(
      (command: string, options: childProcess.ExecSyncOptionsWithBufferEncoding) => Buffer.from([]),
    );

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
      projectName: projestName,
      target: { executor: '' },
      targetName: '',
    };

    const options: IExecutorOptions = { tsConfig: '' };

    return { context, options };
  };

  describe('errors', () => {
    afterEach(() => jest.clearAllMocks());

    it('should throw an error if context.projectName is undefined', async () => {
      const { context, options } = setup();

      try {
        const result = await check(options, context);
        expect(result).not.toMatchObject({ success: true });
      } catch (e) {
        expect(childProcess.execFileSync).not.toHaveBeenCalledWith('tsc', ['-p', path.join(context.cwd, options.tsConfig)], {
          stdio: 'inherit',
          cwd: process.cwd(),
          env: process.env,
          shell: true,
        });
        expect((e as Error).message).toEqual('Project name is not defined.');
      }
    });
  });

  describe('correct behavior', () => {
    afterEach(() => jest.clearAllMocks());

    it('should execFileSync with expected parameters', async () => {
      const { context, options } = setup('test');

      const result = await check(options, context);
      expect(childProcess.execFileSync).toHaveBeenCalledWith('tsc', ['-p', path.join(context.cwd, options.tsConfig)], {
        stdio: 'inherit',
        cwd: process.cwd(),
        env: process.env,
        shell: true,
      });
      expect(result).toMatchObject({ success: true });
    });
  });
});
