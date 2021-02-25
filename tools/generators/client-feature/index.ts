import { strings } from '@angular-devkit/core';
import {
  apply,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { updateProjectConfiguration, Tree as NxTree, ProjectConfiguration, NxJsonProjectConfiguration } from '@nrwl/devkit';
import { getProjectConfig } from '@nrwl/workspace';
import * as path from 'path';

import { ISchematicContext } from './schema.interface';

interface IProjectConfig {
  root: string;
  sourceRoot: string;
  projectType: string;
  prefix: string;
  architect: {
    lint: {
      builder: string;
      options: {
        eslintConfig: string;
        lintFilePatterns: string[];
      } & Record<string, string>;
    };
    test: {
      builder: string;
      outputs: string[];
      options: {
        jestConfig: string;
        passWithNoTests: boolean;
      };
    };
  };
}

const addFiles = (schema: ISchematicContext): Rule => (tree: Tree, context: SchematicContext) => {
  const projectConfig: IProjectConfig = getProjectConfig(tree, schema.name);

  const templateSource = apply(url('./files'), [
    move(projectConfig.root),
    template({
      ...strings,
      ...schema, // pass the objects containing the properties & functions to be used in template file
    }),
  ]);

  return chain([mergeWith(templateSource, MergeStrategy.Overwrite)])(tree, context);
};

const updateProjectConfig = (schema: ISchematicContext): Rule => (tree: Tree, context: SchematicContext) => {
  const projectConfig: IProjectConfig & ProjectConfiguration & NxJsonProjectConfiguration = getProjectConfig(tree, schema.name);
  projectConfig.architect.lint.builder = '@angular-eslint/builder:lint';
  projectConfig.architect.lint.options.lintFilePatterns = [`libs/${schema.name}/src/**/*.ts`];
  console.log('projectConfig', JSON.stringify(projectConfig));

  updateProjectConfiguration(tree as unknown as NxTree, schema.name, projectConfig);

  return chain([]);
}

export default function (schema: ISchematicContext) {
  return (tree: Tree, context: SchematicContext) => {
    console.log('schema', schema);
    const name = schema.name;
    const tags = schema.tags;

    return chain([
      externalSchematic('@nrwl/angular', 'lib', {
        name,
        tags,
        style: 'scss',
      }),
      updateProjectConfig(schema),
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
