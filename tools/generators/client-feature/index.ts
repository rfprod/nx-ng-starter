import {
  apply,
  chain,
  externalSchematic,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { getProjectConfig } from '@nrwl/workspace';
import * as path from 'path';

import { ISchematicContext } from './schema.interface';

const addFiles = (schema: ISchematicContext): Rule => (tree: Tree, context: SchematicContext) => {
  const projectConfig: { root: string } = getProjectConfig(tree, schema.name);
  console.log('projectConfig', projectConfig);

  const templateSource = apply(url('./files'), [move(projectConfig.root)]);

  return chain([mergeWith(templateSource)])(tree, context);
};

export default function (schema: ISchematicContext) {
  return (tree: Tree, context: SchematicContext) => {
    console.log('schema', schema);
    const name = schema.name;
    const tags = schema.tags;

    console.log('name', name);

    return chain([
      externalSchematic('@nrwl/angular', 'lib', {
        name,
        tags,
        style: 'scss',
      }),
      addFiles(schema),
      externalSchematic('@schematics/angular', 'component', {
        project: name,
        name,
        path: path.join('libs', name, 'src', 'lib', 'components'),
        style: 'scss',
        skipImport: true,
      }),
      externalSchematic('@schematics/angular', 'service', {
        project: name,
        name,
        path: path.join('libs', name, 'src', 'lib', 'services'),
        skipImport: true,
      }),
      externalSchematic('@schematics/angular', 'guard', {
        project: name,
        name,
        path: path.join('libs', name, 'src', 'lib', 'guards'),
        skipImport: true,
      }),
    ])(tree, context);
  };
}
