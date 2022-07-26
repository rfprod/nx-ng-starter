jest.mock('@nrwl/devkit');
jest.mock('nx/src/generators/tree');

import type { ExecutorContext, ProjectConfiguration } from '@nrwl/devkit';
import * as devkit from '@nrwl/devkit';
import * as nxTree from 'nx/src/generators/tree';

import configureTscCheck, { AppConfigureTscCheckExecutor } from './configure';
import { IExecutorOptions } from './schema';

describe('AppConfigureTscCheckExecutor', () => {
  const setup = (projectsInput?: Record<string, ProjectConfiguration>, optionsInput?: IExecutorOptions & { dryRun: boolean }) => {
    let projects: Record<string, ProjectConfiguration> = {};
    if (typeof projectsInput === 'undefined') {
      projects['test-app'] = {
        root: '/root',
        projectType: 'application',
        targets: {},
      };
      projects['test-e2e'] = {
        root: '/root',
        projectType: 'application',
        targets: {},
      };
      projects['test-lib'] = {
        root: '/root',
        projectType: 'library',
        targets: {},
      };
    } else {
      projects = { ...projectsInput };
    }

    (devkit.getProjects as jest.Mock).mockImplementation((tree: nxTree.FsTree) => new Map(Object.entries(projects)));
    (nxTree.flushChanges as jest.Mock).mockImplementation((root: string, fileChanges: nxTree.FileChange[]) => void 0);

    const context: ExecutorContext = {
      cwd: process.cwd(),
      isVerbose: false,
      root: '/root',
      workspace: {
        version: 1,
        projects,
      },
      configurationName: '',
      projectName: 'test',
      target: { executor: '' },
      targetName: '',
    };

    const options: IExecutorOptions & { dryRun: boolean } =
      typeof optionsInput !== 'undefined' ? optionsInput : { tsConfig: '', dryRun: true };

    return { context, options, projects };
  };

  describe('errors', () => {
    afterEach(() => jest.clearAllMocks());

    it('should throw an error if a project sourceRoot is undefined when adding a configuration', () => {
      const { context, options } = setup();
      const executor = new AppConfigureTscCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((<Error>e).message).toEqual(`The project test-app does not have the 'sourceRoot' configuration option defined.`);
      }
    });

    it('should throw an error if a project targets is undefined when adding a configuration', () => {
      const projectsInput: Record<string, ProjectConfiguration> = {};
      projectsInput['test-app'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
      };
      projectsInput['test-e2e'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-lib'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'library',
        targets: {},
      };
      const { context, options } = setup(projectsInput);

      const executor = new AppConfigureTscCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((<Error>e).message).toEqual(`The project test-app does not have the 'targets' configuration option defined.`);
      }
    });

    it('should throw an error if unable to determine a suffix for a project when adding a configuration', () => {
      const projectsInput: Record<string, ProjectConfiguration> = {};
      projectsInput['test-app'] = {
        root: '/root',
        sourceRoot: '/src',
      };
      projectsInput['test-e2e'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-lib'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'library',
        targets: {},
      };
      const { context, options } = setup(projectsInput);

      const executor = new AppConfigureTscCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((<Error>e).message).toEqual(`Could not determine a suffix for the project: test-app.`);
      }
    });

    it('should throw an error if a project targets is undefined when removing a configuration', () => {
      const projectsInput: Record<string, ProjectConfiguration> = {};
      projectsInput['test-app'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
      };
      projectsInput['test-e2e'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-lib'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'library',
        targets: {},
      };
      const optionsInput: IExecutorOptions & {
        dryRun: boolean;
      } = {
        tsConfig: '',
        dryRun: true,
        cleanup: true,
      };
      const { context, options } = setup(projectsInput, optionsInput);

      const executor = new AppConfigureTscCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((<Error>e).message).toEqual(`The project test-app does not have the 'targets' configuration option defined.`);
      }
    });
  });

  describe('correct behavior: add configurations', () => {
    afterEach(() => jest.clearAllMocks());

    it('should call updateProjectConfiguration without calling flushChanges when the dryRun option is true', () => {
      const projectsInput: Record<string, ProjectConfiguration> = {};
      projectsInput['test-app'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-e2e'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-lib'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'library',
        targets: {},
      };
      const { context, options } = setup(projectsInput);

      const executor = new AppConfigureTscCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(Object.keys(projectsInput).length);
      expect(treeListChangesSpy).not.toHaveBeenCalled();
      expect(nxTree.flushChanges).not.toHaveBeenCalled();
      expect(devkit.logger.warn).not.toHaveBeenCalled();
    });

    it('should call updateProjectConfiguration and flushChanges when the dryRun option is falsy', () => {
      const projectsInput: Record<string, ProjectConfiguration> = {};
      projectsInput['test-app'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-e2e'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-lib'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'library',
        targets: {},
      };
      const optionsInput: IExecutorOptions & {
        dryRun: boolean;
      } = {
        dryRun: false,
        tsConfig: '',
      };
      const { context, options } = setup(projectsInput, optionsInput);

      const executor = new AppConfigureTscCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(Object.keys(projectsInput).length);
      expect(treeListChangesSpy).toHaveBeenCalledTimes(1);
      expect(nxTree.flushChanges).toHaveBeenCalledTimes(1);
      expect(devkit.logger.warn).not.toHaveBeenCalled();
    });
  });

  describe('correct behavior: remove configurations', () => {
    afterEach(() => jest.clearAllMocks());

    it('should not call updateProjectConfiguration and flushChanges when the dryRun option is true but there is no tsc-check target in project configurations', () => {
      const projectsInput: Record<string, ProjectConfiguration> = {};
      projectsInput['test-app'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-e2e'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-lib'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'library',
        targets: {},
      };
      const optionsInput: IExecutorOptions & {
        dryRun: boolean;
      } = {
        dryRun: true,
        cleanup: true,
        tsConfig: '',
      };
      const { context, options } = setup(projectsInput, optionsInput);

      const executor = new AppConfigureTscCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();
      expect(devkit.updateProjectConfiguration).not.toHaveBeenCalledTimes(Object.keys(projectsInput).length);
      expect(treeListChangesSpy).not.toHaveBeenCalled();
      expect(nxTree.flushChanges).not.toHaveBeenCalled();
      expect(devkit.logger.warn).not.toHaveBeenCalled();
    });

    it('should call updateProjectConfiguration without calling flushChanges when the dryRun option is true', () => {
      const targets = {};
      targets['tsc-check'] = {};
      const projectsInput: Record<string, ProjectConfiguration> = {};
      projectsInput['test-app'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-app'].targets = { ...targets };
      projectsInput['test-e2e'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-e2e'].targets = { ...targets };
      projectsInput['test-lib'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'library',
        targets: {},
      };
      projectsInput['test-lib'].targets = { ...targets };
      const optionsInput: IExecutorOptions & {
        dryRun: boolean;
      } = {
        dryRun: true,
        cleanup: true,
        tsConfig: '',
      };
      const { context, options } = setup(projectsInput, optionsInput);

      const executor = new AppConfigureTscCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(Object.keys(projectsInput).length);
      expect(treeListChangesSpy).not.toHaveBeenCalled();
      expect(nxTree.flushChanges).not.toHaveBeenCalled();
      expect(devkit.logger.warn).not.toHaveBeenCalled();
    });

    it('should call updateProjectConfiguration and flushChanges when the dryRun option is falsy', () => {
      const targets = {};
      targets['tsc-check'] = {};
      const projectsInput: Record<string, ProjectConfiguration> = {};
      projectsInput['test-app'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-app'].targets = { ...targets };
      projectsInput['test-e2e'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-e2e'].targets = { ...targets };
      projectsInput['test-lib'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'library',
        targets: {},
      };
      projectsInput['test-lib'].targets = { ...targets };
      const optionsInput: IExecutorOptions & {
        dryRun: boolean;
      } = {
        dryRun: false,
        cleanup: true,
        tsConfig: '',
      };
      const { context, options } = setup(projectsInput, optionsInput);

      const executor = new AppConfigureTscCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(Object.keys(projectsInput).length);
      expect(treeListChangesSpy).toHaveBeenCalledTimes(1);
      expect(nxTree.flushChanges).toHaveBeenCalledTimes(1);
      expect(devkit.logger.warn).toHaveBeenCalled();
    });
  });

  describe('should expose configureTscCheck function that initializes the executor class', () => {
    afterEach(() => jest.clearAllMocks());

    it('should call updateProjectConfiguration without calling flushChanges when the dryRun option is true', async () => {
      const projectsInput: Record<string, ProjectConfiguration> = {};
      projectsInput['test-app'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-e2e'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'application',
        targets: {},
      };
      projectsInput['test-lib'] = {
        root: '/root',
        sourceRoot: '/src',
        projectType: 'library',
        targets: {},
      };
      const { context, options } = setup(projectsInput);

      const result = await configureTscCheck(options, context);
      expect(result).toMatchObject({ success: true });
    });
  });
});
