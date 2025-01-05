jest.mock('child_process');
jest.mock('@nx/devkit');
jest.mock('nx/src/generators/tree');

import type { ExecutorContext, ProjectConfiguration } from '@nx/devkit';
import * as devkit from '@nx/devkit';
import * as childProcess from 'child_process';
import type * as nxTree from 'nx/src/generators/tree';

import check from './check';
import type { IExecutorOptions } from './schema';

describe('check', () => {
  const setup = (projestName?: string) => {
    (childProcess.execFileSync as jest.Mock).mockImplementation(
      (command: string, options: childProcess.ExecSyncOptionsWithBufferEncoding) => Buffer.from([]),
    );

    const projects: Record<string, ProjectConfiguration> = {};
    projects['test'] = {
      root: '/root',
      projectType: 'application',
      sourceRoot: 'apps/test',
      targets: {},
    };

    (devkit.getProjects as jest.Mock).mockImplementation((tree: nxTree.FsTree) => new Map(Object.entries(projects)));

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

    const options: IExecutorOptions = { config: '' };

    return { context, options };
  };

  describe('errors: projectName', () => {
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
        expect((e as Error).message).toEqual('Project name is not defined.');
      }
    });

    it('should throw an error if context.projectName does not exist', async () => {
      const { context, options } = setup('does-not-exist');

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
        expect((e as Error).message).toEqual('Project does not exist.');
      }
    });

    it("should throw an error if a project's sourceRoot is undefined", async () => {
      const { context, options } = setup('test');

      const workspace = context.projectsConfigurations;
      Object.keys(workspace?.projects ?? {}).map(key => {
        if (typeof workspace !== 'undefined') {
          workspace.projects[key].sourceRoot = void 0;
        }
      });

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
        expect((e as Error).message).toEqual('Project root does not exist.');
      }
    });
  });

  describe('no errors', () => {
    afterEach(() => jest.clearAllMocks());

    it('should throw an error if a source directory does not exist', async () => {
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
        expect((e as Error).message).toEqual('Source directory test/app/src does not exist');
      }
    });
  });
});
