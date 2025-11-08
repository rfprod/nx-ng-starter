import nx from '@nx/eslint-plugin';
import rxjs from '@smarttools/eslint-plugin-rxjs';
import stylistic from '@stylistic/eslint-plugin';
import angularEslint from 'angular-eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import compat from 'eslint-plugin-compat';
import cypressPlugin from 'eslint-plugin-cypress/flat';
import eslintComments from 'eslint-plugin-eslint-comments';
import jsonc from 'eslint-plugin-jsonc';
import prettier from 'eslint-plugin-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import { dirname } from 'path';
import { join } from 'path/posix';
import tsEslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

import { nxModuleBoundaryRules } from './.eslintrc.module-boundaries.mjs';
import { namingConventionConfig } from './.eslintrc.naming-convention.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ignores = [
  '*.min.js',
  'decorate-angular-cli.js',
  'node_modules/*',
  '**/node_modules/*',
  '**/generated/**',
  '**/assets/**',
  '.config/',
  '.angular/',
  '.docker/',
  '.envoy/',
  '.firebase/',
  '.github/',
  '.git/',
  '.husky/',
  '.vscode/',
  './documentation/',
  './dist/',
  './coverage/',
  './changelog/',
  './functions/',
  'libs/proto/**/*.js',
  'libs/proto/**/*.d.ts',
];

export const commonRules = {
  'eslint-comments/no-unused-disable': 'error',
  'eslint-comments/no-use': [
    'error',
    {
      allow: ['eslint-disable-next-line'],
    },
  ],
  'eslint-comments/disable-enable-pair': [
    'error',
    {
      allowWholeFile: false,
    },
  ],
  'eslint-comments/require-description': [
    'error',
    {
      ignore: [],
    },
  ],
  'eslint-comments/no-restricted-disable': ['error', '*', '!no-console', '!prettier'],
  'arrow-parens': ['error', 'as-needed'],
  'brace-style': 'off', // handled by @typescript-eslint rule
  'comma-spacing': 'off', // handled by @typescript-eslint rule
  'constructor-super': 'error',
  complexity: ['error', 10],
  'default-param-last': 'off', // handled by @typescript-eslint rule
  eqeqeq: 'error',
  'func-name-matching': ['error', 'always'],
  'guard-for-in': 'error',
  'lines-between-class-members': 'off',
  'max-depth': ['error', 4],
  'max-len': [
    'error',
    {
      code: 140,
      comments: 140,
      ignoreStrings: true,
      ignorePattern: '// eslint-disable',
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    },
  ],
  'max-lines': [
    'error',
    {
      max: 600,
      skipBlankLines: true,
    },
  ],
  'max-lines-per-function': [
    'error',
    {
      max: 45,
      skipBlankLines: true,
      skipComments: true,
    },
  ],
  'max-nested-callbacks': ['error', 4],
  'max-params': ['error', 12],
  'no-alert': 'error',
  'no-await-in-loop': 'error',
  'no-bitwise': 'error',
  'no-dupe-class-members': 'error',
  'no-caller': 'error',
  'no-confusing-arrow': 'error',
  'no-console': 'error',
  'no-constructor-return': 'error',
  'no-continue': 'error',
  'no-debugger': 'error',
  'no-duplicate-case': 'error',
  'no-duplicate-imports': 'error',
  'no-else-return': 'error',
  'no-empty': 'error',
  'no-empty-function': 'off', // handled by typescript-eslint rule
  'no-fallthrough': 'error',
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-parens': 'off', // handled by prettier
  'no-extra-boolean-cast': 'off', // conflicts with strict boolean expressions
  'no-floating-decimal': 'error',
  'no-implicit-coercion': 'error',
  'no-invalid-this': 'off', // keep off
  'no-labels': [
    'error',
    {
      allowSwitch: true,
    },
  ],
  'no-lone-blocks': 'error',
  'no-lonely-if': 'error',
  'no-loop-func': 'error',
  'no-magic-numbers': 'off', // handled by typescript-eslint rule
  'no-new-wrappers': 'error',
  'no-param-reassign': 'error',
  'no-plusplus': 'error',
  'no-restricted-imports': ['error', 'rxjs/Rx'],
  'no-return-assign': 'error',
  'no-return-await': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-shadow': 'off', // handled by typescript-eslint rule
  'no-shadow-restricted-names': 'error',
  'no-template-curly-in-string': 'error',
  'no-throw-literal': 'off', // handled by typescript-eslint rule
  'no-undefined': 'error',
  'no-unmodified-loop-condition': 'error',
  'no-unreachable': 'error',
  'no-unsafe-finally': 'error',
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: true,
      allowTernary: true,
    },
  ],
  'no-unused-labels': 'error',
  'no-useless-catch': 'error',
  'no-useless-concat': 'error',
  'no-useless-return': 'error',
  'prefer-const': 'error',
  'prefer-object-spread': 'error',
  'prefer-spread': 'error',
  'prefer-promise-reject-errors': 'error',
  'prettier/prettier': 'error',
  quotes: 'off', // handled by typescript eslint rule
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
  'sort-imports': 'off', // handled by simple-import-sort/sort
  radix: 'error',
  'require-atomic-updates': 'error',
  'require-await': 'off', // handled by typescript-eslint rule
  'require-jsdoc': [
    'off', // TODO: turn on
    {
      require: {
        FunctionDeclaration: false,
        MethodDefinition: false,
        ClassDeclaration: true,
        ArrowFunctionExpression: false,
      },
    },
  ],
  yoda: ['error', 'never'],
  'unicorn/filename-case': 'error',
};

