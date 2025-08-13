import { defineConfig } from 'eslint/config';
import { dirname, join } from 'path/posix';
import { fileURLToPath } from 'url';
import { exceptions, exceptionsAngular, htmlConfigAngular, ignores, mtsConfig, tsConfigAngular } from '../../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig([
  {
    ignores: ignores.concat(join('!', __dirname, '/**')),
  },
  mtsConfig,
  tsConfigAngular,
  htmlConfigAngular,
  exceptionsAngular.spec,
  exceptions.logger,
  exceptions.testSetup,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
  {
    files: ['**/force-directed-chart.component.ts'],
    rules: {
      'complexity': ['error', 13],
    },
  },
  {
    files: ['**/*chart.util.ts'],
    rules: {
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignore: [-1, 0, 1, 2],
          ignoreEnums: true,
        },
      ],
      'max-lines-per-function': [
        'error',
        {
          max: 75,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'variable',
          format: ['camelCase'],
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
          format: ['camelCase', 'StrictPascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
        {
          selector: 'property',
          format: ['camelCase', 'StrictPascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
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
          format: ['StrictPascalCase'],
          leadingUnderscore: 'forbid',
          trailingUnderscore: 'forbid',
        },
      ],
    },
  },
]);
