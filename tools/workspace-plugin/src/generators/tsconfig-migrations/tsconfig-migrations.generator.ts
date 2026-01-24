import { getProjects, logger, type ProjectConfiguration, type Tree } from '@nx/devkit';
import { execFileSync } from 'child_process';

import type { ISchematicContext } from './schema.interface';

/** tsconfig content structure. */
interface ITsConfig {
  compilerOptions?: {
    types: string[];
  };
  [key: string]: unknown;
}

/**
 * Get configuration file paths relative to the workspace root.
 * @param tree The virtual file system tree.
 * @param entries Project configurations.
 * @param pattern The pattern matching configuration file names.
 * @param debug Indicates whether to print debug output.
 */
const configFilePaths = (tree: Tree, entries: ProjectConfiguration[], pattern = /.*tsconfig\.(spec|eslint)\.json$/, debug?: boolean) => {
  const roots = Array.from(entries.values(), value => {
    const root = value.sourceRoot;
    return typeof root !== 'undefined' && !root.includes('-e2e/') ? root.replace(/\/src$/, '') : void 0;
  }).filter(value => typeof value !== 'undefined');

  if (debug === true) {
    logger.debug('Source roots:\n', roots.join('\n'));
  }

  const configFiles = roots
    .map(root => {
      return tree
        .children(root)
        .filter(value => pattern.test(value))
        .map(value => `${root}/${value}`);
    })
    .flat();

  if (debug === true) {
    logger.debug('Configuration files:\n', configFiles.join('\n'));
  }

  return configFiles;
};

/**
 * Modified `types` array in a tsconfig file according to the migration instructions.
 * @param tree The virtual file system tree.
 * @param configPath The configuration file path on the file system.
 */
const modifyTypeRefs = (tree: Tree, configPath: string): void => {
  const removeRefs = [/.*vitest\/utils/];
  const fileBuffer = tree.read(configPath);
  if (fileBuffer === null) {
    throw new Error(`File '${configPath}' content as a buffer is null.`);
  }

  const fileString = fileBuffer.toString('utf8');

  try {
    const json: ITsConfig = JSON.parse(fileString);
    let types = json.compilerOptions?.types;
    if (typeof json.compilerOptions === 'undefined' || typeof types === 'undefined') {
      return;
    }

    types = types.filter(value => removeRefs.reduce((acc, regExp) => acc && !regExp.test(value), true));
    json.compilerOptions.types = [...types];
    tree.write(configPath, JSON.stringify(json), { mode: 0o664 });
  } catch (err) {
    const error = err as Error;
    throw new Error(`There was an error serializing '${configPath}' content as JSON.\n\n${error.message}`);
  }
};

/**
 * Migrates type refs in all applicable tsconfig files.
 * @param tree The virtual file system tree.
 * @param configFiles The array containing configuration file paths.
 */
const migrateTypeRefs = (tree: Tree, configFiles: string[]) => {
  for (let i = 0, max = configFiles.length; i < max; i += 1) {
    const configFile = configFiles[i];
    modifyTypeRefs(tree, configFile);
  }
};

const formatFiles = (tree: Tree, configFiles: string[]) => {
  try {
    for (let i = 0, max = configFiles.length; i < max; i += 1) {
      const configFile = configFiles[i];
      const cmd = 'npx';
      const args = ['prettier', '-w', `${tree.root}/${configFile}`];
      execFileSync(cmd, args, { stdio: 'inherit', cwd: process.cwd(), env: process.env, shell: true });
    }
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
    return () => ({ success: false });
  }

  return { success: true };
};

export default async function (tree: Tree, schema: ISchematicContext) {
  const projects = getProjects(tree);
  const entries = [...projects.values()];

  enum CONTEXTS {
    VITEST_TYPES = 'vitest-types',
  }
  const context = schema.migrate;

  if (schema.debug === true) {
    logger.debug('context:', context);
  }

  const configFiles = configFilePaths(tree, entries, void 0, schema.debug);

  try {
    switch (schema.migrate) {
      case CONTEXTS.VITEST_TYPES:
        migrateTypeRefs(tree, configFiles);
        break;
      default:
        throw new Error(`Context '${context}' is not supported.`);
    }
  } catch (err) {
    const error = err as Error;
    logger.error(error.message);
    return () => ({ success: false });
  }

  return () => formatFiles(tree, configFiles);
}