const stylisticRules = {
  '@stylistic/indent': 'off', // keep off, conflicts with other rules
  '@stylistic/indent-binary-ops': 'off', // keep off for now
  '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before', '|': 'before' } }],
  '@stylistic/arrow-parens': ['error', 'as-needed'],
  '@stylistic/brace-style': 'error',
  '@stylistic/comma-spacing': ['error', { before: false, after: true }],
  '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterOverload: true }],
  '@stylistic/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'always' }],
  '@stylistic/quote-props': ['error', 'as-needed'],
};

export const jsonConfig = {
  ...jsonc.configs['flat/recommended-with-json'],
  files: ['**/*.json'],
};

export const jsConfig = {
  files: ['**/*.js', '**/*.mjs'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: {
    prettier,
    'simple-import-sort': simpleImportSort,
    'eslint-comments': eslintComments,
    unicorn,
    '@nx': nx,
    '@stylistic': stylistic,
  },
  extends: [
    eslintConfigPrettier,
    prettierRecommended,
    ...nx.configs['flat/javascript'],
    stylistic.configs.customize({ braceStyle: '1tbs', semi: true }),
  ],
  rules: {
    ...commonRules,
    ...stylisticRules,
  },
};

export const mtsConfig = {
  files: ['**/*.mts'],
  languageOptions: {
    parser: await import('@typescript-eslint/parser'),
    parserOptions: {
      sourceType: 'module',
      project: [join(__dirname, './tsconfig.base.json')],
    },
  },
  plugins: {
    prettier,
    'simple-import-sort': simpleImportSort,
    'eslint-comments': eslintComments,
    unicorn,
    '@typescript-eslint': tsEslint.plugin,
    rxjs,
    '@nx': nx,
    '@stylistic': stylistic,
  },
  extends: [
    eslintConfigPrettier,
    prettierRecommended,
    ...nx.configs['flat/typescript'],
    stylistic.configs.customize({ braceStyle: '1tbs', semi: true }),
  ],
  rules: {
    ...commonRules,
    ...stylisticRules,
    ...tsEslint.plugin.configs['recommended'].rules,
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array-simple',
      },
    ],
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-ts-comment': 'error',
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/consistent-generic-constructors': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-deprecated': 'error',
    '@typescript-eslint/no-restricted-types': [
      'error',
      {
        types: {
          Object: 'Avoid using the `Object` type. Did you mean `object`?',
          Boolean: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
          Number: 'Avoid using the `Number` type. Did you mean `number`?',
          String: 'Avoid using the `String` type. Did you mean `string`?',
          Symbol: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
        },
      },
    ],
    '@typescript-eslint/default-param-last': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        ignoredMethodNames: ['constructor'],
      },
    ],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: ['static-field', 'instance-field', 'static-method', 'instance-method'],
      },
    ],
    '@typescript-eslint/method-signature-style': ['error', 'method'],
    ...namingConventionConfig(),
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['constructors'],
      },
    ],
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-extraneous-class': [
      'error',
      {
        allowEmpty: true,
        allowStaticOnly: true,
        allowWithDecorator: true,
      },
    ],
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreVoid: true, // setting to false leads to messy code where it's reasonable to use void
      },
    ],
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignore: [-1, 0, 1, 2],
        ignoreEnums: true, // ignore enumerators so that numeric values can be grouped via enums instead of constants,
      },
    ],
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
        checksConditionals: true,
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': [
      'error',
      {
        typesToIgnore: [''],
      },
    ],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
      },
    ],
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
      },
    ],
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        ignoreRestArgs: true,
      },
    ],
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-readonly': ['error', {}],
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-readonly-parameter-types': [
      'off',
      {
        checkParameterProperties: false,
      },
    ],
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      {
        ignoreConditionalTests: true,
        ignoreMixedLogicalExpressions: true,
      },
    ],
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'never',
        lib: 'never',
      },
    ],
    '@typescript-eslint/unbound-method': [
      'off',
      {
        ignoreStatic: true,
      },
    ],
    'rxjs/ban-observables': 'off',
    'rxjs/ban-operators': 'off',
    'rxjs/no-async-subscribe': 'error',
    'rxjs/no-compat': 'error',
    'rxjs/no-create': 'error',
    'rxjs/no-ignored-error': 'off',
    'rxjs/no-ignored-observable': 'error',
    'rxjs/no-ignored-subscribe': 'off',
    'rxjs/no-ignored-subscription': 'error',
    'rxjs/no-internal': 'error',
    'rxjs/no-nested-subscribe': 'error',
    'rxjs/no-subclass': 'error',
    'rxjs/throw-error': 'error',
    'rxjs/no-tap': 'off',
    'rxjs/no-exposed-subjects': 'error',
    'rxjs/no-subject-unsubscribe': 'error',
    'rxjs/suffix-subjects': [
      'error',
      {
        parameters: true,
        properties: true,
        suffix: 'Subject',
        types: {
          '^EventEmitter$': false,
        },
        variables: true,
      },
    ],
    'rxjs/no-topromise': 'error',
    'rxjs/no-redundant-notify': 'error',
    'rxjs/no-unsafe-catch': 'error',
    'rxjs/no-unsafe-subject-next': 'error',
    'rxjs/no-unsafe-switchmap': 'error',
    'rxjs/no-unsafe-takeuntil': 'error',
    'rxjs/no-unbound-methods': 'error',
  },
};

