const backendConstraints = require('./.eslint/.eslintrc.module-boundaries.backend').constraints;
const clientConstraints = require('./.eslint/.eslintrc.module-boundaries.client').constraints;
const sharedConstraints = require('./.eslint/.eslintrc.module-boundaries.shared').constraints;
const workspaceConstraints = require('./.eslint/.eslintrc.module-boundaries.workspace').constraints;

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
exports.nxModuleBoundaryRules = {
  enforceBuildableLibDependency: true,
  allow: [],
  depConstraints: [...workspaceConstraints, ...sharedConstraints, ...clientConstraints, ...backendConstraints, ...typeConstraints],
};
