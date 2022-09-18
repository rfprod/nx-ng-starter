import { libraryGenerator } from '@nrwl/angular/generators';
import { generateFiles, joinPathFragments, logger, ProjectConfiguration, readProjectConfiguration, Tree } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

import { cleanup } from '../utils/cleanup.util';
import { generateFilesConfig } from '../utils/generate-files.config';
import { updateProjectLinterConfig } from '../utils/project-configuration.util';
import { ISchematicContext } from './schema.interface';

/**
 * Adds/replaces files generated for a library by default.
 */
const addFiles = (schema: ISchematicContext, tree: Tree) => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, schema.name);
  const root = config.root;

  const generateFilesConf = generateFilesConfig(schema.name, 'client-util-');

  generateFiles(tree, joinPathFragments(__dirname, './files'), root, {
    ...generateFilesConf,
  });
};

export default async function (tree: Tree, schema: ISchematicContext) {
  const name = schema.name;
  const tags = schema.tags;

  await libraryGenerator(tree, {
    name,
    prefix: 'app',
    routing: false,
    skipModule: true,
    tags,
  });

  addFiles(schema, tree);

  updateProjectLinterConfig(schema, tree);

  await cleanup();

  return async () => {
    const tscConfigure = await promisify(exec)(`npx nx run tools:tsc-configure`);
    logger.log(tscConfigure.stdout);
    logger.error(tscConfigure.stderr);

    const lint = await promisify(exec)(`npx nx lint ${schema.name} --fix`);
    logger.log(lint.stdout);
    logger.error(lint.stderr);

    return { success: tscConfigure.stderr === '' && lint.stderr === '' };
  };
}