export const tsConfig = {
  files: ['**/*.ts'],
  languageOptions: mtsConfig.languageOptions,
  plugins: mtsConfig.plugins,
  extends: mtsConfig.extends,
  rules: {
    '@nx/enforce-module-boundaries': ['error', nxModuleBoundaryRules],
    ...mtsConfig.rules,
  },
};

export const tsConfigCypress = {
  files: ['**/*.ts'],
  languageOptions: tsConfig.languageOptions,
  plugins: { ...tsConfig.plugins, cypress: cypressPlugin },
  extends: [...tsConfig.extends, cypressPlugin.configs['recommended']],
  rules: {
    ...tsConfig.rules,
  },
};

export const tsConfigAngular = {
  files: tsConfig.files,
  languageOptions: tsConfig.languageOptions,
  plugins: tsConfig.plugins,
  processor: angularEslint.processInlineTemplates,
  extends: [...tsConfig.extends, angularEslint.configs.tsRecommended, compat.configs['flat/recommended']],
  rules: {
    ...tsConfig.rules,
    '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
    '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }],
    '@angular-eslint/no-pipe-impure': 'error',
    '@angular-eslint/contextual-decorator': 'error',
    '@angular-eslint/contextual-lifecycle': 'error',
    '@angular-eslint/no-attribute-decorator': 'off', // keep off, @Attribute is more performant than @Input when static values are used
    '@angular-eslint/use-lifecycle-interface': 'error',
    '@angular-eslint/component-max-inline-declarations': ['error', { animations: 20, styles: 8, template: 5 }],
    '@angular-eslint/use-injectable-provided-in': 'error',
    '@angular-eslint/prefer-on-push-component-change-detection': 'error',
    '@angular-eslint/no-output-native': 'error',
    '@angular-eslint/no-lifecycle-call': 'error',
    '@angular-eslint/no-conflicting-lifecycle': 'error',
    '@angular-eslint/no-forward-ref': 'error',
    '@angular-eslint/no-input-prefix': 'error',
    '@angular-eslint/no-input-rename': 'error',
    '@angular-eslint/no-output-on-prefix': 'error',
    '@angular-eslint/no-output-rename': 'error',
    '@angular-eslint/prefer-output-readonly': 'error',
    '@angular-eslint/relative-url-prefix': 'error',
    '@angular-eslint/use-component-selector': 'error',
    '@angular-eslint/use-component-view-encapsulation': 'error',
    '@angular-eslint/use-pipe-transform-interface': 'error',
    '@angular-eslint/component-class-suffix': ['error', { suffixes: ['Component', 'Page', 'Modal'] }],
    '@angular-eslint/directive-class-suffix': ['error', { suffixes: ['Directive', 'ViewAdapter'] }],
    '@angular-eslint/no-inputs-metadata-property': 'error',
    '@angular-eslint/no-outputs-metadata-property': 'error',
    '@angular-eslint/no-queries-metadata-property': 'error',
  },
};

