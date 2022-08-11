/**
 * Common module boundary rules based on project types.
 */
const typeConstraints = [
  {
    sourceTag: 'type:application',
    onlyDependOnLibsWithTags: ['type:feature', 'type:data-access', 'type:ui', 'type:util', 'type:unit-testing'],
  },
  {
    sourceTag: 'type:feature',
    onlyDependOnLibsWithTags: ['type:data-access', 'type:ui', 'type:util', 'type:unit-testing'],
  },
  {
    sourceTag: 'type:data-access',
    onlyDependOnLibsWithTags: ['type:data-access', 'type:util', 'type:unit-testing'],
  },
  {
    sourceTag: 'type:ui',
    onlyDependOnLibsWithTags: ['type:ui', 'type:util', 'type:unit-testing'],
  },
  {
    sourceTag: 'type:util',
    onlyDependOnLibsWithTags: ['type:util', 'type:unit-testing'],
  },
  {
    sourceTag: 'type:e2e',
    onlyDependOnLibsWithTags: ['type:util'],
  },
];

/**
 * Shared module boundary rules based on scopes.
 */
const sharedConstraints = [
  {
    sourceTag: 'scope:proto',
    onlyDependOnLibsWithTags: [],
  },
];

/**
 * Backend module boundary rules based on scopes.
 */
const backendConstraints = [
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
      'scope:backend-websocket',
      'scope:proto',
    ],
  },
  {
    sourceTag: 'scope:backend-auth',
    onlyDependOnLibsWithTags: ['scope:backend-interfaces', 'scope:proto'],
  },
  {
    sourceTag: 'scope:backend-diagnostics',
    onlyDependOnLibsWithTags: ['scope:backend-interfaces'],
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
  {
    sourceTag: 'scope:backend-websocket',
    onlyDependOnLibsWithTags: ['scope:backend-interfaces', 'scope:proto'],
  },
];

/**
 * Client module boundary rules based on scopes.
 */
