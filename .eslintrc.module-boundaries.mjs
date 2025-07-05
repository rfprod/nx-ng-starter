import { constraints as backendConstraints } from './.eslint/.eslintrc.module-boundaries.backend.mjs';
import { constraints as clientConstraints } from './.eslint/.eslintrc.module-boundaries.client.mjs';
import { constraints as sharedConstraints } from './.eslint/.eslintrc.module-boundaries.shared.mjs';
import { constraints as workspaceConstraints } from './.eslint/.eslintrc.module-boundaries.workspace.mjs';

/**
 * Type constraints for the module boundary rules based on scopes.
 */
const typeConstraints = [
  {
    sourceTag: 'type:application',
    onlyDependOnLibsWithTags: ['type:feature', 'type:data-access', 'type:ui', 'type:util', 'type:testing-unit'],
  },
  {
    sourceTag: 'type:feature',
    onlyDependOnLibsWithTags: ['type:feature', 'type:data-access', 'type:ui', 'type:util', 'type:testing-unit'],
  },
  {
    sourceTag: 'type:data-access',
    onlyDependOnLibsWithTags: ['type:data-access', 'type:util', 'type:testing-unit'],
  },
  {
    sourceTag: 'type:ui',
    onlyDependOnLibsWithTags: ['type:ui', 'type:util', 'type:testing-unit'],
  },
  {
    sourceTag: 'type:util',
    onlyDependOnLibsWithTags: ['type:util', 'type:testing-unit'],
  },
  {
    sourceTag: 'type:e2e',
    onlyDependOnLibsWithTags: ['type:util', 'type:testing-e2e'],
  },
  {
    sourceTag: 'type:testing-e2e',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'type:testing-unit',
    onlyDependOnLibsWithTags: ['type:util', 'type:ui'],
  },
  {
    sourceTag: 'type:workspace',
    onlyDependOnLibsWithTags: [],
  },
];

/**
 * Nrwl nx module boudary rules.
 */
export const nxModuleBoundaryRules = {
  enforceBuildableLibDependency: true,
  allow: [],
  depConstraints: [...workspaceConstraints, ...sharedConstraints, ...clientConstraints, ...backendConstraints, ...typeConstraints],
};
