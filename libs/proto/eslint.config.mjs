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
    files: ['**/*.ts', '**/*.js'],
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['pb.js', 'pb.d.ts', 'proto.js', 'proto.d.ts'],
        },
      ],
    },
  },
]);
