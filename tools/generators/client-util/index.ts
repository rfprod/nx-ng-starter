import { libraryGenerator } from '@nrwl/angular/generators';
import { generateFiles, joinPathFragments, logger, ProjectConfiguration, readProjectConfiguration, Tree } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

import { cleanup } from '../utils/cleanup.util';
import { updateProjectLinterConfig } from '../utils/project-configuration.util';
import { ISchematicContext } from './schema.interface';

/**
 * Adds/replaces files generated for a library by default.
 */
const addFiles = (schema: ISchematicContext, tree: Tree) => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, schema.name);
  const root = config.root;

  const fileName = schema.name.replace('client-util-', '');
  const className = `${fileName[0].toUpperCase()}${fileName.slice(1)}`;

  generateFiles(tree, joinPathFragments(__dirname, './files'), root, {
    tmpl: '',
    name: schema.name,
    fileName,
    className,
  });
};

export default async function (tree: Tree, schema: ISchematicContext) {
  const name = schema.name;
  const tags = schema.tags;

  await libraryGenerator(tree, {
    name,
    prefix: 'app',
    standaloneConfig: true,
    tags,
  });

  addFiles(schema, tree);

  updateProjectLinterConfig(schema, tree);

  await cleanup();

  return async () => {
    const { stdout, stderr } = await promisify(exec)(`npx nx run tools:tsc-configure`);
    logger.log(stdout);
    logger.error(stderr);
    return { success: stderr === '' };
  };
}
