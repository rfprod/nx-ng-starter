/**
 * Roadmap typescript-eslint
 * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md
 *
 * ESLint Rules: https://eslint.org/docs/rules/
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // https://github.com/typescript-eslint/typescript-eslint
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint', // https://github.com/typescript-eslint/typescript-eslint
    '@angular-eslint', // https://github.com/angular-eslint/angular-eslint
    'deprecation', // https://github.com/gund/eslint-plugin-deprecation
    'simple-import-sort', // https://github.com/lydell/eslint-plugin-simple-import-sort
    'rxjs', // https://github.com/cartant/eslint-plugin-rxjs
    'compat', // https://github.com/amilajack/eslint-plugin-compat
  ],
  ignorePatterns: ['*.min.js', 'node_modules/'],

  rules: {
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/ban-ts-ignore': 'warn',
    '@typescript-eslint/ban-types': [
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
    '@typescript-eslint/camelcase': 'error',
    '@typescript-eslint/class-name-casing': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { ignoredMethodNames: ['constructor'] },
    ],
    '@typescript-eslint/interface-name-prefix': ['error', { prefixWithI: 'always' }],
    '@typescript-eslint/member-ordering': [
      'error',
      { default: ['static-field', 'instance-field', 'static-method', 'instance-method'] },
    ],
    '@typescript-eslint/naming-convention': [
      'error', // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
      {
        selector: 'default',
        format: ['camelCase'],
      },

      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'enum',
        format: ['UPPER_CASE'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['constructors', 'methods'],
      },
    ],
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-extraneous-class': [
      'error',
      { allowEmpty: true, allowStaticOnly: true, allowWithDecorator: true },
    ],
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreVoid: true,
      },
    ],
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true,
        ignore: [-1, 0, 1],
        ignoreEnums: true,
      },
    ],
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false, checksConditionals: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': ['error', { typesToIgnore: [''] }],
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unused-vars': 'off', // keep off, handled by TS compiler
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false }],
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-readonly': ['error'],
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/promise-function-async': 'off', // issues, keep off
    '@typescript-eslint/require-await': 'off', // issues, keep off
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowSafe: true,
        ignoreRhs: true,
      },
    ],
    '@typescript-eslint/unbound-method': [
      'off', // keep off
      { ignoreStatic: true },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'compat/compat': 'warn',
    'constructor-super': 'error',
    complexity: ['error', 10],
    'deprecation/deprecation': 'off', // TODO: revise and turn on
    eqeqeq: 'error',
    'func-name-matching': ['error', 'always'],
    'guard-for-in': 'error',
    'max-depth': ['error', 5],
    'max-lines': ['error', { max: 1100, skipBlankLines: true }],
    'max-lines-per-function': ['error', { max: 50, skipBlankLines: true }],
    'max-nested-callbacks': ['error', 4],
    'max-params': ['error', 12],
    'no-alert': 'error',
    'no-await-in-loop': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-confusing-arrow': 'error',
    'no-console': ['error', { allow: ['error', 'warn'] }],
    'no-constructor-return': 'error',
    'no-continue': 'error',
    'no-debugger': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty': 'error',
    'no-empty-function': 'off', // keep off, handled by typescript-eslint rule
    'no-fallthrough': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-parens': 'off', // conflicts with prettier, keep off
    'no-floating-decimal': 'error',
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    'no-invalid-this': 'off', // keep off
    'no-labels': ['error', { allowSwitch: true }],
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
    'no-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'off', // handled by typescript-eslint rule
    'no-undefined': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-useless-catch': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'prefer-spread': 'error',
    'prefer-promise-reject-errors': 'error',
    'prettier/prettier': 'error',
    'simple-import-sort/sort': 'error',
    'sort-imports': 'off', // keep off, sorting is handled by simple-import-sort/sort
    radix: 'error',
    'require-atomic-updates': 'error',
    'require-await': 'off', // handled by typescript-eslint rule
    'rxjs/ban-observables': 'off', // TODO: turn on
    'rxjs/ban-operators': 'off', // TODO: turn on
    'rxjs/no-async-subscribe': 'off', // TODO: turn on
    'rxjs/no-ignored-error': 'off', // TODO: turn on
    'rxjs/no-ignored-observable': 'off', // TODO: turn on
    'rxjs/no-ignored-subscribe': 'off', // keep off
    'rxjs/no-ignored-subscription': 'off', // TODO: turn on
    'rxjs/no-internal': 'off', // TODO: turn on
    'rxjs/no-nested-subscribe': 'off', // TODO: turn on
    'rxjs/no-subclass': 'error', // TODO: turn on
    'rxjs/no-tap': 'off', // keep off
    'rxjs/no-exposed-subjects': 'off', // TODO: turn on
    yoda: 'error',
  },

  overrides: [
    {
      files: '**/test-setup.ts',
      rules: {
        'simple-import-sort/sort': 'off',
      },
    },
    {
      files: '**/*.spec.ts',
      rules: {
        'max-lines-per-function': 'off',
      },
    },
  ],
};
