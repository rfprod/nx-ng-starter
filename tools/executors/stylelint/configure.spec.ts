jest.mock('@nrwl/devkit');
jest.mock('nx/src/generators/tree');

import type { ExecutorContext, ProjectConfiguration } from '@nrwl/devkit';
import * as devkit from '@nrwl/devkit';
import * as nxTree from 'nx/src/generators/tree';

import configure, { AppConfigureStylelintCheckExecutor } from './configure';
import { IExecutorOptions } from './schema';

describe('AppConfigureStylelintCheckExecutor', () => {
  const getProjectsInput = (withTargets = false) => {
    const targets: ProjectConfiguration['targets'] = {};
    targets['stylelint-check'] = {};
    const projectsInput: Record<string, ProjectConfiguration> = {};
    projectsInput['client-app'] = {
      root: '',
      sourceRoot: 'apps/client-app/src',
      projectType: 'application',
      targets: withTargets ? { ...targets } : {},
    };
    projectsInput['client'] = {
      root: '',
      sourceRoot: 'apps/client-app/src',
      projectType: 'application',
      targets: withTargets ? { ...targets } : {},
    };
    projectsInput['documentation'] = {
      root: '',
      sourceRoot: 'apps/documentation/src',
      projectType: 'application',
      targets: withTargets ? { ...targets } : {},
    };
    projectsInput['elements'] = {
      root: '',
      sourceRoot: 'apps/elements/src',
      projectType: 'application',
      targets: withTargets ? { ...targets } : {},
    };
    projectsInput['backend-app'] = {
      root: '',
      sourceRoot: 'apps/backend-app/src',
      projectType: 'application',
      targets: withTargets ? { ...targets } : {},
    };
    projectsInput['test-e2e'] = {
      root: '',
      sourceRoot: 'apps/test-e2e/src',
      projectType: 'application',
      targets: withTargets ? { ...targets } : {},
    };
    projectsInput['client-lib'] = {
      root: '',
      sourceRoot: 'apps/client-lib/src',
      projectType: 'library',
      targets: withTargets ? { ...targets } : {},
    };
    projectsInput['backend-lib'] = {
      root: '',
      sourceRoot: 'apps/backend-lib/src',
      projectType: 'library',
      targets: withTargets ? { ...targets } : {},
    };
    projectsInput['tools'] = {
      root: '',
      sourceRoot: 'tools',
      projectType: 'application',
      targets: withTargets ? { ...targets } : {},
    };
    return projectsInput;
  };

  const setup = (projectsInput?: Record<string, ProjectConfiguration>, optionsInput?: IExecutorOptions & { dryRun: boolean }) => {
    const projects = typeof projectsInput === 'undefined' ? getProjectsInput() : { ...projectsInput };

    (<jest.Mock>devkit.getProjects).mockImplementation((tree: nxTree.FsTree) => new Map(Object.entries(projects)));
    (<jest.Mock>nxTree.flushChanges).mockImplementation((root: string, fileChanges: nxTree.FileChange[]) => void 0);

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
      typeof optionsInput !== 'undefined' ? optionsInput : { config: '', dryRun: true };

    return { context, options, projects };
  };

  const prefixes = ['client', 'elements', 'documentation'];
  const prefixOptions = prefixes.join(', ').trim();

  describe('errors', () => {
    afterEach(() => jest.clearAllMocks());

    it('should throw an error if a project sourceRoot is undefined when adding a configuration', () => {
      const projectsInput = getProjectsInput();
      projectsInput['client-test-app'] = {
        root: '',
        projectType: 'application',
        targets: {},
      };
      const { context, options } = setup(projectsInput);
      const executor = new AppConfigureStylelintCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((<Error>e).message).toEqual(`The project client-test-app does not have the 'sourceRoot' configuration option defined.`);
      }
    });

    it('should throw an error if a project targets is undefined when adding a configuration', () => {
      const projectsInput = getProjectsInput();
      projectsInput['client-test-app'] = {
        root: '',
        sourceRoot: 'apps/client-test-app/src',
        projectType: 'application',
      };
      const { context, options } = setup(projectsInput);

      const executor = new AppConfigureStylelintCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((<Error>e).message).toEqual(`The project client-test-app does not have the 'targets' configuration option defined.`);
      }
    });

    it('should throw an error if unable to determine a suffix for a project when adding a configuration', () => {
      const projectsInput = getProjectsInput();
      projectsInput['client-test-app'] = {
        root: '',
        sourceRoot: 'apps/client-test-app/src',
        targets: {},
      };
      const { context, options } = setup(projectsInput);

      const executor = new AppConfigureStylelintCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((<Error>e).message).toEqual(`Could not determine a suffix for the project: client-test-app.`);
      }
    });

    it('should throw an error if a project targets is undefined when removing a configuration', () => {
      const projectsInput = getProjectsInput();
      projectsInput['client-test-app'] = {
        root: '',
        sourceRoot: 'apps/test-app/src',
        projectType: 'application',
      };
      const optionsInput: IExecutorOptions & {
        dryRun: boolean;
      } = {
        config: '',
        dryRun: true,
        cleanup: true,
      };
      const { context, options } = setup(projectsInput, optionsInput);

      const executor = new AppConfigureStylelintCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((<Error>e).message).toEqual(`The project client-test-app does not have the 'targets' configuration option defined.`);
      }
    });
  });

  describe('correct behavior: add configurations', () => {
    afterEach(() => jest.clearAllMocks());

    it('should call updateProjectConfiguration without calling flushChanges when the dryRun option is true', () => {
      const projectsInput = getProjectsInput();
      const { context, options } = setup(projectsInput);

      const executor = new AppConfigureStylelintCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();

      const expectedLoggerMessages = [
        `backend-app: only client applications and libraries need this executor. Client application and libraries have the following prefixes in their directory names: ${prefixOptions}.`,
        `test-e2e: applications with e2e tests don't need this executor.`,
        `backend-lib: only client applications and libraries need this executor. Client application and libraries have the following prefixes in their directory names: ${prefixOptions}.`,
        `tools: only client applications and libraries need this executor. Client application and libraries have the following prefixes in their directory names: ${prefixOptions}.`,
      ];
      expect(devkit.logger.log).toHaveBeenCalledTimes(expectedLoggerMessages.length);
      for (let i = 1, max = expectedLoggerMessages.length; i <= max; i += 1) {
        expect(devkit.logger.log).toHaveBeenNthCalledWith(i, expectedLoggerMessages[i - 1]);
      }
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(Object.keys(projectsInput).length - expectedLoggerMessages.length);

      expect(treeListChangesSpy).not.toHaveBeenCalled();
      expect(nxTree.flushChanges).not.toHaveBeenCalled();
      expect(devkit.logger.warn).not.toHaveBeenCalled();
    });

    it('should call updateProjectConfiguration and flushChanges when the dryRun option is falsy', () => {
      const projectsInput = getProjectsInput();
      const optionsInput: IExecutorOptions & {
        dryRun: boolean;
      } = {
        dryRun: false,
        config: '',
      };
      const { context, options } = setup(projectsInput, optionsInput);

      const executor = new AppConfigureStylelintCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();

      const expectedLoggerMessages = [
        `backend-app: only client applications and libraries need this executor. Client application and libraries have the following prefixes in their directory names: ${prefixOptions}.`,
        `test-e2e: applications with e2e tests don't need this executor.`,
        `backend-lib: only client applications and libraries need this executor. Client application and libraries have the following prefixes in their directory names: ${prefixOptions}.`,
        `tools: only client applications and libraries need this executor. Client application and libraries have the following prefixes in their directory names: ${prefixOptions}.`,
      ];
      expect(devkit.logger.log).toHaveBeenCalledTimes(expectedLoggerMessages.length);
      for (let i = 1, max = expectedLoggerMessages.length; i <= max; i += 1) {
        expect(devkit.logger.log).toHaveBeenNthCalledWith(i, expectedLoggerMessages[i - 1]);
      }
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(Object.keys(projectsInput).length - expectedLoggerMessages.length);

      expect(treeListChangesSpy).toHaveBeenCalledTimes(1);
      expect(nxTree.flushChanges).toHaveBeenCalledTimes(1);
      expect(devkit.logger.warn).not.toHaveBeenCalled();
    });
  });

  describe('correct behavior: remove configurations', () => {
    afterEach(() => jest.clearAllMocks());

    it('should not call updateProjectConfiguration and flushChanges when the dryRun option is true but there is no tsc-check target in project configurations', () => {
      const projectsInput = getProjectsInput();
      const optionsInput: IExecutorOptions & {
        dryRun: boolean;
      } = {
        dryRun: true,
        cleanup: true,
        config: '',
      };
      const { context, options } = setup(projectsInput, optionsInput);

      const executor = new AppConfigureStylelintCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();
      expect(devkit.updateProjectConfiguration).not.toHaveBeenCalledTimes(Object.keys(projectsInput).length);
      expect(treeListChangesSpy).not.toHaveBeenCalled();
      expect(nxTree.flushChanges).not.toHaveBeenCalled();
      expect(devkit.logger.warn).not.toHaveBeenCalled();
    });

    it('should call updateProjectConfiguration without calling flushChanges when the dryRun option is true', () => {
      const projectsInput = getProjectsInput(true);
      const optionsInput: IExecutorOptions & {
        dryRun: boolean;
      } = {
        dryRun: true,
        cleanup: true,
        config: '',
      };
      const { context, options } = setup(projectsInput, optionsInput);

      const executor = new AppConfigureStylelintCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(Object.keys(projectsInput).length);
      expect(treeListChangesSpy).not.toHaveBeenCalled();
      expect(nxTree.flushChanges).not.toHaveBeenCalled();
      expect(devkit.logger.warn).not.toHaveBeenCalled();
    });

    it('should call updateProjectConfiguration and flushChanges when the dryRun option is falsy', () => {
      const projectsInput = getProjectsInput(true);
      const optionsInput: IExecutorOptions & {
        dryRun: boolean;
      } = {
        dryRun: false,
        cleanup: true,
        config: '',
      };
      const { context, options } = setup(projectsInput, optionsInput);

      const executor = new AppConfigureStylelintCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(Object.keys(projectsInput).length);
      expect(treeListChangesSpy).toHaveBeenCalledTimes(1);
      expect(nxTree.flushChanges).toHaveBeenCalledTimes(1);
      expect(devkit.logger.warn).toHaveBeenCalledWith(
        `Don't forget to remove the executor configuration target from './tools/project.json'. Find a target 'stylelint-configure'.`,
      );
    });
  });

  describe('should expose configure function that initializes the executor class', () => {
    afterEach(() => jest.clearAllMocks());

    it('should call updateProjectConfiguration without calling flushChanges when the dryRun option is true', async () => {
      const projectsInput = getProjectsInput();
      const { context, options } = setup(projectsInput);

      const result = await configure(options, context);
      expect(result).toMatchObject({ success: true });
    });
  });
});
