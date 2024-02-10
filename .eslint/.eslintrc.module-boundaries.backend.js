/**
 * Backend constraints for the module boundary rules based on scopes.
 */
exports.constraints = [
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:server-prod',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:backend-auth',
      'scope:backend-diagnostics',
      'scope:backend-grpc',
      'scope:backend-gql',
      'scope:backend-interfaces',
      'scope:backend-logger',
      'scope:proto',
    ],
    sourceTag: 'scope:api',
  },
  {
    onlyDependOnLibsWithTags: ['scope:backend-interfaces', 'scope:proto'],
    sourceTag: 'scope:backend-auth',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:backend-diagnostics',
  },
  {
    onlyDependOnLibsWithTags: ['scope:backend-interfaces', 'scope:proto'],
    sourceTag: 'scope:backend-grpc',
  },
  {
    onlyDependOnLibsWithTags: ['scope:backend-interfaces'],
    sourceTag: 'scope:backend-gql',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:backend-interfaces',
  },
  {
    onlyDependOnLibsWithTags: ['scope:proto'],
    sourceTag: 'scope:backend-logger',
  },
];