export const htmlConfigAngular = {
  extends: [
    ...nx.configs['flat/angular-template'],
    ...angularEslint.configs.templateRecommended,
    ...angularEslint.configs.templateAccessibility,
  ],
  files: ['**/*.html'],
};

export const exceptions = {
  cypress: {
    files: ['**/index.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/triple-slash-reference': 'off', // need for Cypress imports
    },
  },
  logger: {
    files: ['**/main.ts', '**/*logger*.ts', '**/http-handlers.service.ts'],
    rules: {
      'no-console': 'off',
    },
  },
  spec: {
    files: ['**/*.spec.ts'],
    rules: {
      complexity: ['error', 11],
      'max-depth': ['error', 5],
      'max-lines-per-function': 'off',
      'rxjs/no-exposed-subjects': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  testSetup: {
    files: ['**/test-setup.ts'],
    rules: {
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'off',
    },
  },
};

export const exceptionsAngular = {
  spec: {
    files: ['**/*.spec.ts'],
    rules: {
      ...exceptions.spec.rules,
      'compat/compat': 'off',
      '@angular-eslint/use-injectable-provided-in': 'off',
      '@angular-eslint/no-lifecycle-call': 'off',
      '@angular/eslint-prefer-on-push-component-change-detection': 'off',
    },
  },
};

export default defineConfig([
  { ignores },
  jsConfig,
  mtsConfig,
  tsConfig,
  {
    files: ['**/.eslintrc.naming-convention.mjs'],
    rules: {
      'max-lines-per-function': [
        'error',
        {
          max: 98,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      complexity: ['error', 14],
    },
  },
  {
    files: ['**/.eslintrc.module-boundaries.client.mjs'],
    rules: {
      'max-lines': [
        'error',
        {
          max: 284,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
  {
    files: ['**/eslint.config.mjs', '**/commitlint.*.js'],
    rules: {
      'no-magic-numbers': 'off',
      'max-lines': [
        'error',
        {
          max: 623,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
]);