const clientConstraints = [
  {
    sourceTag: 'scope:documentation',
    onlyDependOnLibsWithTags: [
      'scope:client-material',
      'scope:client-pwa-offline',
      'scope:client-unit-testing',
      'scope:client-util',
      'scope:client-util-ngrx',
    ],
  },
  {
    sourceTag: 'scope:documentation-e2e',
    onlyDependOnLibsWithTags: ['scope:client-util'],
  },
  {
    sourceTag: 'scope:client-unit-testing',
    onlyDependOnLibsWithTags: ['scope:client-material', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client-material',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:client-pwa-offline',
    onlyDependOnLibsWithTags: ['scope:client-util'],
  },
  {
    sourceTag: 'scope:client-core',
    onlyDependOnLibsWithTags: ['scope:client-store', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client-store',
    onlyDependOnLibsWithTags: [
      'scope:client-store-chatbot',
      'scope:client-store-http-progress',
      'scope:client-store-http-api',
      'scope:client-store-sidebar',
      'scope:client-store-theme',
      'scope:client-store-user',
      'scope:client-translate',
      'scope:client-unit-testing',
      'scope:client-util',
      'scope:proto',
    ],
  },
  {
    sourceTag: 'scope:client-store-chatbot',
    onlyDependOnLibsWithTags: ['scope:client-unit-testing', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client-store-http-api',
    onlyDependOnLibsWithTags: [
      'scope:client-store-http-progress',
      'scope:client-translate',
      'scope:client-unit-testing',
      'scope:client-util',
    ],
  },
  {
    sourceTag: 'scope:client-store-http-progress',
    onlyDependOnLibsWithTags: ['scope:client-store-user', 'scope:client-translate', 'scope:client-unit-testing', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client-store-sidebar',
    onlyDependOnLibsWithTags: ['scope:client-unit-testing', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client-store-theme',
    onlyDependOnLibsWithTags: ['scope:client-unit-testing', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client-store-user',
    onlyDependOnLibsWithTags: ['scope:client-unit-testing', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client-store-websocket',
    onlyDependOnLibsWithTags: ['scope:client-unit-testing', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client-services',
    onlyDependOnLibsWithTags: ['scope:client-unit-testing', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client-componnents',
    onlyDependOnLibsWithTags: [
      'scope:client-core',
      'scope:client-material',
      'scope:client-store',
      'scope:client-store-chatbot',
      'scope:client-store-theme',
      'scope:client-store-user',
      'scope:client-unit-testing',
      'scope:client-util',
    ],
  },
  {
    sourceTag: 'scope:client-diagnostics',
    onlyDependOnLibsWithTags: [
      'scope:client-core',
      'scope:client-d3-charts',
      'scope:client-material',
      'scope:client-services',
      'scope:client-store',
      'scope:client-store-http-api',
      'scope:client-store-websocket',
      'scope:client-translate',
      'scope:client-unit-testing',
      'scope:client-util',
      'scope:proto',
    ],
  },
  {
    sourceTag: 'scope:client-directives',
    onlyDependOnLibsWithTags: ['scope:client-unit-testing'],
  },
  {
    sourceTag: 'scope:client-gql',
    onlyDependOnLibsWithTags: ['scope:client-store-http-progress', 'scope:client-unit-testing', 'scope:client-util', 'scope:proto'],
  },
  {
    sourceTag: 'scope:client-grpc',
    onlyDependOnLibsWithTags: ['scope:client-unit-testing', 'scope:client-util', 'scope:proto'],
  },
  {
    sourceTag: 'scope:client-chatbot',
    onlyDependOnLibsWithTags: [
      'scope:client-directives',
      'scope:client-material',
      'scope:client-store',
      'scope:client-translate',
      'scope:client-util-eliza',
      'scope:client-unit-testing',
    ],
  },
  {
    sourceTag: 'scope:client-d3-charts',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:client-sidebar',
    onlyDependOnLibsWithTags: [
      'scope:client-store',
      'scope:client-store-http-progress',
      'scope:client-store-sidebar',
      'scope:client-unit-testing',
    ],
  },
  {
    sourceTag: 'scope:client-util',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:client-util-eliza',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:client-util-ngrx',
    onlyDependOnLibsWithTags: [],
  },
  {
    sourceTag: 'scope:client-util-sentry',
    onlyDependOnLibsWithTags: ['scope:client-unit-testing', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client-translate',
    onlyDependOnLibsWithTags: ['scope:client-material', 'scope:client-util'],
  },
  {
    sourceTag: 'scope:client',
    onlyDependOnLibsWithTags: [
      'scope:client-chatbot',
      'scope:client-core',
      'scope:client-core-components',
      'scope:client-diagnostics',
      'scope:client-gql',
      'scope:client-grpc',
      'scope:client-material',
      'scope:client-pwa-offline',
      'scope:client-services',
      'scope:client-sidebar',
      'scope:client-store',
      'scope:client-store-theme',
      'scope:client-store-user',
      'scope:client-store-websocket',
      'scope:client-translate',
      'scope:client-unit-testing',
      'scope:client-util',
      'scope:client-util-eliza',
      'scope:client-util-ngrx',
      'scope:client-util-sentry',
    ],
  },
  {
    sourceTag: 'scope:client-core-components',
    onlyDependOnLibsWithTags: [
      'scope:client-material',
      'scope:client-store-chatbot',
      'scope:client-store-sidebar',
      'scope:client-store-theme',
      'scope:client-store-user',
      'scope:client-unit-testing',
      'scope:client-util',
    ],
  },
  {
    sourceTag: 'scope:client-e2e',
    onlyDependOnLibsWithTags: ['scope:client-util'],
  },
  {
    sourceTag: 'scope:client-core-components-e2e',
    onlyDependOnLibsWithTags: ['scope:client-util'],
  },
  {
    sourceTag: 'scope:elements',
    onlyDependOnLibsWithTags: [
      'scope:client-chatbot',
      'scope:client-core',
      'scope:client-gql',
      'scope:client-material',
      'scope:client-store-websocket',
      'scope:client-translate',
      'scope:client-unit-testing',
      'scope:client-util',
      'scope:client-util-eliza',
      'scope:client-util-ngrx',
      'scope:client-util-sentry',
    ],
  },
  {
    sourceTag: 'scope:elements-e2e',
    onlyDependOnLibsWithTags: ['scope:client-util'],
  },
];

/**
 * Nrwl nx module boudary rules.
 */
exports.nxModuleBoundaryRules = {
  enforceBuildableLibDependency: true,
  allow: [],
  depConstraints: [...sharedConstraints, ...clientConstraints, ...backendConstraints, ...typeConstraints],
};
