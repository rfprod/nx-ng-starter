/**
 * Client constraints for the module boundary rules based on scopes.
 */
exports.constraints = [
  {
    onlyDependOnLibsWithTags: [
      'scope:client-material',
      'scope:client-pwa-offline',
      'scope:client-store-router',
      'scope:client-testing-unit',
      'scope:client-service-worker',
      'scope:client-util',
      'scope:client-util-ngrx',
      'scope:client-util-security'
    ],
    sourceTag: 'scope:documentation',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-e2e', 'scope:client-util'],
    sourceTag: 'scope:documentation-e2e',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-util-animations',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-material', 'scope:client-util', 'scope:client-util-ngrx'],
    sourceTag: 'scope:client-testing-unit',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-testing-e2e',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-material',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-pwa-offline',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-store', 'scope:client-util'],
    sourceTag: 'scope:client-core',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-store-chatbot',
      'scope:client-store-feature-access',
      'scope:client-store-http-progress',
      'scope:client-store-http-api',
      'scope:client-store-sidebar',
      'scope:client-store-theme',
      'scope:client-store-user',
      'scope:client-translate',
      'scope:client-testing-unit',
      'scope:client-util',
      'scope:proto',
    ],
    sourceTag: 'scope:client-store',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-unit', 'scope:client-util', 'scope:client-util-ngrx'],
    sourceTag: 'scope:client-store-chatbot',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-unit', 'scope:client-util', 'scope:client-util-ngrx'],
    sourceTag: 'scope:client-store-feature-access',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-store-http-progress',
      'scope:client-translate',
      'scope:client-testing-unit',
      'scope:client-util',
      'scope:client-util-ngrx',
    ],
    sourceTag: 'scope:client-store-http-api',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-translate', 'scope:client-testing-unit', 'scope:client-util', 'scope:client-util-ngrx'],
    sourceTag: 'scope:client-store-http-progress',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-unit', 'scope:client-util', 'scope:client-util-ngrx'],
    sourceTag: 'scope:client-store-router',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-unit', 'scope:client-util', 'scope:client-util-ngrx'],
    sourceTag: 'scope:client-store-sidebar',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-unit', 'scope:client-util', 'scope:client-util-ngrx'],
    sourceTag: 'scope:client-store-theme',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-unit', 'scope:client-util', 'scope:client-util-ngrx'],
    sourceTag: 'scope:client-store-user',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-store-http-progress',
      'scope:client-testing-unit',
      'scope:client-util',
      'scope:client-util-ngrx',
    ],
    sourceTag: 'scope:client-store-diagnostics',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-service-worker',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-core',
      'scope:client-material',
      'scope:client-store',
      'scope:client-store-chatbot',
      'scope:client-store-theme',
      'scope:client-store-user',
      'scope:client-testing-unit',
      'scope:client-util',
    ],
    sourceTag: 'scope:client-componnents',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-directives', 'scope:client-testing-unit', 'scope:client-util'],
    sourceTag: 'scope:client-dashboards',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-d3-charts',
      'scope:client-store-diagnostics',
      'scope:client-store-http-api',
      'scope:client-store-user',
      'scope:client-testing-unit',
    ],
    sourceTag: 'scope:client-diagnostics',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-e2e', 'scope:client-util'],
    sourceTag: 'scope:client-diagnostics-e2e',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-unit'],
    sourceTag: 'scope:client-directives',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-store-http-progress',
      'scope:client-store-user',
      'scope:client-testing-unit',
      'scope:client-util',
      'scope:proto',
    ],
    sourceTag: 'scope:client-gql',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-unit', 'scope:client-util', 'scope:proto'],
    sourceTag: 'scope:client-grpc',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-directives',
      'scope:client-material',
      'scope:client-store',
      'scope:client-translate',
      'scope:client-util-eliza',
      'scope:client-testing-unit',
    ],
    sourceTag: 'scope:client-chatbot',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-d3-charts',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-store',
      'scope:client-store-http-progress',
      'scope:client-store-sidebar',
      'scope:client-testing-unit',
    ],
    sourceTag: 'scope:client-sidebar',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-util',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-util-decorators'
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-util-eliza',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-util-ngrx',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:client-util-security',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-unit', 'scope:client-util'],
    sourceTag: 'scope:client-util-sentry',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-material', 'scope:client-util'],
    sourceTag: 'scope:client-translate',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-chatbot',
      'scope:client-core',
      'scope:client-core-components',
      'scope:client-dashboards',
      'scope:client-diagnostics',
      'scope:client-gql',
      'scope:client-grpc',
      'scope:client-material',
      'scope:client-pwa-offline',
      'scope:client-service-worker',
      'scope:client-sidebar',
      'scope:client-store',
      'scope:client-store-chatbot',
      'scope:client-store-feature-access',
      'scope:client-store-router',
      'scope:client-store-sidebar',
      'scope:client-store-theme',
      'scope:client-store-user',
      'scope:client-store-diagnostics',
      'scope:client-translate',
      'scope:client-testing-unit',
      'scope:client-util',
      'scope:client-util-eliza',
      'scope:client-util-ngrx',
      'scope:client-util-security',
      'scope:client-util-sentry',
    ],
    sourceTag: 'scope:client',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-material',
      'scope:client-store-feature-access',
      'scope:client-store-sidebar',
      'scope:client-testing-unit',
      'scope:client-util',
    ],
    sourceTag: 'scope:client-core-components',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-e2e', 'scope:client-util'],
    sourceTag: 'scope:client-e2e',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-e2e', 'scope:client-util'],
    sourceTag: 'scope:client-core-components-e2e',
  },
  {
    onlyDependOnLibsWithTags: [
      'scope:client-elements',
      'scope:client-core',
      'scope:client-testing-unit',
      'scope:client-util',
      'scope:client-util-security',
      'scope:client-util-sentry',
    ],
    sourceTag: 'scope:elements',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-testing-e2e', 'scope:client-util'],
    sourceTag: 'scope:elements-e2e',
  },
  {
    onlyDependOnLibsWithTags: [],
    sourceTag: 'scope:elements-testing',
  },
  {
    onlyDependOnLibsWithTags: ['scope:client-chatbot', 'scope:client-testing-unit', 'scope:client-util', 'scope:client-util-eliza'],
    sourceTag: 'scope:client-elements',
  },
];
