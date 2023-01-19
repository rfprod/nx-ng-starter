jest.mock('child_process');
jest.mock('@nrwl/devkit');
jest.mock('nx/src/generators/tree');

import type { ExecutorContext, ProjectConfiguration } from '@nrwl/devkit';
import * as devkit from '@nrwl/devkit';
import * as childProcess from 'child_process';
import * as nxTree from 'nx/src/generators/tree';

import check from './check';
import { IExecutorOptions } from './schema';

describe('check', () => {
  const setup = (projestName?: string) => {
    (<jest.Mock>childProcess.execFileSync).mockImplementation((command: string, options: childProcess.ExecSyncOptionsWithBufferEncoding) =>
      Buffer.from([]),
    );

    const projects: Record<string, ProjectConfiguration> = {};
    projects['test'] = {
      root: '/root',
      projectType: 'application',
      sourceRoot: 'apps/test',
      targets: {},
    };

    (<jest.Mock>devkit.getProjects).mockImplementation((tree: nxTree.FsTree) => new Map(Object.entries(projects)));

    const context: ExecutorContext = {
      cwd: process.cwd(),
      isVerbose: false,
      root: '/root',
      workspace: {
        version: 1,
        projects,
      },
      configurationName: '',
      projectName: projestName,
      target: { executor: '' },
      targetName: '',
    };

    const options: IExecutorOptions = { config: '' };

    return { context, options };
  };

  describe('errors, no projectName', () => {
    afterEach(() => jest.clearAllMocks());

    it('should throw an error if context.projectName is undefined', async () => {
      const { context, options } = setup();

      try {
        const result = await check(options, context);
        expect(result).not.toMatchObject({ success: true });
      } catch (e) {
        expect(childProcess.execFileSync).not.toHaveBeenCalledWith('npx', expect.any(Array), {
          stdio: 'inherit',
          cwd: process.cwd(),
          env: process.env,
          shell: true,
        });
        expect((<Error>e).message).toEqual('Project name is not defined.');
      }
    });
  });

  describe('errors, no source directory', () => {
    afterEach(() => jest.clearAllMocks());

    it('should throw an error if source directory does not exist', async () => {
      const { context, options } = setup('test');

      try {
        const result = await check(options, context);
        expect(result).not.toMatchObject({ success: true });
      } catch (e) {
        expect(childProcess.execFileSync).not.toHaveBeenCalledWith('npx', expect.any(Array), {
          stdio: 'inherit',
          cwd: process.cwd(),
          env: process.env,
          shell: true,
        });
        expect((<Error>e).message).toEqual('Source directory test/app/src does not exist');
      }
    });
  });
});
