/**
 * Backend constraints for the module boundary rules based on scopes.
 */
exports.constraints = [
  {
    sourceTag: 'scope:server-dev',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:server-prod',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:api',
    onlyDependOnLibsWithTags: [
      'scope:backend-auth',
      'scope:backend-diagnostics',
      'scope:backend-grpc',
      'scope:backend-gql',
      'scope:backend-interfaces',
      'scope:backend-logger',
      'scope:proto',
    ],
  },
  {
    sourceTag: 'scope:backend-auth',
    onlyDependOnLibsWithTags: ['scope:backend-interfaces', 'scope:proto'],
  },
  {
    sourceTag: 'scope:backend-diagnostics',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:backend-grpc',
    onlyDependOnLibsWithTags: ['scope:backend-interfaces', 'scope:proto'],
  },
  {
    sourceTag: 'scope:backend-gql',
    onlyDependOnLibsWithTags: ['scope:backend-interfaces'],
  },
  {
    sourceTag: 'scope:backend-interfaces',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:backend-logger',
    onlyDependOnLibsWithTags: ['scope:proto'],
  },
];
