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
    files: ['**/eliza.service.ts'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      'max-depth': ['error', 6],
      'eslint-comments/no-restricted-disable': ['error', '*', '!no-console', '!max-lines-per-function', '!complexity'],
    },
  },
  {
    files: ['**/keywords.config.ts'],
    rules: {
      'max-lines': ['error', 1060],
    },
  },
]);
