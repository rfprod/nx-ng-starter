jest.mock('@nx/devkit');
jest.mock('nx/src/generators/tree');

import type { ExecutorContext, ProjectConfiguration } from '@nx/devkit';
import * as devkit from '@nx/devkit';
import * as nxTree from 'nx/src/generators/tree';

import configure, { AppConfigurePrettierCheckExecutor } from './configure';
import type { IExecutorOptions } from './schema';

describe('AppConfigurePrettierCheckExecutor', () => {
  const getProjectsInput = (withTargets = false) => {
    const targets: ProjectConfiguration['targets'] = {};
    targets['prettier-check'] = {};
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

    (devkit.getProjects as jest.Mock).mockImplementation((tree: nxTree.FsTree) => new Map(Object.entries(projects)));
    (nxTree.flushChanges as jest.Mock).mockImplementation((root: string, fileChanges: nxTree.FileChange[]) => void 0);

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
      projectName: 'test',
      target: { executor: '' },
      targetName: '',
    };

    const options: IExecutorOptions & { dryRun: boolean } =
      typeof optionsInput !== 'undefined' ? optionsInput : { config: '', dryRun: true };

    return { context, options, projects };
  };

  const prefixes = ['api', 'client', 'backend', 'elements', 'documentation', 'server'];
  const prefixOptions = prefixes.join(', ').trim();

  const suffixes = ['e2e'];
  const suffixOptions = suffixes.join(', ').trim();

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
      const executor = new AppConfigurePrettierCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((e as Error).message).toEqual(`The project client-test-app does not have the 'sourceRoot' configuration option defined.`);
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

      const executor = new AppConfigurePrettierCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((e as Error).message).toEqual(`The project client-test-app does not have the 'targets' configuration option defined.`);
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

      const executor = new AppConfigurePrettierCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((e as Error).message).toEqual(`Could not determine a suffix for the project: client-test-app.`);
      }
    });

    it('should throw an error if a project targets is undefined when removing a configuration', () => {
      const projectsInput = getProjectsInput();
      projectsInput['client-test-app'] = {
        root: '',
        sourceRoot: 'apps/client-test-app/src',
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

      const executor = new AppConfigurePrettierCheckExecutor(options, context);
      try {
        executor.configure();
      } catch (e) {
        expect(devkit.getProjects).toHaveBeenCalled();
        expect((e as Error).message).toEqual(`The project client-test-app does not have the 'targets' configuration option defined.`);
      }
    });
  });

  describe('correct behavior: add configurations', () => {
    afterEach(() => jest.clearAllMocks());

    it('should call updateProjectConfiguration without calling flushChanges when the dryRun option is true', () => {
      const projectsInput = getProjectsInput();
      const { context, options } = setup(projectsInput);

      const executor = new AppConfigurePrettierCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();

      const expectedLoggerMessages = [
        `tools: this executor is required for apps and libs with the following prefixes or suffixes in their names.`,
        ` - prefixes: ${prefixOptions}`,
        ` - suffixes: ${suffixOptions}`,
      ];
      expect(devkit.logger.log).toHaveBeenCalledTimes(expectedLoggerMessages.length);
      for (let i = 1, max = expectedLoggerMessages.length; i <= max; i += 1) {
        expect(devkit.logger.log).toHaveBeenNthCalledWith(i, expectedLoggerMessages[i - 1]);
      }
      const loggerMessagesPerSkip = 3;
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(
        Object.keys(projectsInput).length - expectedLoggerMessages.length / loggerMessagesPerSkip,
      );

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

      const executor = new AppConfigurePrettierCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();

      const expectedLoggerMessages = [
        `tools: this executor is required for apps and libs with the following prefixes or suffixes in their names.`,
        ` - prefixes: ${prefixOptions}`,
        ` - suffixes: ${suffixOptions}`,
      ];
      expect(devkit.logger.log).toHaveBeenCalledTimes(expectedLoggerMessages.length);
      for (let i = 1, max = expectedLoggerMessages.length; i <= max; i += 1) {
        expect(devkit.logger.log).toHaveBeenNthCalledWith(i, expectedLoggerMessages[i - 1]);
      }
      const loggerMessagesPerSkip = 3;
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(
        Object.keys(projectsInput).length - expectedLoggerMessages.length / loggerMessagesPerSkip,
      );

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

      const executor = new AppConfigurePrettierCheckExecutor(options, context);
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

      const executor = new AppConfigurePrettierCheckExecutor(options, context);
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

      const executor = new AppConfigurePrettierCheckExecutor(options, context);
      expect(executor.tree).toBeDefined();
      const treeListChangesSpy = jest.spyOn(executor.tree, 'listChanges');
      executor.configure();
      expect(devkit.updateProjectConfiguration).toHaveBeenCalledTimes(Object.keys(projectsInput).length);
      expect(treeListChangesSpy).toHaveBeenCalledTimes(1);
      expect(nxTree.flushChanges).toHaveBeenCalledTimes(1);
      expect(devkit.logger.warn).toHaveBeenCalledWith(
        `Don't forget to remove the executor configuration target from './tools/project.json'. Find a target 'prettier-configure'.`,
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
