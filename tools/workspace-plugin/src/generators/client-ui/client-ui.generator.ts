import { libraryGenerator } from '@nx/angular/generators';
import { generateFiles, joinPathFragments, ProjectConfiguration, readProjectConfiguration, Tree } from '@nx/devkit';

import { cleanup } from '../../utils/cleanup.util';
import { finalizeGenerator } from '../../utils/finalizer.util';
import { generateFilesConfig } from '../../utils/generate-files.config';
import { updateProjectLinterConfig } from '../../utils/project-configuration.util';
import { ISchematicContext } from './schema.interface';

/**
 * Adds/replaces files generated for a library by default.
 */
const addFiles = (schema: ISchematicContext, tree: Tree) => {
  const config: ProjectConfiguration = readProjectConfiguration(tree, schema.name);
  const root = config.root;

  const generateFilesConf = generateFilesConfig(schema.name, 'client-ui-');

  generateFiles(tree, joinPathFragments(__dirname, './files'), root, {
    ...generateFilesConf,
  });
};

export default async function (tree: Tree, schema: ISchematicContext) {
  const name = schema.name;
  const tags = schema.tags;

  if (!/^client-ui-[a-z-]+$/.test(name)) {
    const message = 'The name must start with client-ui- and contain only lower case letters and dashes.';
    throw new Error(message);
  }

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

  return async () => finalizeGenerator(schema);
}
