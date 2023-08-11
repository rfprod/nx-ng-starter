import { getProjects, joinPathFragments, logger, ProjectConfiguration, Tree } from '@nx/devkit';
import { execFileSync } from 'child_process';
import { directoryExists } from 'nx/src/utils/fileutils';

import { ISchematicContext } from './schema.interface';
import { findFiles } from './utils/find-files.util';

type TModuleBoundaryConfig = {
  sourceTag: string;
  onlyDependOnLibsWithTags: string[];
}[];

interface IAuditException {
  file: string;
  message: string;
  sourceRoot: string;
}

/**
 * Reads the boundaries file.
 * @param configDir the directory with .eslint configuration files
 * @param verbose whether to print detailed output
 */
const depConstraints = (configDir: string, verbose?: boolean) => {
  const configExists = directoryExists(configDir);
  if (!configExists) {
    throw new Error(`The directory with the module boundary configurations does not exist: ${configDir}.`);
  }
  verbose === true ? logger.log('configDir', configDir) : void 0;
  const configFiles = findFiles(configDir, '.js');
  verbose === true ? logger.log('configFiles', configFiles) : void 0;
  const files = configFiles.stdout.length > 0 ? configFiles.stdout.split(' ') : [];
  const configs = files.map(file => {
    const config: {
      file: string;
      constraints: TModuleBoundaryConfig;
    } = {
      file,
      constraints: [],
    };
    let json: {
      constraints: TModuleBoundaryConfig;
    };
    try {
      json = require(file);
      const constraints = json.constraints;
      config.constraints = [...constraints];
      return config;
    } catch (e) {
      throw <Error>e;
    }
  });
  return configs;
};

/**
 * Get project source roots.
 * @param tree the file system tree
 * @param entries project configurations
 * @param constraints the module bounary constraints
 * @param verbose whether to print detailed output
 */
const projectSourceRoots = (
  tree: Tree,
  entries: ProjectConfiguration[],
  constraints: {
    file: string;
    constraints: TModuleBoundaryConfig;
  }[],
  verbose?: boolean,
) => {
  const scopes = constraints.reduce((accumulator: string[], item) => {
    const result = item.constraints.map(constraint => constraint.sourceTag);
    accumulator.push(...result);
    return accumulator;
  }, []);

  verbose === true ? logger.log('scopes with constraints', scopes) : void 0;

  const projects = scopes.reduce((accumulator: ProjectConfiguration[], scope) => {
    const result = entries.find(entry => entry.tags?.includes(scope));
    if (typeof result !== 'undefined') {
      accumulator.push(result);
    }
    return accumulator;
  }, []);

  verbose === true ? logger.log('projects with constraints', projects) : void 0;

  const allBoundaryConfigs = constraints.reduce((accumulator: Array<TModuleBoundaryConfig['0'] & { file: string }>, item) => {
    const result = item.constraints.map(record => ({
      ...record,
      file: item.file,
    }));
    accumulator.push(...result);
    return accumulator;
  }, []);

  verbose === true ? logger.log('all boundary configs', allBoundaryConfigs) : void 0;

  const sourceRoots = projects
    .map(project => ({
      scope: project.tags?.find(tag => tag.includes('scope')) ?? <string>'',
      sourceRoot: project.sourceRoot ?? '',
    }))
    .filter(record => record.scope !== '' && record.sourceRoot !== '')
    .map(record => {
      const boundaryConfig = allBoundaryConfigs.find(config => config.sourceTag === record.scope);
      const result = {
        ...record,
        sourceRoot: `${tree.root}/${record.sourceRoot}`,
        dependsOnTags: boundaryConfig?.onlyDependOnLibsWithTags ?? [],
        file: boundaryConfig?.file ?? '',
      };
      return result;
    });

  verbose === true ? logger.log('project source roots', sourceRoots) : void 0;

  return sourceRoots;
};

export default async function (tree: Tree, schema: ISchematicContext) {
  const projects = getProjects(tree);
  const entries = [...projects.values()];

  const configDir = schema.configDir ?? joinPathFragments(tree.root, '.eslint');

  const constraints = depConstraints(configDir);

  schema.verbose === true ? logger.log('constraints', constraints) : void 0;

  const sourceRoots = projectSourceRoots(tree, entries, constraints, schema.verbose);

  const exceptions: IAuditException[] = [];

  for (let i = 0, max = sourceRoots.length; i < max; i += 1) {
    const config = sourceRoots.at(i);
    if (typeof config !== 'undefined') {
      const src = config.sourceRoot;
      const tags = config.dependsOnTags;
      for (let j = 0, maxJ = tags.length; j < maxJ; j += 1) {
        const tag = tags[j];
        const partialImportPath = tag.replace('scope:', '');
        const cmd = 'find';
        const args = [src, '-type', 'f', '-name', '"*.ts"', '|', 'xargs', 'grep', `"${partialImportPath}"`, '--color=always'];
        try {
          execFileSync(cmd, args, { stdio: 'inherit', cwd: process.cwd(), env: process.env, shell: true });
        } catch (e) {
          const exception = {
            file: config.file,
            message: `The scope '${config.scope}' does not depend on the tag '${tag}'.`,
            sourceRoot: config.sourceRoot,
          };
          schema.verbose === true ? logger.error(exception.message) : void 0;
          exceptions.push(exception);
        }
      }
    }
  }

  logger.log('\nAll exceptions:');

  for (let i = 0, max = exceptions.length; i < max; i += 1) {
    const exception = exceptions.at(i);
    if (typeof exception !== 'undefined') {
      logger.error(`ℹ ${exception.message}`);
      logger.info(`  Source: ${exception.sourceRoot}`);
      logger.info(`  File: ${exception.file}`);
    }
  }

  return () => ({ success: true });
}
