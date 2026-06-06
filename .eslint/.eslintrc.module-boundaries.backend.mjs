/**
 * Backend constraints for the module boundary rules based on scopes.
 */
export const constraints = [
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:server-prod',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:backend-auth',
      'scope:backend-diagnostics',
      'scope:backend-gql',
      'scope:backend-interfaces',
      'scope:backend-logger',
    ],
    sourceTag: 'scope:api',
  },
  {
    onlyDependOnLibsWithTags: ['scope:backend-interfaces'],
    sourceTag: 'scope:backend-auth',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:backend-diagnostics',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:backend-logger',
  },
  {
    onlyDependOnLibsWithTags: ['scope:backend-interfaces'],
    sourceTag: 'scope:backend-gql',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:backend-interfaces',
  },
];
