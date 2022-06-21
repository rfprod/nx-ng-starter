/**
 * This RegExp patter validates the allowed camelCase patterns that should be used for the object literal property names.
 */
const camelCaseRegExpInput = '([a-z]+([A-Z])?[a-z]*)([A-Z][a-z]+|A11y|URL){0,}([$])?';

/**
 * TypeScript Eslint naming convention configuration generator.
 * @param {jestConfigs: boolean} options configuration options
 * @returns @typescript-eslint/naming-convention configuration
 */
const namingConventionConfig = (options = { jestConfigs: false }) => ({
  '@typescript-eslint/naming-convention': [
    'error', // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
    {
      selector: 'default',
      format: ['camelCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'parameter',
      format: ['camelCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'objectLiteralProperty',
      /**
       * By default only camelCase is allowed.
       * Exceptions:
       * > FORCE_COLOR - nodejs environment property
       * > Authorization, Content-Type - client http headers
       * > Cache-Control, Expires, Pragma - api http headers
       * > graphql-ws, subscriptions-transport-ws - api graphql object properties
       * > graphQLErrors - gql client library property
       * Valid examples:
       * > property
       * > propertyName
       * > longPropertyName
       * > databaseURL
       */
      format: null, // ['camelCase', 'UPPER_CASE', 'PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
      custom: {
        regex: options.jestConfigs
          ? `^(${camelCaseRegExpInput}|ts-jest|[^0-9]+)$` // [^0-9]+ expression negates all numeric characters, allowing any other characters
          : `^(${camelCaseRegExpInput}|FORCE_COLOR|Authorization|Content-Type|Cache-Control|Expires|Pragma|graphql-ws|subscriptions-transport-ws|graphQLErrors)$`,
        match: true,
      },
    },
    {
      selector: 'property',
      /**
       * By default only camelCase is allowed.
       * Exceptions:
       * > Cypress - cypress e2e testing window property
       * Valid examples:
       * > property
       * > propertyName
       * > longPropertyName
       * > databaseURL
       * > observable$
       * > observableProperty$
       */
      format: null, // ['camelCase', 'PascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
      custom: {
        regex: options.jestConfigs ? `^(${camelCaseRegExpInput})$` : `^(${camelCaseRegExpInput}|Cypress)$`,
        match: true,
      },
    },
    {
      selector: 'function',
      format: ['camelCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'enum',
      format: ['UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'enumMember',
      format: ['UPPER_CASE'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'memberLike',
      modifiers: ['private'],
      format: ['camelCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'typeAlias',
      prefix: ['T'],
      format: ['StrictPascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'typeParameter',
      format: ['StrictPascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'interface',
      prefix: ['I'],
      format: ['StrictPascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
    {
      selector: 'class',
      prefix: ['App'],
      format: ['StrictPascalCase'],
      leadingUnderscore: 'forbid',
      trailingUnderscore: 'forbid',
    },
  ],
});

exports.namingConventionConfig = namingConventionConfig;
